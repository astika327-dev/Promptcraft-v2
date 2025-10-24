const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined. Please check your .env file.");
}

/**
 * Fetches data from the API.
 * @param endpoint The API endpoint to call (e.g., '/healthcheck').
 * @param options The options for the fetch request.
 * @returns The JSON response from the API.
 */
export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL).toString();

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'An unknown error occurred');
  }

  // Handle cases where the response might be empty
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    return text as unknown as T;
  }
}

// --- Existing functionality, now using apiFetch ---

export type TargetModel = 'GPT-4' | 'Claude 3.5' | 'Llama 3' | 'Gemini' | 'Stable Diffusion';

interface GeneratePromptRequest {
  context: string;
  target_model: TargetModel;
}

interface GeneratePromptResponse {
  prompt: string;
}

export async function generatePrompt(data: GeneratePromptRequest): Promise<string> {
  // Assuming the endpoint is /api/generate based on the function's purpose
  const response = await apiFetch<GeneratePromptResponse>('/api/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.prompt;
}