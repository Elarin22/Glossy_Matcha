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
    description:
      "세레모니얼 말차 | 대나무 수액 | 코코넛슈가\n제주산 세레모니얼 등급 말차 원료와 대체당, 대나무수액, 코코넛슈가를 블렌딩한 은은한 단맛의 밸런스",
    description_en:
      "Ceremonial Matcha | Bamboo Sap | Coconut Sugar\nA subtle sweet balance blending Jeju ceremonial grade matcha with alternative sugar, bamboo sap, and coconut sugar",
    short_description:
      "* 글로시말차 시그니처는 실제 매장에서 사용되는 말차와 동일한 원료로 제작된 상품입니다.",
    short_description_en:
      "GlossyMatcha Signature is made with the same ingredients as the matcha used in actual stores.",

    images: [
      {
        id: 1,
        image: "/images/product/signature-mid-banner.png",
        alt_text_ko: "시그니처 제품 메인 이미지",
        alt_text_en: "Signature product main image",
      },
    ],
    specifications: [
      {
        id: 1,
        product_code: "SIG-001",
      },
    ],
  },
  {
    id: 2,
    name: "말차다구세트",
    name_en: "Matcha Tea Set",
    subtitle: "차 한 잔의 격을 더하다",
    subtitle_en: "Adding elegance to a cup of tea",
    description:
      "차선 | 사발 | 스픈 | 차탁\n글로시말차 매장의 감도를 담은 정제된 구성",
    description_en:
      "Tea Whisk | Bowl | Spoon | Tea Stand\nRefined composition capturing the sensibility of GlossyMatcha stores",
    short_description: "",
    short_description_en: "",

    images: [
      {
        id: 2,
        image: "/images/product/teaset-mid-banner.png",
        alt_text_ko: "말차다구세트 메인 이미지",
        alt_text_en: "Matcha tea set main image",
      },
    ],
    specifications: [
      {
        id: 2,
        product_code: "MTS-001",
      },
    ],
  },
  {
    id: 3,
    name: "틴케이스",
    name_en: "Tin Case",
    subtitle: "제주의 자연을 담은 100% HIGH QUALITY 유기농 말차",
    subtitle_en:
      "100% HIGH QUALITY organic matcha containing the nature of Jeju",
    description: "틴케이스 SET\n최상급 말차 50g + 우드스픈 + 틴케이스",
    description_en: "Tin Case SET\nPremium matcha 50g + Wood Spoon + Tin Case",
    short_description:
      "* 국산 말차에는 등급제가 없습니다만, 해외 등급표 기준을 만족하도록 첫순 1번 잎을 가지고 만든 세레모니얼 급 '유기농 말차' 입니다.",
    short_description_en:
      "* Although there is no grading system for domestic matcha, this is ceremonial grade 'organic matcha' made from first-harvest leaves to meet international grading standards.",

    images: [
      {
        id: 3,
        image: "/images/product/case-mid-banner.png",
        alt_text_ko: "틴케이스 메인 이미지",
        alt_text_en: "Tin case main image",
      },
    ],
    specifications: [
      {
        id: 3,
        product_code: "TIN-001",
      },
    ],
  },
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