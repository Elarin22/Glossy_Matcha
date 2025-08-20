/**
 * 제품 상세 이미지를 토글 방식으로 표시하는 컴포넌트
 * 
 * 주요 기능:
 * - "제품 상세" 버튼 클릭 시 상세 이미지 토글
 * - 언어별 상세 이미지 선택 (details-en.jpg / details.jpg)
 * - 화살표 아이콘 방향 변경 (열림/닫힘 상태)
 * - 상세 이미지가 없는 경우 컴포넌트 숨김
 */

import React, { useState } from 'react';
import { useCurrentLocale } from '../../utils/localeUtils';
import { Product } from '@/services/productApi';
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {
    product: Product;
    lang: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentLocale = useCurrentLocale();

    /**
     * 제품 이미지 중 'details'가 포함된 상세 이미지만 필터링
     */
    const detailsImages = product.images?.filter(img => 
        img.image.toLowerCase().includes('details')
    ) || [];

    if (detailsImages.length === 0) {
        return null;
    }

    /**
     * 언어에 따라 적절한 상세 이미지 선택
     * - 영어: details-en.jpg 우선, 없으면 기본 details.jpg
     * - 한국어: details.jpg (영어용 제외)
     */
    let selectedImage;
    if (lang === 'en') {
        selectedImage = detailsImages.find(img => 
            img.image.toLowerCase().includes('details-en')
        ) || detailsImages.find(img => 
            img.image.toLowerCase().includes('details') && !img.image.toLowerCase().includes('details-en')
        );
    } else {
        selectedImage = detailsImages.find(img => 
            img.image.toLowerCase().includes('details') && !img.image.toLowerCase().includes('details-en')
        );
    }

    if (!selectedImage) {
        return null;
    }

    const getButtonText = () => {
        return currentLocale === 'en' ? 'Product Details' : '제품 상세';
    };

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.productDetails}>
            <div 
                className={styles.detailsToggle}
                onClick={toggleDetails}
            >
                <span className={styles.detailsText}>{getButtonText()}</span>
                {isOpen ? (
                    <svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L13.5 11.3787L24.4393 0.439339C25.0251 -0.146447 25.9749 -0.146447 26.5607 0.439338C27.1464 1.02513 27.1464 1.97487 26.5607 2.56066L14.5607 14.5607C13.9749 15.1464 13.0251 15.1464 12.4393 14.5607L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934Z" fill="currentColor"/>
                    </svg>
                ) : (
                    <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.380763 23.6095C-0.126918 23.0888 -0.126919 22.2446 0.380762 21.7239L9.86152 12L0.380761 2.27614C-0.12692 1.75544 -0.12692 0.911222 0.380761 0.390524C0.888442 -0.130175 1.71156 -0.130175 2.21924 0.390524L12.6192 11.0572C13.1269 11.5779 13.1269 12.4221 12.6192 12.9428L2.21924 23.6095C1.71156 24.1302 0.888444 24.1302 0.380763 23.6095Z" fill="currentColor"/>
                    </svg>
                )}
            </div>
            
            {isOpen && (
                <div className={styles.detailsContent}>
                    <div className={styles.detailsImageWrapper}>
                        <img 
                            src={selectedImage.image}
                            alt="Product Details"
                            className={styles.detailsImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;