import { AnswerType } from "@/types/matcha";
import { menuData } from "@/data/menuData";

/**
 * 사용자의 퀴즈 응답을 기반으로 가장 적합한 말차 메뉴를 추천합니다.
 *
 * @param {AnswerType} userAnswers - 사용자로부터 받은 4가지 질문에 대한 응답 객체
 * @returns {string} 추천된 메뉴의 key (menuData에서 해당 key로 메뉴 정보 조회 가능)
 *
 * @example
 * const userAnswers = {
 *   style: 'depth',
 *   mood: 'professional',
 *   purpose: 'caffeine',
 *   favorite: 'coffee'
 * };
 * const recommended = getRecommendation(userAnswers);
 * // → '제주, 오름'
 */
export const getRecommendation = (userAnswers: AnswerType): string => {
    const { style, mood, purpose, favorite } = userAnswers;

    const scores: Record<string, number> = {};
    Object.keys(menuData).forEach((menu) => {
        scores[menu] = 0;
    });

    // Q1: 말차 스타일
    if (style === "depth") {
        scores["제주, 오름"] += 3;
        scores["말차 스트레이트"] += 3;
        scores["글로시 말차 라떼"] += 1;
    } else if (style === "sweet") {
        scores["말차 슈페너"] += 3;
        scores["글로시 말차 라떼"] += 2;
        scores["보리크림 말차 라떼"] += 2;
    } else if (style === "visual") {
        scores["말차 슈페너"] += 3;
        scores["글로시 말차 모히또"] += 2;
        scores["코코넛 말차 쉐이크"] += 2;
    } else if (style === "fresh") {
        scores["글로시 말차 모히또"] += 3;
        scores["그린 레몬에이드"] += 3;
        scores["말차 스트레이트"] += 1;
    }

    // Q2: 무드
    if (mood === "professional") {
        scores["제주, 오름"] += 2;
        scores["말차 스트레이트"] += 2;
        scores["글로시 말차 라떼"] += 1;
    } else if (mood === "natural") {
        scores["말차 스트레이트"] += 2;
        scores["보리크림 말차 라떼"] += 2;
        scores["글로시 말차 라떼"] += 1;
    } else if (mood === "cheerful") {
        scores["글로시 말차 모히또"] += 2;
        scores["그린 레몬에이드"] += 2;
        scores["코코넛 말차 쉐이크"] += 2;
    } else if (mood === "minimal") {
        scores["말차 스트레이트"] += 2;
        scores["글로시 말차 라떼"] += 1;
    }

    // Q3: 목적
    if (purpose === "thirst") {
        scores["그린 레몬에이드"] += 3;
        scores["글로시 말차 모히또"] += 2;
        scores["코코넛 말차 쉐이크"] += 1;
    } else if (purpose === "caffeine") {
        scores["제주, 오름"] += 3;
        scores["말차 스트레이트"] += 3;
        scores["글로시 말차 라떼"] += 1;
    } else if (purpose === "healing") {
        scores["글로시 말차 라떼"] += 2;
        scores["보리크림 말차 라떼"] += 2;
        scores["말차 슈페너"] += 1;
    } else if (purpose === "health") {
        scores["말차 스트레이트"] += 3;
        scores["제주, 오름"] += 2;
    }

    // Q4: 선호 음료
    if (favorite === "coffee") {
        scores["제주, 오름"] += 2;
        scores["말차 스트레이트"] += 2;
    } else if (favorite === "herbal") {
        scores["말차 스트레이트"] += 2;
        scores["보리크림 말차 라떼"] += 1;
    } else if (favorite === "refreshing") {
        scores["그린 레몬에이드"] += 3;
        scores["글로시 말차 모히또"] += 3;
        scores["코코넛 말차 쉐이크"] += 2;
    } else if (favorite === "milk") {
        scores["글로시 말차 라떼"] += 3;
        scores["말차 슈페너"] += 2;
        scores["보리크림 말차 라떼"] += 2;
    }

    return Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );
};
