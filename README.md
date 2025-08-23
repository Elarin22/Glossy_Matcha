# Glossy Matcha - 프리미엄 말차 브랜드 웹사이트

![Glossy Matcha Logo](images/readme_img/logo-BI.png)

## 1. 📌 프로젝트 개요

**Glossy Matcha**는 **듀얼 MVP 아키텍처**를 기반으로 한 **실제 비즈니스에서 운영되는 라이브 서비스**입니다
  - ✅ **현재 운영 중**: 고객들이 사용하는 프로덕션 환경
  - ✅ **실무 요구사항**: 기업 대표님의 피드백과 요구사항을 반영
  - ✅ **비즈니스 임팩트**: 브랜드 인지도 향상과 매출 증대에 기여
  - ✅ **지속적 운영**: 출시 후 지속적인 유지보수와 기능 개선


### **구현한 웹사이트**
- **글로벌 브랜드 웹사이트**: 글로벌로 뻗어나가는 글로시 말차의 브랜드 가치 전달
- **매장 운영 대시보드**: 매장 운영 데이터를 실시간으로 분석 및 모니터링, 업무 프로세스를 자동화함으로써 운영 효율 극대화

### **배포 URL**
- **프론트엔드**
  - **글로벌 브랜드 웹사이트**: https://glossymatcha.com
- **백엔드**
  - **매장 운영 대시보드**: https://a92fj39af.glossymatcha.com
  - **제품 API 서버**: https://x81fj32kd.glossymatcha.com/api/products
  - **문의 API 서버**: https://x81fj32kd.glossymatcha.com/api/inquiries

### 기업 요구사항 명세
- 우선순위 : [1] > [2]

***[1] 📊 Glossy Matcha 매장 운영관리 시스템 MVP***
```
* 목적
- 현재 구글 스프레드시트로 분산 관리 중인 매출·거래처·HR(급여) 등을 한 화면에서 통합 관리할 수 있는 기본적인 내부용 시스템 필요

* 필수 기능 목록
- 직원 목록 관리 [o]
- 직원 이름, 근무 형태(정직원/파트), 입사일, 연락처 [o]
- 근무시간 & 급여 입력/관리 [o]
- 기본 시급/급여 설정 [o]
- 월별 근무일수 또는 시간 입력 → 자동 합산 계산 [o]
- 매장별 매출 입력 [ ]
- 날짜별 매출 기록, 간단한 분류(음료/MD 등) [o]
- 일간/월간 합계 [o]
- 거래처 리스트 관리 [o]
- 업체명, 담당자 연락처, 결제방식 메모 등 [o]
- 간단한 리포트 출력 (표 형태) [o]

* 사용환경
- 웹 기반 (PC와 모바일에서도 접근 가능) [o]
- 로그인 기능은 있으면 좋으나, 없어도 무방 (내부용 MVP) [o]
```
**[IA]**
<img src="images/readme_img/내부MVP.png" width="450">

***[2] 🌐 Glossy Matcha 브랜드 웹사이트 MVP (국·영문)***
```
* 목적
- 브랜드를 전 세계 소비자와 바이어에게 효과적으로 소개할 수 있는 양방향 웹사이트 MVP 구축
  - 글로벌 마케팅, 바이어 대응, 콘텐츠 확산에 사용

* 필수 구성 요소
- 브랜드 소개 페이지
  - 브랜드 스토리 / 제주의 유기농 말차 / 글로시말의 철학 [o]
  - 심플하고 세련된 디자인 [o]
- 제품 소개 섹션
  - 주요 제품(Glossy Signature, 100% Pure 등) 이미지 + 설명 [o]
  - 제품별 스펙 및 특징 [o]
- 바이어 전용 페이지 (숨김 URL or 간단한 로그인)
  - MOQ, HS CODE, 수출용 제품 스펙 요약 [ ]
  - 라벨 이미지, 인증서, 수출용 패키지 사진 등 다운로드 가능 [ ]
- Matcha Recipe Generator (체험형 콘텐츠)
  - 3~5개의 간단한 질문 → 취향 기반 말차 레시피 추천 [o]
  - 결과 공유용 링크 [o]
  - 결과 공유용 이미지 출력 (SNS용) [ ]
- 문의하기 폼
  - 이름/이메일/문의내용 [o]
  - 자동 이메일 전송 [ ]

* 언어
- 국문 & 영문 버전 제공 (한 페이지 내 전환도 가능) [o]

* 스타일
- GLOSSY MATCHA의 기존 BI/브랜드 가이드에 맞춘 세련되고 간결한 스타일 [o]
- SPA(Single Page Application) 형식 환영 [o]
```
**[IA]**
<img src="images/readme_img/외부MVP.png" width="450">

### 프로젝트 목표

- **브랜드 아이덴티티 강화**: 제주 프리미엄 말차 브랜드의 고급스러운 이미지 구축
- **글로벌 접근성**: 한국어/영어 다국어 지원으로 해외 시장 진출 준비
- **비즈니스 효율성**: Django 기반 매장 운영 대시보드로 실무 운영 최적화
- **고객 경험 향상**: 인터랙티브한 체험형 콘텐츠와 직관적인 UI/UX 제공

---

## 2. 🏡 팀 소개

| 이름   | 사진                                                                                 | 깃허브 주소                                          | 담당 파트                                                                                     |
| --------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 심희현 | <img src="images/readme_img/hee.png" alt="심희현" style="width:70px;height:90px;">   | [@Elarin22](https://github.com/Elarin22)          | [팀장] Django 백엔드, AWS 인프라, 매장 운영 시스템, API 설계, 메인 페이지 브랜드 영상 편집           |
| 김성현 | <img src="images/readme_img/seong.png" alt="김성현" style="width:70px;height:90px;"> | [@seonghyeon1022](https://github.com/seonghyeon1022) | [팀원] 브랜드 소개/체험형 콘텐츠 페이지 디자인 및 구현, 다국어 시스템, 공통 컴포넌트                 |
| 조은이 | <img src="images/readme_img/eun.png" alt="조은이" style="width:70px;height:90px;">   | [@chohc](https://github.com/chohc)                   | [팀원] 메인 페이지/문의하기 페이지 디자인 및 구현, API 연동, 다국어 시스템, 공통 컴포넌트 |
| 김유빈  | <img src="images/readme_img/you.png" alt="김유빈" style="width:70px;height:90px;">   | [@6wol](https://github.com/6wol)                     | [팀원] 메인 페이지 디자인, 제품 페이지 디자인 및 개발, API 연동, 다국어 시스템, 공통 컴포넌트        |

---

## 3. 💡 기술 스택

<div align=left>
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <br>
  
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white"> 
  <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=Nginx&logoColor=white">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=Chart.js&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"> 
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white"> 
  <img src="https://img.shields.io/badge/Let's-Encrypt-003A70?style=for-the-badge&logo=Let's-Encrypt&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-Actions-2088FF?style=for-the-badge&logo=GitHub-Actions&logoColor=white">
</div>

---

## 4. 🎨 개발 환경

- **개발 도구**:

    <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VSCode&logoColor=white"/>
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

- **프론트엔드 프레임워크**:

    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">

- **백엔드 프레임워크**:

    <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
    <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
    <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray">

- **배포 환경**:

    <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white">
    <img src="https://img.shields.io/badge/AWS-Lightsail-FF9900?style=for-the-badge&logo=Amazon-AWS&logoColor=white">
    <img src="https://img.shields.io/badge/GitHub-Actions-2088FF?style=for-the-badge&logo=GitHub-Actions&logoColor=white">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">

- **협업 툴**:

    <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/KakaoTalk-FFCD00?style=for-the-badge&logo=KakaoTalk&logoColor=black">
    <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
    <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">

---

## 5. 🔑 코딩 컨벤션
<details>
<summary>Backend</summary>

**1. 네이밍 컨벤션**
```
- 클래스명 (PascalCase)
  - View 클래스: DashboardView, StaffListView, CreateInquiryView
  - Model 클래스: Staff, Products, Inquiries, DailySales
  - Form 클래스: StaffForm, WorkRecordForm
  - Serializer 클래스: InquirySerializer, ProductListSerializer

- 함수/메서드명 (snake_case)
  - get_context_data, clean, save, validate_email
  - 템플릿 태그: korean_won, korean_won_with_unit

- 변수명 (snake_case)
  - active_staff_count, today_sales, related_inquiries

- 상수명 (UPPER_CASE)
  - INQUIRY_TYPE_CHOICES, EMPLOYEE_TYPE_CHOICES, PAYMENT_METHOD_CHOICES
```

**2. 파일 구조 컨벤션**
```
glossymatcha/
 ├── management/        # 관리 명령어
 ├── models.py          # 데이터 모델 정의
 ├── views.py           # 뷰 로직 (Django Template Views + DRF API Views)
 ├── serializers.py     # DRF 시리얼라이저
 ├── forms.py           # Django 폼
 ├── admin.py           # Django Admin 설정
 ├── tests.py           # test 코드
 ├── urls.py            # URL 패턴
 ├── templates/         # Django Templates
 └── templatetags/      # 커스텀 템플릿 태그
```

**3. URL 패턴 컨벤션**
```
- API 엔드포인트
  - 접두사
    - api/
  - RESTful 패턴
    - api/inquiries/
    - api/products/
  - 언어 파라미터
    - ?lang=ko|en

- 템플릿 뷰
  - 슬래시(/) 구분자 사용
    - staff/, inquiries/, suppliers/
  - CRUD 패턴
    - create/
    - <int:pk>/update/
    - <int:pk>/delete/
```

**4. 모델 컨벤션**
```
- 필드 순서
1) CharField 필드
2) 선택 필드
3) Date/DateTime 필드
4) 관계 필드
5) created_at, updated_at (타임스탬프)

- 메서드 순서
1) clean() → 검증 로직
2) save() → 저장 로직
3) @property 메서드
4) __str__() → 문자열 표현

- Meta 클래스
  - verbose_name, verbose_name_plural → 한국어 설정
  - ordering → 정렬 기준 명시
```

**5. 뷰 컨벤션**
```
- 클래스 기반 뷰: ListView, CreateView, UpdateView
- Mixin 사용: LoginRequiredMixin
- DRF Generic Views: CreateAPIView, ListAPIView, RetrieveAPIView
- 권한 설정
  - Template Views: LoginRequiredMixin
  - API Views: AllowAny, IsAdminUser
```

**6. 문서화 컨벤션**
```
- Docstring: 클래스 & 주요 메서드에 한국어 작성 (기능, 파라미터, 반환값)
- 주석: 복잡한 로직 및 비즈니스 로직 설명
```

**7. 템플릿 태그 컨벤션**
```
- 명확한 필터명 사용
  - korean_won, korean_won_with_unit
```

**8. Admin 인터페이스 컨벤션**
```
- Admin 클래스
  - list_display: 목록 표시 필드
  - list_filter: 필터링 옵션
  - search_fields: 검색 가능 필드
  - readonly_fields: 읽기 전용 필드
  - inlines: 인라인 편집

- 커스텀 메서드
  - translation_status: 번역 상태 표시
  - HTML 태그 활용: format_html(), mark_safe()
```

</details>

<details>
<summary>Frontend</summary>

**1. 파일 및 폴더 네이밍 규칙**
```
- 폴더: PascalCase (Product/, GlossyPick/, MobileHome/)
  - 컴포넌트 파일: PascalCase + .tsx (ProductMainBanner.tsx, LanguageButton.tsx)
  - 스타일 파일: PascalCase + .module.scss (ProductMainBanner.module.scss)
  - Hook: camelCase + use접두사 (useMatchaQuiz.ts, useMobileDetect.ts)
```

**2. 컴포넌트 명명 규칙**
```
- 컴포넌트명: PascalCase (ProductMainBanner, LanguageButton)
- export: export default 컴포넌트명
```

**3. 함수/변수 네이밍 규칙**
```
- 함수: camelCase (getProductName, handleAnswer, fetchProduct)
- 변수: camelCase (currentStep, quizState, activeProductId)
- Hook: use 접두사 (useMatchaQuiz, useCurrentLocale)
```

**4. 스타일링 규칙**
```
- CSS Modules: .module.scss 확장자
```

**5. Import/Export 규칙**
```
- Default export: 컴포넌트는 default export
```

</details>

<details>
<summary>Git Branch 명명 규칙</summary>

**1. main branch**
```
- 항상 배포 가능한 상태
- 직접 커밋하지 않고 PR을 통해 머지
```

**2. develop**
```
- 통합 개발 브랜치
- 모든 기능/버그 브랜치는 여기로 PR 후 머지
```

**3. 기능 브랜치**
```
- feat or feature: <기능명>
- 새로운 기능 개발
- PR 후 `develop`에 머지
```

**4. 코드 수정 브랜치**
```
- fix: <수정 파트 이름>
- 버그 수정
- PR 후 develop 브랜치에 merge
```

</details>

---

## 6. 🔧 시스템 아키텍처
<img src="images/readme_img/system.png">

---

## 7. 📅 개발 일정

**개발 기간**: 2025년 7월 28일 ~ 2025년 8월 15일 (19일간)
<img src="images/readme_img/wbs.png">

---

## 8. 📂 프로젝트 구조

<details>
<summary>프로젝트 폴더 구조</summary>

```
Glossy_Matcha/
├── be/                              # Django 백엔드
│   ├── glossy/                      # 프로젝트 설정
│   │   ├── settings.py              # Django 설정
│   │   ├── urls.py                  # 메인 URL 라우팅
│   │   └── wsgi.py                  # WSGI 설정
│   ├── glossymatcha/                # 메인 앱
│   │   ├── models.py                # 데이터베이스 모델
│   │   ├── views.py                 # 뷰 로직 (API + 템플릿)
│   │   ├── serializers.py           # DRF 시리얼라이저
│   │   ├── urls.py                  # 앱 URL 라우팅
│   │   ├── admin.py                 # Django Admin 설정
│   │   ├── forms.py                 # Django Forms
│   │   └── templates/               # Django 템플릿
│   │       └── glossymatcha/
│   │           ├── base.html        # 기본 템플릿
│   │           ├── dashboard.html   # 대시보드
│   │           ├── staff/           # 직원 관리 템플릿
│   │           ├── suppliers/       # 거래처 관리 템플릿
│   │           ├── sales/           # 매출 관리 템플릿
│   │           └── inquiries/       # 문의 관리 템플릿
│   ├── static/                      # 정적 파일
│   ├── media/                       # 업로드 파일
│   ├── db.sqlite3                   # SQLite 데이터베이스
│   └── manage.py                    # Django 관리 명령어
├── fe/                              # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/                     # App Router 페이지
│   │   │   ├── [locale]/            # 다국어 라우팅
│   │   │   │   ├── page.tsx         # 메인 페이지
│   │   │   │   ├── about/           # 브랜드 소개
│   │   │   │   ├── products/        # 제품 페이지
│   │   │   │   ├── glossypick/      # 체험형 콘텐츠
│   │   │   │   └── inquire/         # 문의하기
│   │   │   └── layout.tsx           # 루트 레이아웃
│   │   ├── components/              # React 컴포넌트
│   │   │   ├── Header/              # 헤더 컴포넌트
│   │   │   ├── Footer/              # 푸터 컴포넌트
│   │   │   ├── Home/                # 메인 페이지 컴포넌트
│   │   │   ├── About/               # 브랜드 소개 컴포넌트
│   │   │   ├── Product/             # 제품 관련 컴포넌트
│   │   │   ├── GlossyPick/          # 글로시픽 컴포넌트
│   │   │   └── Inquire/             # 문의하기 컴포넌트
│   │   ├── services/                # API 서비스
│   │   │   ├── productApi.ts        # 제품 API
│   │   │   └── inquireApi.ts        # 문의 API
│   │   ├── hooks/                   # 커스텀 훅
│   │   ├── types/                   # TypeScript 타입 정의
│   │   ├── data/                    # 정적 데이터
│   │   ├── utils/                   # 유틸리티 함수
│   │   └── styles/                  # 글로벌 스타일
│   ├── public/                      # 정적 파일
│   │   ├── images/                  # 이미지 파일
│   │   └── videos/                  # 비디오 파일
│   ├── messages/                    # 다국어 메시지
│   │   ├── ko.json                  # 한국어
│   │   └── en.json                  # 영어
│   ├── package.json                 # 의존성 관리
│   ├── next.config.ts               # Next.js 설정
│   └── tsconfig.json                # TypeScript 설정
├── WBS.md                           # 작업 분해 구조
└── README.md                        # 프로젝트 문서
```

</details>

---

## 9. 📋 ERD

![ERD](images/readme_img/ER%20Diagram.png)

### ERD 특징

> 🔹 제품 관리 영역

- Products를 중심으로 이미지와 스펙이 1:N 관계
- 완전한 다국어 지원 구조

> 🔹 매장 운영 영역

- Staff와 WorkRecord가 1:N 관계로 급여 이력 관리
- 매출 데이터를 일별/월별/연별로 분리하여 효율적 관리

> 🔹 고객 소통 영역

- Inquiries는 독립적으로 고객 문의 관리
- Suppliers는 거래처 정보 관리

> 🔹 확장성 고려

- 각 테이블이 독립적이면서도 필요시 연관 관계 추가 가능한 구조
- 타임스탬프 필드로 데이터 추적 가능

---

## 10-1. 👩🏻‍💻 Backend 시스템

### 매장 운영 대시보드 시스템

#### Gmail 연동 답변 시스템
**고객 서비스 자동화**

- **원클릭 답장**: 고객 이메일 클릭 시 Gmail 답장 창이 자동으로 열리며 즉시 답변 가능
- **스마트 템플릿**: 고객명, 문의 내용, 문의 유형이 미리 입력된 답장 템플릿 자동 생성
- **고객 이력 추적**: 동일 고객의 과거 모든 문의 이력을 한 화면에서 확인 가능
- **문의 유형별 자동 분류**: 일반문의/제품문의/기타문의 자동 태그 표시

#### 실시간 통계 대시보드
**한눈에 보는 매장 현황**

- **6개 핵심 지표 카드**: 재직 직원 수, 오늘 매출, 이번 달 매출, 올해 매출, 거래처 수, 고객문의 건수
- **실시간 데이터 업데이트**: 페이지 새로고침 시 최신 데이터 자동 반영
- **직관적 아이콘**: Bootstrap Icons로 각 지표별 시각적 구분
- **반응형 카드 레이아웃**: 모바일/태블릿/데스크톱 환경별 최적화

#### Chart.js 기반 매출 시각화

- **월별 매출 트렌드**: 최근 12개월 라인 차트로 매출/비용/수익 추이 표시
- **일별 매출 현황**: 최근 30일 바 차트로 일매출 변화 시각화
- **매출 구성 분석**: 도넛 차트로 매출/비용/수익 비율 표시
- **동적 차트 업데이트**: 데이터 변경 시 실시간 차트 갱신

#### 통합 관리 시스템
**직원 관리**

- 재직/퇴사 상태별 관리
- 근무 기록 및 급여 계산
- 직원별 근무 시간 추적

**거래처 관리**

- 활성/비활성 공급업체 관리
- 결제 방식별 분류
- 거래처별 매입 현황

**매출 관리**

- **일별 매출**: 일일 매출 입력
- **월별 매출**: 월간 매출 자동 집계
- **연별 매출**: 연간 매출 자동 집계

#### Excel 내보내기 시스템
**원클릭 리포트 생성**

- **전문적인 엑셀 리포트**: 금액 콤마 표시, 비율 퍼센트 자동 변환, 열 너비 자동 조정으로 가독성 극대화
- **다양한 리포트 유형**: 전체 매출 현황, 개별 월/년도 상세 분석
- **즉시 다운로드**: 버튼 클릭 즉시 완성된 엑셀 파일 다운로드 (별도 프로그램 불필요)

#### 빠른 액션 시스템
**업무 효율성 극대화**

- **원클릭 업무 처리**: 직원 등록, 거래처 추가, 매출 입력 등 주요 업무를 한 번의 클릭으로 처리
- **실시간 현황 모니터링**: 최신 5건의 매출/직원/문의 현황을 메인 화면에서 즉시 확인
- **스마트 필터링**: 재직/퇴사, 활성/비활성 등 상태별 자동 분류로 필요한 정보만 선별 표시

#### 문의 관리 주요 기능

- **실시간 문의 현황**: 대시보드 메인에서 최신 문의 3건 표시
- **문의 유형별 분류**: 일반문의/제품문의/기타 자동 분류 및 통계
- **문의자 이력 관리**: 동일 고객의 문의 이력 연결 추적
- **권한 제어**: 일반 사용자는 문의만 가능, 관리자만 조회 가능
- **API 연동**: `POST /api/inquiries/` 엔드포인트로 문의 데이터 전송

**문의하기 플로우**
```
Next.js 문의 폼 → REST API → Django DB → 매장 운영 대시보드
```

**문의하기 API Logic**
```python
# Backend
class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiries
        fields = ['id', 'name', 'email', 'inquiry_type', 'message', 'created_at']
    
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("이메일은 필수 입력 항목입니다.")
        return value
```

```javascript
// Frontend
const requestData = {
  name: formData.name,
  email: formData.email,
  inquiry_type: CATEGORY_MAP[selectedCategory], // general/product/other
  message: formData.message,
};

const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(requestData),
});
```

---

## 10-2. 👩🏻‍💻 Back / Front 협업 시스템

### 제품 데이터 통합 관리 시스템

#### 다국어 제품 모델 설계
**글로벌 서비스 준비된 제품 관리**

- **이중 언어 지원**: 제품명, 설명, 부제목 등 모든 정보를 한국어/영어로 관리
- **다중 이미지 지원**: ProductImages 모델로 제품당 여러 이미지 관리
- **인라인 관리**: Django Admin에서 제품 수정 시 이미지도 함께 관리
- **이미지별 다국어 alt 텍스트**: 접근성과 SEO 최적화
- **번역 상태 관리**: Django Admin에서 ✅완료/⚠️부분완료/❌미완료 표시

#### 스마트 언어 처리 제품 관련 시스템
**사용자 경험 극대화**

- **지능형 언어 선택**: 영어 번역이 없으면 한국어 버전을 자동으로 표시하여 빈 화면 방지
- **URL 기반 언어 전환**: `/api/products/?lang=ko|en` 파라미터로 언어별 API 제공
- **번역 진행 상황**: 관리자가 번역 작업 우선순위를 한눈에 파악할 수 있는 시각적 표시

**제품 API Logic**
```python
# Backend
class ProductListSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        language = self.context.get('language', 'ko')
        
        if language == 'en':
            data['name'] = instance.name_en or instance.name  # fallback
            data['description'] = instance.description_en or instance.description
        return data
```

```javascript
// Frontend
const response = await fetch(`${API_BASE_URL}/products/?lang=${lang}`, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  cache: "no-store",
});

const data: ProductApiResponse = await response.json();
```

#### 실시간 제품 데이터 동기화

```
Django Admin 제품 수정 → 즉시 DB 저장 → Next.js API 호출 시 최신 데이터 반영
```

- **캐시 없는 실시간**: 관리자가 제품 정보 수정하면 제품 페이지에서 즉시 확인 가능
- **데이터 검증**: 한국어/영어 중 최소 하나의 제품명과 설명 필수 검증
- **관련 데이터 연결**: 제품-이미지-스펙 정보 관계형 구조로 일관성 유지

---

## 11. 🔌 API 명세

### 글로시 말차 브랜드 사이트 (협업 API)

#### 문의하기 API

| 메서드 | 엔드포인트             | 설명           | 권한   |
| ------ | ---------------------- | -------------- | ------ |
| POST   | `/api/inquiries/`      | 문의 생성      | 공개   |
| GET    | `/api/inquiries/list/` | 문의 목록 조회 | 관리자 |
| GET    | `/api/inquiries/{id}/` | 문의 상세 조회 | 관리자 |

#### 제품 API

| 메서드 | 엔드포인트                    | 설명           | 권한 |
| ------ | ----------------------------- | -------------- | ---- |
| GET    | `/api/products/?lang=ko`      | 제품 목록 조회 | 공개 |
| GET    | `/api/products/{id}/?lang=ko` | 제품 상세 조회 | 공개 |

---

## 12. 📑 매장 운영 대시보드 URL (내부 MVP)

### 메인 대시보드

| 메서드 | 엔드포인트 | 설명                 |
| ------ | ---------- | -------------------- |
| GET    | `/`        | 대시보드 메인 페이지 |

#### 직원 관리

| 메서드 | 엔드포인트                  | 설명           |
| ------ | --------------------------- | -------------- |
| GET    | `/staff/`                   | 직원 목록      |
| POST   | `/staff/create/`            | 직원 등록      |
| GET    | `/staff/{id}/`              | 직원 상세      |
| POST   | `/staff/{id}/update/`       | 직원 수정      |
| POST   | `/staff/{id}/delete/`       | 직원 삭제      |
| POST   | `/work-record/create/`      | 근무 기록 생성 |
| POST   | `/work-record/{id}/update/` | 근무 기록 수정 |
| POST   | `/work-record/{id}/delete/` | 근무 기록 삭제 |

#### 거래처 관리

| 메서드 | 엔드포인트                | 설명        |
| ------ | ------------------------- | ----------- |
| GET    | `/suppliers/`             | 거래처 목록 |
| POST   | `/suppliers/create/`      | 거래처 등록 |
| GET    | `/suppliers/{id}/`        | 거래처 상세 |
| POST   | `/suppliers/{id}/update/` | 거래처 수정 |
| POST   | `/suppliers/{id}/delete/` | 거래처 삭제 |

#### 매출 관리

| 메서드 | 엔드포인트                    | 설명                  |
| ------ | ----------------------------- | --------------------- |
| GET    | `/sales/`                     | 일별 매출 목록 (메인) |
| POST   | `/sales/create/`              | 일별 매출 등록        |
| GET    | `/sales/{id}/`                | 일별 매출 상세        |
| POST   | `/sales/{id}/update/`         | 일별 매출 수정        |
| POST   | `/sales/{id}/delete/`         | 일별 매출 삭제        |
| GET    | `/monthly-sales/`             | 월별 매출 목록        |
| POST   | `/monthly-sales/create/`      | 월별 매출 등록        |
| GET    | `/monthly-sales/{id}/`        | 월별 매출 상세        |
| POST   | `/monthly-sales/{id}/update/` | 월별 매출 수정        |
| POST   | `/monthly-sales/{id}/delete/` | 월별 매출 삭제        |
| GET    | `/yearly-sales/`              | 연별 매출 목록        |
| POST   | `/yearly-sales/create/`       | 연별 매출 등록        |
| GET    | `/yearly-sales/{id}/`         | 연별 매출 상세        |
| POST   | `/yearly-sales/{id}/update/`  | 연별 매출 수정        |
| POST   | `/yearly-sales/{id}/delete/`  | 연별 매출 삭제        |

#### 엑셀 내보내기

| 메서드 | 엔드포인트                    | 설명                         |
| ------ | ----------------------------- | ---------------------------- |
| GET    | `/monthly-sales/export/`      | 월간 매출 전체 엑셀 내보내기 |
| GET    | `/yearly-sales/export/`       | 연간 매출 전체 엑셀 내보내기 |
| GET    | `/monthly-sales/{id}/export/` | 개별 월별 매출 엑셀 내보내기 |
| GET    | `/yearly-sales/{id}/export/`  | 개별 연별 매출 엑셀 내보내기 |

#### 문의 관리 (관리자)

| 메서드 | 엔드포인트                | 설명      |
| ------ | ------------------------- | --------- |
| GET    | `/inquiries/`             | 문의 목록 |
| GET    | `/inquiries/{id}/`        | 문의 상세 |
| POST   | `/inquiries/{id}/delete/` | 문의 삭제 |

---

## 13. 시연 영상
### 📼 매장 운영 대시보드
|   1. Login   |
|:---------:|
|<img src="images/readme_gif/be/login.gif">|
|Django Login|

<br>

|   2. Dashboard    |
|:--------------:|
|<img src="images/readme_gif/be/dashboard.gif">|
|매장 운영 메인 대시보드|

<br>

|   3. 직원[Staff]    |
|:--------------:|
|<img src="images/readme_gif/be/staff.gif">|
|직원 관리|

<br>

|   4. 일별 매출[Daily Sales]   |
|:--------------:|
|<img src="images/readme_gif/be/sales.gif">|
|일별 매출 관리|

<br>

|   5. 개별 월/년 매출   |
|:--------------:|
|<img src="images/readme_gif/be/excel1.gif">|
|개별 월/년 매출 엑셀 다운로드|

<br>

|   6. 전체 월/년 매출   |
|:--------------:|
|<img src="images/readme_gif/be/excel2.gif">|
|전체 월/년 매출 엑셀 다운로드|

<br>

|   7. 거래처   |
|:--------------:|
|<img src="images/readme_gif/be/client.gif">|
|거래처 관리|

<br>

|   8. 문의하기   |
|:--------------:|
|<img src="images/readme_gif/be/email.gif">|
|Gmail로 원클릭 답장|

---

### 📼 글로벌 브랜드 웹사이트
|   1. Home   |
|:---------:|
|<img src="images/readme_gif/fe/home.gif" width="450">|
|메인 홈 화면|

<br>

|   2. about   |
|:---------:|
|<img src="images/readme_gif/fe/about.gif" width="450">|
|브랜드 소개|

<br>

|   3. product   |
|:---------:|
|<img src="images/readme_gif/fe/product.gif" width="450">|
|제품 소개|

<br>

|   4. add product   |
|:---------:|
|<img src="images/readme_gif/fe/addProduct.gif" width="450">|
|admin 제품 추가 실시간 연동|

<br>

|   5. glossyPick   |
|:---------:|
|<img src="images/readme_gif/fe/glossypick.gif" width="450">|
|체험형 컨텐츠|

<br>

|   6. inquire   |
|:---------:|
|<img src="images/readme_gif/fe/inquire.gif" width="450">|
|문의하기|

<br>

|   7. change language   |
|:---------:|
|<img src="images/readme_gif/fe/language.gif" width="450">|
|헤더에 언어변경 버튼 클릭 시 국영문 전환|

<br>

---

**[모바일 반응형]**
| 1. Home (Mobile) | 2. About (Mobile) |
| --- | --- |
| <img src="images/readme_gif/fe/home_mb.gif" width="400"> | <img src="images/readme_gif/fe/about_mb.gif" width="400"> |

| 3. Product (Mobile) | 4. GlossyPick (Mobile) |
| --- | --- |
| <img src="images/readme_gif/fe/product_mb.gif" width="400"> | <img src="images/readme_gif/fe/glossypick_mb.gif" width="400"> |

---

## 14. 🌐 배포 정보

### 프론트엔드 (Vercel)
- **자동 배포**: GitHub main branch 푸시 시 Vercel 자동 배포
- **환경 변수**: Vercel Dashboard에서 설정
- **무중단 배포**: 코드 변경 시 자동 빌드/테스트/배포 파이프라인

### 백엔드 (AWS Lightsail & GitHub Actions)
- **서버**: AWS Lightsail Ubuntu 22.04 LTS
- **데이터베이스**: SQLite3 (파일 기반) / 데이터베이스 마이그레이션 자동 실행
- **웹서버**: Nginx + Gunicorn
- **SSL/보안**: Let's Encrypt HTTPS 인증서
- **Collectstatic**: 정적 파일 수집 및 배포 자동화
- **CI/CD 프로세스**: 코드 푸시 → GitHub Actions → 테스트 → 빌드 → AWS Lightsail 자동 배포 → 서비스 재시작

### 🔐 도메인 보안 강화 적용 사항

#### HTTPS 전환 이유
- **데이터 보안**: 클라이언트-서버 간 모든 통신 암호화로 중간자 공격 차단
- **신뢰성 향상**: 브라우저 보안 경고 제거 및 사용자 신뢰도 증가
- **SEO 최적화**: Google 등 검색엔진의 HTTPS 사이트 우선 순위 적용

#### 도메인 보안 강화
- **서브도메인 난독화**: 예측 가능한 URL을 난수 형태로 변경하여 무차별 대입 공격 방지
  - 변경 전: `admin.glossymatcha.com`, `api.glossymatcha.com`
  - 변경 후: `a92fj39af.glossymatcha.com`, `x81fj32kd.glossymatcha.com`
- **IP 접속 차단**: 직접 IP 접근 차단으로 서버 노출 최소화

#### 구현 방법
```bash
# 1. SSL 인증서 발급
sudo certbot --nginx -d a92fj39af.glossymatcha.com
sudo certbot --nginx -d x81fj32kd.glossymatcha.com

# 2. Nginx 설정에 HTTPS 리다이렉트 추가
# HTTP → HTTPS 자동 리다이렉트
# IP 접속 → 도메인 리다이렉트

# 3. Django 보안 설정 추가
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

#### 적용된 보안 기능
- **SSL 인증서**: Let's Encrypt 자동 갱신
- **보안 헤더**: HSTS, XSS Protection, Content-Type 보안
- **접근 제어**: IP 직접 접속 차단, 도메인 기반 접근만 허용
- **CORS 정책**: 허용된 도메인만 API 접근 가능

---

## 15. 🏆 프로젝트 성과

### 기술적 성과
- **모던 웹 기술 스택**: Next.js 15 + Django 5.2 최신 기술 적용
- **타입 안전성**: TypeScript 도입으로 런타임 에러 최소화
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **다국어 지원**: next-intl을 활용한 효율적인 국제화 구현
- **보안 강화**: HTTPS 적용 및 도메인 기반 서비스 분리

### 비즈니스 성과
- **브랜드 가치 향상**: 프리미엄 브랜드 이미지 구축
- **운영 효율성**: Django 템플릿 기반 매장 운영 대시보드로 업무 효율 개선
- **고객 접점 확대**: 온라인 브랜드 경험 제공
- **글로벌 준비**: 다국어 지원으로 해외 진출 기반 마련

### 학습 성과
- **풀스택 개발**: 프론트엔드부터 백엔드까지 전체 시스템 구축
- **협업 능력**: 협업을 통한 프로젝트 관리 경험
- **DevOps**: 클라우드 배포 및 HTTPS 보안 설정 경험
- **UI/UX**: 사용자 중심의 인터페이스 설계 및 구현

---

## 16. 🚨 트러블슈팅 사례

### **심희현**

### 1. HTTPS/HTTP 프로토콜 불일치로 인한 API 연동 오류

#### **문제 상황**

- 프론트엔드에서 백엔드 API 호출 시 Mixed Content 오류 발생
- HTTPS 환경에서 HTTP API 호출로 인한 브라우저 보안 정책 차단

#### **원인 분석**

```
프론트엔드: HTTPS 도메인
백엔드 API: HTTP 도메인
→ 브라우저의 Mixed Content 보안 정책으로 차단
```

#### **해결 과정**

1. **문제 파악**: 브라우저 개발자 도구에서 Mixed Content 오류 확인
2. **임시 해결책**: 로컬 개발 환경에서 HTTPS 비활성화 테스트
3. **근본적 해결**: 백엔드 서버에 SSL 인증서 적용
   - Let's Encrypt를 활용한 무료 SSL 인증서 발급
   - Nginx 설정 파일에 SSL 설정 추가

#### **결과**

- API 통신 정상화
- 보안성 향상 및 실제 운영 환경과 동일한 HTTPS 환경 구축

#### **학습 내용**

- 웹 보안 정책에 대한 이해 향상
- SSL/TLS 인증서 적용 경험
- 개발 환경과 운영 환경의 일치성 중요성 체감

---

### 2. 데이터베이스 마이그레이션: PostgreSQL → SQLite

#### **문제 상황**

- 초기 PostgreSQL 사용 중 배포 과정에서 복잡성 증가
- 프로젝트 기간 특성상 간단하고 빠른 개발 환경 필요

#### **PostgreSQL 대비 SQLite 선택 이유**

| 항목            | PostgreSQL          | SQLite                   | 선택 이유                   |
| --------------- | ------------------- | ------------------------ | --------------------------- |
| **설치/설정**   | 별도 서버 설치 필요 | 파일 기반, 설정 불필요   | 🔹 빠른 개발 환경 구축      |
| **팀 협업**     | 서버 공유 설정 복잡 | 파일 공유로 간단         | 🔹 Git으로 DB까지 버전 관리 |
| **배포 복잡도** | DB 서버 별도 관리   | 애플리케이션과 함께 배포 | 🔹 단순한 배포 프로세스     |
| **개발 속도**   | 스키마 관리 복잡    | 즉시 테스트 가능         | 🔹 빠른 프로토타이핑        |

#### **해결책**

1. **ORM 호환성 확인**: Django ORM의 데이터베이스 중립적 쿼리로 변경
2. **데이터 타입 조정**: PostgreSQL 특화 필드를 표준 필드로 변경
3. **마이그레이션 파일 정리**: 불필요한 PostgreSQL 종속성 제거

#### **성과**

- 개발 환경 설정 시간 단축
- 팀원 간 개발 환경 동기화 문제 해결
- 단순한 배포 프로세스로 DevOps 복잡도 감소

---

### 3. CI/CD 자동 배포 중 Nginx Proxy 설정 오류

#### **문제 상황**

- Git push 후 CI/CD 파이프라인이 정상 실행되었으나 새로운 코드가 반영되지 않음
- 애플리케이션 로그는 정상이지만 실제 API 응답은 이전 버전과 동일

#### **문제 원인**

```nginx
# Before
location / {
    proxy_pass http://127.0.0.1:8000;  # ❌ 로컬 주소로 직접 연결
}
```

```nginx
# after
location / {
    proxy_pass http://unix:/tmp/gunicorn.sock;  # ✅ Unix 소켓 사용
}
```

#### **문제 분석 과정**

1. **로그 확인**: Gunicorn, Nginx 로그 분석
2. **프로세스 확인**: `ps aux | grep gunicorn`으로 프로세스 상태 점검
3. **네트워크 확인**: `netstat -tuln`으로 포트 사용 상황 확인
4. **설정 검증**: Nginx 설정과 Gunicorn 소켓 설정 불일치 발견

#### **근본 원인**

- Nginx가 Unix 소켓이 아닌 TCP 포트로 연결
- CI/CD로 새 코드가 배포되어도 기존 Gunicorn 프로세스가 계속 실행
- 새로운 Unix 소켓 파일이 생성되지 않아 이전 버전 서비스 계속 제공

#### **해결 과정**

```bash
# 1. Nginx 설정 수정
sudo vim /etc/nginx/sites-available/default

# 2. 설정 테스트 및 재로드
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart site
```

#### **결과 및 학습**

- **즉시 효과**: 새 코드 배포 즉시 반영 확인
- **안정성 향상**: Unix 소켓 사용으로 성능 및 보안 개선
- **모니터링 강화**: 배포 후 헬스체크 자동화 도입

#### **핵심 학습 포인트**

- **인프라 이해**: 웹 서버와 애플리케이션 서버 간 통신 방식
- **디버깅 스킬**: 로그 분석과 시스템 상태 점검 능력
- **자동화 개선**: CI/CD 스크립트의 완전성과 검증 프로세스 중요성

### 트러블슈팅 성과 요약

| 문제 영역        | 해결 시간 | 핵심 스킬                     | 비즈니스 임팩트       |
| ---------------- | --------- | ----------------------------- | --------------------- |
| **보안/통신**    | 4시간     | SSL/HTTPS, 브라우저 보안 정책 | 사용자 신뢰도 향상    |
| **데이터베이스** | 2일       | DB 마이그레이션, ORM 최적화   | 개발 생산성 향상  |
| **인프라/배포**  | 6시간     | Nginx, Unix 소켓, CI/CD       | 배포 신뢰성 증가 |

### 핵심 역량 어필 포인트

#### **문제 해결 능력**

- 체계적 디버깅 접근법 (로그 → 설정 → 테스트)
- 근본 원인 분석을 통한 완전한 문제 해결

#### **기술적 성장**

- 단순한 에러 수정을 넘어선 시스템 이해도 향상
- 개발 환경부터 운영 환경까지 전체 파이프라인 경험

#### **팀워크 & 문서화**

- 팀원들이 재현할 수 있도록 명확한 해결 과정 문서화
- 향후 동일 문제 예방을 위한 가이드라인 수립

#### **비즈니스 마인드**

- 기술적 결정이 개발 생산성과 서비스 안정성에 미치는 영향 고려
- 단기 해결책과 장기 개선책의 균형있는 접근

---

### **김성현**

### 1. Git 브랜치 및 PR 관리 오류

**문제 상황**

- 초기 프론트엔드 기능 개발 후 `develop` 브랜치로 PR을 올리려 했으나 실수로 `main` 브랜치로 머지함
- `develop`에는 변경 사항이 반영되지 않아 브랜치 관리 혼란 발생
- 최종적으로 레포지토리를 초기화하고 새로 생성

**원인 분석**

- PR 생성 시 대상 브랜치 확인 누락
- 브랜치 전략 및 Git 워크플로우에 대한 사전 합의 부족

**해결 방안**  
- PR 생성 전 대상 브랜치 반드시 확인
- `develop`은 주 개발 브랜치, `main`은 릴리즈 전용으로 관리
- 팀 내 Git 사용법과 체크리스트 공유
- 문제 발생 시 즉시 공유 및 해결 방안 논의

**배운점**  
- 브랜치 전략을 명확히 하지 않으면 협업 과정에서 혼선이 발생할 수 있음  
- 코드 리뷰 전 브랜치 대상 검증 절차가 중요함  
- 사소한 실수도 팀 전체 일정에 영향을 줄 수 있음을 경험함  
- 문서화와 규칙 공유가 협업 품질을 높이는 핵심 요소임  

---

### 2. useDownload 훅 – iOS 다운로드 오류

**문제 상황**

- 말차 추천 결과를 이미지로 저장하는 기능 구현 시 iOS Safari에서 다운로드 기능이 정상 작동하지 않음
- html2canvas 캡처 이미지를 즉시 다운로드 시도 → 팝업 차단, 다운로드 불가, 이미지 미출력
- `document.write` 사용 시 deprecated 경고
- `about:blank` 새 탭에서는 이미지 렌더링 실패

**해결 과정**

- `window.open()`을 클릭 이벤트 내에서 호출하여 팝업 차단 최소화
- `document.write` 대신 DOM API로 이미지 삽입
- iOS는 Web Share API로 공유 유도, Android/PC는 즉시 다운로드 유지

**결론**

- iOS 보안 정책상 즉시 다운로드 UX 한계 존재
- 기능을 "공유하기" 중심으로 통합해 사용자 혼란 최소화
- 초기 기획 시 플랫폼별 제약 고려 필요

---

### 3. About 페이지 sub-nav 언어 전환 불가

**문제 상황**

- About 페이지 sub-nav 텍스트가 국·영문 전환 시 갱신되지 않음

**원인 분석**

- ScrollNav(클라이언트 컴포넌트)가 서버에서 번역된 고정 문자열을 props로 받아 표시
- 언어 변경 시 ScrollNav 내부에서 번역 재처리하지 않음

**해결 과정**

- About 페이지에서 번역된 문자열 대신 메뉴 키(id) 전달
- ScrollNav에서 `useTranslations()`로 직접 번역 처리

**배운점**

- 다국어 처리 시 클라이언트 컴포넌트 내부에서 번역 수행 필요
- 서버에서 번역된 결과를 그대로 넘기면 언어 전환 반영이 어려움

---

### **조은이**

### 1. 초기 렌더링 지연 문제 (useMobileDetect 훅 → 미디어쿼리 전환)

#### **문제**

- PC/모바일 UI가 크게 달라서 useMobileDetect 훅을 만들어 기기별 컴포넌트를 렌더링하도록 구현했으나, resize 이벤트 리스너 기반으로 동작하다 보니 초기 렌더링 속도가 매우 느려짐. Lighthouse에서도 성능 저하 경고가 발생.

#### **시도**

- 훅 유지 → 최적화 고민 → 개선이 어려움.

#### **해결**

- CSS 미디어쿼리만으로 대응하도록 리팩토링 → 초기 렌더링 속도 크게 개선됨.

#### **배운점**

- 불필요한 JS 연산보다 CSS 레벨에서 해결 가능한 부분은 스타일링으로 해결하는 것이 성능상 유리함.

---

### 2. 모바일 홈 스크롤 구현 시 Footer 겹침 문제

#### **문제**

- 모바일 홈에서 scroll-snap을 적용했을 때, Layout에 공통 포함된 Footer가 스크롤 영역에 속하지 않아 Footer가 메인 콘텐츠와 겹침.

#### **시도**

- CSS로 스크롤 범위를 조정하려 했으나 실패.

#### **해결**

- 모바일 홈에서는 공통 Footer를 display: none 처리하고, 해당 페이지 전용 Footer를 main 내부에 직접 넣음.

#### **배운점**

- 공통 레이아웃 구조가 특정 인터랙션과 충돌할 수 있으며, 일관성과 시멘틱 구조 vs. UX 기능 구현 사이에서 트레이드오프가 필요할 수 있음.

---

### 3. 구매한 도메인 연결 시도 중 DNS 설정 문제

#### **문제**

- Vercel에 도메인을 추가하면 자동 연결되는 줄 알았으나, 실제로는 **도메인 등록처의 DNS 설정(A 레코드, CNAME)**을 직접 수정해야 함.

#### **시도**

- 단순 등록 → 연결 실패.

#### **해결**

- 도메인 등록처 네임서버 관리 화면에서 Vercel이 제공하는 A 레코드와 CNAME을 직접 등록. 이후 AWS API 연결된 백엔드 도메인도 정상 작동.

#### **배운점**

- 배포 시에는 DNS의 전반적인 배포 인프라를 이해해야 함.

---

### **김유빈**
### 1. API 타입 정의 불일치 → 런타임 에러 해결
**문제 상황**  
- 제품 API 연동 초기, 백엔드 JSON 구조와 프론트엔드 타입 정의가 달라 undefined 에러 발생 (특히 images, body_sections)

**해결 과정**  
- 브라우저 네트워크 탭을 통해 실제 API 응답 분석 → ProductImage, ProductBodySection 등 세부 타입 정의 → 타입 가드 함수로 런타임 검증 추가

**성과**  
- 런타임 에러 제거, 개발 단계에서 타입 안정성 확보, 백엔드와 API 스펙 동기화 개선

---

### 2. API 타임아웃 → 무한 로딩 문제 방어
**문제 상황**  
- 네트워크 불안정 시 API 호출이 무한 대기 상태에 빠져 페이지가 멈춤

**해결 과정**  
- AbortSignal.timeout(10000) 적용으로 10초 타임아웃 설정, 로딩/에러 상태 UI 분리로 사용자 피드백 제공

**성과**  
- 안정적인 사용자 경험 제공, 네트워크 불안정성을 고려한 방어적 프로그래밍 경험

---

### 3. Mock 데이터 Fallback → 서비스 안정성 확보
**문제 상황**  
- API 서버 장애 시 제품 페이지 전체가 blank 화면으로 표시

**해결 과정**  
- 실제 API 구조와 동일한 Mock 데이터 구축, API 에러 시 자동 Fallback 적용, 콘솔 경고로 개발자 알림

**성과**  
- 서비스 가용성 확보, 프론트/백엔드 병렬 개발 가능

---

### 4. 텍스트 필드 줄바꿈 처리 - PC/모바일 충돌 해결
**문제 상황**
- 제품 설명 텍스트에서 PC와 모바일 환경별로 서로 다른 줄바꿈 처리가 필요했음  
- 초기 구현에서 \n을 PC 줄바꿈, n을 모바일 줄바꿈으로 혼합 사용 → 렌더링 오류 발생

**원인 분석**  
- 프론트엔드에서 n 파싱 시 \n과 구분 불가 → 예상치 못한 줄바꿈  
- CSS `white-space` 속성만으로는 반응형 대응이 어려움

**시도한 해결책**  
- 이스케이프 문자 변경 (n → \r\n) → 여전히 충돌  
- CSS `white-space: pre-line` 적용 → 반응형 레이아웃 제약
- 별도 필드(`description_mobile`) 분리 → 데이터 중복, 관리 복잡

**최종 해결 방법**  
- 모바일 전용 줄바꿈을 `*n`으로 변경 (구분자 분리)  
- `textFormatter.tsx`에서 환경별로 파싱 처리  
```
export const formatText = (text: string, isMobile: boolean) => {
  if (isMobile) {
    return text.replace(/\*n/g, '<br>').replace(/\n/g, ' ');
  } else {
    return text.replace(/\n/g, '<br>').replace(/\*n/g, ' ');
  }
};
```

**성과**
- PC/모바일 각각 최적화된 텍스트 레이아웃 구현
- 원클릭 반응형 텍스트 관리 가능
- 텍스트 충돌 문제 해결

---

## 17. ✍🏻 프로젝트 회고

### **심희현**

> 이 프로젝트에서 백엔드 파트를 맡은 팀장으로 참여하며, Django Template과 Django REST Framework를 활용한 두 가지 버전의 서비스를 동시에 구현하는 도전적인 과제를 수행했습니다. 기획서, 와이어프레임, 디자인 가이드 등 어떤 문서도 없는 완전한 제로베이스 상황에서 프로젝트를 시작해야 했던 점이 가장 큰 도전이었습니다.

> 개인 개발과 협업 개발의 본질적 차이를 깊이 체감할 수 있었습니다. 개인 프로젝트에서는 혼자만의 기준과 판단으로 빠르게 의사결정을 내릴 수 있었지만, 팀 프로젝트에서는 다양한 관점과 요구사항을 조율하며 합의점을 찾아가는 과정이 필수적임을 깨달았습니다.

> Django Template 기반의 서버사이드 렌더링 버전과 DRF 기반의 API 서버 버전을 병행 개발하면서, 개인 프로젝트에서 쌓은 기술적 기반이 협업 환경에서 어떻게 활용되는지 경험할 수 있었고, 각각의 아키텍처 특성에 맞는 데이터 구조와 비즈니스 로직을 설계했습니다. Template 버전에서는 Django의 MVT 패턴을 활용한 전통적인 웹 개발 방식을, DRF 버전에서는 RESTful API 설계 원칙을 적용한 현대적인 백엔드 아키텍처를 구현했습니다.

> 대표님과 팀원들과의 카카오톡 회의를 통해 실시간으로 요구사항을 수집하고, 각 기능을 구현할 때마다 "이 API는 어떤 데이터 구조로 설계해야 할까?", "사용자가 이 화면에서 어떤 추가 기능을 원할까?", "현재 디자인에서 UX적으로 개선할 점은 무엇일까?", "사용자 경험을 위해 어떤 기능을 우선적으로 구현해야 할까?"와 같은 질문들을 지속적으로 제기하며, 개인 개발에서는 경험할 수 없었던 다각도의 피드백을 수집하고 반영하는 과정을 거쳤습니다.

> 특히 백엔드 파트를 맡았음에도 프론트엔드 팀원들의 코드 리뷰와 UI/UX 개선 제안, 페이지에 필요한 영상 편집을 적극적으로 수행했으며, Django ORM 설계부터 API 명세, 템플릿 렌더링 최적화, 화면 플로우, 사용자 인터랙션까지 전체 서비스 아키텍처를 종합적으로 고려하여 의사결정을 내렸습니다. 두 가지 기술 스택을 동시에 관리하면서 코드 재사용성과 유지보수성을 고려한 모듈화된 구조를 설계하는 경험도 쌓을 수 있었습니다.

> 가장 큰 깨달음은 개인 프로젝트에서 쌓은 기술적 역량이 협업에서는 '소통과 조율을 통한 문제 해결'로 확장되어야 한다는 점이었습니다. Django ORM 설계부터 API 명세, 템플릿 최적화까지 두 가지 기술 스택을 동시에 관리하면서도, 팀원들의 의견을 수렴하고 비즈니스 요구사항과 기술적 제약 사이의 균형점을 찾아가는 과정을 통해 실무에서 요구되는 종합적 사고능력과 리더십을 갖추게 되었습니다.

> 이러한 경험을 통해 다양한 기술 스택에 대한 깊은 이해와 함께, 불확실성이 높은 프로젝트 환경에서도 체계적으로 문제를 분석하고, 다양한 이해관계자들의 니즈를 균형 있게 조율하며, 기술적 제약과 비즈니스 목표 사이의 최적해를 찾아내는 역량을 기를 수 있었습니다. 실제 개발 현장에서 마주할 수 있는 복잡한 기술적 요구사항과 변화하는 비즈니스 환경에 대해 능동적으로 대응하고, 팀을 이끌어 나갈 수 있는 실무 역량을 갖추었다고 생각합니다.

---

### **김성현**

> 이번 프로젝트는 실제 회사의 프로젝트를 처음 경험할 수 있었던 소중한 기회였다. 대표님의 요구사항을 직접 듣고 피드백을 주고받으며 합의점을 찾아가는 과정이 매우 인상 깊었고, 이를 통해 실무에서의 소통 방식과 업무 흐름을 조금이나마 체감할 수 있었다.

> 그동안은 개인 프로젝트만 진행했지만, 이번에는 여러 명이 함께하는 팀 프로젝트를 하면서 원활한 협업과 소통의 중요성을 크게 느꼈다. 특히, 처음부터 명확한 요구사항이나 디자인이 주어지지 않아 기획 단계부터 디자인, 구현까지 모든 과정을 직접 진행했는데, 이 경험이 매우 신선하고 도전적이었다. 덕분에 단순히 기능을 구현하는 것에 그치지 않고, 전체 프로젝트를 주도적으로 설계하고 완성해 나가는 과정을 배울 수 있었다.

> 프로젝트를 진행하며 Next.js App Router 기반 SPA, React Hook, Custom Hook, next-intl, React-Toastify, Web Share API 등 다양한 기술을 직접 적용하며 기술적 성장을 체감했다. 특히, 퀴즈 진행 상태 관리와 공유 기능 구현 과정에서 발생한 문제들을 해결하면서 문제 해결 능력과 로직 설계에 대한 자신감도 크게 높아졌다.

> 팀원들과 Git을 활용한 협업, 브랜치 관리, 코드 리뷰 과정을 경험하며 팀워크와 커뮤니케이션 능력 또한 향상될 수 있었다. UI/UX 측면에서도, 퀴즈와 결과 공유 화면을 구현하며 사용자 경험을 고려한 인터랙티브 설계의 중요성을 직접 느꼈다. 각 페이지에서 발생하는 이벤트와 알림 처리, 다국어 메시지 지원 등 작은 디테일까지 꼼꼼히 구현하며 디테일의 중요성도 깨달았다.

> 제한된 시간과 조건 속에서 기능 우선순위를 정하고 구현하면서 효율적인 문제 해결 전략을 고민할 수 있었다. 팀원들과 의견을 조율하며 각자 맡은 역할을 명확히 하고, 기획과 디자인 피드백을 반복적으로 주고받은 과정도 값진 경험이었다. 이번 프로젝트를 통해 단순한 기능 구현이 아니라 전체 서비스 구조와 흐름을 이해하고 주도적으로 설계하는 능력을 배울 수 있었다.

> 마지막으로, 프로젝트 완료 후 실제 사용자에게 보여질 결과물을 직접 구현했다는 성취감과 자신감이 매우 컸으며, 앞으로의 개발 경험에 큰 밑거름이 될 것이라고 느꼈다.

### **김유빈**

> 이번 Glossy Matcha 웹사이트 프로젝트는 프론트엔드와 백엔드가 함께 협업하는 첫 경험이었기에 큰 의미가 있었습니다. 단순히 화면을 구현하는 데 그치지 않고, 실제 배포되는 서비스의 한 부분을 맡아 개발할 수 있었다는 점에서 큰 성취감을 느꼈습니다. 디자이너가 따로 없는 상황이었기 때문에 페이지의 전체적인 디자인까지 직접 진행해야 했는데, 다양한 UI/UX 레퍼런스를 참고하면서 Figma로 와이어프레임과 시안을 제작했습니다. 이 과정을 통해 단순히 기능 구현을 넘어 사용자 경험을 고려하는 시각을 기를 수 있었습니다.

> 또한 제품 상세 페이지, 메인 배너, 네비게이션과 푸터 같은 공통 컴포넌트를 직접 구현하면서, 반응형 UI와 애니메이션, API 연동까지 실무에서 자주 접하는 기능들을 폭넓게 다뤄볼 수 있었습니다. 처음에는 API 연동 과정에서 낯선 오류를 마주하며 어려움을 겪었지만, 팀원들과의 소통을 통해 빠르게 문제를 해결할 수 있었고, 이를 통해 협업의 중요성과 즐거움을 다시 한 번 깨닫게 되었습니다. API 서버가 불안정하거나 일시적으로 다운되는 상황을 대비해 별도의 Mock 데이터를 제작하여 개발을 이어갈 수 있도록 준비했습니다. 이 과정을 통해 예외 상황을 고려한 안정적인 개발 습관을 기를 수 있었고, 작은 부분까지 놓치지 않는 꼼꼼함을 발휘했습니다.

> 프로젝트를 진행하며 GitHub Flow 방식의 협업을 직접 경험하면서, 효율적인 브랜치 전략과 코드 리뷰 문화가 왜 중요한지 몸소 느낄 수 있었습니다. 또한 단순히 맡은 기능만 구현하는 데 그치지 않고, 전체 서비스의 구조와 사용자 흐름을 고려하며 문제를 해결하는 시야를 넓힐 수 있었습니다. 무엇보다 다양한 의견을 주고받으며 팀과 함께 완성도를 높여가는 과정에서 협업 능력을 한층 강화할 수 있었습니다.

### **조은이**

> 이번 프로젝트에서는 기획자와 디자이너의 역할이 얼마나 중요한지 크게 느낄 수 있었다. 명세와 디자인 요구사항이 구체적이지 않아 개발자들이 직접 디자인을 나눠 진행하게 되었는데, 처음에는 막막했지만 디자인 시스템을 정리하고 분업하며 결과적으로 괜찮은 화면을 만들 수 있었다. 이 과정에서 단순히 개발만이 아니라 디자인 감각과 다른 파트에 대한 이해도 함께 키울 수 있었다.

> 협업 방식에서도 많은 성장을 했다. 이전에는 단일 브랜치에서 단순히 작업했지만, 이번에는 기능별 브랜치를 나눠 관리하며 충돌을 해결하고 코드를 리뷰하는 과정을 경험했다. 이를 통해 Git 활용 능력과 협업 능력이 자연스럽게 향상되었다.

> 배포 경험 역시 확장됐다. 단순히 GitHub Pages만 써보았던 과거와 달리, 이번에는 Netlify와 Vercel을 활용해 배포했고 직접 구매한 도메인을 연결하면서 배포 인프라에 대한 이해도 넓힐 수 있었다.

> 무엇보다 가장 큰 차이는 소통 방식이었다. 개발 내내 Discord로 함께 소통하며 진행하다 보니 평소보다 의견 교환이 훨씬 활발했고, 팀워크도 잘 맞아 프로젝트를 기한보다 빨리 마무리할 수 있었다. 덕분에 추가적인 개선 작업까지 할 수 있었고, 책임감 있는 팀원들과 협업하는 긍정적인 경험을 할 수 있었다.

> 결과적으로 처음에는 단순히 API 연결과 디자인된 화면 개발이 주가 될 거라 생각했지만, 오히려 디자인과 인터랙션, 협업 방식에서 더 많은 배움을 얻을 수 있었다. 이번 경험을 통해 기술뿐 아니라 소통, 디자인 감각, 배포 이해까지 폭넓게 성장했다고 느낀다.

---

## 18. 🚀 설치 및 실행 방법

### 환경 요구사항

- **Node.js**: 22.0 이상
- **Python**: 3.12 이상
- **Git**: 최신 버전

### 1. 저장소 클론

```bash
git clone https://github.com/Gloss-y/Glossy_Matcha
```

### 2. 백엔드 설정

```bash
cd be

# 가상환경 생성 및 활성화
python -m venv venv
MacOS: source venv/bin/activate
Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
python manage.py migrate

# 관리자 계정 생성
python manage.py createsuperuser

# 개발 서버 실행
python manage.py runserver
```

### 3. 프론트엔드 설정

```bash
cd fe

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. 접속 정보

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:8000/api
- **관리자 페이지**: http://localhost:8000/glossyjay

---

## 19. 🤝 기여 방법

### 개발 참여

1. 저장소 Fork
2. 새로운 브랜치 생성 (`git checkout -b feature/새기능`)
3. 변경사항 커밋 (`git commit -am 'feat: 새로운 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/새기능`)
5. Pull Request 생성

---

## 20. 🙏 감사의 글

이 프로젝트는 다음과 같은 오픈소스 라이브러리와 도구들의 도움으로 완성되었습니다:

### [Backend]
- **Django**: Python 기반 웹 프레임워크
- **AWS Lightsail**: 간편한 클라우드 서버 서비스
- **Let's Encrypt**: 무료 SSL 인증서 서비스

### [Frontend]
- **Next.js**: React 프레임워크
- **Vercel**: 프론트엔드 배포 플랫폼

---

<div align="center">

**🍵 제주의 프리미엄 말차, 글로시말차와 함께하세요 🍵**

Made with ❤️ by Glossy Matcha Team

</div>