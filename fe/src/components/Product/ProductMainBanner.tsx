'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProductMainBanner.module.scss';

const ProductMainBanner: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const images = [
        '/images/product/signature-main-banner1.jpg',
        '/images/product/signature-main-banner2.jpg',
        '/images/product/signature-main-banner3.jpg',
        '/images/product/signature-main-banner4.jpg'
    ];

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

    const scrollToNext = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.banner}>
            {/* Background Images */}
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

            {/* Gradient Overlay */}
            <div className={styles.gradientOverlay} />

            {/* Content */}
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Life With<br />
                    Glossy
                </h1>
                <p className={styles.description}>
                    제주산 세레모니얼 등급 말차 원료와<br />
                    대체당, 대나무 수액, 코코넛 슈가를 블렌딩한 <br className={styles.mobileBreak} />
                    은은한 단맛의 밸런스
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator} onClick={scrollToNext}>
                <span className={styles.scrollText}>Scroll</span>
                <span className={styles.scrollArrow}>↓</span>
            </div>
        </section>
    );
};

export default ProductMainBanner;