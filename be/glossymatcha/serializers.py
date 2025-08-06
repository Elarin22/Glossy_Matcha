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
    - message: 문의 내용
    - created_at: 생성 일시
    - updated_at: 수정 일시
    """
    class Meta:
        model = Inquiries
        fields = ['id', 'name', 'email', 'inquiry_type', 'message', 'created_at', 'updated_at']
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
    

class ProductImageSerializer(serializers.ModelSerializer):
    """
    제품 이미지 데이터 직렬화 클래스
    이 클래스는 제품 이미지 모델의 데이터를 직렬화하고 검증하는 역할을 합니다.
    - id: 이미지 ID
    - product: 제품 선택
    - image: 이미지 파일
    - alt_text_ko: 이미지 대체 텍스트 (한국어)
    - alt_text_en: 이미지 대체 텍스트 (영어)
    - created_at: 생성 일시
    """
    class Meta:
        model = ProductImages
        fields = ['id', 'product', 'image', 'alt_text_ko', 'alt_text_en', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')

        if language == 'en':
            data['alt_text'] = instance.alt_text_en or instance.alt_text_ko
        else:
            data['alt_text'] = instance.alt_text_ko
        
        data.pop('alt_text_ko', None)
        data.pop('alt_text_en', None)

        return data
    
class ProductSpecificationSerializer(serializers.ModelSerializer):
    """
    제품 사양 데이터 직렬화 클래스
    이 클래스는 제품 사양 모델의 데이터를 직렬화하고 검증하는 역할을 합니다.
    - id: 사양 ID
    - product: 제품 선택
    - product_code: 제품 코드
    - created_at: 생성 일시
    - updated_at: 수정 일시
    """
    class Meta:
        model = ProductSpecifications
        fields = ['id', 'product', 'product_code', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        """언어별 스펙 처리"""
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')
        
        data['product_code'] = instance.product_code
        
        return data
    
class ProductSerializer(serializers.ModelSerializer):
    """
    제품 데이터 직렬화 클래스
    제품 정보와 관련된 이미지, 스펙 정보를 포함하여 직렬화합니다.
    - id: 제품 ID
    - name: 제품명 (한국어)
    - name_en: 제품명 (영어)
    - subtitle: 제품 부제목 (한국어)
    - subtitle_en: 제품 부제목 (영어)
    - description: 제품 설명 (한국어)
    - description_en: 제품 설명 (영어)
    - short_description: 제품 안내사항 (한국어)
    - short_description_en: 제품 안내사항 (영어)
    - sub_description: 제품 부가 설명 (한국어)
    - sub_description_en: 제품 부가 설명 (영어)
    - images: 제품 이미지 목록
    - specifications: 제품 사양 목록
    - created_at: 생성 일시
    - updated_at: 수정 일시
    """
    images = ProductImageSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    
    class Meta:
        model = Products
        fields = [
            'id', 'name', 'name_en', 'subtitle', 'subtitle_en',
            'description', 'description_en', 'short_description', 'short_description_en',
            'sub_description', 'sub_description_en',
            'images', 'specifications', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        """
        전체 데이터 검증 메서드
        한국어 또는 영어 중 최소 하나의 제품명과 설명은 필수입니다.
        """
        name = data.get('name', '').strip() if data.get('name') else ''
        name_en = data.get('name_en', '').strip() if data.get('name_en') else ''
        description = data.get('description', '').strip() if data.get('description') else ''
        description_en = data.get('description_en', '').strip() if data.get('description_en') else ''
        
        # 제품명 검증: 한국어 또는 영어 중 최소 하나는 필수
        if not name and not name_en:
            raise serializers.ValidationError("제품명(한국어 또는 영어)은 최소 하나는 필수입니다.")
        
        # 제품 설명 검증: 한국어 또는 영어 중 최소 하나는 필수
        if not description and not description_en:
            raise serializers.ValidationError("제품 설명(한국어 또는 영어)은 최소 하나는 필수입니다.")
        
        return data

    
    def to_representation(self, instance):
        """언어별 제품 정보 처리"""
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')
        
        # 언어에 따라 적절한 필드 값 선택
        if language == 'en':
            data['name'] = instance.name_en or instance.name
            data['subtitle'] = instance.subtitle_en or instance.subtitle
            data['description'] = instance.description_en or instance.description
            data['short_description'] = instance.short_description_en or instance.short_description
            data['sub_description'] = instance.sub_description_en or instance.sub_description
        else:
            data['name'] = instance.name
            data['subtitle'] = instance.subtitle
            data['description'] = instance.description
            data['short_description'] = instance.short_description
            data['sub_description'] = instance.sub_description
        
        # 원본 언어별 필드는 제거
        data.pop('name_en', None)
        data.pop('subtitle_en', None)
        data.pop('description_en', None)
        data.pop('short_description_en', None)
        data.pop('sub_description_en', None)
        
        return data

class ProductDetailSerializer(ProductSerializer):
    """
    제품 상세 정보 직렬화 클래스
    이 클래스는 제품의 상세 정보를 직렬화하며, ProductSerializer를 상속받아 사용합니다.
    """
    
    class Meta(ProductSerializer.Meta):
        pass

class ProductListSerializer(serializers.ModelSerializer):
    """
    제품 목록 직렬화 클래스
    - id: 제품 ID
    - name: 제품명 (한국어)
    - name_en: 제품명 (영어)
    - subtitle: 제품 부제목 (한국어)
    - subtitle_en: 제품 부제목 (영어)
    - description: 제품 설명 (한국어)
    - description_en: 제품 설명 (영어)
    - short_description: 제품 안내사항 (한국어)
    - short_description_en: 제품 안내사항 (영어)
    - sub_description: 제품 부가 설명 (한국어)
    - sub_description_en: 제품 부가 설명 (영어)
    - main_image: 제품의 대표 이미지
    - created_at: 생성 일시
    """
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = [
            'id', 'name', 'name_en', 'subtitle', 'subtitle_en',
            'description', 'description_en', 'short_description', 'short_description_en',
            'sub_description', 'sub_description_en',
            'main_image', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_main_image(self, obj):
        main_image = obj.images.first()
        if main_image:
            serializer = ProductImageSerializer(main_image, context=self.context)
            return serializer.data
        return None
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')

        if language == 'en':
            data['name'] = instance.name_en or instance.name
            data['subtitle'] = instance.subtitle_en or instance.subtitle
            data['description'] = instance.description_en or instance.description
            data['short_description'] = instance.short_description_en or instance.short_description
            data['sub_description'] = instance.sub_description_en or instance.sub_description
        else:
            data['name'] = instance.name
            data['subtitle'] = instance.subtitle
            data['description'] = instance.description
            data['short_description'] = instance.short_description
            data['sub_description'] = instance.sub_description
        
        # 원본 언어별 필드는 제거
        data.pop('name_en', None)
        data.pop('subtitle_en', None)
        data.pop('description_en', None)
        data.pop('short_description_en', None)
        data.pop('sub_description_en', None)

        return data