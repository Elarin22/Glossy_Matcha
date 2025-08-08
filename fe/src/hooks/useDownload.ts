import { useCallback } from "react";
import domtoimage from "dom-to-image-more";

export const useDownload = () => {
    /**
     * id가 지정된 DOM 요소를 캡처하여 PNG 이미지로 저장
     * @param elementId 캡처할 DOM 요소의 id
     * @param fileName 저장할 파일명 (확장자 포함)
     */
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            try {
                const dataUrl = await domtoimage.toPng(element, {
                    cacheBust: true, // 캐시 문제 방지 옵션
                    bgcolor: "#F2EFE8",
                });

                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (e) {
                console.error("이미지 저장 실패:", e);
            }
        },
        []
    );

    return { downloadImage };
};
