import React from "react";
import InquirePage from "@/components/Inquire/InquirePage";
import { Metadata } from "next";

/**
 * 문의 페이지의 메타데이터를 생성합니다.
 * SEO와 Open Graph용으로 사용됩니다.
 * @returns {Metadata} Next.js에서 사용하는 메타데이터 객체
 */
export const generateMetadata = () => {
  return {
    title: "Contact | Glossy Matcha",
    description: "글로시 말차 문의하기 페이지 - 문의를 작성해보세요.",
    keywords: ["말차", "프리미엄 말차", "글로시 말차", "문의", "Contact"],
    openGraph: {
      title: "문의하기 | Glossy Matcha",
      description: "글로시 말차 문의하기 페이지 - 문의를 작성해보세요.",
      url: "https://www.glossymatcha.com/ko/inquire",
      images: [
        {
          url: "/images/logo/logo-BI.png",
          width: 1200,
          height: 630,
          alt: "Glossy Matcha",
        },
      ],
    },
  };
};

/**
 * 문의 페이지 컴포넌트
 * @returns {JSX.Element} 문의 페이지 렌더링
 */
export default function Inquire() {
  return <InquirePage />;
}
