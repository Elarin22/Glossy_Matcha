"use client";

// === 제품 미드 배너 컴포넌트 ===

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProductApi, { type Product } from "../../services/productApi";
import styles from "./ProductMidBanner.module.scss";

interface ProductMidBannerProps {
  productId?: number;
  lang?: string;
}

const ProductMidBanner: React.FC<ProductMidBannerProps> = ({
  productId = 1,
  lang = "ko",
}) => {
  // === 상태 관리 ===
  const [product, setProduct] = useState<Product | null>(null);    // 제품 정보
  const [loading, setLoading] = useState(true);                   // 로딩 상태
  const [error, setError] = useState<string | null>(null);        // 에러 내용

  // === 제품 데이터 로드 ===
  // productId나 언어가 변경될 때마다 제품 정보 재로드
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const productData = await ProductApi.getProductById(productId, lang);
        setProduct(productData);

        if (!productData) {
          setError("제품 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("제품 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, lang]);

  // === 데이터 추출 헬퍼 함수들 ===
  // 언어에 따른 제품 정보 추출
  const getProductName = () =>
    product ? ProductApi.getLocalizedField(product, "name", lang) : "";
  const getProductSubtitle = () =>
    product ? ProductApi.getLocalizedField(product, "subtitle", lang) : "";
  const getProductDescription = () =>
    product ? ProductApi.getLocalizedField(product, "description", lang) : "";
  const getProductShortDescription = () =>
    product
      ? ProductApi.getLocalizedField(product, "short_description", lang)
      : "";
      
  // 메인 이미지 추출 (mid_banner_img 우선, 없으면 첫 번째 이미지 사용)
  const getMainImage = () => {
    if (product?.mid_banner_img) {
      // ||BANNER: 형태로 저장된 경우 파싱
      if (product.mid_banner_img.includes('||BANNER:')) {
        return product.mid_banner_img.split('||BANNER:')[1];
      }
      return product.mid_banner_img;
    }
    // fallback: 첫 번째 이미지 사용
    return product?.images?.[0]?.image ?? null;
  };
  
  // 이미지 alt 텍스트 추출
  const getImageAltText = () => {
    const image = product?.images?.[0];
    if (!image) return "";
    return lang === "en"
      ? image.alt_text_en || ""
      : image.alt_text_ko || getProductName();
  };

  // === 모바일 텍스트 처리 헬퍼 ===
  // 제품별로 정의된 단어 단위 줄바꿈 처리
  const wrapWordsForMobile = (
    text: string,
    type: "subtitle" | "description" | "shortDescription"
  ) => {
    if (!text) return text;

    const words = text.split(" ");
    // 제품별, 타입별 줄바꿈 위치 정의
    const breakpoints = (() => {
      // 시그니처 제품 (ID: 1)
      if (productId === 1 && type === "subtitle") return [6];
      if (productId === 1 && type === "description") {
        return [5, 8];
      }
      if (productId === 1 && type === "shortDescription") return [7];

      // 틴케이스 제품 (ID: 3)
      if (productId === 3 && type === "shortDescription") return [5, 9, 14];
      return [];
    })();

    return words.map((word, index) => (
      <React.Fragment key={index}>
        <span className={styles.word}>{word}</span>
        {index < words.length - 1 && " "}
        {breakpoints.includes(index + 1) && (
          <br className={styles.mobileBreak} />
        )}
      </React.Fragment>
    ));
  };

  // === 로딩 상태 처리 ===
  if (loading) {
    return (
      <section className={styles.midBanner}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonSubtitle}></div>
            <div className={styles.skeletonDescription}></div>
          </div>
          <div className={styles.fullWidthImageContainer}>
            <div className={styles.skeletonImage}></div>
          </div>
        </div>
      </section>
    );
  }

  // === 에러 상태 처리 ===
  if (error || !product) {
    return (
      <section className={styles.midBanner}>
        <div className={styles.container}>
          <div className={styles.errorMessage}>
            <p>
              {error ||
                (lang === "en"
                  ? "Product information not found."
                  : "제품 정보를 찾을 수 없습니다.")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // === 렌더링 데이터 준비 ===
  const productName = getProductName();
  const productSubtitle = getProductSubtitle();
  const productDescription = getProductDescription();
  const productShortDescription = getProductShortDescription();
  const mainImage = getMainImage();
  const imageAltText = getImageAltText();

  // === 렌더링 ===
  return (
    <section className={styles.midBanner}>
      {/* 제품 정보 텍스트 섹션 */}
      <div className={styles.container}>
        <div className={styles.textContent}>
          {/* 제품명 */}
          {productName && <h2 className={styles.productName}>{productName}</h2>}
          
          {/* 제품 부제목 */}
          {productSubtitle && (
            <h3 className={styles.productSubtitle}>
              {wrapWordsForMobile(productSubtitle, "subtitle")}
            </h3>
          )}
          
          {/* 제품 설명 */}
          {productDescription && (
            <div className={styles.productDescription}>
              {productDescription.split("\n").map((line, index) => (
                <p key={index}>{wrapWordsForMobile(line, "description")}</p>
              ))}
            </div>
          )}
          
          {/* 제품 짧은 설명 (주의사항 등) */}
          {productShortDescription && (
            <div className={styles.productNote}>
              <p>
                {wrapWordsForMobile(
                  productShortDescription,
                  "shortDescription"
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 제품 이미지 */}
      {mainImage && (
        <div className={styles.fullWidthImageContainer}>
          <Image
            src={mainImage}
            alt={imageAltText}
            width={0}
            height={0}
            sizes="100vw"
            className={styles.fullWidthImage}
          />
        </div>
      )}
    </section>
  );
};

export default ProductMidBanner;