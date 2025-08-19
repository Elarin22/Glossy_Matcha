/**
 * 제품 페이지 메인 배너 컴포넌트
 * 
 * 주요 기능:
 * - 4개 이미지를 4초 간격으로 자동 슬라이드
 * - 다국어 제품 설명 표시
 * - 그라데이션 오버레이와 스크롤 인디케이터 포함
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useCurrentLocale } from '../../utils/localeUtils';
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator';
import styles from './ProductMainBanner.module.scss';

const ProductMainBanner: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const currentLocale = useCurrentLocale();
    
    const images = [
        '/images/product/signature-main-banner1.jpg',
        '/images/product/signature-main-banner2.jpg',
        '/images/product/signature-main-banner3.jpg',
        '/images/product/signature-main-banner4.jpg'
    ];

    /**
     * 현재 언어에 따른 제품 설명 텍스트 반환
     */
    const getDescription = () => {
        if (currentLocale === 'en') {
            return {
                korean: false,
                content: (
                    <>
                        A balanced, Subtle sweetness <br /> from a Blend of Jeju <br />
                        Ceremonial-Grade Matcha, Alternative Sweeteners,<br />
                        Bamboo Sap, and Coconut Sugar.
                    </>
                )
            };
        }
        
        return {
            korean: true,
            content: (
                <>
                    제주산 세레모니얼 등급 말차 원료와<br />
                    대체당, 대나무 수액, 코코넛 슈가를 블렌딩한<br />
                    은은한 단맛의 밸런스
                </>
            )
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [images.length]);


    return (
        <section className={styles.banner}>
            <div className={styles.imageContainer}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.backgroundImage} ${
                            index === currentImageIndex ? styles.active : ''
                        }`}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>

            <div className={styles.gradientOverlay} />

            {/* 메인 컨텐츠 */}
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Life With<br />
                    Glossy
                </h1>
                <p className={styles.description}>
                    {getDescription().content}
                </p>
            </div>

            <ScrollIndicator />
        </section>
    );
};

export default ProductMainBanner;