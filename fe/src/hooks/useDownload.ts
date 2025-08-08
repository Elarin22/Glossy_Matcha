import { useCallback } from "react";
import html2canvas from "html2canvas";

export const useDownload = () => {
    const downloadImage = useCallback(
        async (
            elementId: string,
            fileName: string,
            newWindow?: Window | null
        ) => {
            const element = document.getElementById(elementId);
            if (!element) {
                alert("저장할 영역을 찾을 수 없습니다.");
                if (newWindow) newWindow.close();
                return;
            }

            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                });
                const dataUrl = canvas.toDataURL("image/png");

                if (newWindow) {
                    newWindow.document.write(`
                        <html>
                            <head><title>${fileName}</title></head>
                            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif;">
                                <p>이미지 생성 중...</p>
                            </body>
                        </html>
                    `);
                    newWindow.document.close();

                    const insertImage = () => {
                        if (newWindow.closed) return;
                        try {
                            newWindow.document.body.innerHTML = `
                                <img src="${dataUrl}" alt="${fileName}" style="max-width:100%; height:auto; display:block; margin:auto;" />
                            `;
                        } catch (e) {
                            newWindow.document.body.innerHTML =
                                "<p style='color:red;'>이미지 생성 실패</p>";
                        }
                    };

                    newWindow.onload = insertImage;

                    setTimeout(insertImage, 1500);
                } else {
                    // 새 탭 없이 바로 다운로드 링크 생성
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } catch (error) {
                console.error("이미지 저장 실패", error);
                if (newWindow) {
                    newWindow.document.body.innerHTML =
                        "<p style='color:red;'>이미지 생성 실패</p>";
                } else {
                    alert("이미지 저장에 실패했습니다.");
                }
            }
        },
        []
    );

    return { downloadImage };
};
