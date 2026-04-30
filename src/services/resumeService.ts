export type ResumeAnalysisInput = {
  name: string;
  raw: string;
  score: number;
  missing: string[];
  feedback: string[];
  user_id?: string;
};

export type ResumeRecord = {
  id: string;
  name: string;
  raw_text: string;
  score: number;
  missing_skills: string[];
  feedback: string[];
  created_at: string;
};

/**
 * 📤 Save analyzed resume to backend (API route → Supabase)
 */
export async function saveResume(
  data: ResumeAnalysisInput
): Promise<ResumeRecord> {
  const res = await fetch("/api/resumes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to save resume");
  }

  const result = await res.json();

  return result.resume;
}