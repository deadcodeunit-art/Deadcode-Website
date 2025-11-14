import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Basic in-memory memory store (Vercel resets often, but works)
let MEMORY = [];

export default async function handler(req, res) {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    // Add user message to memory
    MEMORY.push({ role: "user", content: message });

    // Limit memory
    if (MEMORY.length > 20) {
      MEMORY.shift();
    }

    const completion = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        {
          role: "system",
          content:
            "You are Deadcode Intelligence. An expert AI in coding, Unity, VR, sound design, and creating games. Speak clearly and helpfully."
        },
        ...MEMORY
      ]
    });

    const reply = completion.choices[0].message.content;

    // Save AI reply
    MEMORY.push({ role: "assistant", content: reply });

    res.status(200).json({ reply });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ error: "Chat failed" });
  }
}
