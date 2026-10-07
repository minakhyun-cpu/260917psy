# 마지 마인드랩 — 심리검사 & 해석상담 신청

성격검사, 자녀 검사, 정서·스트레스 척도 등 심리검사와 1:1 해석상담 서비스를
소개하고, 방문자가 온라인으로 상담을 신청할 수 있는 반응형 웹앱입니다. 결제
기능과 검사 자체의 온라인 응시는 이 앱의 범위에 포함되지 않습니다.

`/recovery` 페이지에서는 Gemini(`gemini-3.5-flash-lite`) 기반의 AI 번아웃
회복 솔루션도 제공합니다. 사용자가 자신의 Gemini API 키를 직접 입력해
사용하는 방식이며, 키는 브라우저에서 Google API로 바로 전달되고 서버로는
전송되지 않습니다.

Firebase(Firestore, Spark 무료 요금제)를 활용해 **후기 게시판**(`/reviews`),
**심리학·뇌과학 칼럼**(`/columns`), **문의/건의 게시판**(`/contact`)도
제공합니다. 후기 작성·열람과 문의 제출은 브라우저에서 Firebase **클라이언트
SDK**로 직접 Firestore에 접근하고, 칼럼(공개 콘텐츠)과 모든 관리자 작업은
서버에서 **Admin SDK**로만 접근합니다 — 두 설정을 각각 준비해야 합니다
(아래 "Firebase 설정" 참고).

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod (폼 검증)
- Supabase (Postgres) — 신청 데이터 저장
- Resend — 운영자 이메일 알림
- Firebase Firestore (Spark 무료 요금제) — 클라이언트 SDK(후기/문의) + Admin SDK(칼럼, 관리자 작업)
- Vitest — 폼 검증 스키마 유닛 테스트

## 폴더 구조

```
app/
  page.tsx              랜딩 페이지 (검사 소개, 절차, 상담사 소개, FAQ)
  tests/page.tsx         심리검사 상세 안내
  apply/page.tsx          상담 신청 폼 페이지
  apply/actions.ts        신청 제출 서버 액션 (검증 → Supabase 저장 → 이메일 알림)
  apply/complete/page.tsx 신청 완료 확인 페이지
  privacy/page.tsx        개인정보처리방침
  admin/page.tsx          관리자 대시보드 (신청 목록/상태 변경, 선택 기능)
  admin/login/page.tsx     관리자 로그인
  recovery/page.tsx        AI 번아웃 회복 솔루션 (사용자 Gemini API 키 입력)
  reviews/                후기 게시판 (공개 작성 + 공개 열람)
  columns/                심리학·뇌과학 칼럼 (공개 열람, 작성은 관리자 전용)
  contact/                문의/건의 제출 폼 (비공개, 관리자만 열람)
  admin/reviews/           관리자: 후기 삭제
  admin/columns/           관리자: 칼럼 작성/수정/삭제
  admin/inquiries/         관리자: 문의/건의 조회·처리
proxy.ts                  /admin 라우트 보호 (Next.js 16의 middleware → proxy)
components/               UI 컴포넌트, 아이콘(icons.tsx), 일러스트(illustrations/)
lib/                      Supabase/이메일/Firebase(Admin+클라이언트) 클라이언트, 검사 카탈로그, 관리자 인증
  firebaseAdmin.ts         서버 전용 Admin SDK (칼럼, 관리자 작업)
  firebaseClient.ts        브라우저용 클라이언트 SDK (후기, 문의)
types/application.ts      신청 폼 Zod 스키마 및 타입 (+ 유닛 테스트)
types/burnout.ts           AI 번아웃 회복 체크인 Zod 스키마 및 타입 (+ 유닛 테스트)
types/review.ts, column.ts, inquiry.ts  각 게시판 Zod 스키마 및 타입
supabase/schema.sql        Supabase 테이블 스키마
firebase/firestore.rules   Firestore 보안 규칙 (후기 공개 읽기+검증된 쓰기, 문의 쓰기 전용, 칼럼 전면 차단)
```

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # 값 채워넣기
npm run dev
```

### 환경변수 (`.env.local`)

| 변수 | 설명 |
| --- | --- |
| `SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서비스 롤 키 (서버 전용, 절대 클라이언트에 노출 금지) |
| `RESEND_API_KEY` | Resend API 키 |
| `RESEND_FROM_EMAIL` | 알림 메일 발신 주소 |
| `ADMIN_NOTIFICATION_EMAIL` | 신규 신청 알림을 받을 운영자 이메일 |
| `ADMIN_PASSWORD` | `/admin` 대시보드 접근 비밀번호 (최소 기능의 간단한 게이트) |
| `FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID (서비스 계정) |
| `FIREBASE_CLIENT_EMAIL` | Firebase 서비스 계정 이메일 |
| `FIREBASE_PRIVATE_KEY` | Firebase 서비스 계정 비공개 키 (줄바꿈은 `\n`으로 이스케이프, 따옴표로 감싸기) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` 등 | Firebase 클라이언트 SDK 설정값 6종 (아래 참고) |

Supabase/Resend/Firebase 환경변수가 비어 있어도 앱은 정상적으로 렌더링되며,
각 기능 사용 시에만 안내 메시지를 보여줍니다. Supabase 테이블은
`supabase/schema.sql`을 Supabase SQL 편집기에서 실행해 생성하세요.

### Firebase 설정 (Spark 무료 요금제)

이 앱은 **두 가지 경로**로 Firestore에 접근합니다.

- **클라이언트 SDK** (브라우저에서 직접 접근): 후기 작성·열람(`/reviews`),
  문의 제출(`/contact`)처럼 누구나 쓸 수 있어야 하는 기능. Firebase 콘솔의
  "SDK 추가" 화면에 나오는 `apiKey` 등 설정값을 그대로 사용합니다. 이 값들은
  공개되어도 안전하도록 설계된 값이며, 실제 보호는 Firestore 보안 규칙
  (`firebase/firestore.rules`)이 담당합니다.
- **Admin SDK** (서버 전용): 칼럼 읽기/쓰기, 후기 삭제, 문의 조회·처리 등
  관리자 전용 기능과 공개 콘텐츠(칼럼) 조회. 서비스 계정 키로 보안 규칙을
  우회해 접근하며, `/admin`의 비밀번호 게이트 뒤에서만 호출됩니다.

**1. Firestore 활성화**
[Firebase 콘솔](https://console.firebase.google.com)에서 프로젝트를 만들고
**Firestore Database**를 (아무 리전이나) 프로덕션 모드로 생성합니다.

**2. 클라이언트 SDK 설정값 채우기**
프로젝트 설정(톱니바퀴 아이콘) → **일반** 탭 → "내 앱" → 웹 앱 추가(또는
기존 앱 선택) 시 나오는 `firebaseConfig` 값을 `NEXT_PUBLIC_FIREBASE_*`
환경변수 6개에 그대로 채워넣습니다.

**3. 서비스 계정 키 발급**
프로젝트 설정 → **서비스 계정** 탭 → "새 비공개 키 생성"을 눌러 JSON 키
파일을 내려받고, `project_id`, `client_email`, `private_key` 값을 각각
`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`에
채워넣습니다 (`private_key`는 줄바꿈이 포함된 긴 문자열이므로, `.env`
파일에는 그대로 `\n`이 들어간 한 줄 문자열로 저장하면 됩니다).

**4. 익명 인증(Anonymous Auth) 활성화**
Authentication → Sign-in method → **익명(Anonymous)** 제공업체를
사용 설정합니다. 후기/문의 작성 시 화면에 보이지 않게 자동으로 로그인되며,
Firestore 보안 규칙이 "로그인된 사용자만 작성 가능"을 판단하는 데
사용됩니다 (Spark 요금제에서 무료).

**5. 보안 규칙 게시**
Firestore Database → **규칙(Rules)** 탭에서 `firebase/firestore.rules`의
내용을 붙여넣고 게시(Publish)합니다.

**6. 무료 요금제 한도**
Firestore 1GiB 저장공간, 일일 읽기 5만 회·쓰기 2만 회·삭제 2만 회. 이 앱의
트래픽 규모에서는 충분합니다.

## 테스트 / 검증

```bash
npm test        # Zod 스키마 유닛 테스트 (유효/무효 케이스)
npm run lint     # ESLint
npx tsc --noEmit # 타입 체크
npm run build    # 프로덕션 빌드
```

## 보안/개인정보 관련 참고

- 신청 폼은 개인정보 수집·이용 동의 체크박스 없이는 제출할 수 없습니다.
- Supabase 테이블은 RLS가 활성화되어 있고 공개 정책이 없어, 서비스 롤 키를 쓰는
  서버 코드(서버 액션·관리자 페이지)를 통해서만 접근 가능합니다.
- `/admin`은 `ADMIN_PASSWORD` 기반의 최소한의 쿠키 게이트로 보호됩니다. 실제
  운영 환경에서는 Supabase Auth 등 정식 인증으로 교체하는 것을 권장합니다.
- 후기 작성/열람, 문의 제출은 브라우저가 Firestore에 직접 접근합니다. 실제
  보호는 `firebase/firestore.rules`가 담당합니다: 익명 인증된 사용자만
  문서를 생성할 수 있고, 필드 타입·길이를 규칙 단계에서 검증하며, 클라이언트는
  수정·삭제가 불가능합니다. 칼럼(공개 콘텐츠·관리자 작성)과 관리자 전용
  작업(후기 삭제, 문의 조회·상태 변경)은 여전히 클라이언트가 전혀 접근하지
  못하고 서버(Admin SDK)만 접근하며, 각 서버 액션 내부에서 `requireAdmin()`
  으로 한 번 더 인증을 확인합니다.
- 후기/문의 제출 폼에는 간단한 허니팟(honeypot) 필드로 기본적인 봇 차단을
  적용했습니다. 문의 내용은 관리자만 열람할 수 있고 공개되지 않습니다.
- `NEXT_PUBLIC_FIREBASE_*` 값은 브라우저 번들에 그대로 노출되며, 이는 정상적인
  설계입니다(Firebase 클라이언트 설정은 비밀값이 아닙니다). 노출되면 안 되는
  값은 `FIREBASE_PRIVATE_KEY`뿐이며, 이는 `NEXT_PUBLIC_` 접두사가 없어
  서버에서만 읽힙니다.
