import React, { useEffect, useState } from 'react';

interface TextFormatterProps {
    text: string;
    className?: string;
}

const MOBILE_BREAKPOINT = 768;

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