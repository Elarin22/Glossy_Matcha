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
    return (
        <div id="result-section" className={styles.result}>
            <GlossyPickHeader />
            <p className={styles.result__title}>
                글로시 말차가 제안하는 당신만을 위한 한 잔
            </p>

            <section className={styles["result__menu"]}>
                <h4 className={styles["result__menuName"]}>{menuInfo.name}</h4>
                <Image
                    className={styles["result__image"]}
                    src={menuInfo.image}
                    alt={`${menuInfo.name} 이미지`}
                    width={230}
                    height={360}
                />
                <div className={styles.result__tags}>
                    {menuInfo.tags.map((tag, index) => (
                        <span key={index} className={styles.result__tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <p className={styles.result__menuDescription}>
                    {menuInfo.description}
                </p>
            </section>

            <div className={styles.result__actions}>
                <button onClick={onShare} className="btn-g">
                    공유하기
                </button>
                <button onClick={onDownload} className="btn-g">
                    저장하기
                </button>
                <button onClick={onReset} className="btn-g">
                    다시하기
                </button>
            </div>
        </div>
    );
}
