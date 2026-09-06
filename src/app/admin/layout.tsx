import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/login");

  return (
    <>
      <div className="flex items-center justify-between border-b border-rule-dark px-6 py-3 sm:px-10">
        <span className="tracked text-[0.58rem] uppercase opacity-50">
          Signed in
        </span>
        <form action={logout}>
          <button
            type="submit"
            className="tracked text-[0.58rem] uppercase opacity-70 transition-opacity hover:opacity-100"
          >
            Sign out
          </button>
        </form>
      </div>
      {children}
    </>
  );
}
