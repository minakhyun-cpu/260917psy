import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";

const ADMIN_SECTIONS = [
  { href: "/admin", label: "신청 접수" },
  { href: "/admin/reviews", label: "후기 관리" },
  { href: "/admin/columns", label: "칼럼 관리" },
  { href: "/admin/inquiries", label: "문의/건의 관리" },
];

export default function AdminNav() {
  return (
    <div className="flex items-center justify-between">
      <nav className="flex flex-wrap gap-4 text-sm font-medium text-stone-500">
        {ADMIN_SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="hover:text-stone-900">
            {section.label}
          </Link>
        ))}
      </nav>
      <form action={logoutAdmin}>
        <button
          type="submit"
          className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
