from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('glossyjay/', admin.site.urls),           # 관리자 페이지
    path('', include('glossymatcha.urls')),                 # 템플릿 뷰 + API (루트 경로)
    path('accounts/', include('django.contrib.auth.urls')), # 로그인/로그아웃
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)