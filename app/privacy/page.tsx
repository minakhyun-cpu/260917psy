import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "마지 마인드랩 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">개인정보처리방침</h1>
      <p className="mt-3 text-sm text-slate-500">
        마지 마인드랩(이하 &ldquo;마인드랩&rdquo;)은 이용자의 개인정보를 중요시하며,
        관련 법령을 준수합니다. 본 방침은 상담 신청 페이지를 통해 수집되는
        개인정보에 한해 적용됩니다.
      </p>

      <div className="prose prose-slate mt-10 max-w-none space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900">
            1. 수집하는 개인정보 항목 및 수집 방법
          </h2>
          <p className="mt-2">
            마인드랩은 상담 신청 접수를 위해 아래 항목을 신청 폼을 통해 이용자가
            직접 입력하는 방식으로 수집합니다.
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>필수 항목: 이름, 연락처, 이메일, 희망 검사 종류, 희망 상담 방식, 희망 일정</li>
            <li>선택 항목: 남기고 싶은 말</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            2. 개인정보의 수집 및 이용 목적
          </h2>
          <p className="mt-2">
            수집한 개인정보는 상담 신청 접수 확인, 일정 조율을 위한 연락,
            상담 진행 및 관련 안내 목적으로만 이용하며, 명시한 목적 외
            용도로 이용하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            3. 개인정보의 보유 및 이용 기간
          </h2>
          <p className="mt-2">
            수집된 개인정보는 상담 종료 후 관련 법령에서 정한 기간 또는
            내부 방침에 따른 기간 동안 보관 후 지체 없이 파기합니다. 다만
            관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            4. 개인정보의 제3자 제공
          </h2>
          <p className="mt-2">
            마인드랩은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으며,
            법령에 근거가 있거나 이용자가 사전에 동의한 경우에 한하여
            제공합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            5. 개인정보 처리의 위탁
          </h2>
          <p className="mt-2">
            마인드랩은 안정적인 서비스 제공을 위해 데이터 저장 및 이메일 발송
            업무를 외부 업체에 위탁할 수 있으며, 위탁받은 업체가 개인정보
            보호 관련 법령을 준수하도록 관리·감독합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            6. 정보주체의 권리와 행사 방법
          </h2>
          <p className="mt-2">
            이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제,
            처리정지를 요청할 수 있으며, 이는 신청 시 남기신 연락처 또는
            이메일을 통해 마인드랩에 문의하여 처리할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            7. 개인정보의 안전성 확보 조치
          </h2>
          <p className="mt-2">
            마인드랩은 개인정보 전송 시 암호화 통신(HTTPS)을 적용하고, 접근
            권한을 최소한의 인원으로 제한하는 등 개인정보가 분실·도난·유출
            되지 않도록 필요한 기술적·관리적 조치를 취하고 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">
            8. 개인정보처리방침의 변경
          </h2>
          <p className="mt-2">
            본 방침은 법령 및 서비스 변경 사항을 반영하기 위해 개정될 수
            있으며, 변경 시 본 페이지를 통해 공지합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
