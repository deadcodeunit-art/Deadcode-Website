import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory memory store
let MEMORY = [];

export default async function handler(req, res) {
  const body = req.body;
  const message = body.message || "";

  // Store memory
  MEMORY.push({ role: "user", content: message });
  if (MEMORY.length > 25) MEMORY.shift();

  const completion = await client.chat.completions.create({
    model: "gpt-5.1",
    messages: [
      { role: "system", content: "Your name is Deadcode Intelligence. You are expert in coding, game development, Unity, VR, and helpfulness." },
      ...MEMORY
    ]
  });

  const reply = completion.choices[0].message.content;

  // Store AI reply into memory
  MEMORY.push({ role: "assistant", content: reply });

  res.status(200).json({ reply });
}
