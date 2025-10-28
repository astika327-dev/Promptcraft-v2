import { headers } from 'next/headers';

export async function POST(req) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    return new Response(JSON.stringify({ message: 'OpenRouter API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { input } = await req.json();

    if (!input) {
      return new Response(JSON.stringify({ message: 'Input is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const headersList = headers();
    const host = headersList.get('host');
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const referer = `${protocol}://${host}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": referer,
        "X-Title": "PromptCraft",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a world-class prompt engineer. Your task is to take a user's simple idea and transform it into a detailed, ready-to-use prompt for an AI image generator or language model. Your output should be ONLY the final prompt, without any additional explanations, pleasantries, or markdown formatting." },
          { role: "user", content: input }
        ],
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error:", errorText);
      return new Response(JSON.stringify({ message: 'Failed to generate prompt from OpenRouter.' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const prompt = data.choices[0].message.content.trim();

    return new Response(JSON.stringify({ prompt }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ message: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
