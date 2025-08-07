import { useCallback } from "react";
import html2canvas from "html2canvas";

/**
 * DOM 요소를 캡처하여 이미지로 다운로드하는 기능을 제공하는 훅
 *
 * @description
 * - PC/Android: 자동으로 PNG 파일 다운로드
 * - iOS: 새 탭에서 이미지를 열어 수동 저장 (길게 눌러 저장)
 *
 * @requires html2canvas
 * @returns 이미지 다운로드 함수가 포함된 객체
 */
export const useDownload = () => {
    /**
     * 지정된 DOM 요소를 캡처하여 PNG 이미지로 저장
     *
     * @param elementId - 캡처할 DOM 요소의 id
     * @param fileName - 저장할 파일명 (확장자 포함, 예: "image.png")
     *
     * @example
     * ```tsx
     * const { downloadImage } = useDownload();
     *
     * // 사용법
     * await downloadImage('myChart', 'chart-2024.png');
     * ```
     *
     * @throws {Error} DOM 요소를 찾을 수 없거나 html2canvas 처리 중 오류 발생 시
     *
     * @description
     * **플랫폼별 동작:**
     * - **PC/Android**: 브라우저 다운로드 폴더에 자동 저장
     * - **iOS**: 새 탭에서 이미지 표시 → 사용자가 길게 눌러 수동 저장
     *
     * **캡처 옵션:**
     * - scale: 2 (고해상도)
     * - useCORS: true (외부 이미지 지원)
     * - allowTaint: false (보안 강화)
     */
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                });
                const dataUrl = canvas.toDataURL("image/png");

                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

                if (isIOS) {
                    const newWindow = window.open(dataUrl, "_blank");
                    if (!newWindow) {
                        console.warn("팝업이 차단되었습니다.");
                    }
                } else {
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
