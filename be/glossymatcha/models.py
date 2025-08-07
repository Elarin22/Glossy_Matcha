from django.db import models

# 제품 관리 모델들
class Products(models.Model):
    """
    글로시 말차 제품 정보를 관리하는 모델(한/영문 지원)
    제품 카탈로그 및 상세 정보 저장
    """
    name = models.CharField(max_length=200, blank=True, verbose_name="제품명")
    name_en = models.CharField(max_length=200, blank=True, verbose_name="제품명 (영어)")
    subtitle = models.CharField(max_length=300, blank=True, verbose_name="제품 부제목")
    subtitle_en = models.CharField(max_length=300, blank=True, verbose_name="제품 부제목 (영어)")
    description = models.TextField(blank=True, verbose_name="제품 설명")
    description_en = models.TextField(blank=True, verbose_name="제품 설명 (영어)")
    short_description = models.CharField(max_length=500, blank=True, verbose_name="제품 안내사항")
    short_description_en = models.CharField(max_length=500, blank=True, verbose_name="제품 안내사항 (영어)")
    sub_description = models.TextField(blank=True, verbose_name="제품 부가 설명")
    sub_description_en = models.TextField(blank=True, verbose_name="제품 부가 설명 (영어)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시간")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정 시간")
    
    class Meta:
        verbose_name = "제품"
        verbose_name_plural = "제품"
        ordering = ['-created_at']
    
    def clean(self):
        """
        모델 검증 메소드
        한국어 또는 영어 중 최소 하나의 제품명과 설명은 필수입니다.
        """
        from django.core.exceptions import ValidationError
        
        name_ko = self.name.strip() if self.name else ''
        name_en = self.name_en.strip() if self.name_en else ''
        desc_ko = self.description.strip() if self.description else ''
        desc_en = self.description_en.strip() if self.description_en else ''
        
        errors = {}
        
        # 제품명 검증: 한국어 또는 영어 중 최소 하나는 필수
        if not name_ko and not name_en:
            errors['name'] = '제품명(한국어 또는 영어)은 최소 하나는 필수입니다.'
            errors['name_en'] = '제품명(한국어 또는 영어)은 최소 하나는 필수입니다.'
        
        # 제품 설명 검증: 한국어 또는 영어 중 최소 하나는 필수
        if not desc_ko and not desc_en:
            errors['description'] = '제품 설명(한국어 또는 영어)은 최소 하나는 필수입니다.'
            errors['description_en'] = '제품 설명(한국어 또는 영어)은 최소 하나는 필수입니다.'
        
        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or self.name_en or f"제품 #{self.pk}"


class ProductImages(models.Model):
    """
    제품 이미지 관리 모델
    하나의 제품에 여러 이미지 첨부 가능
    """

    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='images', verbose_name="제품")
    image = models.ImageField(upload_to="posts/")
    alt_text_ko = models.CharField(max_length=100, blank=True, verbose_name="이미지 설명 (한국어)")
    alt_text_en = models.CharField(max_length=100, blank=True, verbose_name="이미지 설명 (영어)")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "제품 이미지"
        verbose_name_plural = "제품 이미지"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.product.name} - 이미지"


class ProductSpecifications(models.Model):
    """
    제품 상세 스펙 정보 관리 모델
    제품별 세부 사양 정보를 키-값 쌍으로 저장
    """
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='specifications', verbose_name="제품")
    product_code = models.CharField(max_length=450, blank=True, verbose_name="제품 고유 코드")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시간")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정 시간")
    
    class Meta:
        verbose_name = "제품 상세 설명"
        verbose_name_plural = "제품 상세 설명"
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.product.name} - {self.product_code}"


class Inquiries(models.Model):
    """
    고객 문의 관리 모델
    웹사이트 방문자들의 문의사항 저장
    """
    INQUIRY_TYPE_CHOICES = [
        ('general', '일반 문의'),
        ('product', '제품 문의'),
        ('other', '기타 문의'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="이름")
    email = models.EmailField(verbose_name="이메일")
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPE_CHOICES, default='general', verbose_name="문의 유형")
    message = models.TextField(verbose_name="문의 내용")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="문의일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "문의"
        verbose_name_plural = "문의"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_inquiry_type_display()}"


# 매장 운영 관리 시스템 모델들
class Staff(models.Model):
    """
    직원 정보 관리 모델
    정직원과 파트타임 직원 구분하여 관리
    입퇴사일, 주민번호, 영어 닉네임 등 상세 정보 관리
    """
    EMPLOYEE_TYPE_CHOICES = [
        ('full_time', '정직원'),
        ('part_time', '파트타임'),
    ]
    
    name = models.CharField(max_length=50, verbose_name="직원명")
    nickname = models.CharField(max_length=50, blank=True, verbose_name="영어 닉네임")
    employee_type = models.CharField(max_length=20, choices=EMPLOYEE_TYPE_CHOICES, verbose_name="근무 형태")
    hire_date = models.DateField(verbose_name="입사일")
    resignation_date = models.DateField(null=True, blank=True, verbose_name="퇴사일")
    resident_number = models.CharField(max_length=13, verbose_name="주민번호")
    contact = models.CharField(max_length=20, verbose_name="연락처")
    memo = models.TextField(blank=True, verbose_name="비고")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "직원"
        verbose_name_plural = "직원"
        ordering = ['resignation_date', 'employee_type', 'name']
    
    @property
    def is_active(self):
        """퇴사일이 없거나 퇴사일이 오늘보다 미래면 재직 중"""
        from datetime import date
        if self.resignation_date is None:
            return True
        return self.resignation_date > date.today()
    
    def clean(self):
        """주민번호 유효성 검사"""
        from django.core.exceptions import ValidationError
        import re
        
        if self.resident_number:
            # 숫자만 추출
            resident_digits = re.sub(r'[^0-9]', '', self.resident_number)
            
            # 13자리 체크
            if len(resident_digits) != 13:
                raise ValidationError({'resident_number': '주민번호는 정확히 13자리 숫자여야 합니다.'})
            
            # 숫자만 저장
            self.resident_number = resident_digits
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        status = "재직" if self.is_active else "퇴사"
        return f"{self.name} ({self.nickname}) - {self.get_employee_type_display()} [{status}]"


class WorkRecord(models.Model):
    """
    직원 급여 기록 모델
    총 근무시간, 시급, 월급, 주휴수당, 지급합계 관리
    """
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='work_records', verbose_name="직원")
    total_hours = models.DecimalField(max_digits=6, decimal_places=1, default=0, verbose_name="총 근무시간")
    pay_period_weeks = models.DecimalField(max_digits=3, decimal_places=1, default=4.0, verbose_name="급여 기간(주)")
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=0, default=0, verbose_name="시급")
    monthly_salary = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="월급")
    weekly_holiday_allowance = models.DecimalField(max_digits=10, decimal_places=0, default=0, verbose_name="주휴수당")
    total_payment = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="지급합계")
    memo = models.TextField(blank=True, verbose_name="비고")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "급여 기록"
        verbose_name_plural = "급여 기록"
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        """
        저장 시 월급, 주휴수당, 지급합계 자동 계산
        월급 = 시급 × 총근무시간
        주휴수당 = 15시간 이상 근무 시 자동 계산
        지급합계 = 월급 + 주휴수당
        """
        # 월급 자동 계산 (시급 × 총근무시간)
        self.monthly_salary = self.hourly_rate * self.total_hours
        
        # 주휴수당 자동 계산 (주 15시간 이상 근무 시)
        weekly_hours = float(self.total_hours) / float(self.pay_period_weeks)  # 정확한 주별 근무시간 계산
        
        if weekly_hours >= 15:  # 주 15시간 이상 근무 시 주휴수당 지급
            if weekly_hours < 40:
                # 주 40시간 미만: (1주 소정근로시간 / 40) * 8 * 시급
                self.weekly_holiday_allowance = (weekly_hours / 40) * 8 * float(self.hourly_rate)
            else:
                # 주 40시간 이상: 1일 소정근로시간(최대 8시간) * 시급
                self.weekly_holiday_allowance = 8 * float(self.hourly_rate)
        else:
            # 주 15시간 미만은 주휴수당 없음
            self.weekly_holiday_allowance = 0
        
        # 지급합계 계산
        self.total_payment = self.monthly_salary + self.weekly_holiday_allowance
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.staff.name} ({self.staff.nickname}) - {self.total_payment:,}원"


class DailySales(models.Model):
    """
    일별 매출 기록 관리 모델
    매일의 매출을 기록하여 월별 매출 계산의 기준이 됨
    """
    date = models.DateField(unique=True, verbose_name="날짜")
    
    # 매출 항목들
    offline_sales = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="오프라인 매출")
    other_sales = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="기타 매출")
    
    memo = models.TextField(blank=True, verbose_name="메모")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "일별 매출"
        verbose_name_plural = "일별 매출"
        ordering = ['-date']
    
    @property
    def total_sales(self):
        """일별 총 매출 계산"""
        return self.offline_sales + self.other_sales
    
    def __str__(self):
        return f"{self.date} - 총매출: {self.total_sales:,}원"


class Sales(models.Model):
    """
    월별 매출 기록 관리 모델
    매장 운영 대시보드를 위한 세분화된 매출/원가 관리
    일별 매출을 합산하여 월별 매출을 자동 계산
    """
    year = models.PositiveIntegerField(verbose_name="연도")
    month = models.PositiveIntegerField(verbose_name="월")
    
    # 매출원가 항목들
    material_cost = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="재료비")
    labor_cost = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="노무비")
    supplies_expense = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="경비-소모품")
    other_expense = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="경비-기타")
    
    # 식재료 관련
    inventory_amount = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="재고금액")
    actual_usage_amount = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name="실 사용금액")
    
    memo = models.TextField(blank=True, verbose_name="메모")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "월별 매출"
        verbose_name_plural = "월별 매출"
        ordering = ['-year', '-month']
        unique_together = ['year', 'month']
    
    @property
    def offline_sales(self):
        """해당 월의 일별 오프라인 매출 합계"""
        from django.db.models import Sum
        from datetime import date
        
        daily_sales = DailySales.objects.filter(
            date__year=self.year,
            date__month=self.month
        ).aggregate(total=Sum('offline_sales'))['total']
        
        return daily_sales or 0
    
    @property
    def other_sales(self):
        """해당 월의 일별 기타 매출 합계"""
        from django.db.models import Sum
        
        daily_sales = DailySales.objects.filter(
            date__year=self.year,
            date__month=self.month
        ).aggregate(total=Sum('other_sales'))['total']
        
        return daily_sales or 0
    
    @property
    def total_sales(self):
        """총 매출 계산 (일별 매출 합계)"""
        return self.offline_sales + self.other_sales
    
    @property
    def total_cost(self):
        """총 매출원가 계산 (매출원가 소계)"""
        return self.material_cost + self.labor_cost + self.supplies_expense + self.other_expense
    
    @property
    def gross_profit(self):
        """1차 매출이익 계산 (매출 - 매출원가)"""
        return self.total_sales - self.total_cost
    
    def __str__(self):
        return f"{self.year}년 {self.month}월 - 총매출: {self.total_sales:,}원, 이익: {self.gross_profit:,}원"


class YearlySales(models.Model):
    """
    연별 매출 기록 관리 모델
    월별 매출을 합산하여 연별 매출을 자동 계산
    """
    year = models.PositiveIntegerField(unique=True, verbose_name="연도")
    
    # 연별 매출원가 항목들 (연간 총합)
    total_material_cost = models.DecimalField(max_digits=15, decimal_places=0, default=0, verbose_name="연간 총 재료비")
    total_labor_cost = models.DecimalField(max_digits=15, decimal_places=0, default=0, verbose_name="연간 총 노무비")
    total_supplies_expense = models.DecimalField(max_digits=15, decimal_places=0, default=0, verbose_name="연간 총 경비-소모품")
    total_other_expense = models.DecimalField(max_digits=15, decimal_places=0, default=0, verbose_name="연간 총 경비-기타")
    
    memo = models.TextField(blank=True, verbose_name="메모")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "년별 매출"
        verbose_name_plural = "년별 매출"
        ordering = ['-year']
    
    @property
    def offline_sales(self):
        """해당 연도의 월별 오프라인 매출 합계"""
        monthly_sales = Sales.objects.filter(year=self.year)
        return sum(sale.offline_sales for sale in monthly_sales)
    
    @property
    def other_sales(self):
        """해당 연도의 월별 기타 매출 합계"""
        monthly_sales = Sales.objects.filter(year=self.year)
        return sum(sale.other_sales for sale in monthly_sales)
    
    @property
    def total_sales(self):
        """연간 총 매출 계산 (월별 매출 합계)"""
        return self.offline_sales + self.other_sales
    
    @property
    def total_cost(self):
        """연간 총 매출원가 계산"""
        return self.total_material_cost + self.total_labor_cost + self.total_supplies_expense + self.total_other_expense
    
    @property
    def gross_profit(self):
        """연간 매출이익 계산 (매출 - 매출원가)"""
        return self.total_sales - self.total_cost
    
    def update_annual_costs(self):
        """해당 연도의 월별 매출원가를 합산하여 연간 총액 업데이트"""
        from django.db.models import Sum
        
        monthly_totals = Sales.objects.filter(year=self.year).aggregate(
            material_cost=Sum('material_cost'),
            labor_cost=Sum('labor_cost'),
            supplies_expense=Sum('supplies_expense'),
            other_expense=Sum('other_expense')
        )
        
        self.total_material_cost = monthly_totals['material_cost'] or 0
        self.total_labor_cost = monthly_totals['labor_cost'] or 0
        self.total_supplies_expense = monthly_totals['supplies_expense'] or 0
        self.total_other_expense = monthly_totals['other_expense'] or 0
        self.save()
    
    def __str__(self):
        return f"{self.year}년 - 총매출: {self.total_sales:,}원, 이익: {self.gross_profit:,}원"


class Suppliers(models.Model):
    """
    거래처 정보 관리 모델
    공급업체의 연락처, 결제방식 등 정보 저장
    거래 상태 관리로 활성/비활성 구분
    """
    PAYMENT_METHOD_CHOICES = [
        ('cash', '현금'),
        ('transfer', '계좌이체'),
        ('card', '카드'),
        ('credit', '외상'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="업체명")
    contact_person = models.CharField(max_length=50, verbose_name="담당자")
    phone = models.CharField(max_length=20, blank=True, verbose_name="연락처")
    email = models.EmailField(verbose_name="이메일")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, verbose_name="결제방식")
    memo = models.TextField(blank=True, verbose_name="메모")
    is_active = models.BooleanField(default=True, verbose_name="거래 중")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "거래처"
        verbose_name_plural = "거래처"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.contact_person})"

from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

@receiver(post_delete, sender=DailySales)
def auto_delete_monthly_sales_when_no_daily_sales(sender, instance, **kwargs):
    """
    일별 매출 삭제 시, 해당 월의 일별 매출이 모두 없어졌다면
    관련 월별 매출(Sales)도 자동 삭제
    """
    year = instance.date.year
    month = instance.date.month
    
    # 해당 년월에 남아있는 다른 일별 매출이 있는지 확인
    remaining_daily_sales = DailySales.objects.filter(
        date__year=year,
        date__month=month
    ).exists()
    
    # 해당 월에 일별 매출이 완전히 없어졌으면 월별 매출도 삭제
    if not remaining_daily_sales:
        try:
            monthly_sales = Sales.objects.get(year=year, month=month)
            monthly_sales.delete()
            print(f"{year}년 {month}월 일별 매출이 모두 삭제되어 월별 매출도 자동 삭제되었습니다.")
        except Sales.DoesNotExist:
            pass  # 월별 매출이 없으면 무시


@receiver(post_save, sender=Sales)
@receiver(post_delete, sender=Sales)
def auto_update_yearly_sales_costs(sender, instance, **kwargs):
    """
    월별 매출 생성/수정/삭제 시 연별 매출의 매출원가 자동 업데이트
    """
    year = instance.year
    
    # 해당 연도의 YearlySales가 존재하면 매출원가 업데이트
    try:
        yearly_sales = YearlySales.objects.get(year=year)
        yearly_sales.update_annual_costs()
        print(f"{year}년 연별 매출원가가 자동으로 업데이트되었습니다.")
    except YearlySales.DoesNotExist:
        # 연별 매출이 없으면 자동으로 생성
        yearly_sales = YearlySales.objects.create(year=year)
        yearly_sales.update_annual_costs()
        print(f"{year}년 연별 매출이 자동으로 생성되고 매출원가가 계산되었습니다.")
