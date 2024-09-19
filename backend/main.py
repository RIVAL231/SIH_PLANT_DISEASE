from fastapi import FastAPI, Request, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
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

# Define plant disease detection model paths and class names
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS = {
    "Potato": os.path.join(BASE_DIR, "potato_model_v1.h5"),
    "Mango": os.path.join(BASE_DIR, "mango_model_v1.h5"),
    "Rice": os.path.join(BASE_DIR, "rice_model_v1.h5"),
    "Tea": os.path.join(BASE_DIR, "tea_model_v1.h5"),
    "Cauliflower": os.path.join(BASE_DIR, "cauliflower__model_v1.h5"),
    "Wheat": os.path.join(BASE_DIR, "wheat_model_v1.h5"),
    "Brinjal": os.path.join(BASE_DIR, "brinjal_model_v1.h5"),
    "PepperBell": os.path.join(BASE_DIR, "pepperbell_model_v1.h5"),
    "Tomato": os.path.join(BASE_DIR, "tomato_model_v1.h5"),
    "Apple": os.path.join(BASE_DIR, "apple_model_v1.h5"),
    "Corn": os.path.join(BASE_DIR, "corn_model_v1.h5"),
    "Grape": os.path.join(BASE_DIR, "grape_model_v1.h5"),
    "Cherry": os.path.join(BASE_DIR, "cherry_model_v1.h5"),
    "Peach": os.path.join(BASE_DIR, "peach_model_v1.h5")
}

CLASS_NAMES = {
    "Potato": ["Early Blight", "Late Blight", "Healthy"],
    "Mango": ['Anthracnose', 'Bacterial Canker', 'Cutting Weevil', 'Die Back', 'Gall Midge', 'Healthy', 'Not Mango Leaf', 'Powdery Mildew', 'Sooty Mould'],
    "Rice": ['Not Rice Leaf', 'bacterial_leaf_blight', 'brown_spot', 'healthy', 'leaf_blast', 'leaf_scald', 'narrow_brown_spot'],
    "Tea": ['Anthracnose', 'Not Tea Leaf', 'bird eye spot', 'brown blight', 'healthy'],
    "Cauliflower": ['Bacterial spot rot', 'Black Rot', 'Downy Mildew', 'Healthy', 'Not Cauloflower Leaf'],
    "Wheat": ['Healthy', 'Not Wheat Leaf', 'septoria', 'stripe_rust'],
    "Brinjal": ['Diseased Brinjal Leaf', 'Fresh Brinjal Leaf', 'Not Brinjal Leaf'],
    "PepperBell": ['Not PepperBell Leaf', 'Pepper bell Bacterial spot', 'Pepper bell healthy'],
    "Tomato": ['Not Tomato Leaf', 'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight', 'Tomato Leaf Mold', 'Tomato Septoria leaf spot', 'Tomato Spider mites Two spotted spider mite', 'Tomato Target Spot', 'Tomato Tomato YellowLeaf Curl Virus', 'Tomato Tomato mosaic virus', 'Tomato healthy'],
    "Apple": ['Apple scab', 'Apple Black rot', 'Apple Cedar apple rust', 'Healthy Apple', 'Not Apple Leaf'],
    "Corn": ['Corn (maize) Cercospora Gray', 'Corn (maize) Common rust ', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Not Corn Leaf'],
    "Grape": ['Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Not Grape Leaf'],
    "Cherry": ['Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Not Cherry Leaf'],
    "Peach": ['Not Peach Leaf', 'Peach___Bacterial_spot', 'Peach___healthy']
}

# Define the request body structure for the chatbot
class ChatRequest(BaseModel):
    message: str

# Helper function to read the uploaded file as an image
def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

# Helper function to format prediction results
def format_prediction(predicted_class, confidence):
    if confidence < 60:
        confidence_message = f"{confidence}% - Confidence very low"
    else:
        confidence_message = f"{confidence}%"
    return {'class': predicted_class, 'confidence': confidence_message}

# Chatbot endpoint
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

# Plant disease prediction endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...), plant_type: str = Form(...)):
    if plant_type not in MODELS:
        return {"error": "Invalid plant type selected."}

    model_path = MODELS[plant_type]
    class_names = CLASS_NAMES[plant_type]

    try:
        model = tf.keras.models.load_model(model_path)
    except ValueError as e:
        return {"error": str(e)}

    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = model.predict(img_batch)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(np.max(predictions[0]) * 100, 2)

    result = format_prediction(predicted_class, confidence)
    return result

if __name__ == "__main__":
    # Use dynamic port for Render deployment
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host='0.0.0.0', port=port)