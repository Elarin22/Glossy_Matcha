'use client';

// === 제품 메인 배너 컴포넌트 ===
// 제품 페이지 상단의 자동 이미지 슬라이더 배너

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './ProductMainBanner.module.scss';

const ProductMainBanner: React.FC = () => {
    // === 상태 관리 ===
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const params = useParams();
    const currentLocale = params?.locale as string || 'ko';
    
    // === 비주얼 데이터 ===
    const images = [
        '/images/product/signature-main-banner1.jpg',
        '/images/product/signature-main-banner2.jpg',
        '/images/product/signature-main-banner3.jpg',
        '/images/product/signature-main-banner4.jpg'
    ];

    // === 다국어 텍스트 데이터 ===
    const getDescription = () => {
        if (currentLocale === 'en') {
            return {
                korean: false,
                content: (
                    <>
                        A balanced, subtle sweetness <br className={styles.mobileBreak} /> from a blend of Jeju <br />
                        ceremonial-grade matcha,<br className={styles.mobileBreak} /> alternative sweeteners,<br />
                        bamboo sap, and coconut sugar.
                    </>
                )
            };
        }
        
        return {
            korean: true,
            content: (
                <>
                    제주산 세레모니얼 등급 말차 원료와<br />
                    대체당, 대나무 수액, 코코넛 슈가를 블렌딩한<br className={styles.mobileBreak} />
                    은은한 단맛의 밸런스
                </>
            )
        };
    };

    // === 자동 슬라이드 기능 ===
    // 4초마다 이미지 자동 전환
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

    // === 이벤트 핸들러 ===
    // 스크롤 인디케이터 클릭 시 다음 섹션으로 스크롤
    const scrollToNext = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    // === 렌더링 ===
    return (
        <section className={styles.banner}>
            {/* 배경 이미지 슬라이더 */}
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

            {/* 그라디언트 오버레이 */}
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

            {/* 스크롤 인디케이터 */}
            <div className={styles.scrollIndicator} onClick={scrollToNext}>
                <span className={styles.scrollText}>Scroll</span>
                <span className={styles.scrollArrow}>↓</span>
            </div>
        </section>
    );
};

export default ProductMainBanner;