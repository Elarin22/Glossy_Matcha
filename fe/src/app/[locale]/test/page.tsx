import MatchaGenerator from "@/components/GlossyPick/MatchaGenerator";

export const metadata = {
  title: "Glossy Pick | Glossy Matcha",
  description: "단 하나, 당신만을 위한 글로시 말차",
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
  },
};

export default function test() {
  return <MatchaGenerator />;
}
