from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """헬스체크 엔드포인트"""
    return Response({
        'status': 'ok',
        'timestamp': datetime.now().isoformat()
    }, status=status.HTTP_200_OK)