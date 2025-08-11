import { useCallback } from "react";
import html2canvas from "html2canvas";

export const useDownload = () => {
    const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                alert("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            const canvas = await html2canvas(element, {
                scale: 2,
            });
            const dataUrl = canvas.toDataURL("image/png");

            if (isIOS()) {
                const newWindow = window.open();
                if (newWindow) {
                    newWindow.document.title = "추천 결과 이미지";
                    newWindow.document.body.style.margin = "0";
                    const img = newWindow.document.createElement("img");
                    img.src = dataUrl;
                    img.style.width = "100%";
                    newWindow.document.body.appendChild(img);
                } else {
                    alert(
                        "팝업이 차단되었습니다. 브라우저 설정에서 허용해주세요."
                    );
                }
            } else {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${fileName}.png`;
                link.click();
            }
        },
        []
    );

    return { downloadImage };
};
