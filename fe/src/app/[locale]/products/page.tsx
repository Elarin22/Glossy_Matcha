"use client";

import React, { useState, useEffect } from 'react';
import ProductNav from '@/components/Nav/ProductNav';
import ProductMainBanner from '@/components/Product/ProductMainBanner';
import ProductMidBanner from '@/components/Product/ProductMidBanner';
import ProductDescription from '@/components/Product/ProductDescription';
import { Product } from '@/components/Product/ProductDescription';
import ProductApi, { ProductBodySection } from '@/services/productApi';
import styles from './page.module.scss';

interface ProductsPageProps {
    params: Promise<{
        locale: string;
    }>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ params }) => {
    const resolvedParams = React.use(params);
    const [activeProductId, setActiveProductId] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const lang = resolvedParams?.locale || 'ko';

    // 제품 목록 가져오기
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await ProductApi.getProducts(lang);
                if (response.success && response.results.length > 0) {
                    setProducts(response.results);
                    setActiveProductId(response.results[0].id);
                } else {
                    setError('제품 정보를 불러올 수 없습니다.');
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('제품 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [lang]);

    // 선택된 제품의 상세 정보 가져오기
    useEffect(() => {
        const fetchCurrentProduct = async () => {
            if (!activeProductId) return;
            
            try {
                const productData = await ProductApi.getProductById(activeProductId, lang);
                setCurrentProduct(productData);
            } catch (err) {
                console.error('Failed to fetch current product:', err);
            }
        };

        fetchCurrentProduct();
    }, [activeProductId, lang]);

    const productMenuItems = products.map(product => ({
        label: product.name,
        productId: product.id
    }));

    const handleProductSelect = (productId: number) => {
        setActiveProductId(productId);
    };

    // sub_description을 파싱해서 ProductBodySection 배열로 변환하는 함수
    const parseSubDescription = (subDescriptionText: string): ProductBodySection[] => {
        if (!subDescriptionText || !subDescriptionText.trim()) {
            return [];
        }

        const sections: ProductBodySection[] = [];
        // --- 구분자로 나누기 (첫 번째와 마지막 빈 문자열 제거)
        const rawSections = subDescriptionText.trim().split('---').filter((section: string) => section.trim());

        console.log('=== 파싱 디버깅 ===');
        console.log('전체 이미지 개수:', currentProduct?.images?.length || 0);
        console.log('파싱된 섹션 개수:', rawSections.length);

        rawSections.forEach((section, index) => {
            const trimmedSection = section.trim();
            if (!trimmedSection) return;

            // || 구분자로 title과 content 분리
            const parts = trimmedSection.split('||');
            const title = parts[0]?.trim() || "";
            const content = parts[1]?.trim() || "";

            if (!title) return; // title이 없으면 섹션 생성하지 않음

            // 정확한 이미지 매핑:
            // Django에서 업로드한 순서:
            // images[0] = mid banner용 
            // images[1] = 첫 번째 섹션용 (index 0에 해당)
            // images[2] = 두 번째 섹션용 (index 1에 해당)
            // images[3] = 세 번째 섹션용 (index 2에 해당) ...
            // 따라서: 섹션의 이미지 = images[index + 1]
            const imageIndex = index + 1;
            const sectionImage = currentProduct?.images?.[imageIndex];
            
            console.log(`섹션 ${index}: "${title}" -> 이미지 인덱스 ${imageIndex}:`, sectionImage?.image || '없음');

            sections.push({
                id: index,
                image: sectionImage?.image || undefined,
                title: title,
                title_en: title,
                content: content,
                content_en: content,
                sort_order: index + 1
            });
        });

        console.log('최종 섹션들:', sections);
        return sections;
    };

    if (loading) {
        return (
            <main className={styles.main}>
                <ProductMainBanner />
                <div className={styles.loading}>
                    <p>{lang === 'en' ? 'Loading products...' : '제품 정보를 불러오는 중...'}</p>
                </div>
            </main>
        );
    }

    if (error || products.length === 0) {
        return (
            <main className={styles.main}>
                <ProductMainBanner />
                <div className={styles.error}>
                    <p>{error || (lang === 'en' ? 'No products available.' : '제품 정보가 없습니다.')}</p>
                </div>
            </main>
        );
    }

    // sub_description에서 파싱한 섹션들
    const bodySections = currentProduct ? (() => {
        // body_sections가 있으면 그대로 사용, 없으면 sub_description을 파싱
        if (currentProduct.body_sections && currentProduct.body_sections.length > 0) {
            return currentProduct.body_sections;
        } else {
            // sub_description 필드에서 파싱
            const subDescText = ProductApi.getLocalizedField(currentProduct, 'sub_description', lang);
            return parseSubDescription(subDescText);
        }
    })() : [];

    return (
        <>
            <main className={styles.main}>
                {/* MainBanner */}
                <ProductMainBanner />
                
                {/* ProductNav - 제품 전용 네비게이션 */}
                <ProductNav 
                    menuItems={productMenuItems}
                    onProductSelect={handleProductSelect}
                    activeProductId={activeProductId}
                />
                
                {/* MidBanner - 선택된 제품만 표시 (images[0] 사용) */}
                <ProductMidBanner productId={activeProductId} lang={lang} />
                
                {/* ProductDescription - 제품 상세 설명 (images[1]부터 사용) */}
                {bodySections.length > 0 && (
                    <ProductDescription 
                        bodySections={bodySections}
                        isEnglish={lang === 'en'}
                    />
                )}
            </main>
        </>
    );
};

export default ProductsPage;