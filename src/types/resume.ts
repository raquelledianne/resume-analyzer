export type ResumeEntry = {
  id: string;

  // 👤 basic info
  name: string;
  user_id?: string;

  // 📄 raw input
  raw_text: string;

  // 📊 analysis output
  score: number;
  missing_skills: string[];
  feedback: string[];

  // 🕒 metadata
  created_at: string;
};