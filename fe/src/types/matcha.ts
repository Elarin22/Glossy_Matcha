export interface Question {
    id: keyof AnswerType;
    title: string;
    options: QuestionOption[];
}

export interface QuestionOption {
    key: string;
    text: string;
}

export interface AnswerType {
    style?: string;
    mood?: string;
    purpose?: string;
    favorite?: string;
}

export interface MenuInfo {
    name: string;
    description: string;
    tags: string[];
    image: string;
}

export type MenuData = Record<string, MenuInfo>;

export interface QuizState {
    currentStep: number;
    answers: AnswerType;
}
