import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * 퀴즈 결과 공유 기능을 제공하는 커스텀 훅
 *
 * Web Share API가 지원되는 환경에서는 네이티브 공유를,
 * 지원되지 않는 환경에서는 클립보드 복사로 fallback 처리
 *
 * @returns {Object} 공유 기능 객체
 * @returns {Function} returns.shareResult - 추천 결과 공유 함수
 *
 * @example
 * ```tsx
 * const { shareResult } = useShare();
 * shareResult('green-tea-latte');
 * ```
 */
export const useShare = () => {
  const t = useTranslations("share");

  /**
   * 추천 결과를 공유하거나 클립보드에 복사
   *
   * @param {string} recommendation - 추천된 메뉴명 (URL 파라미터로 사용됨)
   * @returns {Promise<void>}
   */
  const shareResult = useCallback(
    async (recommendation: string) => {
      const text = t("shareText") + recommendation + "!";

      const url =
        window.location.origin +
        window.location.pathname +
        `?recommendation=${encodeURIComponent(recommendation)}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: t("shareTitle"),
            text: text,
            url,
          });
          toast.success(t("toastShared"));
        } catch (error) {
          toast.error(t("toastShareFailed"));
        }
      } else {
        try {
          await navigator.clipboard.writeText(text + " " + url);
          toast.success(t("toastCopied"));
        } catch (error) {
          toast.error(t("toastCopyFailed"));
        }
      }
    },
    [t]
  );

  return { shareResult };
};
