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