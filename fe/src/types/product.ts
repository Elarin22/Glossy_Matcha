// 제품 이미지 타입
export interface ProductImage {
    id: number;
    product: number; // 제품 ID 
    image: string; // 이미지 URL
    alt_text_ko: string; // 이미지 설명 (한국어)
    alt_text_en: string; // 이미지 설명 (영어)
    created_at: string; // ISO 날짜
}

// 제품 상세 스펙 타입
export interface ProductSpecification {
    id: number;
    product: number;
    product_code: string;
    created_at: string;
    updated_at: string;
}

// 메인 제품 타입
export interface Product {
    id: number;
    name: string;
    name_en: string;
    subtitle: string;
    subtitle_en: string;
    description: string;
    description_en: string;
    short_description: string;
    short_description_en: string;
    sub_description: string;
    sub_description_en: string;
    note: string;
    note_en: string;
    created_at: string;
    updated_at: string;
    images: ProductImage[];
    specifications: ProductSpecification[];
}

// 제품 목록 응답 타입 (Pagination)
export interface ProductsApiResponse {
    results: Product[];
    count: number;
    next: string | null;
    previous: string | null;
}

// 단일 제품 조회 응답 타입
export interface ProductApiResponse {
    product: Product;
}

// 제품 목록 필터링에 사용되는 쿼리 파라미터 타입
export interface ProductFilters {
    search?: string;
    ordering?: string;
    limit?: number;
    offset?: number;
}
