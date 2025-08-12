import { useCallback } from "react";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

// iOS 여부 체크
const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as Window & { MSStream?: unknown }).MSStream;

// 디바이스별 최적 스케일 계산
const getOptimalScale = (): number => {
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const isLowEndDevice = deviceMemory && deviceMemory <= 4;
  const pixelRatio = window.devicePixelRatio || 1;

  if (isIOS()) return Math.min(pixelRatio, 1.5);
  if (isLowEndDevice) return 1;
  return Math.min(pixelRatio, 2);
};

export const useDownload = () => {
  const downloadImage = useCallback(
    async (elementId: string, fileName: string) => {
      const element = document.getElementById(elementId);
      if (!element) {
        alert("저장할 영역을 찾을 수 없습니다.");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: getOptimalScale(),
      });

      // iOS + Web Share API 지원
      if (isIOS() && navigator.share) {
        try {
          canvas.toBlob(async (blob) => {
            if (!blob) {
              toast.error("이미지 변환에 실패했습니다.");
              return;
            }
            const file = new File([blob], `${fileName}.png`, {
              type: "image/png",
            });
            await navigator.share({
              files: [file],
              title: "추천 결과 이미지",
              text: "추천 결과를 확인하세요!",
            });
            toast.success("이미지가 공유되었습니다!");
          }, "image/png");
          return;
        } catch (error) {
          toast.error("이미지 공유에 실패했습니다. 다시 시도해주세요.");
        }
      }

      // iOS + Web Share API 미지원 → 새 탭
      if (isIOS()) {
        const dataUrl = canvas.toDataURL("image/png");
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.title = "추천 결과 이미지";
          newWindow.document.body.style.margin = "0";
          const img = newWindow.document.createElement("img");
          img.src = dataUrl;
          img.style.width = "100%";
          newWindow.document.body.appendChild(img);
        } else {
          toast.error(
            "팝업이 차단되었습니다. 브라우저 설정에서 허용해주세요."
          );
        }
        return;
      }

      // 나머지 환경 → 기존 다운로드
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${fileName}.png`;
      link.click();
    },
    []
  );

  return { downloadImage };
};
