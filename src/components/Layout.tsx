export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b bg-white px-6 py-4 flex justify-between">
        <h1 className="font-bold">Career Analyzer</h1>

        <div className="flex gap-4 text-sm">
          <a href="/">Home</a>
          <a href="/resume">Analyze</a>
          <a href="/result">Results</a>
        </div>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}