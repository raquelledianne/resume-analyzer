"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateJobMatch } from "@/lib/jobMatcher";

export default function JobPage() {
  const [jobText, setJobText] = useState("");
  const router = useRouter();

  const handleMatch = () => {
    const resume = localStorage.getItem("resumeResult");

    if (!resume) {
      alert("Please analyze a resume first");
      return;
    }

    const parsed = JSON.parse(resume);

    const result = calculateJobMatch(parsed.raw, jobText);

    localStorage.setItem(
      "jobMatchResult",
      JSON.stringify(result)
    );

    router.push("/job/result");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        Job Match Analyzer
      </h1>

      <textarea
        className="w-full h-96 border rounded p-4"
        placeholder="Paste job description here..."
        onChange={(e) => setJobText(e.target.value)}
      />

      <button
        onClick={handleMatch}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Analyze Match
      </button>
    </div>
  );
}