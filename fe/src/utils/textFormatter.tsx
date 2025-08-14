import React, { useEffect, useState } from 'react';

interface TextFormatterProps {
    text: string;
    className?: string;
}

// 모바일 브레이크포인트 상수
const MOBILE_BREAKPOINT = 768;

/**
 * 모바일 감지 컴포넌트
 */
const MobileBreak: React.FC<{ id: string }> = ({ id }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // SSR 환경에서 window 객체 사용 보호
        if (typeof window === 'undefined') return;
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile ? <br key={id} /> : null;
};

/**
 * 텍스트의 줄바꿈 처리 함수
 * - \n 또는 \\n: 모든 화면에서 줄바꿈
 * - *n: 모바일에서만 줄바꿈
 */
const processTextWithBreaks = (text: string): React.ReactNode[] => {
    if (!text) return [];

    // 더 안전한 모바일 브레이크 토큰 사용
    const mobileBreakToken = '\u0001__MOBILE_BREAK__\u0001';
    
    // *n을 모바일 전용 브레이크로 변환
    const withMobileBreaks = text.split('*n').join(mobileBreakToken);
    
    // 일반 줄바꿈 처리: \\n과 \n 모두 지원
    const normalBreakParts = withMobileBreaks.split(/\\n|\n/);
    
    const result: React.ReactNode[] = [];
    
    normalBreakParts.forEach((part, partIndex) => {
        // 모바일 브레이크 토큰으로 분할
        const mobileBreakParts = part.split(mobileBreakToken);
        
        mobileBreakParts.forEach((subPart, subIndex) => {
            if (subPart) {
                result.push(subPart);
            }
            
            // 마지막이 아니면 모바일 전용 브레이크 추가
            if (subIndex < mobileBreakParts.length - 1) {
                result.push(
                    <MobileBreak 
                        key={`mobile-${partIndex}-${subIndex}`}
                        id={`mobile-${partIndex}-${subIndex}`}
                    />
                );
            }
        });
        
        // 마지막이 아니면 일반 브레이크 추가
        if (partIndex < normalBreakParts.length - 1) {
            result.push(<br key={`normal-${partIndex}`} />);
        }
    });
    
    return result;
};

/**
 * Django 텍스트를 React 컴포넌트로 변환하는 유틸리티
 * - \n을 <br> 태그로 변환 (모든 화면)
 * - *n을 모바일 전용 <br> 태그로 변환 (모바일에서만 줄바꿈)
 * - || 구분자로 텍스트 스타일링
 *   - || 이전: myeongjo 폰트, green-500 색상, 24px 크기
 *   - || 이후: pretendard 폰트, black-200 색상, 18px 크기
 */
export const formatText = (text: string, className?: string): React.ReactElement => {
    if (!text) return <span className={className}></span>;

    // || 구분자로 텍스트 분할
    const parts = text.split('||');
    
    if (parts.length === 1) {
        // || 구분자가 없는 경우: 일반 텍스트로 처리
        return (
            <span className={className}>
                {processTextWithBreaks(parts[0])}
            </span>
        );
    }

    // || 구분자가 있는 경우: 스타일 적용
    const beforePart = parts[0]; // || 이전 부분
    const afterPart = parts.slice(1).join('||'); // || 이후 부분

    return (
        <span className={className}>
            {/* || 이전 부분: myeongjo, green-500, 24px */}
            {beforePart && (
                <span 
                    style={{
                        fontFamily: 'var(--font-myeongjo)',
                        color: 'var(--color-green-500)',
                        fontSize: '24px',
                        lineHeight: '1.5'
                    }}
                >
                    {processTextWithBreaks(beforePart)}
                </span>
            )}
            
            {/* || 이후 부분: pretendard, black-200, 18px */}
            {afterPart && (
                <span 
                    style={{
                        fontFamily: 'var(--font-pretendard)',
                        color: 'var(--color-black-200)',
                        fontSize: '18px',
                        lineHeight: '1.5'
                    }}
                >
                    {processTextWithBreaks(afterPart)}
                </span>
            )}
        </span>
    );
};

/**
 * React 컴포넌트로 텍스트 포맷터 제공
 */
export const TextFormatter: React.FC<TextFormatterProps> = ({ text, className }) => {
    return formatText(text, className);
};


export default TextFormatter;