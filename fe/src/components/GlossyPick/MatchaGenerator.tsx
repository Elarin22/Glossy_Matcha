"use client";

import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { questions } from "@/data/questions";
import { menuData } from "@/data/menuData";
import { useMatchaQuiz } from "@/hooks/useMatchaQuiz";
import { useShare } from "@/hooks/useShare";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Intro from "./Intro";
import QuestionSection from "./QuestionSection";
import ResultSection from "./ResultSection";
import styles from "./MatchaGenerator.module.scss";

export default function MatchaGenerator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const {
    currentStep,
    setQuizState,
    handleAnswer,
    resetQuiz,
    startQuiz,
    goPrevStep,
    recommendation,
  } = useMatchaQuiz();

  const recommendedMenu = searchParams.get("recommendation");

  useEffect(() => {
    if (recommendedMenu) {
      setQuizState({
        currentStep: 5,
        answers: {},
      });
    }
  }, [recommendedMenu, setQuizState]);

  const displayedRecommendation = recommendedMenu || recommendation;

  const handlePrev = () => {
    goPrevStep();
  };

  const { shareResult } = useShare();

  const handleShare = () => {
    if (!displayedRecommendation) return;
    shareResult(displayedRecommendation);
  };

  const handleReset = () => {
    resetQuiz();
    router.replace(pathname);
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
          height={2397}
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

        {currentStep === 5 && displayedRecommendation && (
          <ResultSection
            menuInfo={menuData[displayedRecommendation]}
            onShare={handleShare}
            onReset={handleReset}
          />
        )}
        <ToastContainer position="bottom-center" autoClose={2000} />
      </section>
    </main>
  );
}
