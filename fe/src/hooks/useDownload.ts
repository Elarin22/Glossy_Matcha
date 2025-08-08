import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * DOM 요소를 이미지 또는 PDF로 다운로드하는 기능을 제공하는 커스텀 훅
 * iOS 디바이스에서는 PDF로, 다른 디바이스에서는 PNG 이미지로 저장됩니다.
 *
 * @returns {Object} downloadImage 함수가 포함된 객체
 */
export const useDownload = () => {
    /**
     * 지정된 DOM 요소를 캡처하여 이미지 또는 PDF 파일로 다운로드합니다.
     * iOS 디바이스에서는 PDF 형식으로, 다른 디바이스에서는 PNG 이미지로 저장됩니다.
     *
     * @param {string} elementId - 캡처할 DOM 요소의 ID
     * @param {string} fileName - 저장될 파일의 이름 (확장자 제외)
     * @returns {Promise<void>} 비동기 함수로 완료 시 Promise를 반환합니다.
     *
     * @example
     * ```tsx
     * const { downloadImage } = useDownload();
     *
     * const handleDownload = () => {
     *   downloadImage('chart-container', 'my-chart');
     * };
     * ```
     */
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            // iOS 디바이스 감지 (iPad, iPhone, iPod 또는 터치 지원 MacOS)
            const isIOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.userAgent.includes("Macintosh") &&
                    "ontouchend" in document);

            try {
                // html2canvas를 사용하여 DOM 요소를 캔버스로 변환
                const canvas = await html2canvas(element, {
                    scale: 2, // 고해상도를 위한 스케일링
                    useCORS: true, // 외부 리소스 허용
                    allowTaint: false, // 오염된 캔버스 방지
                });

                if (isIOS) {
                    // iOS 디바이스: PDF로 저장 (여러 방법 시도)
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4");
                    const imgWidth = 210; // A4 용지 너비 (mm)
                    const pageHeight = 295; // A4 용지 높이 (mm)
                    const imgHeight =
                        (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 0;

                    // 첫 번째 페이지에 이미지 추가
                    pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        position,
                        imgWidth,
                        imgHeight,
                        undefined,
                        "FAST"
                    );
                    heightLeft -= pageHeight;

                    // 이미지가 한 페이지를 초과하는 경우 추가 페이지 생성
                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(
                            imgData,
                            "PNG",
                            0,
                            position,
                            imgWidth,
                            imgHeight,
                            undefined,
                            "FAST"
                        );
                        heightLeft -= pageHeight;
                    }

                    // iOS Safari에서 다운로드가 작동하지 않는 문제 해결을 위한 다중 방법 시도
                    try {
                        // 방법 1: 표준 save() 시도
                        pdf.save(`${fileName}.pdf`);
                    } catch (saveError) {
                        console.warn(
                            "표준 save() 실패, 대안 방법 시도:",
                            saveError
                        );

                        try {
                            // 방법 2: Blob을 이용한 다운로드
                            const pdfBlob = pdf.output("blob");
                            const blobUrl = URL.createObjectURL(pdfBlob);
                            const link = document.createElement("a");
                            link.href = blobUrl;
                            link.download = `${fileName}.pdf`;
                            link.style.display = "none";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            // URL 객체 정리
                            setTimeout(
                                () => URL.revokeObjectURL(blobUrl),
                                100
                            );
                        } catch (blobError) {
                            console.warn(
                                "Blob 방법 실패, 새 탭으로 열기 시도:",
                                blobError
                            );

                            // 방법 3: 새 탭에서 PDF 열기 (사용자가 수동으로 저장해야 함)
                            const pdfDataUri = pdf.output("datauristring");
                            const newTab = window.open();
                            if (newTab) {
                                newTab.document.write(`
                                    <html>
                                        <head><title>${fileName}.pdf</title></head>
                                        <body style="margin:0;">
                                            <iframe src="${pdfDataUri}" style="width:100%;height:100vh;border:none;"></iframe>
                                            <div style="position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.8);color:white;padding:10px;border-radius:5px;font-family:sans-serif;">
                                                PDF가 생성되었습니다. 공유 버튼을 눌러 저장하세요.
                                            </div>
                                        </body>
                                    </html>
                                `);
                                newTab.document.close();
                            } else {
                                // 팝업이 차단된 경우
                                alert(
                                    "팝업이 차단되었습니다. 팝업을 허용하고 다시 시도해주세요."
                                );
                            }
                        }
                    }
                } else {
                    // 다른 디바이스: PNG 이미지로 저장
                    const dataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = `${fileName}.png`;
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
