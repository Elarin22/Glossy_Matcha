import { useState, useCallback } from "react";
import { AnswerType, QuizState } from "@/types/matcha";
import { getRecommendation } from "@/utils/matchaRecommendation";

/**
 * 사용자의 말차 퀴즈 진행 상태를 관리하고, 응답을 처리하며,
 * 최종 추천 결과를 반환하는 커스텀 훅입니다.
 *
 * @returns {{
 *   currentStep: number;                 // 현재 퀴즈 단계 (0: 초기, 1~4: 질문, 5: 결과)
 *   answers: AnswerType;                // 사용자의 응답 기록
 *   handleAnswer: (questionId: keyof AnswerType, answer: string) => void; // 응답 처리 함수
 *   resetQuiz: () => void;              // 퀴즈 상태 초기화 함수
 *   startQuiz: () => void;              // 퀴즈 시작 함수
 *   recommendation: string | null;      // 추천된 메뉴 key (최종 단계에서만 존재)
 * }}
 */
export const useMatchaQuiz = () => {
    const [quizState, setQuizState] = useState<QuizState>({
        currentStep: 0,
        answers: {},
    });

    /**
     * 특정 질문에 대한 사용자의 응답을 저장하고 다음 단계로 이동합니다.
     *
     * @param {keyof AnswerType} questionId - 질문 ID (예: 'style', 'mood' 등)
     * @param {string} answer - 사용자가 선택한 응답 key
     */
    const handleAnswer = useCallback(
        (questionId: keyof AnswerType, answer: string) => {
            setQuizState((prev) => {
                const newAnswers = { ...prev.answers, [questionId]: answer };
                const nextStep =
                    prev.currentStep < 4 ? prev.currentStep + 1 : 5;

                return {
                    currentStep: nextStep,
                    answers: newAnswers,
                };
            });
        },
        []
    );

    /**
     * 퀴즈 상태를 초기화합니다 (처음부터 다시 시작).
     */
    const resetQuiz = useCallback(() => {
        setQuizState({
            currentStep: 0,
            answers: {},
        });
    }, []);

    /**
     * 퀴즈를 시작하여 첫 번째 질문 단계로 이동합니다.
     */
    const startQuiz = useCallback(() => {
        setQuizState((prev) => ({ ...prev, currentStep: 1 }));
    }, []);

    const goPrevStep = useCallback(() => {
        setQuizState((prev) => {
            if (prev.currentStep > 1) {
                return {
                    ...prev,
                    currentStep: prev.currentStep - 1,
                };
            }
            return prev;
        });
    }, []);

    /**
     * 퀴즈가 끝난 경우(5단계)에 추천 결과를 반환합니다.
     */
    const recommendation =
        quizState.currentStep === 5
            ? getRecommendation(quizState.answers)
            : null;

    return {
        ...quizState,
        handleAnswer,
        resetQuiz,
        startQuiz,
        goPrevStep,
        recommendation,
    };
};
