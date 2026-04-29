"use client";

import { useEffect, useState } from "react";

export default function JobResult() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("jobMatchResult");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <div>No match data found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Job Match Results
      </h1>

      {/* SCORE */}
      <div className="p-6 border rounded bg-white">
        <p className="text-sm text-gray-500">Match Score</p>
        <p className="text-4xl font-bold">
          {data.score}%
        </p>
      </div>

      {/* MATCHED */}
      <div className="p-6 border rounded bg-white">
        <h2 className="font-bold mb-2">Matched Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.matched.map((m: string, i: number) => (
            <span
              key={i}
              className="bg-green-100 px-2 py-1 rounded"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* MISSING */}
      <div className="p-6 border rounded bg-white">
        <h2 className="font-bold mb-2">Missing Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.missing.map((m: string, i: number) => (
            <span
              key={i}
              className="bg-red-100 px-2 py-1 rounded"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}