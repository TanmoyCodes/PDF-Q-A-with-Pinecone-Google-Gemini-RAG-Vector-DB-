
import * as dotenv from "dotenv";
dotenv.config();

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

async function indexDocument() {
  try {
    console.log("Starting PDF to Pinecone pipeline...\n");

 
    const PDF_PATH = "./dsa.pdf"; // <-- your PDF file here
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();
    console.log(`PDF loaded successfully: ${rawDocs.length} pages\n`);

    
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
    console.log(`Chunking complete: ${chunkedDocs.length} chunks created\n`);

    
    if (!process.env.GEMINI_API_KEY)
      throw new Error("Missing GEMINI_API_KEY in .env");

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: "text-embedding-004",
    });
    console.log("Embedding model ready\n");

    
    if (!process.env.PINECONE_API_KEY)
      throw new Error("Missing PINECONE_API_KEY in .env");
    if (!process.env.PINECONE_INDEX_NAME)
      throw new Error("Missing PINECONE_INDEX_NAME in .env");

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    console.log(" Checking Pinecone indexes...");
    const indexes = await pinecone.listIndexes();
    console.log("📋 Available indexes:", indexes);

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    console.log("Pinecone index configured:", process.env.PINECONE_INDEX_NAME, "\n");

    
    console.log("Uploading chunks to Pinecone...");
    await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    console.log("Data stored successfully in Pinecone!");
  } catch (err) {
    console.error("Error during indexing process:", err);
  }
}

indexDocument();
