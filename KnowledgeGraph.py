import asyncio
import getpass
import os
from datetime import datetime
from hashlib import md5
from typing import List
from langchain_community.graphs import Neo4jGraph
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_text_splitters import TokenTextSplitter
from PyPDF2 import PdfReader
from pydantic import BaseModel, Field

# Set environment variables (Make sure these are correct)
# os.environ["NEO4J_URI"] = "neo4j+s://089bfb9e.databases.neo4j.io"
os.environ["NEO4J_URI"] = "neo4j+s://50ce1299.databases.neo4j.io"
os.environ["NEO4J_USERNAME"] = "neo4j"
# os.environ["NEO4J_PASSWORD"] = "jsSYcLP-a_JvuHYh7xKf5890FOrn1El5BvlXUQGr8hM"
os.environ["NEO4J_PASSWORD"] = "yLNiXxofzR4GJ3GjUUG6GdjDJ5oGAY4vvCSJY45DOKw"
os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")

# Initialize Neo4j graph
graph = Neo4jGraph(refresh_schema=False)
graph.query("CREATE CONSTRAINT IF NOT EXISTS FOR (c:Chunk) REQUIRE c.id IS UNIQUE")
graph.query("CREATE CONSTRAINT IF NOT EXISTS FOR (c:AtomicFact) REQUIRE c.id IS UNIQUE")
graph.query("CREATE CONSTRAINT IF NOT EXISTS FOR (c:KeyElement) REQUIRE c.id IS UNIQUE")
graph.query("CREATE CONSTRAINT IF NOT EXISTS FOR (d:Document) REQUIRE d.id IS UNIQUE")

# Define prompt templates
construction_system = """
You are now an intelligent assistant tasked with extracting key elements and atomic facts from a long text...
"""
construction_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", construction_system),
        ("human", "Use the given format to extract information from the following input: {input}"),
    ]
)

class AtomicFact(BaseModel):
    key_elements: List[str]
    atomic_fact: str

class Extraction(BaseModel):
    atomic_facts: List[AtomicFact]

model = ChatOpenAI(model="gpt-4o-2024-08-06", temperature=0.1)
structured_llm = model.with_structured_output(Extraction)
construction_chain = construction_prompt | structured_llm

import_query = """
MERGE (d:Document {id:$document_name})
WITH d
UNWIND $data AS row
MERGE (c:Chunk {id: row.chunk_id})
SET c.text = row.chunk_text,
    c.index = row.index,
    c.document_name = row.document_name
MERGE (d)-[:HAS_CHUNK]->(c)
WITH c, row
UNWIND row.atomic_facts AS af
MERGE (a:AtomicFact {id: af.id})
SET a.text = af.atomic_fact
MERGE (c)-[:HAS_ATOMIC_FACT]->(a)
WITH c, a, af
UNWIND af.key_elements AS ke
MERGE (k:KeyElement {id: ke})
MERGE (a)-[:HAS_KEY_ELEMENT]->(k)
"""

def encode_md5(text):
    return md5(text.encode("utf-8")).hexdigest()

async def process_document(text, document_name, chunk_size=2000, chunk_overlap=200):
    start = datetime.now()
    print(f"Started extraction at: {start}")
    text_splitter = TokenTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    texts = text_splitter.split_text(text)
    print(f"Total text chunks: {len(texts)}")
    
    tasks = [
        asyncio.create_task(construction_chain.ainvoke({"input": chunk_text}))
        for index, chunk_text in enumerate(texts)
    ]
    results = await asyncio.gather(*tasks)
    print(f"Finished LLM extraction after: {datetime.now() - start}")
    
    docs = [el.dict() for el in results]
    for index, doc in enumerate(docs):
        doc['chunk_id'] = encode_md5(texts[index])
        doc['chunk_text'] = texts[index]
        doc['index'] = index
        for af in doc["atomic_facts"]:
            af["id"] = encode_md5(af["atomic_fact"])
    
    graph.query(import_query, params={"data": docs, "document_name": document_name})
    
    graph.query("""
    MATCH (c:Chunk)<-[:HAS_CHUNK]-(d:Document)
    WHERE d.id = $document_name
    WITH c ORDER BY c.index 
    WITH collect(c) AS nodes
    UNWIND range(0, size(nodes) -2) AS index
    WITH nodes[index] AS start, nodes[index + 1] AS end
    MERGE (start)-[:NEXT]->(end)
    """, params={"document_name": document_name})
    
    print(f"Finished import at: {datetime.now() - start}")

async def main():
    # You can call this in a larger script or API call
    await process_document("Your extracted document text", "Sample Document", chunk_size=500, chunk_overlap=100)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except RuntimeError:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(main())
