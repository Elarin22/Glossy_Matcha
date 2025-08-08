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
                console.error("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            try {
                const canvas = await html2canvas(element, { scale: 2 });
                const dataUrl = canvas.toDataURL("image/png");

                if (newWindow) {
                    newWindow.document.write(
                        `<img src="${dataUrl}" alt="${fileName}" />`
                    );
                    newWindow.document.title = fileName;
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
