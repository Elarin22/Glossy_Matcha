from .models import Staff, Suppliers, DailySales, Sales, Inquiries, Products
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
        active_staff_count = Staff.objects.filter(resignation_date__isnull=True).count()
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

        # 직원 목록 (최근 5명)
        staff_list = Staff.objects.filter(resignation_date__isnull=True)[:5]

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