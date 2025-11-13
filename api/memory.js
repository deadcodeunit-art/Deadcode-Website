let SAVED_MEMORY = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    SAVED_MEMORY.push(req.body);
    return res.status(200).json({ status: "saved" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ memory: SAVED_MEMORY });
  }
}
