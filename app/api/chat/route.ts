import { gerarResposta } from "../../../../lib/gemini";

export async function POST(req: Request) {

  try {

    const { message, agent } = await req.json();

    const prompt = `Agente: ${agent}

Pergunta:
${message}`;

    const resposta = await gerarResposta(prompt);

    return Response.json({
      resposta
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      resposta: "Erro ao gerar resposta."
    });

  }

}
