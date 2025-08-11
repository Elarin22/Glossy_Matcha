import React, { useState, useEffect } from 'react';
import styles from './ProductDescription.module.scss';

interface ProductImage {
    image: string;
}

interface SubDescription {
    id: number;
    sub_description: string;
    images: ProductImage[];
}

interface Product {
    id: number;
    name: string;
    subtitle: string;
    sub_descriptions: SubDescription[];
}

interface ProductDescriptionProps {
    subDescriptions: SubDescription[];
    isEnglish: boolean;
}

// API 호출 함수
const fetchProducts = async (): Promise<Product[]> => {
    try {
    const response = await fetch('https://api.glossymatcha.com/api/products/');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
    }
};

const fetchProductById = async (productId: number): Promise<Product> => {
    try {
    const response = await fetch(`https://api.glossymatcha.com/api/products/${productId}/`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('제품 상세 정보 API 호출 실패:', error);
    throw error;
    }
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({ 
    subDescriptions, 
    isEnglish 
}) => {
    const parseDescription = (description: string) => {
    const [title, content] = description.split('||').map(part => part.trim());
    
    if (title && content) {
      // | 기준으로 한글/영어 분리
        const titleParts = title.split('|').map(part => part.trim());
        const contentParts = content.split('|').map(part => part.trim());
        
        const displayTitle = isEnglish && titleParts[1] ? titleParts[1] : titleParts[0];
        const displayContent = isEnglish && contentParts[1] ? contentParts[1] : contentParts[0];
        
        return { title: displayTitle, content: displayContent };
    }
    
    // || 구분자가 없는 경우 전체를 제목으로 처리
    const parts = description.split('|').map(part => part.trim());
    const displayText = isEnglish && parts[1] ? parts[1] : parts[0];
    
    return { title: displayText, content: '' };
    };

    return (
    <div className={styles.productDescription}>
        {subDescriptions.map((item) => {
        const { title, content } = parseDescription(item.sub_description);
        
        return (
            <div key={item.id} className={styles.descriptionItem}>
            {item.images && item.images.length > 0 && (
                <div className={styles.imageWrapper}>
                <img 
                    src={item.images[0].image} 
                    alt={title}
                    className={styles.descriptionImage}
                />
                </div>
            )}
            
            <div className={styles.textContent}>
                {title && (
                <h3 className={styles.descriptionTitle}>
                    {title}
                </h3>
                )}
                
                {content && (
                <p className={styles.descriptionText}>
                    {content}
                </p>
                )}
            </div>
            </div>
        );
        })}
    </div>
    );
};

// API 연결된 테스트 컴포넌트
const ProductDescriptionTest: React.FC = () => {
    const [isEnglish, setIsEnglish] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  // 제품 목록 가져오기
    useEffect(() => {
    const loadProducts = async () => {
        try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
        
        // 첫 번째 제품을 기본 선택
        if (productsData.length > 0) {
            setSelectedProductId(productsData[0].id);
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : '제품 목록을 불러오는데 실패했습니다.');
        } finally {
        setLoading(false);
        }
    };

    loadProducts();
    }, []);

  // 선택된 제품 상세 정보 가져오기
    useEffect(() => {
    if (selectedProductId) {
        const loadProductDetail = async () => {
        try {
            setLoading(true);
            const productData = await fetchProductById(selectedProductId);
            setCurrentProduct(productData);
        } catch (err) {
            setError(err instanceof Error ? err.message : '제품 상세 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
        };

        loadProductDetail();
    }
    }, [selectedProductId]);

    const parseMultiLanguageText = (text: string) => {
    const parts = text.split(' | ');
    return isEnglish && parts[1] ? parts[1] : parts[0];
    };

    if (loading) {
        return (
            <div style={{ 
                padding: '40px', 
                textAlign: 'center', 
                fontSize: '18px' 
            }}>
                로딩 중...
            </div>
        );
    }

    if (error) {
    return (
        <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        color: '#ef4444',
        fontSize: '18px' 
        }}>
        오류: {error}
        <br />
        <button 
            onClick={() => window.location.reload()}
            style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
            }}
        >
            다시 시도
        </button>
        </div>
    );
    }

    return (
    <div style={{ padding: '20px' }}>
      {/* API 연결된 컨트롤러 */}
        <div style={{ 
        marginBottom: '40px', 
        padding: '20px', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
        }}>
        <div>
            <label style={{ marginRight: '10px' }}>제품 선택:</label>
            <select 
            value={selectedProductId || ''} 
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            style={{ padding: '5px 10px' }}
            >
            {products.map((product) => (
                <option key={product.id} value={product.id}>
                {parseMultiLanguageText(product.name)}
                </option>
            ))}
            </select>
        </div>
        
        <div>
            <button 
            onClick={() => setIsEnglish(!isEnglish)}
            style={{ 
                padding: '8px 16px', 
                background: isEnglish ? '#22c55e' : '#e5e7eb',
                color: isEnglish ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            >
            {isEnglish ? 'English' : '한국어'}
            </button>
        </div>

        <div style={{ fontSize: '14px', color: '#666' }}>
            총 {products.length}개 제품 로드됨
        </div>
        </div>

      {/* 제품 정보 */}
        {currentProduct && (
        <>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>
                {parseMultiLanguageText(currentProduct.name)}
            </h1>
            <p style={{ fontSize: '18px', color: '#666' }}>
                {parseMultiLanguageText(currentProduct.subtitle)}
            </p>
            </div>

          {/* ProductDescription 컴포넌트 */}
            <ProductDescription 
            subDescriptions={currentProduct.sub_descriptions}
            isEnglish={isEnglish}
            />
        </>
        )}
    </div>
    );
};

export default ProductDescription;
export { ProductDescriptionTest, fetchProducts, fetchProductById };