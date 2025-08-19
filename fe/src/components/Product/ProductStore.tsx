import React from 'react';
import { useCurrentLocale } from '../../utils/localeUtils';
import styles from './ProductStore.module.scss';

const ProductStore: React.FC = () => {
    const currentLocale = useCurrentLocale();
    
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