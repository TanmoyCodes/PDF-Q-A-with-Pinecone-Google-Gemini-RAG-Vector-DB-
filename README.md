# PDF Q&A with Pinecone & Google Gemini (RAG + Vector DB Example)

This project demonstrates a **Retrieval-Augmented Generation (RAG)** pipeline, combining **vector databases**, **LLMs**, and **agent-like workflows**. It allows you to:

- Index PDFs into a vector database (Pinecone).
- Ask questions interactively and get context-aware answers using Google Gemini.
- Experience a simplified internal tool workflow similar to real-world AI applications.

This is ideal for anyone interested in hands-on **LLM integration**, **RAG pipelines**, and building **AI-powered tools**.

---

## 🚀 Features

- **PDF Indexing (Backend):** Convert large documents into embeddings and store them in a vector database.
- **RAG-Powered Q&A:** Rewrite follow-up questions into standalone queries, retrieve relevant chunks from Pinecone, and generate precise answers.
- **Agent-Like Workflow:** Maintains chat history and dynamically integrates context for multi-turn conversations.
- **LLM Integration:** Uses Google Gemini models (`gemini-2.0-flash`) for both question rewriting and answer generation.
- **Hands-on Experience:** Demonstrates a workflow similar to internal AI tools, prototypes, and lightweight agents.

---

## 📦 Requirements / Skills Demonstrated

This project showcases skills aligned with a **Software Engineering + Generative AI internship**:

- **Frontend/Backend Basics:** Node.js, CLI interfaces, simple I/O operations.
- **LLM & Agent Exposure:** Using Gemini to rewrite questions and generate answers; multi-turn conversation handling.
- **RAG & Vector Databases:** Semantic search with Pinecone; retrieval-augmented question answering.
- **API Integration:** Working with external APIs (Pinecone, Gemini) for embeddings and generation.
- **Prompt Design & Context Handling:** Crafting system instructions and controlling model outputs.

**Bonus Skills Practiced:**

- LangChain usage (`GoogleGenerativeAIEmbeddings`, `RecursiveCharacterTextSplitter`)
- Building lightweight agent workflows with context management
- Multi-step retrieval + LLM generation pipeline

---

## ⚡ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/pdf-qa-gemini.git
cd pdf-qa-gemini
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with your API keys:

```dotenv
GEMINI_API_KEY=your_google_generative_ai_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
```

---

## 📄 Step 1: Index a PDF (RAG Preparation)

```bash
node index.js
```

- Loads PDF using `PDFLoader`
- Splits text into chunks (`RecursiveCharacterTextSplitter`)
- Embeds chunks using Gemini (`text-embedding-004`)
- Stores vectors in Pinecone

> After this step, the PDF content is ready for semantic retrieval.

---

## 💬 Step 2: Interactive Q&A (Agent + LLM)

```bash
node chat.js
```

- Ask any question in the terminal.
- Follow-up questions are automatically rewritten for clarity.
- Query the Pinecone **vector database** for top-K relevant documents.
- Gemini generates a **context-aware answer**.

Example:

```text
Ask me anything--> What is a binary search tree?
```

- Only answers based on retrieved context (**RAG principle**)
- Maintains chat history to simulate multi-turn agent behavior

---

## 🧠 How It Works

### Step 1: Indexing (RAG Setup)

1. Load PDF → `PDFLoader`
2. Chunk text → `RecursiveCharacterTextSplitter`
3. Embed → `GoogleGenerativeAIEmbeddings`
4. Store → Pinecone vector database

### Step 2: Interactive Q&A (Agent-Like LLM Workflow)

1. Rewrite follow-up question → Gemini
2. Embed query → Gemini embedding model
3. Query Pinecone → retrieve relevant chunks (vector DB)
4. Generate answer → Gemini using retrieved context
5. Update chat history → supports multi-turn queries

---

## ⚠️ Notes

- Ensure your Pinecone index exists before running Q&A.
- The answer is strictly based on retrieved context. If no answer exists, Gemini replies:
  `"I could not find the answer in the provided document."`
- Adjust `chunkSize` and `topK` for performance and accuracy.

---

## 🔗 References / Learning Resources

- [LangChain Docs](https://www.langchain.com/docs/) – embeddings, RAG pipelines, text splitting
- [Pinecone Docs](https://www.pinecone.io/docs/) – vector database for semantic search
- [Google Generative AI (Gemini)](https://developers.generativeai.google/) – LLM & embedding models

---

## 📜 License

MIT License © [Your Name]
