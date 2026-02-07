import React from 'react'
import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>HRM Dashboard</h1>
      <nav>
        <ul>
          <li><Link href="/payroll">Payroll</Link></li>
          <li><Link href="/attendance">Attendance</Link></li>
          <li><Link href="/leave">Leave Management</Link></li>
        </ul>
      </nav>
    </div>
  );
}