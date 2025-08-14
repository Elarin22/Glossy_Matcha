from django.urls import path
from . import views

urlpatterns = [
    # 메인 페이지 - 일일 비밀번호 인증
    path('', views.DailyPasswordCheckView.as_view(), name='home'),
    
    # 대시보드 (인증 후 접근)
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),

    # API Views for Inquiries
    path('api/inquiries/', views.CreateInquiryView.as_view(), name='create_inquiry'),           # POST: 문의 생성
    path('api/inquiries/list/', views.InquiryListView.as_view(), name='get_inquiries'),        # GET: 전체 문의 목록 조회
    path('api/inquiries/<int:pk>/', views.InquiryDetailView.as_view(), name='get_inquiry'),    # GET: 특정 문의 상세 조회

    # Django Template Views for Inquiries
    path('inquiries/', views.InquiriesListView.as_view(), name='inquiries_list'),               # 문의 목록
    path('inquiries/<int:pk>/', views.InquiriesDetailView.as_view(), name='inquiries_detail'),  # 문의 상세
    path('inquiries/<int:pk>/delete/', views.InquiriesDeleteView.as_view(), name='inquiries_delete'), # 문의 삭제

    # API Views for Products
    path('api/products/', views.ProductListView.as_view(), name='product_list'),               # GET: 제품 목록 조회
    path('api/products/<int:pk>/', views.ProductDetailView.as_view(), name='product_detail'),  # GET: 제품 상세 조회

    # Django Template Views for staff management
    path('staff/', views.StaffListView.as_view(), name='staff_list'),                           # 직원 목록
    path('staff/create/', views.StaffCreateView.as_view(), name='staff_create'),                # 직원 등록
    path('staff/<int:pk>/', views.StaffDetailView.as_view(), name='staff_detail'),              # 직원 상세
    path('staff/<int:pk>/update/', views.StaffUpdateView.as_view(), name='staff_update'),       # 직원 수정
    path('staff/<int:pk>/delete/', views.StaffDeleteView.as_view(), name='staff_delete'),       # 직원 삭제
    path('work-record/create/', views.WorkRecordCreateView.as_view(), name='work_record_create'), # 근무시간 입력
    path('work-record/<int:pk>/update/', views.WorkRecordUpdateView.as_view(), name='work_record_update'), # 근무기록 수정
    path('work-record/<int:pk>/delete/', views.WorkRecordDeleteView.as_view(), name='work_record_delete'), # 근무기록 삭제

    # Django Template Views for suppliers management
    path('suppliers/', views.SuppliersListView.as_view(), name='suppliers_list'),               # 거래처 목록
    path('suppliers/create/', views.SuppliersCreateView.as_view(), name='suppliers_create'),    # 거래처 등록
    path('suppliers/<int:pk>/', views.SuppliersDetailView.as_view(), name='suppliers_detail'),  # 거래처 상세
    path('suppliers/<int:pk>/update/', views.SuppliersUpdateView.as_view(), name='suppliers_update'), # 거래처 수정
    path('suppliers/<int:pk>/delete/', views.SuppliersDeleteView.as_view(), name='suppliers_delete'), # 거래처 삭제

    # Django Template Views for daily sales management(main)
    path('sales/', views.DailySalesListView.as_view(), name='daily_sales_list'),                 # 매출 관리 메인 (일별)
    path('sales/create/', views.DailySalesCreateView.as_view(), name='daily_sales_create'),      # 일별 매출 입력
    path('sales/<int:pk>/', views.DailySalesDetailView.as_view(), name='daily_sales_detail'),    # 일별 매출 상세
    path('sales/<int:pk>/update/', views.DailySalesUpdateView.as_view(), name='daily_sales_update'), # 일별 매출 수정
    path('sales/<int:pk>/delete/', views.DailySalesDeleteView.as_view(), name='daily_sales_delete'), # 일별 매출 삭제

    # Django Template Views for monthly sales management
    path('monthly-sales/', views.SalesListView.as_view(), name='sales_list'),                   # 월별 매출 목록
    path('monthly-sales/create/', views.SalesCreateView.as_view(), name='sales_create'),        # 월별 매출 등록
    path('monthly-sales/<int:pk>/', views.SalesDetailView.as_view(), name='sales_detail'),      # 월별 매출 상세
    path('monthly-sales/<int:pk>/update/', views.SalesUpdateView.as_view(), name='sales_update'), # 월별 매출 수정
    path('monthly-sales/<int:pk>/delete/', views.SalesDeleteView.as_view(), name='sales_delete'), # 월별 매출 삭제

    # Django Template Views for yearly sales management
    path('yearly-sales/', views.YearlySalesListView.as_view(), name='yearly_sales_list'),       # 연별 매출 목록
    path('yearly-sales/create/', views.YearlySalesCreateView.as_view(), name='yearly_sales_create'), # 연별 매출 등록
    path('yearly-sales/<int:pk>/', views.YearlySalesDetailView.as_view(), name='yearly_sales_detail'), # 연별 매출 상세
    path('yearly-sales/<int:pk>/update/', views.YearlySalesUpdateView.as_view(), name='yearly_sales_update'), # 연별 매출 수정
    path('yearly-sales/<int:pk>/delete/', views.YearlySalesDeleteView.as_view(), name='yearly_sales_delete'), # 연별 매출 삭제

    # Excel Export Views
    path('monthly-sales/export/', views.MonthlySalesExcelExportView.as_view(), name='monthly_sales_excel_export'), # 월간 매출 엑셀 내보내기
    path('yearly-sales/export/', views.YearlySalesExcelExportView.as_view(), name='yearly_sales_excel_export'),   # 연간 매출 엑셀 내보내기
    path('monthly-sales/<int:pk>/export/', views.IndividualMonthlySalesExcelExportView.as_view(), name='individual_monthly_sales_excel_export'), # 개별 월별 매출 엑셀 내보내기
    path('yearly-sales/<int:pk>/export/', views.IndividualYearlySalesExcelExportView.as_view(), name='individual_yearly_sales_excel_export'),     # 개별 연별 매출 엑셀 내보내기

    path('daily-password/', views.DailyPasswordCheckView.as_view(), name='daily_password_check'), # 일별 비밀번호 확인
    path('daily-password/logout/', views.daily_password_logout, name='daily_password_logout'), # 일별 비밀번호 로그아웃
    path('daily-password/management/', views.DailyPasswordManagementView.as_view(), name='daily_password_management'), # 일별 비밀번호 관리
    path('daily-password/create/', views.DailyPasswordCreateView.as_view(), name='daily_password_create'), # 일별 비밀번호 생성
]