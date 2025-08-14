from django.contrib import admin
from .models import Products, ProductImages, ProductSpecifications, DailyPassword

@admin.register(DailyPassword)
class DailyPasswordAdmin(admin.ModelAdmin):
    """
    일일 패스워드 관리 어드민 클래스
    - 일일 패스워드 목록 페이지에서 표시할 필드: 날짜, 패스워드, 활성화 여부, 생성일
    - 필터링: 활성화 여부, 날짜"""
    list_display = ('date', 'password', 'is_active', 'created_at')
    list_filter = ('is_active', 'date')
    search_fields = ('date', 'password')
    readonly_fields = ('created_at',)
    
    fieldsets = (
        ('패스워드 정보', {
            'fields': ('date', 'password', 'is_active')
        }),
        ('시간 정보', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

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
    fields = ('image', 'alt_text_ko', 'alt_text_en')
    readonly_fields = ('created_at',)

class ProductSpecificationsInline(admin.TabularInline):
    """
    제품 사양 인라인 클래스
    - 제품 상세 페이지에서 관련된 사양 데이터를 함께 관리할 수 있도록 설정
    - 추가 사양 입력 필드 제공 (extra=1)
    - 표시 필드: 제품 코드, 생성일
    - 생성일은 읽기 전용 필드로 설정
    """
    model = ProductSpecifications
    extra = 1
    fields = ('product_code', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    """
    제품 관리 어드민 클래스
    - 제품 목록 페이지에서 표시할 필드: 제품 이름, 영어 이름, 번역 상태, 생성일
    - 필터링: 생성일
    - 검색: 제품 이름, 영어 이름, 설명, 영어 설명
    - 읽기 전용 필드: 생성일, 수정일
    - 인라인: 제품 이미지, 제품 사양
    - 번역 상태 표시: 완료, 부분완료, 미완료
    - 필드셋: 한국어 정보, 영어 정보, 시간 정보
    - 영어 버전이 비어있으면 한국어 버전을 사용하도록 설정
    """
    list_display = ('name', 'name_en', 'translation_status', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'name_en', 'description', 'description_en')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProductImagesInline, ProductSpecificationsInline]

    def translation_status(self, obj):
        """번역 완료 상태 표시"""
        if obj.name_en and obj.description_en:
            return "✅ 완료"
        elif obj.name_en or obj.subtitle_en or obj.description_en or obj.short_description_en or obj.sub_description_en:
            return "⚠️ 부분완료"
        else:
            return "❌ 미완료"
    translation_status.short_description = '번역 상태'

    fieldsets = (
        ('한국어 정보', {
            'fields': ('name', 'subtitle', 'description', 'short_description', 'sub_description'),
            'classes': ('wide',)
        }),
        ('영어 정보', {
            'fields': ('name_en', 'subtitle_en', 'description_en', 'short_description_en', 'sub_description_en'),
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
    - 제품 이미지 목록 페이지에서 표시할 필드: 제품, 이미지, 한국어 대체 텍스트, 영어 대체 텍스트, 생성일
    - 필터링: 생성일
    - 검색: 제품 이름, 영어 이름, 대체 텍스트
    - 읽기 전용 필드: 생성일
    - 정렬 순서 필드 수정 가능
    - 필드셋: 이미지 정보, 대체 텍스트, 시간 정보
    """
    list_display = ('product', 'alt_text_ko', 'alt_text_en', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('product__name', 'product__name_en', 'alt_text_ko', 'alt_text_en')
    ordering = ('product', 'created_at')
    readonly_fields = ('created_at',)

    fieldsets = (
        ('이미지 정보', {
            'fields': ('product', 'image')
        }),
        ('대체 텍스트', {
            'fields': ('alt_text_ko', 'alt_text_en')
        }),
        ('시간 정보', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

@admin.register(ProductSpecifications)
class ProductSpecificationsAdmin(admin.ModelAdmin):
    """
    제품 사양 관리 어드민 클래스
    - 제품 사양 목록 페이지에서 표시할 필드: 제품, 제품 코드, 생성일
    - 필터링: 생성일
    - 검색: 제품 이름, 영어 이름, 제품 코드
    - 읽기 전용 필드: 생성일, 수정일
    - 필드셋: 제품 정보, 제품 코드, 시간 정보
    """
    list_display = ('product', 'product_code', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('product__name', 'product__name_en', 'product_code')
    ordering = ('product', 'product_code')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('제품 정보', {
            'fields': ('product',)
        }),
        ('제품 코드', {
            'fields': ('product_code',),
            'classes': ('wide',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )