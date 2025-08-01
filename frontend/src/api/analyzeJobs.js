const BACKEND_URL =
  import.meta.env.VITE_BACKEND_SERVER || "http://localhost:5000/generate";

// TODO: try catch block
export async function sendJobAnalysis(prompt) {
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Unknown backend error (analyzeJobs.js)");
  }

  return data.response;
}
