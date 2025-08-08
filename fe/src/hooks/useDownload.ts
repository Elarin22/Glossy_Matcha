import { useCallback } from "react";
import domtoimage from "dom-to-image-more";

export const useDownload = () => {
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            const isIOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !(window as unknown as { MSStream?: unknown }).MSStream;

            try {
                const dataUrl = await domtoimage.toPng(element, {
                    cacheBust: true, // 캐시 문제 방지 옵션
                    bgcolor: "#F2EFE8", // 배경색 지정
                });

                if (isIOS) {
                    // iOS는 새 탭에서 열어 사용자가 저장하도록 유도
                    window.open(dataUrl, "_blank");
                } else {
                    // 일반 브라우저는 a 태그로 다운로드 트리거
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } catch (e) {
                console.error("이미지 저장 실패:", e);
            }
        },
        []
    );

    return { downloadImage };
};
