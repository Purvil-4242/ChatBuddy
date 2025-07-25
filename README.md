# 🤖 ChatBuddy

ChatBuddy is an intelligent AI chatbot API built using [LangChain](https://www.langchain.com/), [Hugging Face](https://huggingface.co/), and [FastAPI](https://fastapi.tiangolo.com/). It leverages `deepseek-ai/DeepSeek-R1` as the base LLM and supports conversational memory, making interactions more natural and context-aware.

---

## 🚀 Features

- 🔗 LangChain integration for chaining and memory
- 🤝 Powered by Hugging Face Transformers
- 💬 Remembers past messages with `ConversationBufferMemory`
- ⚡ FastAPI-based lightweight API
- 🌐 CORS enabled (for frontend integration)

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/chatbuddy.git
cd chatbuddy
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
