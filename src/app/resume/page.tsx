"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  calculateResumeScore,
  missingKeywords,
  generateFeedback,
} from "@/lib/analyzer";

export default function ResumePage() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleAnalyze = () => {
    const result = {
      score: calculateResumeScore(text),
      missing: missingKeywords(text),
      feedback: generateFeedback(text),
      raw: text,
    };

    localStorage.setItem("resumeResult", JSON.stringify(result));
    router.push("/result");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Resume Analyzer</h1>

      <div className="grid grid-cols-1 gap-4">
        <textarea
          className="w-full h-96 border rounded-lg p-4 shadow-sm"
          placeholder="Paste your resume here..."
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          className="bg-black text-white px-6 py-3 rounded-lg w-fit"
        >
          Analyze Resume
        </button>
      </div>
    </div>
  );
}