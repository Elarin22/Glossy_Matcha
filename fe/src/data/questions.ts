import { Question } from "@/types/matcha";

export const questions: Question[] = [
    {
        id: "style",
        title: "style.title",
        options: [
            { key: "depth", text: "style.options.depth" },
            { key: "sweet", text: "style.options.sweet" },
            { key: "visual", text: "style.options.visual" },
            { key: "fresh", text: "style.options.fresh" },
        ],
    },
    {
        id: "mood",
        title: "mood.title",
        options: [
            { key: "professional", text: "mood.options.professional" },
            { key: "natural", text: "mood.options.natural" },
            { key: "cheerful", text: "mood.options.cheerful" },
            { key: "minimal", text: "mood.options.minimal" },
        ],
    },
    {
        id: "purpose",
        title: "purpose.title",
        options: [
            { key: "thirst", text: "purpose.options.thirst" },
            { key: "caffeine", text: "purpose.options.caffeine" },
            { key: "healing", text: "purpose.options.healing" },
            { key: "health", text: "purpose.options.health" },
        ],
    },
    {
        id: "favorite",
        title: "favorite.title",
        options: [
            { key: "coffee", text: "favorite.options.coffee" },
            { key: "herbal", text: "favorite.options.herbal" },
            { key: "refreshing", text: "favorite.options.refreshing" },
            { key: "milk", text: "favorite.options.milk" },
        ],
    },
];
