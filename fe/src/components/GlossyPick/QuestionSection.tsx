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
    return (
        <div className={styles.question}>
            <GlossyPickHeader />

            <p className={styles.question__title}>{question.title}</p>

            <div className={styles.question__options}>
                {question.options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => onAnswer(question.id, option.key)}
                        className="btn-choice"
                    >
                        {option.text}
                    </button>
                ))}
            </div>

            <span className={styles.question__step}>{currentStep}/4</span>
            {currentStep > 1 && (
                <button type="button" onClick={onPrev} className="btn-prev">
                    이전
                </button>
            )}
        </div>
    );
}
