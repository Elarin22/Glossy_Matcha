import { useCallback } from "react";
import html2canvas from "html2canvas";

/**
 * DOM 요소를 캡처하여 이미지로 다운로드하는 기능을 제공하는 React 훅
 *
 * @description
 * 이 훅은 html2canvas 라이브러리를 사용하여 웹 페이지의 특정 DOM 요소를
 * 고해상도 PNG 이미지로 캡처하고 다운로드하는 기능을 제공합니다.
 *
 * **플랫폼별 동작:**
 * - **데스크톱/Android**: 브라우저의 기본 다운로드 기능을 사용하여 파일 자동 저장
 * - **iOS (iPhone/iPad)**: 새 탭에서 이미지를 열어 사용자가 수동으로 저장 (길게 눌러 저장)
 *
 * **특징:**
 * - 고해상도 캡처 (scale: 2)
 * - CORS 지원으로 외부 이미지 처리 가능
 * - iOS 13+ iPad의 Safari User Agent 위장 감지 지원
 * - 팝업 차단 상황에 대한 에러 처리
 *
 * @requires html2canvas - DOM을 캔버스로 변환하는 라이브러리
 *
 * @returns {Object} 이미지 다운로드 기능이 포함된 객체
 * @returns {Function} returns.downloadImage - 이미지 다운로드 함수
 *
 * @since 1.0.0
 * @author Your Name
 */
export const useDownload = () => {
    /**
     * 지정된 DOM 요소를 캡처하여 PNG 이미지로 다운로드
     *
     * @async
     * @function downloadImage
     *
     * @param {string} elementId - 캡처할 DOM 요소의 ID 속성값
     * @param {string} fileName - 저장할 파일명 (확장자 포함, 예: "image.png")
     *
     * @description
     * 이 함수는 다음과 같은 순서로 동작합니다:
     * 1. 지정된 ID의 DOM 요소 검색
     * 2. html2canvas를 사용하여 요소를 캔버스로 변환
     * 3. 캔버스를 PNG 데이터 URL로 변환
     * 4. 플랫폼에 따라 적절한 저장 방식 적용
     *
     * **html2canvas 옵션:**
     * - `scale: 2`: 레티나 디스플레이 대응 고해상도
     * - `useCORS: true`: 외부 도메인 이미지 처리 허용
     * - `allowTaint: false`: 보안을 위한 tainted 캔버스 방지
     *
     * **iOS 감지 로직:**
     * - iPhone/iPad/iPod User Agent 패턴 매칭
     * - iOS 13+ iPad Safari의 데스크톱 User Agent 위장 감지
     *   (Macintosh + ontouchend 지원으로 판별)
     *
     * **에러 처리:**
     * - DOM 요소 미존재 시 콘솔 에러 출력 후 early return
     * - html2canvas 처리 실패 시 콘솔 에러 출력
     * - iOS 팝업 차단 시 경고 메시지 출력
     *
     * @throws {Error} html2canvas 라이브러리 처리 중 발생하는 에러
     *
     * @see {@link https://html2canvas.hertzen.com/} html2canvas 공식 문서
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL} Canvas.toDataURL API
     *
     * @since 1.0.0
     */
    const downloadImage = useCallback(
        async (elementId: string, fileName: string) => {
            const element = document.getElementById(elementId);
            if (!element) {
                alert("저장할 영역을 찾을 수 없습니다.");
                return;
            }

            try {
                // 로딩 상태 표시 (옵션)
                const loadingElement = document.createElement("div");
                loadingElement.innerHTML = "이미지 생성 중...";
                loadingElement.style.cssText = `
                    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: rgba(0,0,0,0.8); color: white; padding: 20px;
                    border-radius: 8px; z-index: 10000;
                `;
                document.body.appendChild(loadingElement);

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                });

                const dataUrl = canvas.toDataURL("image/png");

                // 로딩 제거
                document.body.removeChild(loadingElement);

                const isIOS =
                    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                    (navigator.userAgent.includes("Macintosh") &&
                        "ontouchend" in document);

                if (isIOS) {
                    // iOS에서 확실하게 작동하는 방법
                    try {
                        // 방법 1: 즉시 새 창 열기 (사용자 클릭과 동기적으로 실행)
                        const newWindow = window.open("about:blank", "_blank");

                        if (newWindow) {
                            // 새 창에 이미지 표시
                            newWindow.document.write(`
                                <html>
                                    <head>
                                        <title>${fileName}</title>
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <style>
                                            body { 
                                                margin: 0; 
                                                padding: 20px; 
                                                text-align: center; 
                                                background: #f5f5f5;
                                            }
                                            img { 
                                                max-width: 100%; 
                                                height: auto; 
                                                border: 1px solid #ddd;
                                                background: white;
                                            }
                                            .instructions {
                                                margin-top: 20px;
                                                padding: 15px;
                                                background: white;
                                                border-radius: 8px;
                                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <img src="${dataUrl}" alt="${fileName}" />
                                        <div class="instructions">
                                            <h3>이미지 저장 방법</h3>
                                            <p>이미지를 길게 눌러서 "이미지 저장" 또는 "사진에 추가"를 선택하세요</p>
                                        </div>
                                    </body>
                                </html>
                            `);
                            newWindow.document.close();
                        } else {
                            // 새 창이 차단된 경우 대안 방법
                            throw new Error("팝업 차단");
                        }
                    } catch (popupError) {
                        // 방법 2: 현재 창에서 다운로드 링크 생성
                        const link = document.createElement("a");
                        link.href = dataUrl;
                        link.download = fileName;

                        // iOS에서는 사용자 제스처 컨텍스트 확보를 위해 즉시 실행
                        link.style.display = "none";
                        document.body.appendChild(link);

                        // iOS에서는 click() 대신 실제 사용자 이벤트 시뮬레이션
                        const clickEvent = new MouseEvent("click", {
                            view: window,
                            bubbles: true,
                            cancelable: false,
                        });
                        link.dispatchEvent(clickEvent);

                        document.body.removeChild(link);

                        // 사용자에게 안내 메시지
                        setTimeout(() => {
                            alert(
                                "iOS에서 이미지를 저장하려면:\n1. 생성된 이미지를 길게 누르세요\n2. '이미지 저장' 또는 '사진에 추가'를 선택하세요"
                            );
                        }, 500);
                    }
                } else {
                    // PC/Android 기존 방식
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } catch (e) {
                console.error("이미지 저장 실패:", e);
                alert("이미지 저장에 실패했습니다. 다시 시도해주세요.");
            }
        },
        []
    );

    return { downloadImage };
};
