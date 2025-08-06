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
]