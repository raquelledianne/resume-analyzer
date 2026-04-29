import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">
        Improve Your Resume in Seconds
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        ATS scoring • Skill gap analysis • Resume feedback
      </p>

      <Link
        href="/resume"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Start Analyzing
      </Link>
    </div>
  );
}