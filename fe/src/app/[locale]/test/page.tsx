import MatchaGenerator from "@/components/GlossyPick/MatchaGenerator";

export async function generateMetadata() {
  return {
    title: "Glossy Pick | Glossy Matcha",
    description:
      "몇 가지 질문에 답하면, 당신에게 어울리는 글로시 말차 메뉴를 추천해드려요.",
    keywords: [
      "말차",
      "프리미엄 말차",
      "글로시 말차",
      "녹차",
      "건강음료",
      "프리미엄",
      "메뉴 추천",
      "체험형 콘텐츠",
      "음료 추천",
    ],
    openGraph: {
      title: "Glossy Pick | Glossy Matcha",
      description: "단 하나, 당신만을 위한 글로시 말차",
      url: "https://www.glossymatcha.com/ko/test",
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
}

export default function test() {
  return <MatchaGenerator />;
}
