import { useCallback } from "react";
import html2canvas from "html2canvas";

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

            // iOS 감지 (해결책 2번: MSStream 체크로 IE 제외)
            const iOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !(window as unknown as { MSStream?: unknown }).MSStream;

            // 뷰포트 조정 (해결책 1번: windowWidth = '1280px')
            if (screen.width < 1024) {
                document
                    .getElementById("viewport")
                    ?.setAttribute("content", "width=1280px");
            }

            try {
                // 원본 코드의 html2canvas 옵션들 그대로 적용
                const html2canvasOptions = {
                    allowTaint: true,
                    removeContainer: true,
                    backgroundColor: null,
                    imageTimeout: 15000,
                    logging: true,
                    scale: 2,
                    useCORS: true,
                };

                const canvas = await html2canvas(element, html2canvasOptions);

                // 해결책 3번: iOS와 다른 플랫폼 구분 처리
                if (iOS) {
                    // iOS: blob URL 방식 (pdf.output("bloburl")과 동일한 원리)
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const link = URL.createObjectURL(blob);
                            setTimeout(() => {
                                window.open(link, "_top");
                                // 메모리 정리
                                setTimeout(
                                    () => URL.revokeObjectURL(link),
                                    1000
                                );
                            }, 100);
                        }
                    }, "image/png");
                } else {
                    // PC/Android: 기존 자동 다운로드 방식
                    const dataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } catch (e) {
                console.error("이미지 저장 실패:", e);
            } finally {
                // 뷰포트 원복
                if (screen.width < 1024) {
                    document
                        .getElementById("viewport")
                        ?.setAttribute(
                            "content",
                            "width=device-width, initial-scale=1"
                        );
                }
            }
        },
        []
    );

    return { downloadImage };
};
