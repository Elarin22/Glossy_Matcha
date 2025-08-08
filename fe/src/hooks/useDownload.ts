import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useDownload = () => {
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            const isIOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.userAgent.includes("Macintosh") &&
                    "ontouchend" in document);

            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                });

                if (isIOS) {
                    // PDF 변환
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4");
                    const imgWidth = 210;
                    const pageHeight = 295;
                    const imgHeight =
                        (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 0;

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

                    pdf.save(`${fileName}.pdf`);
                } else {
                    // PNG 다운로드
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
