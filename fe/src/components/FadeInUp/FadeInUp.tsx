"use client";

import { useEffect, useRef, ReactNode } from "react";

/**
 * FadeInUp 컴포넌트의 Props 인터페이스
 */
interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}

/**
 * 스크롤 시 밑에서 위로 나타나는 페이드인 애니메이션 컴포넌트
 *
 * Intersection Observer API를 사용하여 요소가 뷰포트에 들어올 때
 * 부드러운 fade-in-up 애니메이션을 실행합니다.
 *
 * @param props - FadeInUp 컴포넌트의 props
 * @param props.children - 애니메이션을 적용할 자식 요소들
 * @param props.delay - 애니메이션 지연 시간 (ms, 기본값: 0)
 * @param props.threshold - Intersection Observer 임계값 (0-1, 기본값: 0.1)
 * @param props.className - 추가 CSS 클래스명 (기본값: "")
 *
 * @returns 애니메이션이 적용된 div 요소로 감싼 자식 컴포넌트
 */
export default function FadeInUp({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: FadeInUpProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  /**
   * 컴포넌트 마운트 시 애니메이션 설정 및 Intersection Observer 초기화
   *
   * 1. 초기 스타일 설정 (투명도 0, Y축 80px 이동)
   * 2. CSS 트랜지션 효과 설정
   * 3. Intersection Observer 생성 및 요소 관찰 시작
   * 4. 컴포넌트 언마운트 시 Observer 정리
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const elementStyle = element.style as CSSStyleDeclaration;
    elementStyle.opacity = "0";
    elementStyle.transform = "translateY(80px)";
    elementStyle.transition = `opacity 1.5s ease-out ${delay}ms, transform 1.5s ease-out ${delay}ms`;
    elementStyle.willChange = "opacity, transform";

    /**
     * Intersection Observer 콜백 함수
     * 요소가 뷰포트에 들어오면 애니메이션을 실행합니다.
     *
     * @param entries - 관찰 중인 요소들의 교차 상태 정보 배열
     */
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetStyle = (entry.target as HTMLElement).style;

          targetStyle.opacity = "1";
          targetStyle.transform = "translateY(0)";

          setTimeout(() => {
            targetStyle.willChange = "auto";
          }, 800 + delay);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin: "0px 0px -50px 0px",
    });

    observer.observe(element);

    /**
     * 클린업 함수
     * 컴포넌트 언마운트 시 Intersection Observer 연결 해제
     */
    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
