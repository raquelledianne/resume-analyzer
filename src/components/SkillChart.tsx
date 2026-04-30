"use client";

import {
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SkillChart({
  matched,
  missing
}: {
  matched: string[];
  missing: string[];
}) {
  const data = {
    labels: ["Matched Skills", "Missing Skills"],
    datasets: [
      {
        data: [matched.length, missing.length],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 border rounded-lg">
      <h2 className="font-bold mb-4">Skill Match Breakdown</h2>
      <Pie data={data} />
    </div>
  );
}