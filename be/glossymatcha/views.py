from .models import Staff, Suppliers, DailySales, Sales, Inquiries
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from datetime import date

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