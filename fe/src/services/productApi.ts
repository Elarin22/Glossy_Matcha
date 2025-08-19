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
    sub_description?: string;
    sub_description_en?: string;
    note?: string;
    note_en?: string;
    mid_banner_img?: string;
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

const mockProducts: Product[] = [
    {
      id: 1,
      name: "시그니처",
      name_en: "Signature",
      subtitle: "100% 제주 새봄의 첫 순을 담은 부드러운 말차 포켓",
      subtitle_en: "100% Premium Jeju First Spring Harvest Smooth Matcha Pocket",
      description: "세레모니얼 말차 | 대나무 수액 | 코코넛슈가 \n 제주산 세레모니얼 등급 말차 원료와 대체당, 대나무수액, 코코넛슈가를 블렌딩한 은은한 단맛의 밸런스",
      description_en: "Ceremonial Matcha | Bamboo Sap | Coconut Sugar",
      short_description: "* 글로시말차 시그니처는 실제 매장에서 사용되는 말차와 동일한 원료로 제작된 상품입니다.",
      short_description_en: "* GlossyMatcha Signature is made with the same ingredients as the matcha used in actual stores.",
      mid_banner_img: "||BANNER:/images/product/signature-mid-banner.png",
      note: "||DETAILS:/images/product/signature-details.jpg",
      note_en: "||DETAILS:/images/product/signature-details-en.jpg",
      sub_description: `말차, 이젠 쉽고 간편하게 즐겨요||귀찮고 복잡한 차선과 차완 대신, 오직 10g. 단 한 포로 손쉽게 말차 음료를 완성하세요.
  ---
  제주의 봄, 첫순으로만 만든 유기농 말차||국내에는 세레모니얼 등급의 인증기관이 없는 대신,\n글로시말차는 '일본 등급표 기준'을 만족하도록 봄의 '첫 순',\n 1번 잎으로 만든 진짜 세레모니얼 유기농 말차입니다.
  ---
  떫은 맛은 줄이고,\n신선한 향을 살린 깔끔한 피니쉬||말차는 고유의 떫고 쓴 맛으로 호불호가 있으나,\n글로시말차의 원료는 신선한 원료와 가공 노하우로 떫은 맛은 적고,\n크림처럼 부드러운 텍스쳐와 끝맛이 일품입니다.
  ---
  자연의 은은한 단 맛을 부담없이||대체당과 코코넛슈가, 대나무수액 원당의 블랜딩으로\n당류 부담은 낮추고, 인위적인 대체당의 맛 대신에\n원당의 자연스런 단맛과 풍미를 즐기세요.\n(1회 섭취량 기준 당류 1g)
  ---
  휴대성과 간편성은 더 강화한 감각적인 디자인||꽂아두기 쉬운 세로형 스틱과 슬라이드형 패키지.\n그리고 이지컷 방식으로 제작된 상단부로 더 편리해요`,
      sub_description_en: `Enjoy Matcha Easily, Anytime||Skip the whisk and bowl—just one 10g stick completes your matcha drink with ease.
  ---
  Organic Matcha from Jeju's First Spring Leaves||Although there is no ceremonial-grade certification body in Korea,\nGlossy Matcha meets Japan's ceremonial-grade standards, using the first flush and very first leaves of spring for true organic matcha.
  ---
  Smooth Finish with Reduced Bitterness||With fresh ingredients and refined processing techniques,\nGlossy Matcha reduces bitterness while enhancing a creamy texture and delivering a clean, refreshing finish.
  ---
  Naturally Gentle Sweetness||A blend of alternative sweeteners, coconut sugar, and bamboo sap sugar lowers sugar content,\nwhile replacing the artificial taste of substitutes with the natural sweetness and aroma of raw sugar.\n(Only 1g sugar per serving)
  ---
  Stylish, Portable Design||Easy-to-store vertical sticks and slide-out packaging,\nplus an easy-cut top for ultimate convenience.`,
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
        },
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
      subtitle_en: "Elevate Your Tea Experience",
      description: "차완 | 차선꽂이 | 차선 | 차시\n글로시말차 매장의 감도를 담은 정제된 구성",
      description_en: "Matcha Bowl | Whisk Holder | Bamboo Matcha Whisk | Long Matcha Scoop\nA refined set inspired by the elegance of Glossy Matcha stores",
      short_description: "",
      short_description_en: "",
      mid_banner_img: "||BANNER:/images/product/teaset-mid-banner.png",
      note: "||DETAILS:/images/product/teaset-details.jpg",
      note_en: "||DETAILS:/images/product/teaset-details-en.jpg",
      sub_description:
      `차완 | 말차 그릇||제주 로컬 아티스트와 협업한 고온소성(800~1200도) 백자 제품입니다.\n말차 격불 또는 일반 차 우림에 적합하며,\n초보자도 쉽게 사용할 수 있도록\n곡선,용량,높이 등을 정밀하게 설계했습니다.
      ---
      차선꽂이 | 차선 거치대||차선을 깔끔하게 건조하고 갈래를 잘 유지할 수 있도록\n안정적인 형태로 제작되었습니다.
      ---
      차선 | 말차용 대나무 거품기||100갈래 대나무 차선으로\n물과 말차가 잘 섞여 부드럽고 안정적인 거품을 만들어냅니다.
      ---
      차시 | 말차 긴 스픈||국내산대나무로 길고 가는 디자인으로\n말차가루를 보다 쉽고 편하게 덜 수 있습니다.
      `,           
      sub_description_en:
      `Matcha Bowl||A high-fired (800-1200°C) white porcelain bowl,\ncreated in collaboration with a local Jeju artist.\n
      Ideal for whisking matcha or steeping tea.\nCarefully designed with the right curves, volume,\nand height to ensure ease of use, even for beginners.
      ---
      Whisk Holder||Keeps your chasen clean and well-shaped after use.\nCrafted for stability and proper drying.
      ---
      Bamboo Matcha Whisk||Made from 100-prong bamboo.\nHelps mix water and matcha smoothly to create a rich, stable foam.
      ---
      Long Matcha Scoop||A long, slender scoop designed to easily\nand neatly portion matcha powder.`,       
      images: [
        {
          id: 2,
          image: "/images/product/teaset1.webp",
          alt_text_ko: "차완 말차 그릇",
          alt_text_en: "Matcha Bowl",
        },
        {
          id: 3,
          image: "/images/product/teaset2.webp",
          alt_text_ko: "차선꽂이 거치대",
          alt_text_en: "Chasen Stand",
        },
        {
          id: 4,
          image: "/images/product/teaset3.webp",
          alt_text_ko: "차선 대나무 거품기",
          alt_text_en: "Bamboo Whisk",
        },
        {
          id: 5,
          image: "/images/product/teaset4.webp",
          alt_text_ko: "차시 말차 긴 스픈",
          alt_text_en: "Bamboo Tea Scoop",
        },
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
      subtitle_en: "100% High-Quality Organic Matcha from Jeju's Nature",
      description: "틴케이스 SET\n최상급 말차 50g + 우드스픈 + 틴케이스",
      description_en: "Tin Case Set — 50g Premium Matcha + Wooden Spoon + Tin Case",
      short_description: "* 국산 말차에는 등급제가 없지만, 해외 기준을 만족하도록 첫순 1번 잎으로 만든 세레모니얼급 유기농 말차입니다.",
      short_description_en: "* While Korea has no official matcha grading system, this ceremonial-grade organic matcha meets international standards using only the first leaves of spring.",
      mid_banner_img: "||BANNER:/images/product/case-mid-banner.png",
      note: "||DETAILS:/images/product/case-details.jpg",
      note_en: "||DETAILS:/images/product/case-details-en.jpg",
      sub_description: 
      `GRADE||제주도의 청정자연을 담은 말차농원\n말차밭에서 매해 첫 순, 첫 번째 잎으로 생산해 낸 말차를 사용합니다.\n특별한 말차로 더 부드럽고, 더욱 진한 맛을 담아냈습니다.\n서귀포 생태공원에서 재배된 100% 말차만을 사용합니다.\n우리는 환경을 생각하는 마음으로 지속 가능한 미래를 그립니다.\n현지 농부, 장인분들과 함께 더 건강한 내일을 향해 나아가려고 합니다.
      ---
      PRICE||글로시말차는 오래도록 함께할 수 있는 방법을 고민합니다.\n오랜 노하우로 인한 가공기법과 유통 관리를 통해\n최고 품질의 말차만을 제공할 것을 약속합니다.\n시중에 판매중인 일반적인 말차의 판매가보다\n훨씬 합리적인 가격에 최상급 원료를 제공합니다.\n품질에 대한 자부심 그리고 공생할 수 있는 미래를 준비합니다.`,          
      sub_description_en:
      `GRADE||Jeju's Pristine Nature Captured in a Matcha Farm\nWe use matcha made from the first flush and the very first leaves harvested each year from our matcha fields.\nThis special matcha delivers a smoother and richer taste.\nWe use only 100% matcha cultivated in Seogwipo Ecological Park.\nWith a commitment to the environment, we envision a sustainable future.\nTogether with local farmers and artisans, we strive toward a healthier tomorrow.

      ---
      PRICE||Glossy Matcha is dedicated to finding ways for long-lasting enjoyment.\nThrough processing techniques and distribution management honed over years of expertise,\nwe promise to provide only the highest-quality matcha.\nCompared to the prices of typical matcha sold on the market,\nwe offer top-grade ingredients at far more reasonable prices.\nWe take pride in our quality and prepare for a future where we can thrive together.
      `,        
      images: [
        {
          id: 3,
          image: "/images/product/case1.webp",
          alt_text_ko: "틴케이스 등급",
          alt_text_en: "Tin case grade",
        },
        {
          id: 4,
          image: "/images/product/case2.webp",
          alt_text_ko: "틴케이스 가격",
          alt_text_en: "Tin case price",
        },
      ],
      specifications: [
        {
          id: 3,
          product_code: "TIN-001",
        }
      ],
    }
  ];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://x81fj32kd.glossymatcha.com/api";

class ProductApi {
  static async getProducts(lang: string = "ko"): Promise<ProductApiResponse> {
    try {
      const url = `${API_BASE_URL}/products/?lang=${lang}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductApiResponse = await response.json();

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

      return {
        success: true,
        language: lang,
        count: mockProducts.length,
        results: mockProducts,
      };
    }
  }

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
      return null;
    }
  }

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