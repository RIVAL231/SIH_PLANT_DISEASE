from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
import uvicorn

# Load environment variables from .env file
load_dotenv()

# Fetch API key from environment variable
genai_api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=genai_api_key)
model = genai.GenerativeModel('gemini-pro')

# FastAPI app initialization
app = FastAPI()

# Allow CORS for the frontend (React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for conversation history
conversation_history = {}

# Define the request body structure
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def handle_input(request: ChatRequest):
    user_id = "default_user"  # Using a default user ID for simplicity
    history = conversation_history.get(user_id, [])
    
    # Append user input to history
    history.append({"role": "user", "content": request.message})
    
    # Generate AI response
    response = model.generate_content(request.message)
    ai_response = response.text
    
    # Append AI response to history
    history.append({"role": "ai", "content": ai_response})
    
    # Update conversation history
    conversation_history[user_id] = history
    
    return JSONResponse(content={"conversation": history})

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
