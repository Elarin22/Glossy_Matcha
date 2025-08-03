import Image from "next/image";
import { HistoryItem } from "@/types/history";

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

export default function BrandHistory() {
    return (
        <section id="history" className="brand-history">
            <Image
                className="brand-history__image"
                src="/images/about/glossy-matcha.svg"
                alt="글로시말차 카페 전경 이미지"
                width={960}
                height={800}
            />

            <div className="brand-history__content">
                <h3 className="brand-history__title">GLOSSY HISTORY</h3>
                <p className="brand-history__location">
                    제주특별자치도 제주시 조천읍 조함해안로 112 일대 (약 1천평)
                </p>

                <ul className="brand-history__list">
                    {historyItems.map((item) => (
                        <li key={item.date} className="history-item">
                            <time
                                className="history-item__date"
                                dateTime={item.date.replace(".", "-")}
                            >
                                {item.date}
                            </time>
                            {item.desc.map((text, idx) => (
                                <p key={idx} className="history-item__desc">
                                    {text}
                                </p>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
