from django.urls import path
from . import views

urlpatterns = [
    # Django Template를 사용한 대시보드 뷰
    path('', views.DashboardView.as_view(), name='dashboard'),
]