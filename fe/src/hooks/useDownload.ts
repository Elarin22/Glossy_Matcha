import { useCallback } from "react";
import html2canvas from "html2canvas";

/**
 * iOS Safari에서 확실하게 작동하는 이미지 다운로드 훅
 * iOS의 엄격한 보안 정책을 우회하는 여러 방법을 시도합니다
 */
export const useDownload = () => {
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                alert("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            // iOS 감지 (더 정확한 방법)
            const isIOS =
                /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent) &&
                ("ontouchend" in document || navigator.maxTouchPoints > 0);

            try {
                // 로딩 표시
                const loadingEl = document.createElement("div");
                loadingEl.style.cssText = `
                    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: rgba(0,0,0,0.8); color: white; padding: 20px;
                    border-radius: 8px; z-index: 10000; font-size: 16px;
                `;
                loadingEl.textContent = "이미지 생성 중...";
                document.body.appendChild(loadingEl);

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: "#ffffff",
                    logging: false,
                });

                // 로딩 제거
                document.body.removeChild(loadingEl);

                if (isIOS) {
                    // iOS 전용 처리
                    try {
                        // 방법 1: Blob과 URL.createObjectURL 사용 (iOS에서 더 안정적)
                        canvas.toBlob(
                            (blob) => {
                                if (!blob) {
                                    throw new Error("Blob 생성 실패");
                                }

                                const url = URL.createObjectURL(blob);

                                // 즉시 새 창 열기 (사용자 제스처와 동기적으로 실행)
                                const newWindow = window.open("", "_blank");

                                if (newWindow) {
                                    newWindow.document.write(`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <meta charset="UTF-8">
                                        <title>${fileName}</title>
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <style>
                                            * { margin: 0; padding: 0; box-sizing: border-box; }
                                            body {
                                                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                                                background: #f0f0f0;
                                                display: flex;
                                                flex-direction: column;
                                                align-items: center;
                                                padding: 20px;
                                                min-height: 100vh;
                                            }
                                            .container {
                                                max-width: 100%;
                                                text-align: center;
                                            }
                                            img {
                                                max-width: 100%;
                                                height: auto;
                                                border-radius: 8px;
                                                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                                                background: white;
                                            }
                                            .instructions {
                                                margin-top: 30px;
                                                padding: 20px;
                                                background: white;
                                                border-radius: 12px;
                                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                                max-width: 400px;
                                            }
                                            .instructions h3 {
                                                color: #333;
                                                margin-bottom: 15px;
                                                font-size: 18px;
                                            }
                                            .instructions p {
                                                color: #666;
                                                line-height: 1.5;
                                                font-size: 14px;
                                            }
                                            .step {
                                                margin: 10px 0;
                                                padding: 8px;
                                                background: #f8f9fa;
                                                border-radius: 6px;
                                                font-size: 13px;
                                            }
                                            .download-btn {
                                                display: inline-block;
                                                margin-top: 15px;
                                                padding: 12px 24px;
                                                background: #007AFF;
                                                color: white;
                                                text-decoration: none;
                                                border-radius: 8px;
                                                font-size: 16px;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="container">
                                            <img src="${url}" alt="${fileName}" />
                                            <div class="instructions">
                                                <h3>📱 iOS 이미지 저장 가이드</h3>
                                                <div class="step">1️⃣ 위 이미지를 길게 누르세요</div>
                                                <div class="step">2️⃣ "이미지 저장" 또는 "사진에 추가" 선택</div>
                                                <div class="step">3️⃣ 사진 앱에서 확인 가능합니다</div>
                                                <a href="${url}" download="${fileName}" class="download-btn">
                                                    💾 다운로드 시도
                                                </a>
                                            </div>
                                        </div>
                                    </body>
                                    </html>
                                `);
                                    newWindow.document.close();

                                    // 메모리 정리
                                    setTimeout(() => {
                                        URL.revokeObjectURL(url);
                                    }, 60000);
                                } else {
                                    // 팝업이 차단된 경우
                                    URL.revokeObjectURL(url);
                                    throw new Error("팝업 차단됨");
                                }
                            },
                            "image/png",
                            0.95
                        );
                    } catch (iosError) {
                        console.warn("iOS 새창 방법 실패:", iosError);

                        // 방법 2: 현재 페이지에 오버레이로 표시
                        const dataUrl = canvas.toDataURL("image/png", 0.95);

                        const overlay = document.createElement("div");
                        overlay.style.cssText = `
                            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                            background: rgba(0,0,0,0.9); z-index: 999999;
                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                            padding: 20px; box-sizing: border-box;
                        `;

                        overlay.innerHTML = `
                            <div style="text-align: center; color: white; max-width: 90%;">
                                <img src="${dataUrl}" style="max-width: 100%; max-height: 60vh; border-radius: 8px;" />
                                <div style="margin-top: 20px; font-size: 16px;">
                                    <div style="margin-bottom: 15px;">📱 iOS에서 이미지 저장하기</div>
                                    <div style="font-size: 14px; line-height: 1.6;">
                                        1. 위 이미지를 길게 눌러주세요<br>
                                        2. "이미지 저장" 선택<br>
                                        3. 사진 앱에서 확인 가능합니다
                                    </div>
                                </div>
                                <button onclick="this.parentElement.parentElement.remove()" 
                                        style="margin-top: 20px; padding: 10px 20px; background: #007AFF; 
                                               color: white; border: none; border-radius: 6px; font-size: 16px;">
                                    닫기
                                </button>
                            </div>
                        `;

                        document.body.appendChild(overlay);

                        // 5초 후 자동 닫기
                        setTimeout(() => {
                            if (overlay.parentNode) {
                                document.body.removeChild(overlay);
                            }
                        }, 30000);
                    }
                } else {
                    // PC/Android - 기존 방식
                    const dataUrl = canvas.toDataURL("image/png", 0.95);
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = fileName;
                    link.style.display = "none";

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } catch (e) {
                console.error("이미지 저장 실패:", e);

                // 최후의 수단: 간단한 안내 메시지
                if (isIOS) {
                    alert(
                        `iOS에서 이미지 저장이 제한됩니다.\n\n해결방법:\n1. 화면 캡처 사용 (전원 + 음량상 버튼)\n2. 다른 브라우저 사용 (Chrome, Firefox)\n3. 데스크톱에서 다시 시도`
                    );
                } else {
                    alert(
                        "이미지 저장에 실패했습니다. 브라우저를 새로고침하고 다시 시도해주세요."
                    );
                }
            }
        },
        []
    );

    return { downloadImage };
};
