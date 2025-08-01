from django.urls import path
from . import views

urlpatterns = [
    # 문의하기 API 엔드포인트
    path('inquiries/', views.create_inquiry, name='create_inquiry'),           # POST: 문의 생성
    path('inquiries/list/', views.get_inquiries, name='get_inquiries'),        # GET: 전체 문의 목록 조회
    path('inquiries/<int:pk>/', views.get_inquiry, name='get_inquiry'),        # GET: 특정 문의 상세 조회
]