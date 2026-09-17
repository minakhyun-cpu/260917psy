import type { Metadata } from "next";
import { getSupabaseServerClient } from "@/lib/supabase";
import { TEST_TYPES, CONSULT_METHODS } from "@/types/application";
import type { ApplicationRecord } from "@/types/application";
import AdminStatusSelect from "@/components/AdminStatusSelect";
import { logoutAdmin } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "관리자 대시보드",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function getLabel(options: readonly { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default async function AdminPage() {
  let data: ApplicationRecord[] | null = null;
  let error: { message: string } | null = null;

  try {
    const supabase = getSupabaseServerClient();
    const result = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<ApplicationRecord[]>();
    data = result.data;
    error = result.error;
  } catch (err) {
    error = {
      message:
        err instanceof Error
          ? err.message
          : "Supabase 설정을 확인해주세요.",
    };
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">신청 접수 목록</h1>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            로그아웃
          </button>
        </form>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          목록을 불러오는 중 문제가 발생했습니다: {error.message}
        </p>
      )}

      {!error && (!data || data.length === 0) && (
        <p className="mt-6 text-sm text-slate-500">아직 접수된 신청이 없습니다.</p>
      )}

      {!error && data && data.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">접수일</th>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">연락처</th>
                <th className="px-4 py-3">이메일</th>
                <th className="px-4 py-3">검사 종류</th>
                <th className="px-4 py-3">하위 검사</th>
                <th className="px-4 py-3">상담 방식</th>
                <th className="px-4 py-3">희망 일정</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((app) => (
                <tr key={app.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {new Date(app.created_at).toLocaleString("ko-KR")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                    {app.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {app.phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {app.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {getLabel(TEST_TYPES, app.test_type)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {app.sub_tests && app.sub_tests.length > 0
                      ? app.sub_tests.join(", ")
                      : "-"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {getLabel(CONSULT_METHODS, app.consult_method)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {app.preferred_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <AdminStatusSelect
                      applicationId={app.id}
                      initialStatus={app.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
