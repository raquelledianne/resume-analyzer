import { missingKeywords } from "./analyzer";

function extractKeywords(text: string) {
  // simple keyword extraction (free NLP simulation)
  return text
    .toLowerCase()
    .match(/\b[a-z]{4,}\b/g) || [];
}

export function calculateJobMatch(resume: string, job: string) {
  const resumeLower = resume.toLowerCase();

  const jobKeywords = extractKeywords(job);

  let matchCount = 0;
  const matched: string[] = [];
  const missing: string[] = [];

  jobKeywords.forEach((keyword) => {
    if (resumeLower.includes(keyword)) {
      matchCount++;
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  const score = Math.round((matchCount / jobKeywords.length) * 100);

  return {
    score,
    matched: [...new Set(matched)],
    missing: [...new Set(missing)],
  };
}