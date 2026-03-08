
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, agentId, context } = await req.json();

  // Aqui o sistema une o que o Calebe já sabe com a instrução do agente
  const result = await streamText({
    model: google('gemini-1.5-pro'),
    system: `Você é o Calebe, a inteligência da Casa 75. 
             Use este histórico do projeto para responder: ${context}. 
             Siga a personalidade do agente: ${agentId}`,
    messages,
  });

  return result.toDataStreamResponse();
}
