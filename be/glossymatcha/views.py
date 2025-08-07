from .models import Staff, Suppliers, DailySales, Sales, Inquiries, Products, WorkRecord, YearlySales
from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from datetime import date
from django.db.models import Sum, Q
from django.contrib import messages
from django.urls import reverse_lazy
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import InquirySerializer, ProductListSerializer, ProductDetailSerializer
from .forms import StaffForm, WorkRecordForm, SuppliersForm, DailySalesForm, SalesForm, YearlySalesForm

class DashboardView(LoginRequiredMixin, TemplateView):
    """
    대시보드 메인 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 대시보드 페이지를 렌더링
    - 통계 데이터: 직원 수, 공급업체 수, 오늘 매출, 이번 달 매출, 최근 매출 현황, 직원 목록, 최근 문의 현황
    """
    template_name = 'glossymatcha/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        today = date.today()

        # 통계 데이터 수집
        active_staff_count = Staff.objects.filter(
            Q(resignation_date__isnull=True) | Q(resignation_date__gt=today)
        ).count()
        active_suppliers_count = Suppliers.objects.filter(is_active=True).count()

        # 오늘 매출 집계
        today_daily_sales = DailySales.objects.filter(date=today).first()
        today_sales = today_daily_sales.total_sales if today_daily_sales else 0

        # 이번 달 매출 집계 (년 | 월 형식)
        current_month_sales = Sales.objects.filter(
            year=today.year,
            month=today.month
        ).first()
        monthly_sales = current_month_sales.total_sales if current_month_sales else 0

        # 최근 매출 현황 (최근 5건)
        recent_sales = Sales.objects.all()[:5]

        # 직원 목록 (재직중인 최근 5명)
        staff_list = Staff.objects.filter(
            Q(resignation_date__isnull=True) | Q(resignation_date__gt=today)
        )[:5]

        # 최근 문의 현황 (최근 5건)
        recent_inquiries = Inquiries.objects.all()[:5]
        total_inquiries = Inquiries.objects.count()
        
        context.update({
            'today': today,
            'active_staff_count': active_staff_count,
            'active_suppliers_count': active_suppliers_count,
            'today_sales': today_sales,
            'monthly_sales': monthly_sales,
            'recent_sales': recent_sales,
            'staff_list': staff_list,
            'recent_inquiries': recent_inquiries,
            'total_inquiries': total_inquiries,
        })

        return context
    
# API Views for Inquiries
class CreateInquiryView(generics.CreateAPIView):
    """
    문의 생성 API
    - 모든 사용자 접근 가능
    - 문의 내용을 저장하고 응답
    Request body 예시:
    {
        "name": "문의자 이름 (필수)",
        "email": "문의자 이메일 (필수)",
        "inquiry_type": "문의 유형 (general/product/other, 기본값: general)",
        "message": "문의 내용 (필수)"
    }
    Response:
    - 201: 문의 생성 성공
    - 400: 입력 데이터 검증 실패
    """
    queryset = Inquiries.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [AllowAny]

class InquiryListView(generics.ListAPIView):
    """
    문의 목록 API
    - 관리자만 접근 가능
    - 모든 문의를 조회
    
    Response body 예시:
    [
        {
            "id": 1,
            "name": "문의자 이름",
            "email": "문의자 이메일",
            "inquiry_type": "general",
            "message": "문의 내용",
            "created_at": "2023-10-01T12:00:00Z"
        },
        ...
    ]
    Response:
    - 200: 문의 목록 조회 성공
    - 403: 권한 없음 (관리자만 접근 가능)
    """
    queryset = Inquiries.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [IsAdminUser]

class InquiryDetailView(generics.RetrieveAPIView):
    """
    문의 상세 조회 API
    - 관리자만 접근 가능
    - 특정 문의의 상세 정보를 조회
    Response body 예시:
    {
        "id": 1,
        "name": "문의자 이름",
        "email": "문의자 이메일",
        "inquiry_type": "general",
        "message": "문의 내용",
        "created_at": "2023-10-01T12:00:00Z"
    }
    Response:
    - 200: 문의 상세 조회 성공
    - 404: 해당 문의가 존재하지 않음
    - 403: 권한 없음 (관리자만 접근 가능)
    """
    queryset = Inquiries.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [IsAdminUser]

# TemplateView for Inquiry Form
class InquiriesListView(LoginRequiredMixin, ListView):
    """
    문의 목록 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 문의 목록 페이지를 렌더링
    """
    model = Inquiries
    template_name = 'glossymatcha/inquiries/list.html'
    context_object_name = 'inquiries_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # 유형별 문의 수 집계
        queryset = self.get_queryset()
        context['general_count'] = queryset.filter(inquiry_type='general').count()
        context['product_count'] = queryset.filter(inquiry_type='product').count()
        context['other_count'] = queryset.filter(inquiry_type='other').count()

        return context

class InquiriesDetailView(LoginRequiredMixin, DetailView):
    """
    문의 상세 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 문의 상세 페이지를 렌더링
    """
    model = Inquiries
    template_name = 'glossymatcha/inquiries/detail.html'
    context_object_name = 'inquiry'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # 같은 이메일의 다른 문의들 조회 (최근 5건, 본인 문의 포함)
        related_inquiries = Inquiries.objects.filter(
            email=self.object.email
        ).order_by('-created_at')[:5]
        context['related_inquiries'] = related_inquiries

        return context

class InquiriesDeleteView(LoginRequiredMixin, DeleteView):
    """
    문의 삭제 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 문의 삭제 페이지를 렌더링
    """
    model = Inquiries
    template_name = 'glossymatcha/inquiries/delete.html'
    success_url = reverse_lazy('inquiries_list')

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, f'{self.object.name}님의 문의가 삭제되었습니다.')
        return super().delete(request, *args, **kwargs)
    
# API Views for Products
class ProductListView(generics.ListAPIView):
    """
    제품 목록 API
    - 모든 사용자 접근 가능
    - 제품 목록을 조회하고 응답
    Request query parameters:
    - lang: 언어 코드 (ko/en, 기본값: ko)
    Response body 예시:
    {
        "success": true,
        "language": "ko",
        "count": 10,
        "results": [
            {
                "id": 1,
                "name": "제품 이름",
                "description": "제품 설명",
                ...
            },
            ...
        ]
    }
    Response:
    - 200: 제품 목록 조회 성공
    - 400: 잘못된 언어 코드
    """
    queryset = Products.objects.all()
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        # url 파라미터에서 언어 정보 추출(기본값 : 'ko')
        language = self.request.query_params.get('lang', 'ko')
        if language not in ['ko', 'en']:
            language = 'ko'
        context['language'] = language
        return context
    
    def list(self, request, *args, **kwargs):
        """
        GET 요청에 대한 처리
        - 제품 목록을 조회하고 응답
        - 언어 파라미터에 따라 제품 이름과 설명을 번역
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'language': self.get_serializer_context()['language'],
            'count': len(serializer.data),
            'results': serializer.data
        })

class ProductDetailView(generics.RetrieveAPIView):
    """
    제품 상세 조회 API
    - 모든 사용자 접근 가능
    - 특정 제품의 상세 정보를 조회
    Request path parameters:
    - pk: 제품 ID
    Response body 예시:
    {
        "success": true,
        "language": "ko",
        "result": {
            "id": 1,
            "name": "제품 이름",
            "description": "제품 설명",
            "images": [
                {
                    "id": 1,
                    "url": "https://example.com/image1.jpg"
                },
                ...
            ],
            "specifications": [
                {
                    "id": 1,
                    "key": "사양 키",
                    "value": "사양 값"
                },
                ...
            ]
        }
    }
    Response:
    - 200: 제품 상세 조회 성공
    - 404: 해당 제품이 존재하지 않음
    """
    queryset = Products.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return super().get_queryset().prefetch_related('images', 'specifications')
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        # url 파라미터에서 언어 정보 추출(기본값 : 'ko')
        language = self.request.query_params.get('lang', 'ko')
        if language not in ['ko', 'en']:
            language = 'ko'
        context['language'] = language
        return context
    
    def retrieve(self, request, *args, **kwargs):
        """
        GET 요청에 대한 처리
        - 특정 제품의 상세 정보를 조회하고 응답
        - 언어 파라미터에 따라 제품 이름과 설명을 번역
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'success': True,
            'language': self.get_serializer_context()['language'],
            'result': serializer.data
        })
    
class StaffListView(LoginRequiredMixin, ListView):
    """
    직원 목록 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 직원 목록 페이지를 렌더링
    """
    model = Staff
    template_name = 'glossymatcha/staff/list.html'
    context_object_name = 'staff_list'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        staff_list = context['staff_list']
        
        # 재직 중인 직원만 필터링
        active_staff = [staff for staff in staff_list if staff.is_active]
        
        # 재직 중인 직원 수 계산
        active_staff_count = len(active_staff)
        active_full_time_count = len([staff for staff in active_staff if staff.employee_type == 'full_time'])
        active_part_time_count = len([staff for staff in active_staff if staff.employee_type == 'part_time'])
        
        context.update({
            'active_staff_count': active_staff_count,
            'active_full_time_count': active_full_time_count,
            'active_part_time_count': active_part_time_count,
        })
        
        return context

class StaffCreateView(LoginRequiredMixin, CreateView):
    """
    직원 생성 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 직원 생성 페이지를 렌더링
    """
    model = Staff
    form_class = StaffForm
    template_name = 'glossymatcha/staff/create.html'
    success_url = reverse_lazy('staff_list')

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.name} 직원이 성공적으로 등록되었습니다.')
        return response
    
class StaffDetailView(LoginRequiredMixin, DetailView):
    """
    직원 상세 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 직원 상세 페이지를 렌더링
    """
    model = Staff
    template_name = 'glossymatcha/staff/detail.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # 최근 급여 기록
        recent_work_records = WorkRecord.objects.filter(staff=self.object).order_by('-created_at')[:10]
        context['recent_work_records'] = recent_work_records            
        
        return context
    
class StaffUpdateView(LoginRequiredMixin, UpdateView):
    """
    직원 수정 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 직원 수정 페이지를 렌더링
    """
    model = Staff
    form_class = StaffForm
    template_name = 'glossymatcha/staff/create.html'

    def get_success_url(self):
        return reverse_lazy('staff_detail', kwargs={'pk': self.object.pk})

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.name} 직원 정보가 수정되었습니다.')
        return response
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['staff'] = self.object
        return context
    
class StaffDeleteView(LoginRequiredMixin, DeleteView):
    """
    직원 삭제 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 직원 삭제 페이지를 렌더링
    """
    model = Staff
    template_name = 'glossymatcha/staff/delete.html'
    success_url = reverse_lazy('staff_list')

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, f'{self.object.name} 직원이 삭제되었습니다.')
        return super().delete(request, *args, **kwargs)
    
class WorkRecordCreateView(LoginRequiredMixin, CreateView):
    """
    직원 근무 기록 생성 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 근무 기록 생성 페이지를 렌더링
    """
    model = WorkRecord
    form_class = WorkRecordForm
    template_name = 'glossymatcha/staff/work_record.html'
    success_url = reverse_lazy('dashboard')

    def get_initial(self):
        initial = super().get_initial()
        # URL 파라미터에서 staff_id를 가져와서 초기값으로 설정
        staff_id = self.request.GET.get('staff_id')
        if staff_id:
            try:
                staff = Staff.objects.get(id=staff_id)
                initial['staff'] = staff
            except Staff.DoesNotExist:
                pass
        return initial

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # staff_id를 템플릿에 전달
        staff_id = self.request.GET.get('staff_id')
        if staff_id:
            try:
                context['selected_staff'] = Staff.objects.get(id=staff_id)
            except Staff.DoesNotExist:
                pass
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.staff.name}의 근무 기록이 등록되었습니다.')
        return response
    
# Django Template Views for suppliers management
class SuppliersListView(LoginRequiredMixin, ListView):
    """
    공급업체 목록 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 공급업체 목록 페이지를 렌더링
    """
    model = Suppliers
    template_name = 'glossymatcha/suppliers/list.html'
    context_object_name = 'suppliers_list'

class SuppliersCreateView(LoginRequiredMixin, CreateView):
    """
    공급업체 생성 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 공급업체 생성 페이지를 렌더링
    """
    model = Suppliers
    form_class = SuppliersForm
    template_name = 'glossymatcha/suppliers/create.html'
    success_url = reverse_lazy('suppliers_list')

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.name} 거래처가 등록되었습니다.')
        return response
    
class SuppliersDetailView(LoginRequiredMixin, DetailView):
    """
    공급업체 상세 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 공급업체 상세 페이지를 렌더링
    """
    model = Suppliers
    template_name = 'glossymatcha/suppliers/detail.html'
    context_object_name = 'supplier'

class SuppliersUpdateView(LoginRequiredMixin, UpdateView):
    """
    공급업체 수정 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 공급업체 수정 페이지를 렌더링
    """
    model = Suppliers
    form_class = SuppliersForm
    template_name = 'glossymatcha/suppliers/create.html'
    
    def get_success_url(self):
        return reverse_lazy('suppliers_detail', kwargs={'pk': self.object.pk})
    
    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.name} 거래처 정보가 수정되었습니다.')
        return response
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['supplier'] = self.object
        return context
    
class SuppliersDeleteView(LoginRequiredMixin, DeleteView):
    """
    공급업체 삭제 페이지
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 공급업체 삭제 페이지를 렌더링
    """
    model = Suppliers
    template_name = 'glossymatcha/suppliers/delete.html'
    success_url = reverse_lazy('suppliers_list')

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, f'{self.object.name} 거래처가 삭제되었습니다.')
        return super().delete(request, *args, **kwargs)

# Django Template Views for daily sales management
class DailySalesListView(LoginRequiredMixin, ListView):
    """
    일별 매출 목록 조회
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 일별 매출 목록 페이지를 렌더링
    """
    model = DailySales
    template_name = 'glossymatcha/daily_sales/list.html'
    context_object_name = 'daily_sales_list'


class DailySalesCreateView(LoginRequiredMixin, CreateView):
    """
    일별 매출 등록
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 일별 매출 등록 페이지를 렌더링"""
    model = DailySales
    form_class = DailySalesForm
    template_name = 'glossymatcha/daily_sales/create.html'
    success_url = reverse_lazy('daily_sales_list')
    
    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.date} 일별 매출이 등록되었습니다.')
        return response


class DailySalesDetailView(LoginRequiredMixin, DetailView):
    """
    일별 매출 상세 정보
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 일별 매출 상세 페이지를 렌더링
    """
    model = DailySales
    template_name = 'glossymatcha/daily_sales/detail.html'
    context_object_name = 'daily_sale'


class DailySalesUpdateView(LoginRequiredMixin, UpdateView):
    """
    일별 매출 정보 수정
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 일별 매출 수정 페이지를 렌더링
    """
    model = DailySales
    form_class = DailySalesForm
    template_name = 'glossymatcha/daily_sales/create.html'
    
    def get_success_url(self):
        return reverse_lazy('daily_sales_detail', kwargs={'pk': self.object.pk})
    
    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.date} 일별 매출 정보가 수정되었습니다.')
        return response
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['daily_sale'] = self.object
        return context


class DailySalesDeleteView(LoginRequiredMixin, DeleteView):
    """
    일별 매출 삭제
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 일별 매출 삭제 페이지를 렌더링
    """
    model = DailySales
    template_name = 'glossymatcha/daily_sales/delete.html'
    success_url = reverse_lazy('daily_sales_list')
    
    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, f'{self.object.date} 일별 매출이 삭제되었습니다.')
        return super().delete(request, *args, **kwargs)

# Django Template Views for monthly sales management
class SalesListView(LoginRequiredMixin, ListView):
    """
    월별 매출 목록 조회
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 월별 매출 목록 페이지를 렌더링
    """
    model = Sales
    template_name = 'glossymatcha/sales/list.html'
    context_object_name = 'sales_list'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # 총합 계산
        queryset = self.get_queryset()
        total_sales_sum = sum(sale.total_sales or 0 for sale in queryset)
        total_cost_sum = sum(sale.total_cost or 0 for sale in queryset)
        total_profit_sum = sum(sale.gross_profit or 0 for sale in queryset)
        
        context.update({
            'total_sales_sum': total_sales_sum,
            'total_cost_sum': total_cost_sum,
            'total_profit_sum': total_profit_sum,
        })
        
        return context

class SalesCreateView(LoginRequiredMixin, CreateView):
    """
    월별 매출 등록
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 월별 매출 등록 페이지를 렌더링
    """
    model = Sales
    form_class = SalesForm
    template_name = 'glossymatcha/sales/create.html'
    success_url = reverse_lazy('monthly_sales_list')

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.year}년 {self.object.month}월 매출이 등록되었습니다.')
        return response
    
class SalesDetailView(LoginRequiredMixin, DetailView):
    """
    월별 매출 상세 정보
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 월별 매출 상세 페이지를 렌더링
    """
    model = Sales
    template_name = 'glossymatcha/sales/detail.html'
    context_object_name = 'sale'

class SalesUpdateView(LoginRequiredMixin, UpdateView):
    """
    월별 매출 정보 수정
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 월별 매출 수정 페이지를 렌더링
    """
    model = Sales
    form_class = SalesForm
    template_name = 'glossymatcha/sales/create.html'

    def get_success_url(self):
        return reverse_lazy('monthly_sales_detail', kwargs={'pk': self.object.pk})
    
    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.year}년 {self.object.month}월 매출 정보가 수정되었습니다.')
        return response
    
    def get_context_data(self, **kwargs):
        """
        월별 매출 수정 페이지의 컨텍스트 데이터 추가
        - 현재 매출 객체를 컨텍스트에 추가
        """
        context = super().get_context_data(**kwargs)
        context['sale'] = self.object
        return context
    
class SalesDeleteView(LoginRequiredMixin, DeleteView):
    """
    월별 매출 삭제
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 월별 매출 삭제 페이지를 렌더링
    """
    model = Sales
    template_name = 'glossymatcha/sales/delete.html'
    success_url = reverse_lazy('monthly_sales_list')

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, f'{self.object.year}년 {self.object.month}월 매출이 삭제되었습니다.')
        return super().delete(request, *args, **kwargs)
    
# Django Template Views for yearly sales management
class YearlySalesListView(LoginRequiredMixin, ListView):
    """
    연별 매출 목록 조회
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 연별 매출 목록 페이지를 렌더링
    """
    model = YearlySales
    template_name = 'glossymatcha/yearly_sales/list.html'
    context_object_name = 'yearly_sales_list'

class YearlySalesCreateView(LoginRequiredMixin, CreateView):
    """
    연별 매출 등록
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 연별 매출 등록 페이지를 렌더링
    """
    model = YearlySales
    form_class = YearlySalesForm
    template_name = 'glossymatcha/yearly_sales/create.html'
    success_url = reverse_lazy('yearly_sales_list')

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.year}년 연별 매출이 등록되었습니다.')
        return response
    
class YearlySalesDetailView(LoginRequiredMixin, DetailView):
    """
    연별 매출 상세 정보
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 연별 매출 상세 페이지를 렌더링
    """
    model = YearlySales
    template_name = 'glossymatcha/yearly_sales/detail.html'
    context_object_name = 'yearly_sale'

class YearlySalesUpdateView(LoginRequiredMixin, UpdateView):
    """
    연별 매출 정보 수정
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 연별 매출 수정 페이지를 렌더링
    """
    model = YearlySales
    form_class = YearlySalesForm
    template_name = 'glossymatcha/yearly_sales/create.html'

    def get_success_url(self):
        return reverse_lazy('yearly_sales_detail', kwargs={'pk': self.object.pk})
    
    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, f'{self.object.year}년 연별 매출 정보가 수정되었습니다.')
        return response
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['yearly_sale'] = self.object
        return context
    
class YearlySalesDeleteView(LoginRequiredMixin, DeleteView):
    """
    연별 매출 삭제
    - 로그인한 사용자만 접근 가능
    - Django Template을 사용하여 연별 매출 삭제 페이지를 렌더링
    """
    model = YearlySales
    template_name = 'glossymatcha/yearly_sales/delete.html'
    success_url = reverse_lazy('yearly_sales_list')

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, f'{self.object.year}년 연별 매출이 삭제되었습니다.')
        return super().delete(request, *args, **kwargs)