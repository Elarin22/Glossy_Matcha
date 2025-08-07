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

                const isIOS =
                    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                    (navigator.userAgent.includes("Macintosh") &&
                        "ontouchend" in document);

                if (isIOS) {
                    const newWindow = window.open("", "_blank");
                    if (newWindow) {
                        newWindow.location.href = dataUrl;
                    } else {
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
