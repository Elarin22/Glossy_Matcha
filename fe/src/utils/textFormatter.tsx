import React from 'react';

interface TextFormatterProps {
    text: string;
    className?: string;
}

/**
 * Django 텍스트를 React 컴포넌트로 변환하는 유틸리티
 * - \n을 <br> 태그로 변환
 * - || 구분자로 텍스트 스타일링
 *   - || 이전: myeongjo 폰트, green-500 색상, 24px 크기
 *   - || 이후: pretendard 폰트, black-200 색상, 18px 크기
 */
export const formatText = (text: string, className?: string): React.ReactElement => {
    if (!text) return <span className={className}></span>;

    // || 구분자로 텍스트 분할
    const parts = text.split('||');
    
    if (parts.length === 1) {
        // || 구분자가 없는 경우: 일반 텍스트로 처리 (\n만 변환)
        const lines = parts[0].split('\\n');
        return (
            <span className={className}>
                {lines.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < lines.length - 1 && <br />}
                    </React.Fragment>
                ))}
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
                    {beforePart.split('\\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < beforePart.split('\\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
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
                    {afterPart.split('\\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < afterPart.split('\\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
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