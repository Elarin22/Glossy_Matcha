import PcHome from "@/components/Home/PcHome/PcHome";
import MobileHome from "@/components/Home/MobileHome/MobileHome";
import { getMessages } from "next-intl/server";

export interface SubContent {
  title: string;
  subTitle: string;
  contents: string[];
}

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
  subContent: SubContent;
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const homeContents: HomeContent[] = [
    {
      title: messages.home.brand.title,
      slogan: messages.home.brand.slogan,
      subSlogan: messages.home.brand.subSlogan,
      description: messages.home.brand.description,
      source: "/videos/intro-pc.webm",
      sourceMb: "/videos/intro-mb.mp4",
      link: "/about",
      linkText: messages.home.brand.linkText,
      subContent: messages.home.brand.subContents,
    },
    {
      title: messages.home.cafe.title,
      slogan: messages.home.cafe.slogan,
      subSlogan: messages.home.cafe.subSlogan,
      description: messages.home.cafe.description,
      source: "/images/home/cafe-glossy-matcha-outside.webp",
      link: "https://www.google.com/maps/place/%EA%B8%80%EB%A1%9C%EC%8B%9C%EB%A7%90%EC%B0%A8(Glossy+matcha)/data=!3m1!4b1!4m6!3m5!1s0x350d1dc1714db5c1:0x999e71da31e8bd0b!8m2!3d33.5456823!4d126.6395823!16s%2Fg%2F11spxjp6gy?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
      linkText: messages.home.cafe.linkText,
      isExternal: true,
      sideBarImage: messages.home.cafe.sideBarImage,
      subContent: messages.home.cafe.subContents,
    },
    {
      title: messages.home.product.title,
      slogan: messages.home.product.slogan,
      subSlogan: messages.home.product.subSlogan,
      description: messages.home.product.description,
      source: "/images/home/glossy-signature.webp",
      link: "/products",
      linkText: messages.home.product.linkText,
      subContent: messages.home.product.subContents,
    },
    {
      title: messages.home.test.title,
      slogan: messages.home.test.slogan,
      subSlogan: messages.home.test.subSlogan,
      description: messages.home.test.description,
      source: "/images/home/glossy-pick.webp",
      link: "/test",
      linkText: messages.home.test.linkText,
      subContent: messages.home.test.subContents,
    },
  ];

  return (
    <>
      <PcHome contents={homeContents} />
      <MobileHome contents={homeContents} />
    </>
  );
}
