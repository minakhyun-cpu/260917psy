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
제공합니다.

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod (폼 검증)
- Supabase (Postgres) — 신청 데이터 저장
- Resend — 운영자 이메일 알림
- Firebase Admin SDK + Firestore (Spark 무료 요금제) — 후기/칼럼/문의 데이터 저장
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
lib/                      Supabase/이메일/Firebase Admin 클라이언트, 검사 카탈로그, 관리자 인증
types/application.ts      신청 폼 Zod 스키마 및 타입 (+ 유닛 테스트)
types/burnout.ts           AI 번아웃 회복 체크인 Zod 스키마 및 타입 (+ 유닛 테스트)
types/review.ts, column.ts, inquiry.ts  각 게시판 Zod 스키마 및 타입
supabase/schema.sql        Supabase 테이블 스키마
firebase/firestore.rules   Firestore 보안 규칙 (클라이언트 직접 접근 전면 차단)
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
| `FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase 서비스 계정 이메일 |
| `FIREBASE_PRIVATE_KEY` | Firebase 서비스 계정 비공개 키 (줄바꿈은 `\n`으로 이스케이프, 따옴표로 감싸기) |

Supabase/Resend/Firebase 환경변수가 비어 있어도 앱은 정상적으로 렌더링되며,
각 기능 사용 시에만 안내 메시지를 보여줍니다. Supabase 테이블은
`supabase/schema.sql`을 Supabase SQL 편집기에서 실행해 생성하세요.

### Firebase 설정 (Spark 무료 요금제)

이 앱은 Firestore에 **브라우저에서 직접 접근하지 않습니다.** 후기 작성,
칼럼 작성/열람, 문의 제출 — 전부 서버(Server Action/Server Component)에서
Firebase **Admin SDK**로만 접근하고, Firestore 보안 규칙은 클라이언트 접근을
전면 차단합니다 (Supabase를 서비스 롤 키로만 접근하는 것과 동일한 패턴).
Firebase 콘솔에서 안내한 `npm install firebase` / 클라이언트 SDK 설정
(`apiKey`, `authDomain` 등)은 필요하지 않습니다.

1. [Firebase 콘솔](https://console.firebase.google.com)에서 프로젝트를 만들고
   **Firestore Database**를 (아무 리전이나) 프로덕션 모드로 생성합니다.
2. 프로젝트 설정(톱니바퀴 아이콘) → **서비스 계정** 탭 → "새 비공개 키 생성"을
   눌러 JSON 키 파일을 내려받습니다.
3. 해당 JSON의 `project_id`, `client_email`, `private_key` 값을 각각
   `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`에
   채워넣습니다 (`private_key`는 줄바꿈이 포함된 긴 문자열이므로, `.env`
   파일에는 그대로 `\n`이 들어간 한 줄 문자열로 저장하면 됩니다).
4. Firestore Database → **규칙(Rules)** 탭에서 `firebase/firestore.rules`의
   내용을 붙여넣고 게시(Publish)합니다.
5. Spark(무료) 요금제 한도: Firestore 1GiB 저장공간, 일일 읽기 5만 회·쓰기
   2만 회·삭제 2만 회. 이 앱의 트래픽 규모에서는 충분합니다.

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
- Firestore는 클라이언트에서 전혀 접근하지 않고, 서버(Admin SDK)만 접근합니다
  (`firebase/firestore.rules`는 모든 직접 접근을 차단). 관리자 전용 쓰기(칼럼
  작성/수정/삭제, 후기·문의 삭제, 문의 상태 변경)는 각 서버 액션 내부에서
  `requireAdmin()`으로 한 번 더 인증을 확인합니다.
- 후기/문의 제출 폼에는 간단한 허니팟(honeypot) 필드로 기본적인 봇 차단을
  적용했습니다. 문의 내용은 관리자만 열람할 수 있고 공개되지 않습니다.
