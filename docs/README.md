# Meeting Log
---
## 👉🏻 7/27_일
### Notion
[Notion](https://www.notion.so/1fe042952b3080ff8133c885ef351ac6)

### Meeting Time
- 매일 10:30A.M
- 매주 화, 목 6P.M
- 매주 일 8P.M

### Tech Stack

#### BACKEND
- Frame Work
  - DRF (Django 기반의 강력한 RESTful API 개발 프레임워크)
- DATABASE
  - PostgreSQL (오픈소스 객체-관계형 데이터베이스)
- ORM (Object-Relational Mapping)
  - Django ORM (Django의 내장 ORM으로 Python 객체와 데이터베이스 테이블을 연결)
- API 설계
  - RESTful API (REST 아키텍처 원칙을 따르는 API 설계 방식)
- 인증/인가
  - 세션 기반 인증 (Django의 기본 인증 방식으로, 서버에서 세션을 관리)
- 테스트 도구
  - pytest (Python의 강력한 테스트 프레임워크)
- 디버깅 도구
  - Django Debug Toolbar (Django 개발 시 디버깅 정보를 제공하는 도구)
- CI/CD
  - GitHub Actions (GitHub의 CI/CD 플랫폼)
- 컨테이너화
  - Docker (애플리케이션을 컨테이너로 패키징하여 일관된 환경에서 실행)
- 클라우드 서비스
  - AWS

#### FRONTEND
- Frame Work
  - Next.js (React 기반 SSR/SSG 지원 프레임워크)
- Project Language
  - TypeScript (JS 기반, 타입 안정성 제공)
- Stack
  - React (UI 컴포넌트 라이브러리), SCSS (Sass 문법 지원 CSS 전처리기), CSS Modules (컴포넌트별 CSS 범위 한정)

### Branch 명명 규칙
- main : 배포용
- develop : 기본 구현
- BE or FE/feature/기능명 : 기능 구현
- BE or FE/hotfix/버그명 : 긴급 버그 수정

---

## 👉🏻 7/28_월
### Project Topic
- 🌐 Glossy Matcha 브랜드 웹사이트 MVP (국·영문)

---

## 👉🏻 7/29_화
### Git Flow
- git 흐름 좀 더 자세하게 설명

### Glossy-Matcha 대표님과 회의
- 요구사항에 대한 질문 (주: BE)
  - 어떤 구조로 진행되어야 할지
  - 어떤 기능이 구현되었으면 하는지
  - 우선순위로 두고 있는 기능이 어떤 건지
  - 누구를 대상으로 구현되어야 하는지
 - 백엔드 단에서 이미지 및 글 수정/삭제 가능하게끔 구현
 - 체험형 콘텐츠에 말차 레시피 공유용 이미지 또는 URL 생성 가능하게끔 구현

- 디자인에 대한 질문 (주: FE)
  - 회사가 가지고 있는 기본 디자인 요구
  - 원하는 디자인의 콘셉트
  - 메인 페이지에 어떤 정보가 노출되어야 하는지
  - 상세 페이지가 어떤 것들이 있는지

### WBS
- 간트차트로 BE/FE 파트 분배 및 개발 계획

---

## 👉🏻 7/30_수
### 프로젝트 요구사항 변경
- 회원가입/로그인 구현 삭제
- 바이어 전용 페이지 구현 삭제: 대표님 의견 → 제품 상세 설명 페이지 구현 추가

### 프로젝트 진행 구조 설계
- 다국어(국/영문) 전환 방식 설계
- 메인 페이지 / 브랜드 소개 페이지 / 제품 소개 페이지 1차 디자인
- 페이지 내부 타이틀 포인트 폰트 각자 1개씩 후보 찾아오기
  - 얇은 폰트[Thin Font]
  - 볼드 지원 폰트[Variable Weight Font]
  - 한/영문 동시 지원 폰트[Dual-Script Font]
- 1차 API 명세서 확인 후 DB 스키마 설계

---

## 👉🏻 7/31_목
### 체험형 콘텐츠
- 주제: 4개의 질문 | 4지선다
  - 말차 선호도 (당신이 좋아하는 말차의 스타일은?)
    - 맛의 깊이
    - 조화로운 단 맛
    - 비주얼/무드
    - 신선함과 향
  - 오늘의 나 표현 (오늘 하루 나의 키워드는?)
    - 프로페셔널하고 세련된
    - 자연스럽고 편안한
    - 유쾌하고 발랄한
    - 미니멀하고 심플한
  - 음료를 마시는 주된 목적 (음료를 고를 때 중요하게 생각하는 목적은?)
    - 갈증해소
    - 카페인 충전
    - 휴식 & 힐링
    - 건강관리
  - 좋아했던 음료 (기분 좋을 때 생각나는 음료가 있다면?)
    - 커피
    - 허브티
    - 청량한 음료
    - 우유 기반 음료
- 메뉴
  - 제주, 오름
  - 말차스트레이트
  - 글로시 말차 모히또
  - 글로시 말차 라떼
  - 말차 슈페너
  - 코코넛 말차 쉐이크
  - 보리크림말차라떼
  - 그린 레몬에이드

- 기존 OpenAI API 넣기로 한 것 취소

### 디자인
- 모바일로 링크 진입 시 보여지는 화면 디자인
- 타이틀 포인트 폰트
  - 열린 명조
- 기본 폰트
  - 프리탠다드
- 주요 컬러
  - beige(#f2efe8)
  - green(#DAE3D8, #00563f)
  - white(#ffffff)
  - black(#373735)

### 프로젝트 요구사항 변경
- 바이어 전용 API 삭제
  - 제품 상세 API 추가

### API 하나 구현
- 문의하기 API

### Django ORM 구현
- Products, ProductImages, ProductSpecifications, Inquiries Model 구현

### DATABASE 저장소 변경
- db.sqlite에서 PostgreSQL로 변경

---

## 👉🏻 8/1_금
### 1번 내부 MVP 주제
#### 문의하기 관련도 포함
- Django Templates로 매장 운영 대시보드 구현 추가
- 원래는 관리자 E-mail로 문의 알림이 가도록 하려고 했음
  - 내부 MVP 주제가 확정되어서 여기서 문의 확인이 가능하게끔 하기로 결정

### API 구현
- 메인, 브랜드 소개, 문의하기 페이지는 수정 필요없음
  - 문의하기 API는 필요

### 한/영문 버전 구현 방법 논의
- 한/영문 버전
  - prototype을 클로드 코드로 초안만 만들어서 회의
    - 이걸로 결정