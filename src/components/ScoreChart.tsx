"use client";

import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function ScoreChart({ score }: { score: number }) {
  const data = {
    labels: ["Resume Health"],
    datasets: [
      {
        label: "Score",
        data: [score],
        backgroundColor: score > 70 ? "green" : "orange",
      },
    ],
  };

  return (
    <div className="bg-white p-6 border rounded-lg">
      <h2 className="font-bold mb-4">ATS Score Overview</h2>
      <Bar data={data} />
    </div>
  );
}