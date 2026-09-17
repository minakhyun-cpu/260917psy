# 마지 마인드랩 — 심리검사 & 해석상담 신청

성격검사, 자녀 검사, 정서·스트레스 척도 등 심리검사와 1:1 해석상담 서비스를
소개하고, 방문자가 온라인으로 상담을 신청할 수 있는 반응형 웹앱입니다. 결제
기능과 검사 자체의 온라인 응시는 이 앱의 범위에 포함되지 않습니다.

`/recovery` 페이지에서는 Gemini(`gemini-3.5-flash-lite`) 기반의 AI 번아웃
회복 솔루션도 제공합니다. 사용자가 자신의 Gemini API 키를 직접 입력해
사용하는 방식이며, 키는 브라우저에서 Google API로 바로 전달되고 서버로는
전송되지 않습니다.

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod (폼 검증)
- Supabase (Postgres) — 신청 데이터 저장
- Resend — 운영자 이메일 알림
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
proxy.ts                  /admin 라우트 보호 (Next.js 16의 middleware → proxy)
components/               UI 컴포넌트, 아이콘(icons.tsx), 일러스트(illustrations/)
lib/                      Supabase/이메일 클라이언트, 검사 카탈로그, 관리자 인증, Gemini 클라이언트(브라우저 전용)
types/application.ts      신청 폼 Zod 스키마 및 타입 (+ 유닛 테스트)
types/burnout.ts           AI 번아웃 회복 체크인 Zod 스키마 및 타입 (+ 유닛 테스트)
supabase/schema.sql        Supabase 테이블 스키마
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

Supabase/Resend 환경변수가 비어 있어도 앱은 정상적으로 렌더링되며, 신청 제출 시에만
"잠시 후 다시 시도해주세요" 형태의 안내 메시지를 보여줍니다. Supabase 테이블은
`supabase/schema.sql`을 Supabase SQL 편집기에서 실행해 생성하세요.

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
