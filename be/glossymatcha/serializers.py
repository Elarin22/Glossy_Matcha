from rest_framework import serializers
from .models import Inquiries, ProductImages, ProductSpecifications, Products

class InquirySerializer(serializers.ModelSerializer):
    """
    문의하기 데이터 직렬화 클래스
    이 클래스는 문의하기 모델의 데이터를 직렬화하고 검증하는 역할을 합니다.
    - id: 문의 ID
    - name: 문의자 이름
    - email: 문의자 이메일
    - inquiry_type: 문의 유형
    - message: 문의 내용 (한국어)
    - message_en: 문의 내용 (영어)
    - created_at: 생성 일시
    - updated_at: 수정 일시
    """
    class Meta:
        model = Inquiries
        fields = ['id', 'name', 'email', 'inquiry_type', 'message', 'message_en', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_email(self, value):
        """
        이메일 필드 검증 메서드
        이메일이 비어있거나 유효하지 않은 경우 예외를 발생시킵니다.
        """
        if not value:
            raise serializers.ValidationError("이메일은 필수 입력 항목입니다.")
        return value
    
    def validate_name(self, value):
        """
        이름 필드 검증 메서드
        이름이 비어있거나 유효하지 않은 경우 예외를 발생시킵니다.
        """
        if not value.strip():
            raise serializers.ValidationError("이름은 필수 입력 항목입니다.")
        return value.strip()
    
    def validate_message(self, value):
        """
        문의 내용 필드 검증 메서드
        문의 내용이 비어있거나 유효하지 않은 경우 예외를 발생시킵니다.
        """
        if not value.strip():
            raise serializers.ValidationError("문의 내용은 필수 입력 항목입니다.")
        return value.strip()
    
    def to_representation(self, instance):
        """
        직렬화된 데이터를 반환하는 메서드
        이 메서드는 언어 설정에 따라 문의 내용을 한국어 또는 영어로 반환합니다.
        """
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')

        if language == 'en':
            """ 영어로 문의 내용을 반환합니다."""
            data['message'] = instance.message_en or instance.message
        else:
            """ 한국어로 문의 내용을 반환합니다."""
            data['message'] = instance.message
        
        # 원본 언어별 필드는 제거
        data.pop('message_en', None)

        return data

class ProductImageSerializer(serializers.ModelSerializer):
    """
    제품 이미지 직렬화 클래스
    이 클래스는 제품 이미지 모델의 데이터를 직렬화하고 검증하는 역할을 합니다.
    - id: 이미지 ID
    - image: 이미지 파일
    - image_type: 이미지 유형 (예: 썸네일, 상세 이미지 등)
    - sort_order: 정렬 순서
    - alt_text_ko: 이미지 대체 텍스트 (한국어)
    - alt_text_en: 이미지 대체 텍스트 (영어)
    - created_at: 생성 일시
    - updated_at: 수정 일시
    - alt_text: 이미지 대체 텍스트 (언어 설정에 따라 한국어 또는 영어로 반환)
    """
    class Meta:
        model = ProductImages
        fields = ['id', 'image', 'image_type', 'sort_order', 'alt_text_ko', 'alt_text_en', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def to_representation(self, instance):
        """
        직렬화된 데이터를 반환하는 메서드
        이 메서드는 언어 설정에 따라 이미지 대체 텍스트를 한국어 또는 영어로 반환합니다.
        """
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')

        if language == 'en':
            """ 영어로 이미지 대체 텍스트를 반환합니다."""
            data['alt_text'] = instance.alt_text_en or instance.alt_text_ko
        else:
            """ 한국어로 이미지 대체 텍스트를 반환합니다."""
            data['alt_text'] = instance.alt_text_ko
        
        # 원본 언어별 필드는 제거
        data.pop('alt_text_ko', None)
        data.pop('alt_text_en', None)

        return data

class ProductSpecificationSerializer(serializers.ModelSerializer):
    """
    제품 사양 직렬화 클래스
    이 클래스는 제품 사양 모델의 데이터를 직렬화하고 검증하는 역할을 합니다.
    - id: 사양 ID
    - spec_key: 사양 키 (한국어)
    - spec_key_en: 사양 키 (영어)
    - spec_value: 사양 값 (한국어)
    - spec_value_en: 사양 값 (영어)
    - created_at: 생성 일시
    - updated_at: 수정 일시
    - spec_key: 사양 키 (언어 설정에 따라 한국어 또는 영어로 반환)
    - spec_value: 사양 값 (언어 설정에 따라 한국어 또는 영어로 반환)
    """
    class Meta:
        model = ProductSpecifications
        fields = ['id', 'spec_key', 'spec_key_en', 'spec_value', 'spec_value_en', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        """언어별 스펙 처리"""
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')
        
        if language == 'en':
            data['spec_key'] = instance.spec_key_en or instance.spec_key
            data['spec_value'] = instance.spec_value_en or instance.spec_value
        else:
            data['spec_key'] = instance.spec_key
            data['spec_value'] = instance.spec_value
            
        # 원본 언어별 필드는 제거
        data.pop('spec_key_en', None)
        data.pop('spec_value_en', None)
        
        return data
    
class ProductSerializer(serializers.ModelSerializer):
    """
    제품 데이터 직렬화 클래스
    제품 정보와 관련된 이미지, 스펙 정보를 포함하여 직렬화합니다.
    - id: 제품 ID
    - product_code: 제품 코드
    - name: 제품명 (한국어)
    - name_en: 제품명 (영어)
    - description: 제품 설명 (한국어)
    - description_en: 제품 설명 (영어)
    - category: 제품 카테고리 (한국어)
    - category_en: 제품 카테고리 (영어)
    - sort_order: 정렬 순서
    - images: 제품 이미지 목록
    - specifications: 제품 사양 목록
    - created_at: 생성 일시
    - updated_at: 수정 일시
    - name: 제품명 (언어 설정에 따라 한국어 또는 영어로 반환)
    - description: 제품 설명 (언어 설정에 따라 한국어 또는 영어로 반환)
    - category: 제품 카테고리 (언어 설정에 따라 한국어 또는 영어로 반환)
    """
    images = ProductImageSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    
    class Meta:
        model = Products
        fields = [
            'id', 'product_code', 'name', 'name_en', 'description', 'description_en',
            'category', 'category_en', 'sort_order', 'images', 'specifications',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        """제품명 필드 검증"""
        if not value.strip():
            raise serializers.ValidationError("제품명은 필수 입력 항목입니다.")
        return value.strip()

    def validate_description(self, value):
        """제품 설명 필드 검증"""
        if not value.strip():
            raise serializers.ValidationError("제품 설명은 필수 입력 항목입니다.")
        return value.strip()

    def validate_category(self, value):
        """카테고리 필드 검증"""
        if not value.strip():
            raise serializers.ValidationError("제품 카테고리는 필수 입력 항목입니다.")
        return value.strip()
    
    def to_representation(self, instance):
        """언어별 제품 정보 처리"""
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')
        
        # 언어에 따라 적절한 필드 값 선택
        if language == 'en':
            data['name'] = instance.name_en or instance.name
            data['description'] = instance.description_en or instance.description
            data['category'] = instance.category_en or instance.category
        else:
            data['name'] = instance.name
            data['description'] = instance.description
            data['category'] = instance.category
        
        # 원본 언어별 필드는 제거
        data.pop('name_en', None)
        data.pop('description_en', None)
        data.pop('category_en', None)
        
        return data
    
class ProductDetailSerializer(ProductSerializer):
    """
    제품 상세 직렬화 클래스
    제품 상세 정보를 직렬화하며, 이미지와 사양 정보를 포함합니다.
    """
    
    class Meta(ProductSerializer.Meta):
        pass