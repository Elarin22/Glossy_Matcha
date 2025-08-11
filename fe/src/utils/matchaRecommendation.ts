import { AnswerType } from "@/types/matcha";
import { menuData } from "@/data/menuData";

// menuData의 키를 타입 안전하게 추출
type MenuKey = keyof typeof menuData;

/**
 * 메뉴 키들을 상수로 정의 (타입 체크 + 자동완성 지원)
 * @constant {Record<string, MenuKey>}
 */
const MENU_KEYS: Record<string, MenuKey> = {
    JEJU_OREUM: "jeju-oreum",
    MATCHA_STRAIGHT: "matcha-straight",
    GLOSSY_MATCHA_LATTE: "matcha-latte",
    MATCHA_SCHPENER: "matcha-spanner",
    BARLEY_CREAM_MATCHA_LATTE: "matcha-barley",
    GLOSSY_MATCHA_MOJITO: "matcha-mojito",
    GREEN_LEMONADE: "green-lemonade",
} as const;

/**
 * 사용자의 설문 응답을 기반으로 최적의 마차 메뉴를 추천합니다.
 *
 * @description
 * 4가지 질문(스타일, 무드, 목적, 선호 음료)의 답변을 토대로
 * 각 메뉴에 점수를 부여하고, 가장 높은 점수를 받은 메뉴를 추천합니다.
 * 동점일 경우 랜덤하게 선택됩니다.
 *
 * @param {AnswerType} userAnswers - 사용자의 설문 응답
 * @param {string} userAnswers.style - 선호하는 스타일 ("depth" | "sweet" | "visual" | "fresh")
 * @param {string} userAnswers.mood - 원하는 무드 ("professional" | "natural" | "cheerful" | "minimal")
 * @param {string} userAnswers.purpose - 음료를 마시는 목적 ("thirst" | "caffeine" | "healing" | "health")
 * @param {string} userAnswers.favorite - 선호하는 음료 타입 ("coffee" | "herbal" | "refreshing" | "milk")
 *
 * @returns {string} 추천된 메뉴의 키값 (MenuKey)
 *
 * const recommendedMenu = getRecommendation(answers);
 * console.log(recommendedMenu); // "matcha-latte" (예시)
 *
 */
export const getRecommendation = (userAnswers: AnswerType): string => {
    const { style, mood, purpose, favorite } = userAnswers;

    const scores: Record<MenuKey, number> = {};

    // menuData의 모든 키로 scores 초기화
    (Object.keys(menuData) as MenuKey[]).forEach((menu) => {
        scores[menu] = 0;
    });

    // Q1: 스타일
    if (style === "depth") {
        scores[MENU_KEYS.JEJU_OREUM] += 1;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 3;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 4;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
    } else if (style === "sweet") {
        scores[MENU_KEYS.JEJU_OREUM] += 4;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 1;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 4;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    } else if (style === "visual") {
        scores[MENU_KEYS.JEJU_OREUM] += 3;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 1;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 4;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    } else if (style === "fresh") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 4;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    }

    // Q2: 무드
    if (mood === "professional") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    } else if (mood === "natural") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 4;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    } else if (mood === "cheerful") {
        scores[MENU_KEYS.JEJU_OREUM] += 4;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 1;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 4;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 1;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    } else if (mood === "minimal") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    }

    // Q3: 목적
    if (purpose === "thirst") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 4;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 4;
    } else if (purpose === "caffeine") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    } else if (purpose === "healing") {
        scores[MENU_KEYS.JEJU_OREUM] += 4;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 4;
        scores[MENU_KEYS.GREEN_LEMONADE] += 1;
    } else if (purpose === "health") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    }

    // Q4: 선호 음료
    if (favorite === "coffee") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    } else if (favorite === "herbal") {
        scores[MENU_KEYS.JEJU_OREUM] += 3;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 4;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    } else if (favorite === "refreshing") {
        scores[MENU_KEYS.JEJU_OREUM] += 2;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 4;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 4;
    } else if (favorite === "milk") {
        scores[MENU_KEYS.JEJU_OREUM] += 3;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 4;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 4;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    }

    const keys = Object.keys(scores) as MenuKey[];
    const maxScore = Math.max(...Object.values(scores));
    const topItems = keys.filter((key) => scores[key] === maxScore);

    return topItems[Math.floor(Math.random() * topItems.length)];
};
