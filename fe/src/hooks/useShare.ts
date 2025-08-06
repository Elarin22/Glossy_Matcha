import { useCallback } from "react";
import { toast } from "react-toastify";

export const useShare = () => {
    const shareResult = useCallback(async (recommendation: string) => {
        const text = `나의 글로시 말차 추천 메뉴는 "${recommendation}"!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "글로시 말차",
                    text: text,
                    url: window.location.href,
                });
                toast.success("공유가 완료되었어요!");
            } catch (error) {
                toast.error("공유에 실패했어요!");
            }
        } else {
            try {
                await navigator.clipboard.writeText(
                    text + " " + window.location.href
                );
                toast.success("링크가 복사되었어요!");
            } catch (error) {
                toast.error("링크 복사에 실패했어요!");
            }
        }
    }, []);

    return { shareResult };
};
