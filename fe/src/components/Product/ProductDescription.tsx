import React, { useState, useEffect } from 'react';
import styles from './ProductDescription.module.scss';

// 기본 타입 정의들
interface ProductImage {
    id: number;
    image: string;
    alt_text_ko?: string;
    alt_text_en?: string;
}

interface ProductSpecification {
    id: number;
    product_code?: string;
}

interface ProductBodySection {
    id?: number;
    image?: string;
    title?: string;
    title_en?: string;
    content?: string;
    content_en?: string;
    sort_order: number;
}

interface Product {
    id: number;
    name: string;
    name_en?: string;
    subtitle?: string;
    subtitle_en?: string;
    description: string;
    description_en?: string;
    short_description?: string;
    short_description_en?: string;
    images: ProductImage[];
    specifications: ProductSpecification[];
    body_sections?: ProductBodySection[];
}

interface ProductApiResponse {
    success: boolean;
    language: string;
    count: number;
    results: Product[];
}

interface ProductDescriptionProps {
    bodySections: ProductBodySection[];
    isEnglish: boolean;
}

// API 설정
const API_BASE_URL = 'https://api.glossymatcha.com/api/products';

// Mock 데이터 (API 에러 시 fallback용)
const mockProducts: Product[] = [
    {
        id: 1,
        name: "시그니처",
        name_en: "Signature",
        subtitle: "100% 제주 새봄의 첫 순을 담은 부드러운 말차 포켓",
        subtitle_en: "100% Premium Jeju First Spring Harvest Smooth Matcha Pocket",
        description: "세레모니얼 말차 | 대나무 수액 | 코코넛슈가",
        description_en: "Ceremonial Matcha | Bamboo Sap | Coconut Sugar",
        short_description: "* 글로시말차 시그니처는 실제 매장에서 사용되는 말차와 동일한 원료로 제작된 상품입니다.",
        short_description_en: "GlossyMatcha Signature is made with the same ingredients as the matcha used in actual stores.",
        images: [
            {
                id: 1,
                image: "/images/product/signature-mid-banner.png",
                alt_text_ko: "시그니처 제품 메인 이미지",
                alt_text_en: "Signature product main image",
            }
        ],
        specifications: [
            {
                id: 1,
                product_code: "SIG-001",
            }
        ],
        body_sections: [
            {
                id: 1,
                image: "/images/product/signature-detail-1.png",
                title: "프리미엄 제주 말차",
                title_en: "Premium Jeju Matcha",
                content: "제주도의 청정한 자연에서 자란 최상급 말차잎만을 선별하여 사용합니다.",
                content_en: "We use only the finest matcha leaves grown in Jeju's pristine nature.",
                sort_order: 1
            },
            {
                id: 2,
                image: "/images/product/signature-detail-2.png",
                title: "천연 감미료",
                title_en: "Natural Sweeteners",
                content: "대나무 수액과 코코넛슈가로 자연스러운 단맛을 더했습니다.",
                content_en: "Natural sweetness added with bamboo sap and coconut sugar.",
                sort_order: 2
            }
        ]
    },
    {
        id: 2,
        name: "말차다구세트",
        name_en: "Matcha Tea Set",
        subtitle: "차 한 잔의 격을 더하다",
        subtitle_en: "Adding elegance to a cup of tea",
        description: "차선 | 사발 | 스픈 | 차탁",
        description_en: "Tea Whisk | Bowl | Spoon | Tea Stand",
        short_description: "",
        short_description_en: "",
        images: [
            {
                id: 2,
                image: "/images/product/teaset-mid-banner.png",
                alt_text_ko: "말차다구세트 메인 이미지",
                alt_text_en: "Matcha tea set main image",
            }
        ],
        specifications: [
            {
                id: 2,
                product_code: "MTS-001",
            }
        ],
        body_sections: [
            {
                id: 3,
                image: "/images/product/teaset-detail-1.png",
                title: "전통 다구",
                title_en: "Traditional Tea Utensils",
                content: "정성스럽게 제작된 전통 다구로 완성하는 말차 체험",
                content_en: "Complete matcha experience with carefully crafted traditional tea utensils",
                sort_order: 1
            }
        ]
    },
    {
        id: 3,
        name: "틴케이스",
        name_en: "Tin Case",
        subtitle: "제주의 자연을 담은 100% HIGH QUALITY 유기농 말차",
        subtitle_en: "100% HIGH QUALITY organic matcha containing the nature of Jeju",
        description: "틴케이스 SET",
        description_en: "Tin Case SET",
        short_description: "* 국산 말차에는 등급제가 없습니다만, 해외 등급표 기준을 만족하도록 첫순 1번 잎을 가지고 만든 세레모니얼 급 '유기농 말차' 입니다.",
        short_description_en: "* Although there is no grading system for domestic matcha, this is ceremonial grade 'organic matcha' made from first-harvest leaves to meet international grading standards.",
        images: [
            {
                id: 3,
                image: "/images/product/case-mid-banner.png",
                alt_text_ko: "틴케이스 메인 이미지",
                alt_text_en: "Tin case main image",
            }
        ],
        specifications: [
            {
                id: 3,
                product_code: "TIN-001",
            }
        ],
        body_sections: [
            {
                id: 4,
                image: "/images/product/tincase-detail-1.png",
                title: "프리미엄 패키징",
                title_en: "Premium Packaging",
                content: "고급스러운 틴케이스로 보관과 선물에 모두 완벽합니다.",
                content_en: "Perfect for both storage and gifting with elegant tin case packaging.",
                sort_order: 1
            }
        ]
    }
];

// API 호출 함수들
const fetchProducts = async (lang: string = 'ko'): Promise<ProductApiResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/?lang=${lang}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ProductApiResponse = await response.json();
        
        // API 응답이 성공적이지만 결과가 없는 경우 Mock 데이터 사용
        if (!data.success || data.results.length === 0) {
            console.warn('API returned empty results, using mock data');
            return {
                success: true,
                language: lang,
                count: mockProducts.length,
                results: mockProducts
            };
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching products, using mock data:', error);
        
        // API 에러 시 Mock 데이터 반환
        return {
            success: true,
            language: lang,
            count: mockProducts.length,
            results: mockProducts
        };
    }
};

const fetchProductById = async (productId: number, lang: string = 'ko'): Promise<Product | null> => {
    try {
        const response = await fetchProducts(lang);
        const product = response.results.find(p => p.id === productId);
        return product || null;
    } catch (error) {
        console.error('제품 상세 정보 API 호출 실패:', error);
        throw error;
    }
};

// 언어별 필드 값 가져오기 헬퍼 함수
const getLocalizedField = (
    product: Product, 
    fieldName: keyof Product, 
    lang: string = 'ko'
): string => {
    if (lang === 'en') {
        const enFieldName = `${String(fieldName)}_en` as keyof Product;
        const enValue = product[enFieldName] as string;
        if (enValue && enValue.trim()) {
            return enValue;
        }
    }
    
    return (product[fieldName] as string) || '';
};

// sub_description 텍스트를 --- 구분자로 파싱하는 유틸리티 함수
const parseSubDescription = (subDescriptionText: string): ProductBodySection[] => {
    if (!subDescriptionText || !subDescriptionText.trim()) {
        return [];
    }

    const sections: ProductBodySection[] = [];
    // --- 구분자로 나누기
    const rawSections = subDescriptionText.trim().split('---');

    rawSections.forEach((section, index) => {
        const trimmedSection = section.trim();
        if (!trimmedSection) return;

        const lines = trimmedSection.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length === 0) return;

        // 첫 번째 줄은 title, 나머지는 content로 처리
        const title = lines[0] || "";
        const content = lines.slice(1).join('\n') || "";

        sections.push({
            id: index,
            title: title,
            title_en: title, // 동일한 값 사용 (언어별 처리는 getLocalizedField에서)
            content: content,
            content_en: content, // 동일한 값 사용
            sort_order: index + 1
        });
    });

    return sections;
};

const getLocalizedSectionField = (
    section: ProductBodySection,
    fieldName: 'title' | 'content',
    lang: string = 'ko'
): string => {
    if (lang === 'en') {
        const enFieldName = `${fieldName}_en` as keyof ProductBodySection;
        const enValue = section[enFieldName] as string;
        if (enValue && enValue.trim()) {
            return enValue;
        }
    }
    
    return (section[fieldName] as string) || '';
};

// ProductDescription 컴포넌트
const ProductDescription: React.FC<ProductDescriptionProps> = ({ 
    bodySections, 
    isEnglish 
}) => {
    const lang = isEnglish ? 'en' : 'ko';
    
    // sort_order에 따라 정렬
    const sortedSections = [...bodySections].sort((a, b) => a.sort_order - b.sort_order);

    return (
        <div className={styles.productDescription}>
            {sortedSections.map((section) => {
                const title = getLocalizedSectionField(section, 'title', lang);
                const content = getLocalizedSectionField(section, 'content', lang);
                
                return (
                    <div key={section.id || section.sort_order} className={styles.descriptionItem}>
                        {section.image && (
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

    const lang = isEnglish ? 'en' : 'ko';

    // 제품 목록 가져오기
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const productsData = await fetchProducts(lang);
                setProducts(productsData.results);
                
                // 첫 번째 제품을 기본 선택
                if (productsData.results.length > 0) {
                    setSelectedProductId(productsData.results[0].id);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : '제품 목록을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [lang]);

    // 선택된 제품 상세 정보 가져오기
    useEffect(() => {
        if (selectedProductId) {
            const loadProductDetail = async () => {
                try {
                    setLoading(true);
                    const productData = await fetchProductById(selectedProductId, lang);
                    setCurrentProduct(productData);
                } catch (err) {
                    setError(err instanceof Error ? err.message : '제품 상세 정보를 불러오는데 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            };

            loadProductDetail();
        }
    }, [selectedProductId, lang]);

    if (loading) {
        return (
            <div style={{ 
                padding: '40px', 
                textAlign: 'center', 
                fontSize: '18px' 
            }}>
                {isEnglish ? 'Loading...' : '로딩 중...'}
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
                {isEnglish ? 'Error: ' : '오류: '}{error}
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
                    {isEnglish ? 'Try Again' : '다시 시도'}
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            {/* 컨트롤러 */}
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
                    <label style={{ marginRight: '10px' }}>
                        {isEnglish ? 'Select Product:' : '제품 선택:'}
                    </label>
                    <select 
                        value={selectedProductId || ''} 
                        onChange={(e) => setSelectedProductId(Number(e.target.value))}
                        style={{ padding: '5px 10px' }}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {getLocalizedField(product, 'name', lang)}
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
                    {isEnglish 
                        ? `${products.length} products loaded` 
                        : `총 ${products.length}개 제품 로드됨`
                    }
                </div>
            </div>

            {/* 제품 정보 */}
            {currentProduct && (
                <>
                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>
                            {getLocalizedField(currentProduct, 'name', lang)}
                        </h1>
                        <p style={{ fontSize: '18px', color: '#666' }}>
                            {getLocalizedField(currentProduct, 'subtitle', lang)}
                        </p>
                    </div>

                    {/* ProductDescription 컴포넌트 */}
                    {currentProduct.body_sections && currentProduct.body_sections.length > 0 && (
                        <ProductDescription 
                            bodySections={currentProduct.body_sections}
                            isEnglish={isEnglish}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductDescription;
export { ProductDescriptionTest, fetchProducts, fetchProductById, getLocalizedField, getLocalizedSectionField };
export type { 
    Product, 
    ProductImage, 
    ProductSpecification, 
    ProductBodySection, 
    ProductApiResponse 
};