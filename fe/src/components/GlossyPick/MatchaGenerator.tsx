"use client";

import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { questions } from "@/data/questions";
import { menuData } from "@/data/menuData";
import { useMatchaQuiz } from "@/hooks/useMatchaQuiz";
import { useShare } from "@/hooks/useShare";
import { useDownload } from "@/hooks/useDownload";
import Intro from "./Intro";
import QuestionSection from "./QuestionSection";
import ResultSection from "./ResultSection";
import styles from "./MatchaGenerator.module.scss";

export default function MatchaGenerator() {
    const {
        currentStep,
        handleAnswer,
        resetQuiz,
        startQuiz,
        goPrevStep,
        recommendation,
    } = useMatchaQuiz();

    const handlePrev = () => {
        goPrevStep();
    };

    const { shareResult } = useShare();

    const { downloadImage } = useDownload();

    const handleShare = () => {
        if (!recommendation) return;
        shareResult(recommendation);
    };

    const handleDownload = () => {
        if (!recommendation) return;

        // iOS 여부 체크
        const isIOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !(window as unknown as { MSStream?: unknown }).MSStream;

        if (isIOS) {
            // iOS는 빈 새창을 먼저 열어줌
            const newWindow = window.open("", "_blank");
            if (newWindow) {
                downloadImage(
                    "result-section",
                    `${menuData[recommendation].name}.png`,
                    newWindow
                );
            } else {
                alert(
                    "새 창 열기가 차단되었습니다. 팝업 차단 해제 후 다시 시도해주세요."
                );
            }
        } else {
            // iOS 아니면 그냥 다운로드 실행
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
                    src="/images/glossy-pick/main-banner.webp"
                    alt="체험형 콘텐츠 메인 배너"
                    width={1920}
                    height={720}
                    priority
                />
            </section>
            <section className={styles["matcha-generator__section"]}>
                {currentStep === 0 && <Intro onStart={startQuiz} />}

                {currentStep >= 1 && currentStep <= 4 && (
                    <QuestionSection
                        question={questions[currentStep - 1]}
                        currentStep={currentStep}
                        onAnswer={handleAnswer}
                        onPrev={handlePrev}
                    />
                )}

                {currentStep === 5 && recommendation && (
                    <ResultSection
                        menuInfo={menuData[recommendation]}
                        onShare={handleShare}
                        onDownload={handleDownload}
                        onReset={resetQuiz}
                    />
                )}
                <ToastContainer position="bottom-center" autoClose={2000} />
            </section>
        </main>
    );
}
