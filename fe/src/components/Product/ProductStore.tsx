import React from 'react';
import { useParams } from 'next/navigation';
import styles from './ProductStore.module.scss';

const ProductStore: React.FC = () => {
    const params = useParams();
    const currentLocale = params?.locale as string || 'ko';
    
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