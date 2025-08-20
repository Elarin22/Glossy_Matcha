/**
 * 텍스트 포매팅 및 반응형 줄바꿈 처리 유틸리티
 * 
 * 주요 기능:
 * - '||' 구분자로 제목과 내용 분리 및 다른 스타일 적용
 * - '\n' 또는 '\\n'을 <br> 태그로 변환
 * - '*n'을 모바일에서만 줄바꿈으로 처리 (MobileBreak 컴포넌트)
 * - 반응형 줄바꿈을 위한 윈도우 리사이즈 이벤트 처리
 */

import React, { useEffect, useState } from 'react';

interface TextFormatterProps {
    text: string;
    className?: string;
}

const MOBILE_BREAKPOINT = 768;

/**
 * 모바일 화면에서만 줄바꿈을 표시하는 컴포넌트
 * 데스크톱에서는 비활성화
 */
const MobileBreak: React.FC<{ id: string }> = ({ id }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
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
 * 텍스트에서 일반 줄바꿈과 모바일 전용 줄바꿈을 처리
 * - '*n': 모바일 전용 줄바꿈
 * - '\n' 또는 '\\n': 일반 줄바꿈
 */
const processTextWithBreaks = (text: string): React.ReactNode[] => {
    if (!text) return [];

    const mobileBreakToken = '\u0001__MOBILE_BREAK__\u0001';
    
    const withMobileBreaks = text.split('*n').join(mobileBreakToken);
    
    const normalBreakParts = withMobileBreaks.split(/\\n|\n/);
    
    const result: React.ReactNode[] = [];
    
    normalBreakParts.forEach((part, partIndex) => {
        const mobileBreakParts = part.split(mobileBreakToken);
        
        mobileBreakParts.forEach((subPart, subIndex) => {
            if (subPart) {
                result.push(subPart);
            }
            
            if (subIndex < mobileBreakParts.length - 1) {
                result.push(
                    <MobileBreak 
                        key={`mobile-${partIndex}-${subIndex}`}
                        id={`mobile-${partIndex}-${subIndex}`}
                    />
                );
            }
        });
        
        if (partIndex < normalBreakParts.length - 1) {
            result.push(<br key={`normal-${partIndex}`} />);
        }
    });
    
    return result;
};

/**
 * 메인 텍스트 포매팅 함수
 * '||' 구분자로 제목과 내용을 나누어 다른 스타일 적용
 */
export const formatText = (text: string, className?: string): React.ReactElement => {
    if (!text) return <span className={className}></span>;

    const parts = text.split('||');
    
    if (parts.length === 1) {
        return (
            <span className={className}>
                {processTextWithBreaks(parts[0])}
            </span>
        );
    }

    const beforePart = parts[0];
    const afterPart = parts.slice(1).join('||');

    return (
        <span className={className}>
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

export const TextFormatter: React.FC<TextFormatterProps> = ({ text, className }) => {
    return formatText(text, className);
};


export default TextFormatter;