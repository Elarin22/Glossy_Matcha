from django.urls import path
from . import views

urlpatterns = [
    # Django Template를 사용한 대시보드 뷰
    path('', views.DashboardView.as_view(), name='dashboard'),

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

    # Django Template Views for suppliers management
    path('suppliers/', views.SuppliersListView.as_view(), name='suppliers_list'),               # 거래처 목록
    path('suppliers/create/', views.SuppliersCreateView.as_view(), name='suppliers_create'),    # 거래처 등록
    path('suppliers/<int:pk>/', views.SuppliersDetailView.as_view(), name='suppliers_detail'),  # 거래처 상세
    path('suppliers/<int:pk>/update/', views.SuppliersUpdateView.as_view(), name='suppliers_update'), # 거래처 수정
    path('suppliers/<int:pk>/delete/', views.SuppliersDeleteView.as_view(), name='suppliers_delete'), # 거래처 삭제

    # Django Template Views for daily sales management(main)
    path('sales/', views.DailySalesListView.as_view(), name='sales_list'),                      # 매출 관리 메인
    path('sales/create/', views.DailySalesCreateView.as_view(), name='sales_create'),           # 매출 입력
    path('sales/<int:pk>/', views.DailySalesDetailView.as_view(), name='sales_detail'),         # 매출 상세
    path('sales/<int:pk>/update/', views.DailySalesUpdateView.as_view(), name='sales_update'),  # 매출 수정
    path('sales/<int:pk>/delete/', views.DailySalesDeleteView.as_view(), name='sales_delete'),  # 매출 삭제
    
    # Django Template Views for daily sales management
    path('daily-sales/', views.DailySalesListView.as_view(), name='daily_sales_list'),          # 일별 매출 목록
    path('daily-sales/create/', views.DailySalesCreateView.as_view(), name='daily_sales_create'), # 일별 매출 등록
    path('daily-sales/<int:pk>/', views.DailySalesDetailView.as_view(), name='daily_sales_detail'), # 일별 매출 상세
    path('daily-sales/<int:pk>/update/', views.DailySalesUpdateView.as_view(), name='daily_sales_update'), # 일별 매출 수정
    path('daily-sales/<int:pk>/delete/', views.DailySalesDeleteView.as_view(), name='daily_sales_delete'), # 일별 매출 삭제
]