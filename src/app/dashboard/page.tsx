"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ResumeEntry } from "@/types/resume";

export default function DashboardPage() {
  const [resumes, setResumes] = useState<ResumeEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadResumes = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setResumes(data as ResumeEntry[]);
      }

      setLoading(false);
    };

    loadResumes();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dashboard data: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* 🧠 HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Resume Dashboard
        </h1>
        <p className="text-gray-500">
          Your analyzed resumes and ATS scores
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-4">

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Resumes</p>
          <p className="text-2xl font-bold">
            {resumes?.length || 0}
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-bold">
            {resumes?.length
              ? Math.round(
                  resumes.reduce(
                    (acc, r) => acc + (r.score || 0),
                    0
                  ) / resumes.length
                )
              : 0}
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Best Score</p>
          <p className="text-2xl font-bold">
            {resumes?.length
              ? Math.max(...resumes.map((r) => r.score || 0))
              : 0}
          </p>
        </div>

      </div>

      {/* 📄 RESUME LIST */}
      <div className="space-y-4">

        {resumes?.length === 0 && (
          <div className="p-6 border rounded-xl bg-white">
            No resumes analyzed yet.
          </div>
        )}

        {resumes?.map((resume) => (
          <div
            key={resume.id}
            className="border rounded-xl p-4 bg-white space-y-2"
          >

            <div className="flex justify-between items-center">
              <h2 className="font-semibold">
                {resume.name || "Untitled Resume"}
              </h2>

              <span className="text-sm bg-black text-white px-3 py-1 rounded-full">
                {resume.score}/100
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Missing:{" "}
              {resume.missing_skills?.slice(0, 3).join(", ") ||
                "None"}
            </p>

            <p className="text-sm text-gray-600">
              {resume.feedback?.[0] ||
                "No feedback available"}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}