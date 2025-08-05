from django.apps import AppConfig


class GlossymatchaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'glossymatcha'
    
    def ready(self):
        import glossymatcha.models  # 신호 로드 models 임포트
