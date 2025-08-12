// 제품 이미지 타입 (백엔드 API 응답 구조)
interface ProductImage {
  id: number;
  image: string;
  alt_text_ko?: string;
  alt_text_en?: string;
}

// 제품 스펙 타입
interface ProductSpecification {
  id: number;
  product_code?: string;
}

// 제품 섹션 타입 (body_sections)
interface ProductBodySection {
  id?: number;
  image?: string;
  title?: string;
  title_en?: string;
  content?: string;
  content_en?: string;
  sort_order: number;
}

// 제품 메인 타입
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
    sub_description?: string;
    sub_description_en?: string;
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

// 임시 Mock 데이터 (API 에러 시 fallback용)
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
      sub_description: `말차, 이젠 쉽고 간편하게 즐겨요||귀찮고 복잡한 차선과 차완 대신, 오직 10g. 단 한 포로 손쉽게 말차 음료를 완성하세요.
  ---
  제주의 봄, 첫순으로만 만든 유기농 말차||국내에는 세레모니얼 등급의 인증기관이 없는 대신, 글로시말차는 '일본 등급표 기준'을 만족하도록 봄의 '첫 순', 1번 잎으로 만든 진짜 세레모니얼 유기농 말차입니다.
  ---
  떫은 맛은 줄이고, 신선한 향을 살린 깔끔한 피니쉬||말차는 고유의 떫고 쓴 맛으로 호불호가 있으나, 글로시말차의 원료는 신선한 원료와 가공 노하우로 떫은 맛은 적고, 크림처럼 부드러운 텍스쳐와 끝맛이 일품입니다.
  ---
  자연의 은은한 단 맛을 부담없이||대체당과 코코넛슈가, 대나무수액 원당의 블랜딩으로 당류 부담은 낮추고, 인위적인 대체당의 맛 대신에 원당의 자연스런 단맛과 풍미를 즐기세요. (1회 섭취량 기준 당류 1g)
  ---
  휴대성과 간편성은 더 강화한 감각적인 디자인||꽂아두기 쉬운 세로형 스틱과 슬라이드형 패키지. 그리고 이지컷 방식으로 제작된 상단부로 더 편리해요`,
      sub_description_en: `Enjoy Matcha Easily, Anytime||Skip the whisk and bowl—just one 10g stick makes the perfect cup of matcha.
  ---
  Organic Matcha from Jeju's First Spring Leaves||Using only the first leaves of spring, Glossy Matcha meets Japan's ceremonial-grade standards for true organic matcha.
  ---
  Smooth Finish with Reduced Bitterness||Less bitterness, more freshness—creamy texture with a clean finish.
  ---
  Naturally Gentle Sweetness||A low-sugar blend of natural sweeteners and bamboo sap for a light, pleasant sweetness. Only 1g sugar per serving.
  ---
  Stylish, Portable Design||Vertical sticks, slide-out packaging, and easy-cut tops for ultimate convenience.`,
      images: [
        {
          id: 1,
          image: "/images/product/signature1.jpg",
          alt_text_ko: "말차 간편 음용",
          alt_text_en: "Easy Matcha Drinking",
        },
        {
          id: 2,
          image: "/images/product/signature2.jpg",
          alt_text_ko: "제주 유기농 말차",
          alt_text_en: "Jeju Organic Matcha",
        },
        {
          id: 3,
          image: "/images/product/signature3.jpg",
          alt_text_ko: "깔끔한 피니쉬",
          alt_text_en: "Clean Finish",
        },
        {
          id: 4,
          image: "/images/product/signature4.jpg",
          alt_text_ko: "자연스러운 단맛",
          alt_text_en: "Natural Sweetness",
        },
        {
          id: 5,
          image: "/images/product/signature5.jpg",
          alt_text_ko: "감각적인 디자인",
          alt_text_en: "Stylish Design",
        }
      ],
      specifications: [
        {
          id: 1,
          product_code: "SIG-001",
        }
      ],
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
      sub_description: "",           
      sub_description_en: "",       
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
    },
    {
      id: 3,
      name: "틴케이스",
      name_en: "Tin Case",
      subtitle: "제주의 자연을 담은 100% HIGH QUALITY 유기농 말차",
      subtitle_en: "100% HIGH QUALITY organic matcha containing the nature of Jeju",
      description: "틴케이스 SET",
      description_en: "Tin Case SET",
      sub_description: "",          
      sub_description_en: "",        
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
    }
  ];

const API_BASE_URL = "https://api.glossymatcha.com/api/products";

class ProductApi {
  /**
   * 제품 목록을 가져오는 함수
   * @param lang 언어 코드 (ko/en, 기본값: ko)
   * @returns Promise<ProductApiResponse>
   */
  static async getProducts(lang: string = "ko"): Promise<ProductApiResponse> {
    try {
      const url = `${API_BASE_URL}/?lang=${lang}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // 항상 최신 데이터 가져오기
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductApiResponse = await response.json();

      // API 응답이 성공적이지만 결과가 없는 경우 Mock 데이터 사용
      if (!data.success || data.results.length === 0) {
        console.warn("API returned empty results, using mock data");
        return {
          success: true,
          language: lang,
          count: mockProducts.length,
          results: mockProducts,
        };
      }

      return data;
    } catch (error) {
      console.error("Error fetching products, using mock data:", error);

      // API 에러 시 Mock 데이터 반환
      return {
        success: true,
        language: lang,
        count: mockProducts.length,
        results: mockProducts,
      };
    }
  }

  /**
   * 특정 제품 정보를 가져오는 함수 (ID로 필터링)
   * @param productId 제품 ID
   * @param lang 언어 코드 (ko/en, 기본값: ko)
   * @returns Promise<Product | null>
   */
  static async getProductById(
    productId: number,
    lang: string = "ko"
  ): Promise<Product | null> {
    try {
      const response = await this.getProducts(lang);
      const product = response.results.find((p) => p.id === productId);
      return product || null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  /**
   * 제품 데이터에서 언어별 필드 값 가져오기 헬퍼 함수
   * @param product 제품 객체
   * @param fieldName 필드명 (예: 'name', 'subtitle', 'description')
   * @param lang 언어 코드
   * @returns 해당 언어의 필드 값 또는 기본값
   */
  static getLocalizedField(
    product: Product,
    fieldName: keyof Product,
    lang: string = "ko"
  ): string {
    if (lang === "en") {
      const enFieldName = `${String(fieldName)}_en` as keyof Product;
      const enValue = product[enFieldName] as string;
      if (enValue && enValue.trim()) {
        return enValue;
      }
    }

    return (product[fieldName] as string) || "";
  }

  /**
   * 제품 섹션에서 언어별 필드 값 가져오기
   * @param section 섹션 객체
   * @param fieldName 필드명
   * @param lang 언어 코드
   * @returns 해당 언어의 필드 값 또는 기본값
   */
  static getLocalizedSectionField(
    section: ProductBodySection,
    fieldName: "title" | "content",
    lang: string = "ko"
  ): string {
    if (lang === "en") {
      const enFieldName = `${fieldName}_en` as keyof ProductBodySection;
      const enValue = section[enFieldName] as string;
      if (enValue && enValue.trim()) {
        return enValue;
      }
    }

    return (section[fieldName] as string) || "";
  }
}

export default ProductApi;
export type {
  Product,
  ProductImage,
  ProductSpecification,
  ProductBodySection,
  ProductApiResponse,
};