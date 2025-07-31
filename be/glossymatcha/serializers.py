from rest_framework import serializers
from .models import Inquiries


class InquirySerializer(serializers.ModelSerializer):
    """
    문의하기 데이터 직렬화 클래스
    
    문의 생성/조회 시 사용되는 데이터 직렬화 및 검증을 담당합니다.
    """
    
    class Meta:
        model = Inquiries
        fields = ['id', 'name', 'email', 'inquiry_type', 'message', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_email(self, value):
        """이메일 필드 검증"""
        if not value:
            raise serializers.ValidationError("이메일은 필수 입력 항목입니다.")
        return value

    def validate_name(self, value):
        """이름 필드 검증 (공백 제거 및 필수 입력 체크)"""
        if not value.strip():
            raise serializers.ValidationError("이름은 필수 입력 항목입니다.")
        return value.strip()

    def validate_message(self, value):
        """문의 내용 필드 검증 (공백 제거 및 필수 입력 체크)"""
        if not value.strip():
            raise serializers.ValidationError("문의 내용은 필수 입력 항목입니다.")
        return value.strip()