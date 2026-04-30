import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="text-center space-y-6 max-w-xl">

        {/* 🧠 HERO TITLE */}
        <h1 className="text-4xl font-bold">
          AI Resume Analyzer
        </h1>

        {/* 📄 DESCRIPTION */}
        <p className="text-gray-600">
          Upload your resume and get instant ATS scoring,
          missing skills, and AI-powered feedback to improve your chances of getting hired.
        </p>

        {/* 🚀 CTA BUTTONS */}
        <div className="flex gap-4 justify-center">

          <Link
            href="/resume"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Analyze Resume
          </Link>

          <Link
            href="/dashboard"
            className="border px-6 py-3 rounded-lg"
          >
            View Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}