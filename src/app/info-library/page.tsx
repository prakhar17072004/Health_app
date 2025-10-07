import data from "@/data/infoArticles.json";

export default function InfoLibraryPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Health Information</h1>
      {data.map((a, i) => (
        <div key={i} className="mb-4 border p-4 rounded">
          <h2 className="text-lg font-medium">{a.title}</h2>
          <p className="mt-2">{a.content}</p>
        </div>
      ))}
    </div>
  );
}
