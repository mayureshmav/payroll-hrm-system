import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json([
      { id: 1, employeeName: "John Doe", date: "2026-02-07", status: "Present" },
    ]);
  } else if (req.method === "POST") {
    // Save new record
    res.status(201).json({ message: "Attendance recorded" });
  }
}
