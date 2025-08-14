import { useTranslations } from "next-intl";
import Image from "next/image";
import GlossyPickHeader from "./GlossyPickHeader";
import styles from "./Intro.module.scss";

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  const t = useTranslations("test.intro");

  return (
    <div className={styles.intro}>
      <GlossyPickHeader />
      <p className={styles["intro__description"]}>{t("desc")}</p>
      <Image
        className={styles["intro__image"]}
        src="/images/glossy-pick/intro.webp"
        alt="글로시 말차 메뉴 이미지"
        width={1600}
        height={2133}
      />
      <button className="btn-g" onClick={onStart}>
        {t("start")}
      </button>
    </div>
  );
}
