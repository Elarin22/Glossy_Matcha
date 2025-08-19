"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProductApi, { type Product } from "../../services/productApi";
import { TextFormatter } from "../../utils/textFormatter";
import styles from "./ProductMidBanner.module.scss";

interface ProductMidBannerProps {
  productId?: number;
  lang?: string;
}

const ProductMidBanner: React.FC<ProductMidBannerProps> = ({
  productId = 1,
  lang = "ko",
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      
  const getMainImage = () => {
    if (product?.mid_banner_img) {
      if (product.mid_banner_img.includes('||BANNER:')) {
        return product.mid_banner_img.split('||BANNER:')[1];
      }
      return product.mid_banner_img;
    }
    return product?.images?.[0]?.image ?? null;
  };
  
  const getImageAltText = () => {
    const image = product?.images?.[0];
    if (!image) return "";
    return lang === "en"
      ? image.alt_text_en || ""
      : image.alt_text_ko || getProductName();
  };


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

  const productName = getProductName();
  const productSubtitle = getProductSubtitle();
  const productDescription = getProductDescription();
  const productShortDescription = getProductShortDescription();
  const mainImage = getMainImage();
  const imageAltText = getImageAltText();

  return (
    <section className={styles.midBanner}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          {productName && (
            <h2 className={styles.productName}>
              <TextFormatter text={productName} />
            </h2>
          )}
          
          {productSubtitle && (
            <h3 className={styles.productSubtitle}>
              <TextFormatter text={productSubtitle} />
            </h3>
          )}
          
          {productDescription && (
            <div className={styles.productDescription}>
              <TextFormatter text={productDescription} />
            </div>
          )}
          
          {productShortDescription && (
            <div className={styles.productNote}>
              <TextFormatter text={productShortDescription} />
            </div>
          )}
        </div>
      </div>

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