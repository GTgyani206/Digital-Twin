import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const chat = model.startChat({
    history: messages.map((m: any) => ({
      role: m.role,
      parts: m.content,
    })),
  })

  const result = await chat.sendMessage(messages[messages.length - 1].content)
  const response = await result.response
  const text = response.text()

  return NextResponse.json({ response: text })
}

