import { Question } from "@/types/matcha";

export const questions: Question[] = [
    {
        id: "style",
        title: "당신이 좋아하는 말차 스타일은?",
        options: [
            { key: "depth", text: "맛의 깊이" },
            { key: "sweet", text: "조화로운 단 맛" },
            { key: "visual", text: "비주얼 / 무드" },
            { key: "fresh", text: "신선함과 향" },
        ],
    },
    {
        id: "mood",
        title: "오늘 하루 나의 키워드는?",
        options: [
            { key: "professional", text: "프로페셔널하고 세련된" },
            { key: "natural", text: "자연스럽고 편안한" },
            { key: "cheerful", text: "유쾌하고 발랄한" },
            { key: "minimal", text: "미니멀하고 심플한" },
        ],
    },
    {
        id: "purpose",
        title: "음료를 고를 때 중요하게 생각하는 목적은?",
        options: [
            { key: "thirst", text: "갈증 해소" },
            { key: "caffeine", text: "카페인 충전" },
            { key: "healing", text: "휴식 & 힐링" },
            { key: "health", text: "건강 관리" },
        ],
    },
    {
        id: "favorite",
        title: "기분 좋을 때 생각나는 음료는?",
        options: [
            { key: "coffee", text: "커피" },
            { key: "herbal", text: "허브티" },
            { key: "refreshing", text: "청량한 음료" },
            { key: "milk", text: "우유 기반 음료" },
        ],
    },
];
