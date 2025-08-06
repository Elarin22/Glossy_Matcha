export type QuestionKey = "style" | "mood" | "purpose" | "favorite";

export interface ScoreRule {
    [menuName: string]: number;
}

export interface RecommendationRules {
    [key in QuestionKey]: {
        [answerKey: string]: ScoreRule;
    };
}
