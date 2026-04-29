export function calculateResumeScore(text: string) {
  let score = 50;

  const lower = text.toLowerCase();

  // Structure checks
  if (lower.includes("experience")) score += 10;
  if (lower.includes("education")) score += 5;
  if (lower.includes("projects")) score += 10;
  if (lower.includes("skills")) score += 10;

  // Length check
  if (text.length > 1000) score += 10;
  if (text.length < 500) score -= 10;

  // Weak phrasing penalty
  const weakPhrases = ["responsible for", "helped with", "worked on"];
  weakPhrases.forEach((phrase) => {
    if (lower.includes(phrase)) score -= 3;
  });

  return Math.max(0, Math.min(score, 100));
}

export function missingKeywords(text: string) {
  const keywords = [
    "react",
    "next.js",
    "typescript",
    "javascript",
    "api",
    "git",
    "node"
  ];

  const lower = text.toLowerCase();

  return keywords.filter((k) => !lower.includes(k));
}

export function generateFeedback(text: string) {
  const feedback: string[] = [];

  if (!text.toLowerCase().includes("projects")) {
    feedback.push("Add a Projects section to showcase real work.");
  }

  if (text.includes("responsible for")) {
    feedback.push("Replace passive phrases with strong action verbs.");
  }

  if (text.length < 800) {
    feedback.push("Resume is too short—add more detail.");
  }

  return feedback;
}