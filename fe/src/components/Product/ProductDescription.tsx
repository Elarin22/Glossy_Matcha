/**
 * 제품 상세 설명 섹션들을 표시하는 컴포넌트
 * 
 * 주요 기능:
 * - 제품의 body_sections 데이터를 섹션별로 렌더링
 * - 각 섹션에 이미지, 제목, 내용 포함
 * - FadeInUp 애니메이션 효과 적용
 * - 중복 이미지 필터링 (mid_banner_img와 동일한 경우 제외)
 * - 섹션 정렬 및 다국어 텍스트 처리
 */

import React from 'react';
import styles from './ProductDescription.module.scss';
import { TextFormatter } from '../../utils/textFormatter';
import ProductApi, { type ProductBodySection } from '../../services/productApi';
import FadeInUp from '../FadeInUp/FadeInUp';

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
    
    const sortedSections = [...bodySections].sort((a, b) => (a.id || 0) - (b.id || 0));
    /**
     * mid_banner_img 문자열에서 실제 이미지 URL 추출
     */
    const parseMidBannerImg = (imgString?: string): string | null => {
        if (!imgString) return null;
        if (imgString.includes('||BANNER:')) {
            return imgString.split('||BANNER:')[1];
        }
        return imgString;
    };

    const midBannerImageUrl = parseMidBannerImg(midBannerImg);

    return (
        <div className={styles.productDescription}>
            {sortedSections.map((section, index) => {
                const title = ProductApi.getLocalizedSectionField(section, 'title', lang);
                const content = ProductApi.getLocalizedSectionField(section, 'content', lang);
                
                const isDuplicateImage = section.image === midBannerImageUrl;
                
                return (
                    <FadeInUp key={`section-${section.sort_order}-${index}`} delay={index * 200}>
                        <div className={styles.descriptionItem}>
                            {section.image && !isDuplicateImage && (
                                <div className={styles.imageWrapper}>
                                    <img 
                                        src={section.image} 
                                        alt={title}
                                        className={styles.descriptionImage}
                                    />
                                </div>
                            )}
                            
                            <div className={styles.textContent}>
                                {title && (
                                    <h3 className={styles.descriptionTitle}>
                                        <TextFormatter text={title} />
                                    </h3>
                                )}
                                
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