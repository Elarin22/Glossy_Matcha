/**
 * 네이버 스마트스토어로 이동하는 버튼 컴포넌트
 * 
 * 주요 기능:
 * - "스토어 이동" / "Visit Store" 버튼 표시
 * - 다국어 버튼 텍스트 지원
 * - 새 탭에서 네이버 스마트스토어 열기
 * - 글로벌 버튼 스타일 클래스 사용
 */

import React from 'react';
import { useCurrentLocale } from '../../utils/localeUtils';
import styles from './ProductStore.module.scss';

const ProductStore: React.FC = () => {
    const currentLocale = useCurrentLocale();
    
    /**
     * 스토어 버튼 클릭 핸들러
     * 네이버 스마트스토어를 새 탭에서 열기
     */
    const handleStoreClick = () => {
        window.open('https://smartstore.naver.com/glossymatcha/category/ALL?cp=1', '_blank');
    };

    const getButtonText = () => {
        return currentLocale === 'en' ? 'Visit Store' : '스토어 이동';
    };

    return (
        <section className={styles.productStore}>
            <div className={styles.container}>
                <button 
                    className="btn-g"
                    onClick={handleStoreClick}
                    type="button"
                >
                    {getButtonText()}
                </button>
            </div>
        </section>
    );
};

export default ProductStore;