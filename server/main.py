from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal

from .ai.generator import generate_prompt

app = FastAPI()


# CORS configuration to allow frontend requests
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite's default dev port
    # Add your Vercel deployment URL here after deploying
    # "https://your-frontend-deployment-url.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerationRequest(BaseModel):
    context: str
    target_model: Literal[
        "GPT-4", "Claude 3.5", "Llama 3", "Gemini", "Stable Diffusion"
    ]


class GenerationResponse(BaseModel):
    prompt: str


@app.get("/")
def read_root():
    return {"status": "PromptCraft API is running"}


@app.post("/generate", response_model=GenerationResponse)
async def handle_generate_prompt(request: GenerationRequest):
    """
    Receives context and target model, returns a generated prompt.
    """
    try:
        prompt = generate_prompt(request.context, request.target_model)
        return GenerationResponse(prompt=prompt)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Generic error handler for production
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Placeholder for future CRUD operations for user prompts
# @app.get("/prompts")
# async def get_user_prompts():
#     # Logic to fetch prompts from PostgreSQL (Supabase)
#     return []


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
