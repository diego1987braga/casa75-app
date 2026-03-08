import { gerarResposta } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.message;

    if (!prompt) {
      return Response.json({ erro: "Mensagem não fornecida" }, { status: 400 });
    }

    // Call your Gemini function
    const responseText = await gerarResposta(prompt);

    return Response.json({
      resposta: responseText,
      recebido: prompt
    });

  } catch (error) {
    console.error("Erro na Rota API:", error);
    return Response.json(
      { erro: "Erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
