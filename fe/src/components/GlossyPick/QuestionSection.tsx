import { useTranslations } from "next-intl";
import { Question, AnswerType } from "@/types/matcha";
import GlossyPickHeader from "./GlossyPickHeader";
import styles from "./QuestionSection.module.scss";

interface QuestionSectionProps {
    question: Question;
    currentStep: number;
    onAnswer: (questionId: keyof AnswerType, answer: string) => void;
    onPrev?: () => void;
}

export default function QuestionSection({
    question,
    currentStep,
    onAnswer,
    onPrev,
}: QuestionSectionProps) {
    const t = useTranslations("test.questions");
    const tPrev = useTranslations("test.question");

    return (
        <div className={styles.question}>
            <GlossyPickHeader />

            <p className={styles.question__title}>{t(question.title)}</p>

            <div className={styles.question__options}>
                {question.options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => onAnswer(question.id, option.key)}
                        className="btn-choice"
                    >
                        {t(option.text)}
                    </button>
                ))}
            </div>

            <span className={styles.question__step}>{currentStep}/4</span>
            {currentStep > 1 && (
                <button type="button" onClick={onPrev} className="btn-g">
                    {tPrev("prev")}
                </button>
            )}
        </div>
    );
}
