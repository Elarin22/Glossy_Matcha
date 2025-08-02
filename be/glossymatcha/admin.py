from django.contrib import admin
from .models import ProductImages, ProductSpecifications

class ProductImagesInline(admin.TabularInline):
    """
    제품 이미지 인라인 클래스
    - 제품 상세 페이지에서 관련된 이미지 데이터를 함께 관리할 수 있도록 설정
    - 추가 이미지 입력 필드 제공 (extra=1)
    - 표시 필드: 이미지, 이미지 타입, 정렬 순서, 한국어 대체 텍스트, 영어 대체 텍스트
    - 생성일은 읽기 전용 필드로 설정
    """
    model = ProductImages
    extra = 1
    fields = ('image', 'image_type', 'sort_order', 'alt_text_ko', 'alt_text_en')
    readonly_fields = ('created_at',)

class ProductSpecificationsInline(admin.TabularInline):
    """
    제품 사양 인라인 클래스
    - 제품 상세 페이지에서 관련된 사양 데이터를 함께 관리할 수 있도록 설정
    - 추가 사양 입력 필드 제공 (extra=1)
    - 표시 필드: 스펙 키, 스펙 값 (한국어/영어)
    - 생성일은 읽기 전용 필드로 설정
    """
    model = ProductSpecifications
    extra = 1
    fields = ('spec_key', 'spec_key_en', 'spec_value', 'spec_value_en', 'created_at')
    readonly_fields = ('created_at',)