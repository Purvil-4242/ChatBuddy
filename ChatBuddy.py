from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate
from langchain.chains import ConversationChain
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse

load_dotenv()

# Connect to HuggingFace
llm = HuggingFaceEndpoint(
    repo_id="deepseek-ai/DeepSeek-R1",
    task="text-generation"
)

model = ChatHuggingFace(llm=llm)

# Setup prompt and memory
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI assistant."),
    ("human", "{input}")
])

memory = ConversationBufferMemory()

# Build conversation chain
chat_chain = ConversationChain(
    llm=model,
    prompt=prompt,
    memory=memory,
    verbose=False
)

# Reusable function
def get_bot_response(user_input):
    return chat_chain.run(user_input)

app = FastAPI()

# Allow CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_input: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response = get_bot_response(request.user_input)
    return JSONResponse(content={"response": response})


# uvicorn ChatBuddy.ChatBuddy:app --reload
#  venv\Scripts\activate