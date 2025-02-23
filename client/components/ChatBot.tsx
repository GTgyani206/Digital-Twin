"use client"

import type React from "react"

import { useState } from "react"

export default function ChatBot() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    }
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">Health Assistant</h2>
      <div className="h-64 overflow-y-auto mb-4 border border-purple-200 rounded p-2 bg-white">
        {messages.map((m, index) => (
          <div key={index} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-purple-100" : "bg-gray-100"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            className="flex-grow mr-2 p-2 border border-purple-300 rounded"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about your health..."
          />
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

