// api/ask.js
export default async function handler(req, res) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({ reply: "Error: no response from OpenAI." });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "Error connecting to server." });
  }
}
