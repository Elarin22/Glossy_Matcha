"use client";

import dynamic from "next/dynamic";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import { useLocale, useMessages, useTranslations } from "next-intl";

const PcHome = dynamic(() => import("@/components/Home/PcHome/PcHome"), {
  ssr: false,
});
const MobileHome = dynamic(
  () => import("@/components/Home/MobileHome/MobileHome"),
  { ssr: false }
);

export interface HomeContent {
  title: string;
  slogan: string;
  subSlogan: string;
  description: string;
  source: string;
  sideBarImage?: string;
  link?: string;
  linkText?: string;
  sourceMb?: string; // Mobile version of the video
  isExternal?: boolean;
}

const homeContents: HomeContent[] = [
  {
    title: "브랜드 소개",
    slogan: "Life With Glossy",
    subSlogan: "모든 일상을 빛나는 순간으로 만듭니다.",
    description:
      "사람들의 모든 순간들을 반짝이는 순간들로 만들어 줄 글로시 말차는 단순히 말차를 판매하는 브랜드가 아닌 다양한 감성과 컨텐츠가 담긴 관계적 브랜드로 성장할 것을 약속합니다.",
    source: "/videos/intro-pc.webm",
    sourceMb: "/videos/intro-mb.mp4",
    link: "/about",
    linkText: "브랜드 소개",
  },
  {
    title: "카페 소개",
    slogan: "Cafe Glossy Matcha",
    subSlogan: "제주의 동쪽, 가장 뜨는 핫플",
    sideBarImage: "/images/home/cafe-location.webp",
    description:
      "제주특별자치도 조천읍 조함해안로 112 에서 제주산 최상급 말차를 사용한 음료와 디저트를 맛보며 멋진 바다 전경과 편안함 '쉼'을 경험해보세요.",
    source: "/images/home/cafe-glossy-matcha.webp",
    link: "https://www.google.com/maps/place/%EA%B8%80%EB%A1%9C%EC%8B%9C%EB%A7%90%EC%B0%A8(Glossy+matcha)/data=!3m1!4b1!4m6!3m5!1s0x350d1dc1714db5c1:0x999e71da31e8bd0b!8m2!3d33.5456823!4d126.6395823!16s%2Fg%2F11spxjp6gy?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    linkText: "카페 구경가기",
    isExternal: true,
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
  if (isMobile === null) return null;

  // const messages = useMessages() as { home: { homeContent: HomeContent[] } };

  // const homeContents = messages.home.homeContent;

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
