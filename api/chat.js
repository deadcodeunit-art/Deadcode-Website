export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // You can change to gpt-4-turbo, gpt-5 when available
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '⚠️ No response received.';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error from OpenAI:', error);
    res.status(500).json({ error: 'Failed to connect to OpenAI' });
  }
}
