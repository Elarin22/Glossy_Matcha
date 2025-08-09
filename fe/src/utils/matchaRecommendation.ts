import { AnswerType } from "@/types/matcha";
import { menuData } from "@/data/menuData";

// menuData의 키를 타입 안전하게 추출
type MenuKey = keyof typeof menuData;

// 메뉴 키들을 상수로 정의 (타입 체크 + 자동완성 지원)
const MENU_KEYS: Record<string, MenuKey> = {
    JEJU_OREUM: "제주, 오름",
    MATCHA_STRAIGHT: "말차 스트레이트",
    GLOSSY_MATCHA_LATTE: "글로시 말차 라떼",
    MATCHA_SCHPENER: "말차 슈페너",
    BARLEY_CREAM_MATCHA_LATTE: "보리크림 말차 라떼",
    GLOSSY_MATCHA_MOJITO: "글로시 말차 모히또",
    GREEN_LEMONADE: "그린 레몬에이드",
} as const;

export const getRecommendation = (userAnswers: AnswerType): string => {
    const { style, mood, purpose, favorite } = userAnswers;

    const scores: Record<MenuKey, number> = {};

    // menuData의 모든 키로 scores 초기화
    (Object.keys(menuData) as MenuKey[]).forEach((menu) => {
        scores[menu] = 0;
    });

    // Q1: 말차 스타일
    if (style === "depth") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 5;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 0;
    } else if (style === "sweet") {
        scores[MENU_KEYS.JEJU_OREUM] += 5;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 5;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    } else if (style === "visual") {
        scores[MENU_KEYS.JEJU_OREUM] += 5;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 5;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.GREEN_LEMONADE] += 5;
    } else if (style === "fresh") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 5;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 1;
        scores[MENU_KEYS.GREEN_LEMONADE] += 5;
    }

    // Q2: 무드
    if (mood === "professional") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 0;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    } else if (mood === "natural") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 2;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 5;
        scores[MENU_KEYS.GREEN_LEMONADE] += 3;
    } else if (mood === "cheerful") {
        scores[MENU_KEYS.JEJU_OREUM] += 5;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 1;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 5;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.GREEN_LEMONADE] += 5;
    } else if (mood === "minimal") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 1;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 0;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    }

    // Q3: 목적
    if (purpose === "thirst") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 5;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 1;
        scores[MENU_KEYS.GREEN_LEMONADE] += 5;
    } else if (purpose === "caffeine") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 0;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 1;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    } else if (purpose === "healing") {
        scores[MENU_KEYS.JEJU_OREUM] += 5;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 1;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 3;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 5;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    } else if (purpose === "health") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 1;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 2;
    }

    // Q4: 선호 음료
    if (favorite === "coffee") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 0;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 2;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    } else if (favorite === "herbal") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 2;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 1;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 5;
        scores[MENU_KEYS.GREEN_LEMONADE] += 1;
    } else if (favorite === "refreshing") {
        scores[MENU_KEYS.JEJU_OREUM] += 0;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 5;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 0;
        scores[MENU_KEYS.GREEN_LEMONADE] += 5;
    } else if (favorite === "milk") {
        scores[MENU_KEYS.JEJU_OREUM] += 3;
        scores[MENU_KEYS.MATCHA_STRAIGHT] += 0;
        scores[MENU_KEYS.GLOSSY_MATCHA_LATTE] += 5;
        scores[MENU_KEYS.MATCHA_SCHPENER] += 5;
        scores[MENU_KEYS.GLOSSY_MATCHA_MOJITO] += 0;
        scores[MENU_KEYS.BARLEY_CREAM_MATCHA_LATTE] += 3;
        scores[MENU_KEYS.GREEN_LEMONADE] += 0;
    }

    const keys = Object.keys(scores) as MenuKey[];
    const maxScore = Math.max(...Object.values(scores));
    const topItems = keys.filter((key) => scores[key] === maxScore);

    return topItems[Math.floor(Math.random() * topItems.length)];
};
