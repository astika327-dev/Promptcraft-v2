import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type TargetModel = "GPT-4" | "Claude 3.5" | "Llama 3" | "Gemini" | "Stable Diffusion";

interface GeneratePromptPayload {
  context: string;
  target_model: TargetModel;
}

export const generatePrompt = async (payload: GeneratePromptPayload): Promise<string> => {
  try {
    const response = await apiClient.post('/generate', payload);
    return response.data.prompt;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data.detail);
      throw new Error(error.response.data.detail || 'An unknown error occurred');
    } else if (axios.isAxiosError(error) && error.request) {
      // The request was made but no response was received
      console.error('Network Error:', 'No response from server. Is the backend running?');
      throw new Error('Could not connect to the server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  }
};
