from django.contrib import admin
from .models import Products, ProductImages, ProductSpecifications

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

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    """
    제품 관리 어드민 클래스
    - 제품 목록 페이지에서 표시할 필드: 이름, 영어 이름, 카테고리, 영어 카테고리, 번역 상태, 생성일
    - 필터링: 카테고리, 생성일
    - 검색: 이름, 영어 이름, 설명, 영어 설명
    - 읽기 전용 필드: 생성일, 수정일
    - 인라인 클래스: ProductImagesInline, ProductSpecificationsInline
    """
    list_display = ('name', 'name_en', 'category', 'category_en', 'translation_status', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'name_en', 'description', 'description_en')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProductImagesInline, ProductSpecificationsInline]

    def translation_status(self, obj):
        """번역 완료 상태 표시"""
        if obj.name_en and obj.description_en and obj.category_en:
            return "✅ 완료"
        elif obj.name_en or obj.description_en or obj.category_en:
            return "⚠️ 부분완료"
        else:
            return "❌ 미완료"
    translation_status.short_description = '번역 상태'

    fieldsets = (
        ('기본 정보', {
            'fields': ('product_code', 'sort_order')
        }),
        ('한국어 정보', {
            'fields': ('name', 'description', 'category'),
            'classes': ('wide',)
        }),
        ('영어 정보', {
            'fields': ('name_en', 'description_en', 'category_en'),
            'classes': ('collapse', 'wide'),
            'description': '영어 버전이 비어있으면 한국어 버전을 사용합니다.'
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ProductImages)
class ProductImagesAdmin(admin.ModelAdmin):
    """
    제품 이미지 관리 어드민 클래스
    - 제품 이미지 목록 페이지에서 표시할 필드: 제품, 이미지 타입, 정렬 순서, 한국어 대체 텍스트, 영어 대체 텍스트, 생성일
    - 필터링: 이미지 타입, 생성일
    - 검색: 제품 이름, 영어 이름, 한국어 대체 텍스트, 영어 대체 텍스트
    - 읽기 전용 필드: 생성일
    - 정렬 순서 필드 수정 가능
    """
    list_display = ('product', 'image_type', 'sort_order', 'alt_text_ko', 'alt_text_en', 'created_at')
    list_filter = ('image_type', 'created_at')
    search_fields = ('product__name', 'product__name_en' 'alt_text_ko', 'alt_text_en')
    list_editable = ('sort_order',)
    ordering = ('product', 'sort_order',)
    readonly_fields = ('created_at',)

    fieldsets = (
        ('이미지 정보', {
            'fields': ('product', 'image', 'image_type', 'sort_order')
        }),
        ('대체 텍스트', {
            'fields': ('alt_text_ko', 'alt_text_en'),
            'description': 'SEO 및 접근성을 위한 이미지 설명'
        }),
        ('시간 정보', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )