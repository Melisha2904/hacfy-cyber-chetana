import { huggingface } from '@ai-sdk/huggingface';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    if (!process.env.HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY === 'your_openai_api_key_here') {
      console.error("HUGGINGFACE_API_KEY is not set correctly in .env.local");
      return new Response('HUGGINGFACE_API_KEY is not configured', { status: 500 });
    }

    const { messages } = await req.json();
    console.log("Chat request received. Message count:", messages?.length);

    const result = await streamText({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model: huggingface('mistralai/Mistral-7B-Instruct-v0.2') as any,
      system: "You are a helpful, empathetic, and knowledgeable cybersecurity assistant for 'Cyber Chetana', a platform dedicated to cybersecurity awareness in India. Answer user questions about cybersecurity concisely and accurately. Use a friendly, modern tone.",
      messages,
    });

    console.log("Stream initiated successfully.");
    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(`AI Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
