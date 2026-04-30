"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ResumeResult = {
  name: string;
  raw: string;
  score: number;
  missing: string[];
  feedback: string[];
};

export default function ResultPage() {
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const stored = localStorage.getItem("resumeResult");
      if (!stored) {
        router.replace("/resume");
        return;
      }

      setResult(JSON.parse(stored));
      setLoading(false);
    };

    checkAuthAndLoad();
  }, [router]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading analysis...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-6 text-gray-500">
        Loading analysis...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Resume Analysis Report
      </h1>

      {/* 📊 SCORE CARD */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">
          ATS Score
        </h2>

        <p className="text-5xl font-bold mt-2">
          {result.score}/100
        </p>
      </div>

      {/* ❌ MISSING SKILLS */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">
          Missing Skills
        </h2>

        <ul className="list-disc ml-6 mt-2">
          {result.missing.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* 💡 FEEDBACK */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">
          Feedback
        </h2>

        <ul className="list-disc ml-6 mt-2">
          {result.feedback.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 📄 RAW TEXT (optional debug / recruiter wow factor later) */}
      <div className="bg-gray-50 border rounded-xl p-6">
        <h2 className="text-xl font-semibold">
          Extracted Resume Text
        </h2>

        <p className="text-sm whitespace-pre-wrap mt-2">
          {result.raw}
        </p>
      </div>

      {/* 🔁 BACK BUTTON */}
      <button
        onClick={() => router.push("/resume")}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Analyze Another Resume
      </button>
    </div>
  );
}