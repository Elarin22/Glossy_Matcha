// 제품 이미지 타입 (백엔드 API 응답 구조)
interface ProductImage {
    id: number;
    image: string;
    alt_text?: string; // 백엔드에서 언어에 따라 처리된 alt_text
}

// 제품 스펙 타입
interface ProductSpecification {
    id: number;
    product_code?: string;
}

// 제품 메인 타입 (백엔드 API 응답 구조)
interface Product {
    id: number;
    name: string; // 백엔드에서 언어에 따라 처리됨 (name 또는 name_en)
    subtitle?: string; // 백엔드에서 언어에 따라 처리됨
    description: string; // 백엔드에서 언어에 따라 처리됨
    short_description?: string; // 백엔드에서 언어에 따라 처리됨
    sub_description?: string; // 백엔드에서 언어에 따라 처리됨
    images: ProductImage[];
    specifications?: ProductSpecification[];
    created_at: string;
}

interface ProductApiResponse {
    success: boolean;
    language: string;
    count: number;
    results: Product[];
}


import { mockSignature, mockTeaSet, mockCase } from '../data/mockProducts';

const API_BASE_URL = 'https://api.glossymatcha.com/api';

// Mock 데이터를 Product 타입으로 변환하는 함수
const convertMockToProduct = (mockData: any, lang: string = 'ko'): Product => {
    return {
        id: mockData.id,
        name: lang === 'en' ? mockData.name_en : mockData.name,
        subtitle: lang === 'en' ? mockData.subtitle_en : mockData.subtitle,
        description: lang === 'en' ? mockData.description_en : mockData.description,
        short_description: lang === 'en' ? mockData.short_description_en : mockData.short_description,
        images: mockData.sub_descriptions?.[0]?.images || [{ id: 0, image: '', alt_text: '' }],
        specifications: [],
        created_at: new Date().toISOString()
    };
};

const getMockProducts = (lang: string = 'ko'): Product[] => {
    return [mockSignature, mockTeaSet, mockCase].map(mock => convertMockToProduct(mock, lang));
};

class ProductApi {
    /**
     * 제품 목록을 가져오는 함수
     * @param lang 언어 코드 (ko/en, 기본값: ko)
     * @returns Promise<ProductApiResponse>
     */
    static async getProducts(lang: string = 'ko'): Promise<ProductApiResponse> {
        try {
            const url = `${API_BASE_URL}/products/?lang=${lang}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // 항상 최신 데이터 가져오기
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ProductApiResponse = await response.json();
            
            // API 응답이 성공적이지만 결과가 없는 경우 Mock 데이터 사용
            if (!data.success || data.results.length === 0) {
                console.warn('API returned empty results, using mock data');
                const mockProducts = getMockProducts(lang);
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
            const mockProducts = getMockProducts(lang);
            return {
                success: true,
                language: lang,
                count: mockProducts.length,
                results: mockProducts
            };
        }
    }

    /**
     * 특정 제품 정보를 가져오는 함수 (ID로 필터링)
     * @param productId 제품 ID
     * @param lang 언어 코드 (ko/en, 기본값: ko)
     * @returns Promise<Product | null>
     */
    static async getProductById(productId: number, lang: string = 'ko'): Promise<Product | null> {
        try {
            const response = await this.getProducts(lang);
            const product = response.results.find(p => p.id === productId);
            return product || null;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }

    /**
     * 제품 데이터에서 필드 값 가져오기 헬퍼 함수
     * @param product 제품 객체
     * @param fieldName 필드명 (예: 'name', 'subtitle', 'description')
     * @returns 필드 값 또는 빈 문자열
     */
    static getLocalizedField(
        product: Product, 
        fieldName: keyof Product
    ): string {
        return (product[fieldName] as string) || '';
    }
}

export default ProductApi;
export type { 
    Product, 
    ProductImage, 
    ProductSpecification, 
    ProductApiResponse 
};