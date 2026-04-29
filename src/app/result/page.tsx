"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("resumeResult");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <div>No data found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Resume Report</h1>

      {/* SCORE CARD */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 bg-white border rounded-lg">
          <p className="text-sm text-gray-500">ATS Score</p>
          <p className="text-3xl font-bold">{data.score}/100</p>
        </div>

        <div className="p-6 bg-white border rounded-lg">
          <p className="text-sm text-gray-500">Missing Skills</p>
          <p className="font-medium">{data.missing.length}</p>
        </div>

        <div className="p-6 bg-white border rounded-lg">
          <p className="text-sm text-gray-500">Feedback Items</p>
          <p className="font-medium">{data.feedback.length}</p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="font-bold mb-2">Missing Skills</h2>
        <ul className="list-disc pl-5">
          {data.missing.map((m: string, i: number) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="font-bold mb-2">Feedback</h2>
        <ul className="list-disc pl-5">
          {data.feedback.map((f: string, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}