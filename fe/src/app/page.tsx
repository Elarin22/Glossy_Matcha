"use client";

import styles from "./Home.module.scss";
import { useEffect, useRef, useState } from "react";
import SideInfo from "@/components/Home/SideInfo/SideInfo";
import ImageSection from "@/components/Home/ImageSection/ImageSection";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import MobileHome from "@/components/Home/MobileHome/MobileHome";
import PcHome from "@/components/Home/PcHome/PcHome";

export interface HomeContent {
  title: string;
  slogan: string;
  subSlogan: string;
  description: string;
  source: string;
  sideBarImage?: string;
  link?: string;
  linkText?: string;
}

const homeContents: HomeContent[] = [
  {
    title: "브랜드 소개",
    slogan: "Life With Glossy",
    subSlogan: "모든 일상을 빛나는 순간으로 만듭니다.",
    description:
      "사람들의 모든 순간들을 반짝이는 순간들로 만들어 줄 글로시 말차는 단순히 말차를 판매하는 브랜드가 아닌 다양한 감성과 컨텐츠가 담긴 관계적 브랜드로 성장할 것을 약속합니다.",
    source: "/videos/intro-mb.webm",
  },
  {
    title: "카페 소개",
    slogan: "Cafe Glossy Matcha",
    subSlogan: "제주의 동쪽, 가장 뜨는 핫플",
    sideBarImage: "/images/home/cafe-location.png",
    description:
      "제주특별자치도 조천읍 조함해안로 112 에서 제주산 최상급 말차를 사용한 음료와 디저트를 맛보며 멋진 바다 전경과 편안함 '쉼'을 경험해보세요.",
    source: "/images/home/cafe-glossy-matcha.webp",
    link: "/about",
    linkText: "브랜드 소개",
  },
  {
    title: "제품 소개",
    slogan: "Glossy Signature",
    subSlogan: "자연의 원당과 대체당으로 블랜딩한 최적의 달콤함",
    description:
      "선조들로부터 이어진 전통 가공방식을 고수해 떫은 맛은 줄고 섬세하고 부드러운 깔끔한 끝맛으로 초심자들도 맛있게 드실 수 있어요.",
    source: "/images/home/glossy-signature.webp",
    link: "/products",
    linkText: "제품 소개",
  },
  {
    title: "말차 테스트",
    slogan: "Glossy Pick",
    subSlogan: "단 하나, 당신만을 위한 글로시 말차",
    description:
      "말차 스트레이트? 말차 모히또? 말차 라떼? 나와 어울리는 말차 메뉴를 찾고 글로시 말차에서 즐겨보세요!",
    source: "/images/home/matcha-test.webp",
    link: "/test",
    linkText: "테스트 바로가기",
  },
];

export default function Home() {
  const isMobile = useMobileDetect();

  // mobile에서 순간적으로 pc가 보이는 문제 해결
  // if (isMobile === null) return null;

  return (
    <>
      {!isMobile ? (
        <PcHome contents={homeContents} />
      ) : (
        <MobileHome contents={homeContents} />
      )}
    </>
  );
}
