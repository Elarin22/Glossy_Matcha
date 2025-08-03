from rest_framework import serializers
from .models import Inquiries

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