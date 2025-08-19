/**
 * 다국어 처리를 위한 유틸리티 함수들
 * 
 * 주요 기능:
 * - useCurrentLocale: 현재 라우트의 언어 코드 추출 (ko/en)
 * - getLocalizedText: 언어별 텍스트 객체에서 적절한 언어 텍스트 반환
 * 
 * 사용 예시:
 * - URL이 /en/products인 경우 'en' 반환
 * - 텍스트 객체 {ko: '한국어', en: 'English'}에서 언어에 맞는 텍스트 선택
 */

import { useParams } from 'next/navigation';

/**
 * 현재 Next.js 라우트의 locale 파라미터를 반환
 * 기본값: 'ko'
 */
export const useCurrentLocale = (): string => {
    const params = useParams();
    return (params?.locale as string) || 'ko';
};

/**
 * 다국어 객체 또는 문자열에서 지정된 언어의 텍스트 반환
 * 영어 요청 시 en 필드 우선, 없으면 ko 필드 사용
 */
export const getLocalizedText = (
    text: { ko?: string; en?: string } | string,
    locale: string = 'ko'
): string => {
    if (typeof text === 'string') return text;
    
    if (locale === 'en' && text.en) {
        return text.en;
    }
    
    return text.ko || text.en || '';
};