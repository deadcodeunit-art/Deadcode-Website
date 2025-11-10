export default async function handler(req, res) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5", // 🧠 your model
        messages,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
