// Simple memory store (resets when Vercel sleeps)
let SAVED_MEMORY = [];

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      SAVED_MEMORY.push(req.body);
      return res.status(200).json({ status: "saved" });
    }

    if (req.method === "GET") {
      return res.status(200).json({ memory: SAVED_MEMORY });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("MEMORY ERROR:", err);
    res.status(500).json({ error: "Memory error" });
  }
}
