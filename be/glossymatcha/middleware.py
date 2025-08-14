from datetime import date
from django.shortcuts import redirect
from django.urls import reverse

class DailyPasswordMiddleware:
    """
    일일 패스워드 미들웨어
    날짜가 바뀌면 일일 패스워드 인증을 초기화
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 로그인된 사용자이고 일일 패스워드가 인증된 경우
        if (request.user.is_authenticated and 
            request.session.get('daily_password_verified')):
            
            # 세션의 날짜와 오늘 날짜 비교
            session_date = request.session.get('daily_password_date')
            today = str(date.today())
            
            if session_date != today:
                # 날짜가 바뀌었으면 인증 초기화
                del request.session['daily_password_verified']
                del request.session['daily_password_date']
        
        response = self.get_response(request)
        return response