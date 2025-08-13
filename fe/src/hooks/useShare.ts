import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useShare = () => {
  const t = useTranslations("share");

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
