import { useCallback } from "react";
import html2canvas from "html2canvas";

export const useDownload = () => {
    const downloadImage = useCallback(
        async (
            elementId: string,
            fileName: string,
            newWindow?: Window | null // 새 탭 객체 optional
        ) => {
            const element = document.getElementById(elementId);
            if (!element) {
                alert("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            const canvas = await html2canvas(element, { scale: 2 });
            const dataUrl = canvas.toDataURL("image/png");

            if (newWindow) {
                // 새 탭이 전달되면 이미지 표시용으로 사용
                newWindow.document.title = fileName;
                newWindow.document.body.style.margin = "0";
                const img = newWindow.document.createElement("img");
                img.src = dataUrl;
                img.style.width = "100%";
                newWindow.document.body.appendChild(img);
            } else {
                // 새 탭이 없으면 바로 다운로드
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = fileName;
                link.click();
            }
        },
        []
    );

    return { downloadImage };
};
