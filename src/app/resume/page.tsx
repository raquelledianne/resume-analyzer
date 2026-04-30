"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  calculateResumeScore,
  missingKeywords,
  generateFeedback,
} from "@/lib/analyzer";

export default function ResumePage() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  

  const router = useRouter();
  const [loadingSession, setLoadingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setLoadingSession(false);
    };

    checkSession();
  }, [router]);

  // 📄 PDF UPLOAD (SAFE FOR NEXT.JS)
  const handlePDFUpload = async (file: File) => {
    setIsParsing(true);

    try {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const items = content.items as Array<{ str: string }>;

        fullText += items.map((item) => item.str).join(" ") + "\n";
      }

      setText(fullText);
      setFileName(file.name);
    } catch (err) {
      console.error("PDF parsing error:", err);
    } finally {
      setIsParsing(false);
    }
  };

  // 🧠 ANALYZE + SAVE TO SAAS BACKEND
  const handleAnalyze = async () => {
    if (!text) return;

    setIsAnalyzing(true);

    try {
      const result = {
        name: fileName || "Resume",
        raw: text,
        score: calculateResumeScore(text),
        missing: missingKeywords(text),
        feedback: generateFeedback(text),
      };

      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        const body = await response.json();
        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const message = body?.error || "Unable to save resume";
        setErrorMessage(message);
        return;
      }

      localStorage.setItem("resumeResult", JSON.stringify(result));
      router.push("/result");
    } catch (err) {
      console.error("Analysis error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Analysis failed. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">

      <h1 className="text-3xl font-bold">
        Resume Analyzer
      </h1>

      {/* 📄 PDF UPLOAD */}
      <div className="border rounded-xl p-6 space-y-3 bg-white">
        <h2 className="font-semibold">Upload Resume (PDF)</h2>

        <input
          type="file"
          accept="application/pdf"
          className="block w-full border p-2 rounded"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handlePDFUpload(file);
          }}
        />

        {fileName && (
          <p className="text-sm text-gray-600">
            Selected: {fileName}
          </p>
        )}

        {isParsing && (
          <p className="text-sm text-blue-500">
            Extracting text...
          </p>
        )}
      </div>

      {/* ✍️ TEXT INPUT */}
      <div className="border rounded-xl p-6 space-y-3 bg-white">
        <h2 className="font-semibold">Or Paste Resume Text</h2>

        <textarea
          className="w-full h-72 border rounded p-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your resume here..."
        />
      </div>

      {/* 🚀 ANALYZE BUTTON */}
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}