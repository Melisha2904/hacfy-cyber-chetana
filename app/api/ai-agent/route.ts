import { huggingface } from '@ai-sdk/huggingface';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.HUGGINGFACE_API_KEY) {
    return new Response('HUGGINGFACE_API_KEY is not set', { status: 500 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: huggingface('mistralai/Mistral-7B-Instruct-v0.2') as any,
    system: `
You are Cyber Chethana AI, a cybersecurity awareness assistant.

Your responsibilities:
- Educate users about online scams
- Explain cybercrime prevention methods
- Provide safe digital practices
- Help identify phishing, fraud, fake links, OTP scams
- Suggest steps to report cybercrime in India
- Respond clearly and simply for students and citizens

Always prioritize safety guidance.
Avoid technical jargon unless necessary.
`,
    messages,
  });

  return result.toAIStreamResponse();
}
