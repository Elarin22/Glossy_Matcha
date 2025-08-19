import { useParams } from 'next/navigation';

export const useCurrentLocale = (): string => {
    const params = useParams();
    return (params?.locale as string) || 'ko';
};

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