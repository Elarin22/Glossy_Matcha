from django.db import models

class Products(models.Model):
    product_code = models.CharField(max_length=450, unique=True, verbose_name="제품 고유 코드")
    name = models.CharField(max_length=200, verbose_name="제품명")
    description = models.TextField(verbose_name="제품 설명")
    category = models.CharField(max_length=50, verbose_name="제품 카테고리")  # 예: signature, pure, premium
    is_active = models.BooleanField(default=True, verbose_name="판매 활성화 여부")
    is_export = models.BooleanField(default=False, verbose_name="수출용 제품 여부")
    sort_order = models.IntegerField(default=0, verbose_name="화면 표시 순서")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시간")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정 시간")
    
    class Meta:
        verbose_name = "제품"
        verbose_name_plural = "제품"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name


class ProductImages(models.Model):
    IMAGE_TYPE_CHOICES = [
        ('main', 'Main'),
        ('detail', 'Detail'),
        ('package', 'Package'),
        ('label', 'Label'),
        ('certificate', 'Certificate'),
    ]

    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="posts/")
    image_type = models.CharField(max_length=20, choices=IMAGE_TYPE_CHOICES)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "제품 이미지"
        verbose_name_plural = "제품 이미지"
        ordering = ['sort_order', '-created_at']
    
    def __str__(self):
        return f"{self.product.name} - 이미지 {self.sort_order}"


class ProductSpecifications(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='specifications')
    spec_key = models.CharField(max_length=100, verbose_name="스펙 항목명")  # 예: caffeine_content, origin, certification
    spec_value = models.CharField(max_length=255, verbose_name="스펙 값")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시간")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정 시간")
    
    class Meta:
        verbose_name = "제품 상세 설명"
        verbose_name_plural = "제품 상세 설명"
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.product.name} - {self.spec_key}"


class Inquiries(models.Model):
    INQUIRY_TYPE_CHOICES = [
        ('general', '일반 문의'),
        ('product', '제품 문의'),
        ('other', '기타 문의'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="이름")
    email = models.EmailField(verbose_name="이메일")
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPE_CHOICES, default='general', verbose_name="문의 유형")
    message = models.TextField(verbose_name="문의 내용")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="문의일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    class Meta:
        verbose_name = "문의"
        verbose_name_plural = "문의"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_inquiry_type_display()}"
