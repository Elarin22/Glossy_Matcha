import { useTranslations } from "next-intl";
import { MenuInfo } from "@/types/matcha";
import Image from "next/image";
import styles from "./ResultSection.module.scss";
import GlossyPickHeader from "./GlossyPickHeader";

interface ResultSectionProps {
    menuInfo: MenuInfo;
    onShare: () => void;
    onDownload: () => void;
    onReset: () => void;
}

export default function ResultSection({
    menuInfo,
    onShare,
    onDownload,
    onReset,
}: ResultSectionProps) {
    const tMenu = useTranslations("test.menu");
    const tResult = useTranslations("test.result");

    return (
        <div id="result-section" className={styles.result}>
            <GlossyPickHeader />
            <p className={styles.result__title}>{tResult("title")}</p>

            <section className={styles["result__menu"]}>
                <h4 className="sr-only">글로시 메뉴 추천</h4>
                <Image
                    className={styles["result__image"]}
                    src={menuInfo.image}
                    alt={`${menuInfo.name} 이미지`}
                    width={300}
                    height={360}
                />
                <p className={styles["result__menuName"]}>
                    {tMenu(menuInfo.name)}
                </p>
                <div className={styles.result__tags}>
                    {menuInfo.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tMenu(tag)}
                        </span>
                    ))}
                </div>
                <p className={styles.result__menuDescription}>
                    {tMenu(menuInfo.description)}
                </p>
            </section>

            <div
                className={styles.result__actions}
                data-html2canvas-ignore="true"
            >
                <button onClick={onShare} className="btn-g">
                    {tResult("share")}
                </button>
                <button onClick={onDownload} className="btn-g">
                    {tResult("download")}
                </button>
                <button onClick={onReset} className="btn-g">
                    {tResult("reset")}
                </button>
            </div>
        </div>
    );
}
