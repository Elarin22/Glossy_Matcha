from django import forms
from django.core.exceptions import ValidationError
from .models import Staff, WorkRecord, Suppliers, DailySales, Sales

class StaffForm(forms.ModelForm):
    class Meta:
        model = Staff
        fields = ['name', 'nickname', 'employee_type', 'hire_date', 'resignation_date', 'resident_number', 'contact', 'memo']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '직원명을 입력하세요.'
            }),
            'nickname' : forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '직원 닉네임을 입력하세요.'
            }),
            'employee_type': forms.Select(attrs={
                'class': 'form-select',
            }),
            'hire_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'resignation_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'resident_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '주민등록번호 13자리를 입력하세요.',
                'maxlength': '14'
            }),
            'contact': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '연락처를 입력하세요.'
            }),
            'memo' : forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': '메모를 입력하세요. (선택사항)',
                'rows': 3
            }),
        }

    def clean_resident_number(self):
        """
        주민등록번호를 정제하고 유효성을 검사하는 메서드
        주민등록번호는 13자리 숫자여야 하며, '-' 또는 ' '를 포함할 수 있음
        """
        import re
        resident_number = self.cleaned_data.get('resident_number')

        if resident_number:
            # 주민등록번호에서 숫자만 추출
            # 예: 123456-1234567 또는 123456 1234567
            resident_digits = re.sub(r'[^0-9]', '', resident_number)

            # 주민등록번호가 정확히 13자리인지 확인
            if len(resident_digits) != 13:
                raise ValidationError('주민등록번호는 정확히 13자리 숫자여야 합니다.')
            
            return resident_digits
        return resident_number

class WorkRecordForm(forms.ModelForm):
    class Meta:
        model = WorkRecord
        fields = ['staff', 'total_hours', 'pay_period_weeks', 'hourly_rate', 'monthly_salary', 'weekly_holiday_allowance', 'memo']
        widgets = {
            'staff': forms.Select(attrs={
                'class': 'form-select',
            }),
            'total_hours': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '0.5',
                'min': '0',
                'placeholder': '총 근무시간을 입력하세요.'
            }),
            'pay_period_weeks': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '1',
                'placeholder': '급여 지급 주기를 입력하세요.',
                'min': '0'
            }),
            'hourly_rate': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '시급을 입력하세요.'
            }),
            'monthly_salary': forms.NumberInput(attrs={
                'class': 'form-control bg-light',
                'min': '0',
                'placeholder': '월급은 자동 계산됩니다.',
                'readonly': True
            }),
            'weekly_holiday_allowance': forms.NumberInput(attrs={
                'class': 'form-control bg-light',
                'min': '0',
                'placeholder': '주휴수당은 자동 계산됩니다.',
                'readonly': True
            }),
            'memo' : forms.Textarea(attrs={
                'class': 'form-control',
                'rows': '3',
                'placeholder': '메모를 입력하세요. (선택사항)',
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 재직 중인 직원만 선택할 수 있도록 필터링
        self.fields['staff'].queryset = Staff.objects.filter(resignation_date__isnull=True)
        # monthly_salary와 weekly_holiday_allowance는 자동 계산되므로 필수가 아님
        self.fields['monthly_salary'].required = False
        self.fields['weekly_holiday_allowance'].required = False

class SuppliersForm(forms.ModelForm):
    class Meta:
        model = Suppliers
        fields = ['name', 'contact_person', 'phone', 'email', 'payment_method', 'is_active', 'memo']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '업체명을 입력하세요.'
            }),
            'contact_person': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '담당자명을 입력하세요.'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '연락처를 입력하세요. (선택사항)'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': '이메일을 입력하세요.'
            }),
            'payment_method': forms.Select(attrs={
                'class': 'form-select',
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input',
            }),
            'memo': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': '메모를 입력하세요. (선택사항)'
            }),
        }
    
class DailySalesForm(forms.ModelForm):
    class Meta:
        model = DailySales
        fields = ['date', 'offline_sales', 'other_sales', 'memo']
        widgets = {
            'date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'offline_sales': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '오프라인 매출을 입력하세요'
            }),
            'other_sales': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '기타 매출을 입력하세요'
            }),
            'memo': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': '메모를 입력하세요 (선택사항)'
            }),
        }

class SalesForm(forms.ModelForm):
    class Meta:
        model = Sales
        fields = ['year', 'month', 'material_cost', 'labor_cost', 'supplies_expense', 'other_expense', 'inventory_amount', 'actual_usage_amount', 'memo']
        widgets = {
            'year': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '2000',
                'max': '2100',
                'placeholder': '연도를 입력하세요.'
            }),
            'month': forms.Select(
                choices=[(i, f'{i}월') for i in range(1, 13)],
                attrs = {'class': 'form-select'}
            ),
            'material_cost': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '재료비를 입력하세요.'
            }),
            'labor_cost': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '노무비를 입력하세요.'
            }),
            'supplies_expense': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '소모품비를 입력하세요.'
            }),
            'other_expense': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '기타 비용을 입력하세요.'
            }),
            'inventory_amount': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '재고 금액을 입력하세요.'
            }),
            'actual_usage_amount': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'placeholder': '실제 사용 금액을 입력하세요.'
            }),
            'memo': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': '메모를 입력하세요. (선택사항)'
            }),
        }
    
    def clean(self):
        cleaned_data = super().clean()
        year = cleaned_data.get('year')
        month = cleaned_data.get('month')

        if year and month:
            existing_sales = Sales.objects.filter(year=year, month=month)
            if self.instance.pk:
                existing_sales = existing_sales.exclude(pk=self.instance.pk)
            
            if existing_sales.exists():
                raise ValidationError(f'{year}년 {month}월의 매출 데이터는 이미 존재합니다. 다른 날짜를 선택해주세요.')
        
        return cleaned_data