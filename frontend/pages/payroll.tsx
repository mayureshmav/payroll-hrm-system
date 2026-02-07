import React, { useEffect, useState } from "react";

interface Payroll {
  id: number;
  employeeName: string;
  salary: number;
  month: string;
}

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [form, setForm] = useState<{ employeeName: string; salary: number; month: string }>({
    employeeName: "",
    salary: 0,
    month: ""
  });

  // Fetch payroll records from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/payroll")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch payrolls");
        return res.json();
      })
      .then(data => setPayrolls(data))
      .catch(err => console.error("Error loading payrolls:", err));
  }, []);

  // Submit new payroll record
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        alert("Failed to save payroll");
        return;
      }
      const newPayroll = await res.json();
      setPayrolls([...payrolls, newPayroll]);
      setForm({ employeeName: "", salary: 0, month: "" });
    } catch (err) {
      console.error("Error saving payroll:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Payroll Management</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={e => setForm({ ...form, employeeName: e.target.value })}
        />
        <input
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={e => setForm({ ...form, salary: Number(e.target.value) })}
        />
        <input
          placeholder="Month"
          value={form.month}
          onChange={e => setForm({ ...form, month: e.target.value })}
        />
        <button type="submit">Add Payroll</button>
      </form>

      <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Salary</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p, index) => (
            <tr key={p.id ?? index}>
              <td>{p.id}</td>
              <td>{p.employeeName}</td>
              <td>{p.salary}</td>
              <td>{p.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}