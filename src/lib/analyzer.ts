export function calculateResumeScore(text: string): number {
  const lower = text.toLowerCase();

  let score = 0;

  const skillKeywords = [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "node",
    "api",
    "html",
    "css",
    "sql",
    "git",
  ];

  skillKeywords.forEach((skill) => {
    if (lower.includes(skill)) {
      score += 8;
    }
  });

  if (lower.includes("experience")) score += 10;
  if (lower.includes("project")) score += 5;
  if (lower.includes("built")) score += 5;
  if (lower.includes("developed")) score += 5;

  if (text.split(" ").length > 200) score += 10;
  if (text.split(" ").length > 500) score += 10;

  return Math.min(score, 100);
}

/* ✅ ADD THIS */
export function missingKeywords(text: string): string[] {
  const lower = text.toLowerCase();

  const required = [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "node",
    "api",
    "sql",
    "git",
  ];

  return required.filter((k) => !lower.includes(k));
}

/* ✅ ADD THIS */
export function generateFeedback(text: string): string[] {
  const lower = text.toLowerCase();

  const feedback: string[] = [];

  if (!lower.includes("experience")) {
    feedback.push("Add an Experience section.");
  }

  if (!lower.includes("project")) {
    feedback.push("Include real projects to improve ATS score.");
  }

  if (!lower.includes("react")) {
    feedback.push("Missing React — important for frontend roles.");
  }

  if (text.split(" ").length < 200) {
    feedback.push("Add more detail to strengthen your resume.");
  }

  return feedback;
}