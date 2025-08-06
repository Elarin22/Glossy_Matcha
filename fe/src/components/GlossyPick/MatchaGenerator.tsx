"use client";

import Image from "next/image";

import { questions } from "@/data/questions";
import { menuData } from "@/data/menuData";
import { useMatchaQuiz } from "@/hooks/useMatchaQuiz";
import { useShare } from "@/hooks/useShare";
import { useDownload } from "@/hooks/useDownload";
import Intro from "./Intro";
import styles from "./MatchaGenerator.module.scss";

export default function MatchaGenerator() {
    const {
        currentStep,
        answers,
        handleAnswer,
        resetQuiz,
        startQuiz,
        recommendation,
    } = useMatchaQuiz();

    const { shareResult } = useShare();

    const { downloadImage } = useDownload();

    const handleShare = () => {
        if (!recommendation) return;
        shareResult(recommendation);
    };

    const handleDownload = () => {
        if (recommendation) {
            downloadImage(
                "result-section",
                `${menuData[recommendation].name}.png`
            );
        }
    };

    return (
        <main className={styles["matcha-generator"]}>
            <section>
                <h2 className="sr-only">글로시 말차 체험형 콘텐츠 페이지</h2>
                <Image
                    className={styles["matcha-generator__banner"]}
                    src="/images/glossy-pick/main-banner.svg"
                    alt="체험형 콘텐츠 메인 배너"
                    width={1920}
                    height={720}
                    priority
                />
            </section>
            <section className={styles["matcha-generator__section"]}>
                {currentStep === 0 && <Intro onStart={startQuiz} />}
            </section>
        </main>
    );
}
