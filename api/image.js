import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { prompt } = req.body;

  const generated = await client.images.generate({
    model: "gpt-image-1",
    prompt: prompt,
    size: "1024x1024"
  });

  res.status(200).json({ image: generated.data[0].url });
}
