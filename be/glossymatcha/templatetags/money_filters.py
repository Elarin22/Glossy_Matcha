from django import template
from decimal import Decimal

register = template.Library()

@register.filter
def korean_won(value):
    """
    숫자를 한국 원화 형식으로 표시 (콤마 추가)
    사용법: {{ value|korean_won }}
    예시: 1000000 -> 1,000,000
    """
    if value is None or value == '':
        return '0'
    
    try:
        # Decimal이나 숫자 타입을 정수로 변환
        if isinstance(value, Decimal):
            value = int(value)
        elif isinstance(value, (int, float)):
            value = int(value)
        else:
            value = int(float(value))
        
        return f"{value:,}"
    except (ValueError, TypeError):
        return str(value)

@register.filter 
def korean_won_with_unit(value):
    """
    숫자를 한국 원화 형식으로 표시하고 '원' 단위 추가
    사용법: {{ value|korean_won_with_unit }}
    예시: 1000000 -> 1,000,000원
    """
    formatted = korean_won(value)
    return f"{formatted}원"