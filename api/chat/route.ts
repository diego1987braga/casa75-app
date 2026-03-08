import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, agent } = await req.json();

  // DEFINIÇÃO DA LÓGICA DE CADA AGENTE
  let systemInstruction = "Você é o Calebe, assistente oficial da Casa 75.";
  
  if (agent === 'cineasta') {
    systemInstruction = "Você é o Agente Cineasta da Casa 75. Especialista em renderização fotorrealista. Use termos técnicos de fotografia e iluminação cinematográfica.";
  } else if (agent === 'engenheiro') {
    systemInstruction = "Você é o Agente Engenheiro da Casa 75. Focado em normas técnicas, análise de plantas e viabilidade de obras.";
  } else if (agent === 'vendedor') {
    systemInstruction = "Você é o Agente Vendedor da Casa 75. Mestre em persuasão e marketing de luxo para arquitetura.";
  }

  const result = await streamText({
    model: google('gemini-1.5-flash'), // Flash é mais barato e rápido para o seu SaaS
    system: systemInstruction,
    messages,
  });

  return result.toDataStreamResponse();
}
