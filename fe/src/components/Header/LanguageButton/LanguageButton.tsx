"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import styles from "./LanguageButton.module.scss";

export default function LanguageButton({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const newLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      className={styles["lang-btn"]}
      aria-label={t("language")}
      onClick={handleClick}
    >
      <img src="/images/icon/world.svg" alt="" />
      <span>{locale === "ko" ? "en" : "ko"}</span>
    </button>
  );
}
