from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings
from .models import Inquiries
from .serializers import InquirySerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def create_inquiry(request):
    """
    문의하기 생성 API
    
    새로운 문의를 생성하고 관리자에게 이메일 알림을 발송합니다.
    
    Request Body:
    {
        "name": "문의자 이름 (필수)",
        "email": "문의자 이메일 (필수)",
        "inquiry_type": "문의 유형 (general/product/other, 기본값: general)",
        "message": "문의 내용 (필수)"
    }
    
    Response:
    - 201: 문의 생성 성공
    - 400: 입력 데이터 검증 실패
    """
    serializer = InquirySerializer(data=request.data)
    
    if serializer.is_valid():
        # 문의 데이터를 데이터베이스에 저장
        inquiry = serializer.save()
        
        # 관리자에게 이메일 알림 발송
        try:
            subject = f'[글로시 말차] 새로운 문의: {inquiry.get_inquiry_type_display()}'
            message = f"""
새로운 문의가 접수되었습니다.

문의자: {inquiry.name}
이메일: {inquiry.email}
문의 유형: {inquiry.get_inquiry_type_display()}
문의 내용:
{inquiry.message}

문의 접수 시간: {inquiry.created_at.strftime('%Y-%m-%d %H:%M:%S')}
            """
            
            # Gmail SMTP를 통한 이메일 발송
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            # 이메일 발송 실패시 로그 기록 (문의 생성은 성공 처리)
            print(f"Failed to send email notification: {str(e)}")
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_inquiries(request):
    """
    전체 문의 목록 조회 API
    
    모든 문의 내역을 최신순으로 반환합니다.
    주로 관리자용 API로 사용됩니다.
    
    Response:
    - 200: 문의 목록 반환 성공
    """
    # 모든 문의를 최신순으로 조회 (모델의 ordering 설정 적용)
    inquiries = Inquiries.objects.all()
    serializer = InquirySerializer(inquiries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_inquiry(request, pk):
    """
    특정 문의 상세 조회 API
    
    문의 ID를 통해 특정 문의의 상세 정보를 반환합니다.
    
    URL Parameters:
    - pk: 문의 ID (정수)
    
    Response:
    - 200: 문의 상세 정보 반환 성공
    - 404: 해당 ID의 문의를 찾을 수 없음
    """
    try:
        # 주어진 ID로 문의 조회
        inquiry = Inquiries.objects.get(pk=pk)
    except Inquiries.DoesNotExist:
        return Response({'error': '문의를 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = InquirySerializer(inquiry)
    return Response(serializer.data)