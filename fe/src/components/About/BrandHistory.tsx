import Image from "next/image";
import { HistoryItem } from "@/types/history";
import styles from "./BrandHistory.module.scss";

/**
 * 브랜드 연혁 데이터 배열
 * 글로시 말차의 주요 이정표와 성과를 시간순으로 정리한 데이터
 */
const historyItems: HistoryItem[] = [
    { date: "2023.09", desc: ["'GLOSSY MATCHA' OPENING"] },
    { date: "2024.09", desc: ["Select shop 'WITH GLOSSY' OPENING"] },
    {
        date: "2024.12",
        desc: ["당 해년도 수출실적 2만불 달성", "(GLOSSY MATCHA 제품 포함)"],
    },
    {
        date: "2025.01",
        desc: [
            "2025 SIRHA 참여",
            "(Salon International de la Restauration,",
            "de l'Hôtellerie et de l'Alimentation)",
        ],
    },
    {
        date: "2025.05",
        desc: ["미국, 프랑스 POP-UP 진행 및 후속 수출 물량 협의"],
    },
    {
        date: "2025.06",
        desc: [
            "Lifestyle shoes collabo' 제품 출시 예정",
            "(w 뮬보이, 초록색 말차color 슬리퍼)",
        ],
    },
];

/**
 * 브랜드 연혁 섹션 컴포넌트
 *
 * 글로시 말차의 카페 전경 이미지와 함께 브랜드의 주요 연혁을
 * 시간순으로 표시하는 섹션을 렌더링합니다.
 *
 * @returns 브랜드 연혁 섹션 컴포넌트
 */
export default function BrandHistory() {
    return (
        <section id="history" className={styles["brand-history"]}>
            <Image
                className={styles["brand-history__image"]}
                src="/images/about/glossy-matcha.svg"
                alt="글로시말차 카페 전경 이미지"
                width={960}
                height={800}
            />

            <div className={styles["brand-history__content"]}>
                <h3 className={styles["brand-history__title"]}>
                    GLOSSY HISTORY
                </h3>
                <p className={styles["brand-history__location"]}>
                    제주특별자치도 제주시 조천읍 조함해안로 112 일대 (약 1천평)
                </p>

                <ul className={styles["brand-history__list"]}>
                    {historyItems.map((item) => (
                        <li key={item.date} className={styles["history-item"]}>
                            <time
                                className={styles["history-item__date"]}
                                dateTime={item.date.replace(".", "-")}
                            >
                                {item.date}
                            </time>
                            <div
                                className={
                                    styles["history-item__desc-wrapper"]
                                }
                            >
                                {item.desc.map((text, idx) => (
                                    <p
                                        key={idx}
                                        className={
                                            styles["history-item__desc"]
                                        }
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
