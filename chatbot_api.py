from fastapi import FastAPI
from pydantic import BaseModel
import Chatbot

app = FastAPI()

class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "Health Document Chatbot API"}

@app.post("/ask/")
def ask_question(request: QuestionRequest):
    query = request.question
    response = Chatbot.get_response(query)
    return {"question": query, "response": response}
