import React from 'react';
import styles from './ProductDescription.module.scss';
import { TextFormatter } from '../../utils/textFormatter';
import ProductApi from '../../services/productApi';
import FadeInUp from '../FadeInUp/FadeInUp';

// === 제품 상세 설명 컴포넌트 ===

// === 타입 정의 ===
interface ProductBodySection {
    id?: number;
    image?: string;
    title?: string;
    title_en?: string;
    content?: string;
    content_en?: string;
    sort_order: number;
}

interface ProductDescriptionProps {
    bodySections: ProductBodySection[];
    isEnglish: boolean;
    midBannerImg?: string;
}


// === 메인 컴포넌트 ===
const ProductDescription: React.FC<ProductDescriptionProps> = ({ 
    bodySections, 
    isEnglish,
    midBannerImg 
}) => {
    const lang = isEnglish ? 'en' : 'ko';
    
    // === 섹션 정렬 ===
    // id 순서로 정렬
    const sortedSections = [...bodySections].sort((a, b) => (a.id || 0) - (b.id || 0));  

    // === MidBanner 이미지 파싱 함수 ===
    const parseMidBannerImg = (imgString?: string): string | null => {
        if (!imgString) return null;
        if (imgString.includes('||BANNER:')) {
            return imgString.split('||BANNER:')[1];
        }
        return imgString;
    };

    const midBannerImageUrl = parseMidBannerImg(midBannerImg);

    // === 렌더링 ===
    return (
        <div className={styles.productDescription}>
            {sortedSections.map((section, index) => {
                // 언어별 텍스트 추출
                const title = ProductApi.getLocalizedSectionField(section, 'title', lang);
                const content = ProductApi.getLocalizedSectionField(section, 'content', lang);
                
                // MidBanner와 같은 이미지인지 확인
                const isDuplicateImage = section.image === midBannerImageUrl;
                
                return (
                    <FadeInUp key={`section-${section.sort_order}-${index}`} delay={index * 200}>
                        <div className={styles.descriptionItem}>
                            {/* 섹션 이미지 (MidBanner와 중복되지 않을 때만 표시) */}
                            {section.image && !isDuplicateImage && (
                                <div className={styles.imageWrapper}>
                                    <img 
                                        src={section.image} 
                                        alt={title}
                                        className={styles.descriptionImage}
                                    />
                                </div>
                            )}
                            
                            {/* 섹션 텍스트 콘텐츠 */}
                            <div className={styles.textContent}>
                                {/* 섹션 제목 */}
                                {title && (
                                    <h3 className={styles.descriptionTitle}>
                                        <TextFormatter text={title} />
                                    </h3>
                                )}
                                
                                {/* 섹션 내용 */}
                                {content && (
                                    <p className={styles.descriptionText}>
                                        <TextFormatter text={content} />
                                    </p>
                                )}
                            </div>
                        </div>
                    </FadeInUp>
                );
            })}
        </div>
    );
};

export default ProductDescription;
export type { ProductBodySection };