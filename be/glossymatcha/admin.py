from django.contrib import admin
from .models import Products, ProductImages, ProductSpecifications, Inquiries


class ProductImagesInline(admin.TabularInline):
    model = ProductImages
    extra = 1
    fields = ('image', 'image_type', 'sort_order')


class ProductSpecificationsInline(admin.TabularInline):
    model = ProductSpecifications
    extra = 1
    fields = ('spec_key', 'spec_value')


@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProductImagesInline, ProductSpecificationsInline]
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('product_code', 'name', 'description', 'category', 'sort_order')
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ProductImages)
class ProductImagesAdmin(admin.ModelAdmin):
    list_display = ('product', 'image_type', 'sort_order', 'created_at')
    list_filter = ('image_type', 'created_at')
    search_fields = ('product__name',)
    list_editable = ('sort_order',)
    ordering = ('product', 'sort_order')


@admin.register(ProductSpecifications)
class ProductSpecificationsAdmin(admin.ModelAdmin):
    list_display = ('product', 'spec_key', 'spec_value', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('product__name', 'spec_key', 'spec_value')
    ordering = ('product', 'spec_key')


@admin.register(Inquiries)
class InquiriesAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'inquiry_type', 'created_at')
    list_filter = ('inquiry_type', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('문의자 정보', {
            'fields': ('name', 'email')
        }),
        ('문의 내용', {
            'fields': ('inquiry_type', 'message')
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )