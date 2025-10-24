import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
API_BASE_URL = "https://openrouter.ai/api/v1"

def generate_prompt(user_context: str, target_model: str) -> str:
    """
    Generates a high-quality prompt for the target model using OpenRouter.
    """
    if not OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY is not set.")

    system_prompt = f'Kamu adalah ahli prompt engineer. Buatkan prompt terbaik untuk model "{target_model}" agar menghasilkan output yang akurat, kreatif, dan sesuai konteks berikut: "{user_context}". Format output hanya berisi prompt-nya saja, tanpa penjelasan.'

    try:
        response = requests.post(
            f"{API_BASE_URL}/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "openai/gpt-4o",  # We use a powerful model to generate the prompt itself
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_context}
                ]
            }
        )

        response.raise_for_status()

        data = response.json()
        generated_prompt = data['choices'][0]['message']['content'].strip()

        return generated_prompt

    except requests.exceptions.RequestException as e:
        print(f"Error calling OpenRouter API: {e}")
        # Fallback mechanism
        return f"// Fallback: Gagal menghasilkan prompt. Konteks: {user_context}"
    except (KeyError, IndexError) as e:
        print(f"Error parsing OpenRouter response: {e}")
        return f"// Fallback: Gagal memproses respons. Konteks: {user_context}"
