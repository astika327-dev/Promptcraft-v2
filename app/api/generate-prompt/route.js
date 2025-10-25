import { kv } from '@vercel/kv';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || req.ip;
}

const DEFAULT_SYSTEM_PROMPT = "You are a world-class prompt engineer. Your task is to take a user's simple idea and transform it into a detailed, ready-to-use prompt for an AI image generator or language model. Your output should be ONLY the final prompt, without any additional explanations, pleasantries, or markdown formatting.";

export async function POST(req) {
  // Rate Limiting Logic with Vercel KV
  const ip = getClientIp(req);
  if (ip) {
    const now = Date.now();
    const key = `rate_limit_${ip}`;

    // Get the current request timestamps
    let timestamps = await kv.get(key) || [];

    // Filter out timestamps that are outside the current window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return new Response(JSON.stringify({ message: 'Too many requests. Please try again in a minute.' }), {
        status: 429, // Too Many Requests
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add the new timestamp and update the KV store
    validTimestamps.push(now);
    await kv.set(key, validTimestamps, { ex: 60 }); // Expire the key after 1 minute for cleanup
  }

  // API Key and Input Validation
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    return new Response(JSON.stringify({ message: 'OpenRouter API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { input, temperature, top_p, system_prompt } = await req.json();

    if (!input) {
      return new Response(JSON.stringify({ message: 'Input is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Call to OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": req.headers.get('referer') || "http://localhost:3000",
        "X-Title": "PromptCraft",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: system_prompt || DEFAULT_SYSTEM_PROMPT },
          { role: "user", content: input }
        ],
        temperature: temperature,
        top_p: top_p,
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
