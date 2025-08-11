import { useTranslations } from "next-intl";
import styles from "./GlossyPickHeader.module.scss";

export default function GlossyPickHeader() {
    const t = useTranslations("test.header");

    return (
        <header className={styles["glossy-pick-header"]}>
            <h3 className={styles["glossy-pick-header__title"]}>
                {t("title")}
            </h3>
            <p className={styles["glossy-pick-header__subtitle"]}>
                {t("sub-title")}
            </p>
        </header>
    );
}
