export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, mode } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Gemini API Key missing on Vercel.' });

  let systemInstruction = "You are an expert MDCAT tutor.";
  if (mode === 'mcqs') systemInstruction += " Generate 5 high-yield MDCAT MCQs with correct options and brief explanations.";
  if (mode === 'planner') systemInstruction += " Create a realistic, high-yield MDCAT study timetable.";

  try {
    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }]
        })
      }
    );

    const data = await apiRes.json();
    if (!apiRes.ok) return res.status(apiRes.status).json({ error: data.error?.message || 'API error' });

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
