import { 
  generatePromptEngineering, 
  detectCategory, 
  PROMPT_CATEGORIES 
} from '@/lib/prompt-engineering';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 * PromptCraft API - Advanced Prompt Generation Endpoint
 * Using Google Gemini API (Free Tier)
 * 
 * Implements Google Prompt Engineering Best Practices:
 * - CO-STAR Framework (Context, Objective, Style, Tone, Audience, Response)
 * - Chain-of-Thought Prompting
 * - Few-Shot Learning
 * - Category-Specific Optimization
 * 
 * @endpoint POST /api/generate-prompt
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

/**
 * Convert our message format to Gemini format
 * @param {Array} messages - Messages in OpenAI format
 * @returns {Object} - Gemini API request body
 */
function convertToGeminiFormat(messages) {
  // Extract system instruction from messages
  const systemMessage = messages.find(m => m.role === 'system');
  const otherMessages = messages.filter(m => m.role !== 'system');
  
  // For gemini-pro, prepend system instruction as first user message
  // since it doesn't support systemInstruction
  let contents = [];
  
  if (systemMessage) {
    // Add system instruction as context in first user message
    contents.push({
      role: 'user',
      parts: [{ text: `[System Instructions]\n${systemMessage.content}\n\n[End System Instructions]` }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'I understand. I will follow these instructions carefully and generate high-quality prompts based on your input.' }]
    });
  }
  
  // Add the rest of the messages
  otherMessages.forEach(msg => {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    });
  });

  return {
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 50000,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };
}



export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'Unauthorized. Please log in to use this feature.',
        error: 'UNAUTHORIZED'
      }), 
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

  // Validate API key
  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'Google Gemini API key not configured. Please set GOOGLE_GEMINI_API_KEY in .env.local',
        error: 'API_KEY_MISSING'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const { 
      input, 
      style = 'professional',
      audience = 'general',
      outputFormat = 'structured',
      category = null,
      includeExamples = true,
    } = body;

    // Validate input
    if (!input || typeof input !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Input is required and must be a string.',
          error: 'INVALID_INPUT'
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check input length
    if (input.length < 3) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Input is too short. Please provide more details about your idea.',
          error: 'INPUT_TOO_SHORT'
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (input.length > 5000) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Input is too long. Maximum 5000 characters allowed.',
          error: 'INPUT_TOO_LONG'
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate the prompt engineering message array
    const { messages, metadata } = generatePromptEngineering(input.trim(), {
      style,
      audience,
      outputFormat,
      forceCategory: category,
      includeExamples
    });

    console.log(`[PromptCraft] Generating prompt for category: ${metadata.detectedCategory}`);
    console.log(`[PromptCraft] Style: ${style}, Audience: ${audience}, Format: ${outputFormat}`);

    // Convert to Gemini format
    const geminiRequestBody = convertToGeminiFormat(messages);

    // Call Google Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiRequestBody)
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[PromptCraft] Gemini API Error:", errorText);
      
      // Parse error for better user messaging
      let errorMessage = 'Failed to generate prompt. Please try again.';
      let errorCode = 'API_ERROR';
      
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error) {
          if (response.status === 429) {
            errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
            errorCode = 'RATE_LIMIT';
          } else if (response.status === 401 || response.status === 403) {
            errorMessage = 'API authentication failed. Please check your API key.';
            errorCode = 'AUTH_ERROR';
          } else if (response.status === 404) {
            errorMessage = 'API endpoint or model not found. Please verify your API key is enabled for Generative Language API at https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com';
            errorCode = 'NOT_FOUND';
          } else if (response.status === 400) {
            errorMessage = errorData.error.message || 'Invalid request to Gemini API.';
            errorCode = 'BAD_REQUEST';
          }
        }
      } catch (e) {
        // Keep default error message
      }
      
      return new Response(
        JSON.stringify({ 
          success: false,
          message: errorMessage,
          error: errorCode
        }), 
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse successful response
    const data = await response.json();
    
    // Validate response structure (Gemini format)
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("[PromptCraft] Invalid Gemini API response structure:", data);
      
      // Check for safety block
      if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === 'SAFETY') {
        return new Response(
          JSON.stringify({ 
            success: false,
            message: 'The request was blocked by safety filters. Please try a different input.',
            error: 'SAFETY_BLOCK'
          }), 
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Received invalid response from Gemini AI. Please try again.',
          error: 'INVALID_RESPONSE'
        }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract generated text from Gemini response
    const generatedPrompt = data.candidates[0].content.parts
      .map(part => part.text)
      .join('')
      .trim();

    // Calculate some metrics
    const wordCount = generatedPrompt.split(/\s+/).length;
    const characterCount = generatedPrompt.length;
    
    console.log(`[PromptCraft] Generated prompt: ${wordCount} words, ${characterCount} characters`);

    // Get token usage if available
    const tokensUsed = data.usageMetadata ? {
      promptTokens: data.usageMetadata.promptTokenCount,
      candidatesTokens: data.usageMetadata.candidatesTokenCount,
      totalTokens: data.usageMetadata.totalTokenCount
    } : null;

    // Return successful response with metadata
    return new Response(
      JSON.stringify({ 
        success: true,
        prompt: generatedPrompt,
        metadata: {
          ...metadata,
          wordCount,
          characterCount,
          model: 'gemini-2.0-flash-exp',
          tokensUsed
        }
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error("[PromptCraft] Internal Server Error:", error);
    
    // Determine error type
    let errorMessage = 'An internal server error occurred. Please try again.';
    let errorCode = 'INTERNAL_ERROR';
    
    if (error instanceof SyntaxError) {
      errorMessage = 'Invalid request format. Please check your input.';
      errorCode = 'PARSE_ERROR';
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your connection.';
      errorCode = 'NETWORK_ERROR';
    }
    
    return new Response(
      JSON.stringify({ 
        success: false,
        message: errorMessage,
        error: errorCode
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * GET endpoint for API health check and info
 */
export async function GET() {
  return new Response(
    JSON.stringify({
      name: 'PromptCraft API',
      version: '2.0.0',
      status: 'operational',
      description: 'Advanced AI Prompt Engineering using Google Best Practices',
      provider: 'Google Gemini API (Free Tier)',
      model: 'gemini-2.0-flash-exp',
      endpoints: {
        'POST /api/generate-prompt': {
          description: 'Generate an optimized prompt from your idea',
          parameters: {
            input: 'string (required) - Your idea or concept',
            style: 'string (optional) - professional, creative, technical, casual, persuasive, educational',
            audience: 'string (optional) - beginners, intermediate, experts, general, executives, developers, designers, marketers',
            outputFormat: 'string (optional) - structured, narrative, list, step_by_step, json, markdown',
            category: 'string (optional) - Force a specific category',
            includeExamples: 'boolean (optional) - Include few-shot examples (default: true)',
          }
        }
      },
      supportedCategories: Object.values(PROMPT_CATEGORIES),
      frameworks: [
        'CO-STAR (Context, Objective, Style, Tone, Audience, Response)',
        'Chain-of-Thought Prompting',
        'Few-Shot Learning',
        'Category-Specific Optimization'
      ]
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
