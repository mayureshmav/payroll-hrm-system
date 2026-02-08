import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 bg-gray-200 p-4">
        <h2 className="font-bold mb-4">HRM System</h2>
        <nav>
          <ul className="space-y-2">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/payroll">Payroll</Link></li>
            <li><Link href="/attendance">Attendance</Link></li>
            <li><Link href="/leaves">Leaves</Link></li>
            <li><Link href="/documents">Documents</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}