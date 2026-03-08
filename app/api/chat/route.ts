import { gerarResposta } from "../../../lib/gemini";

export async function POST(req: Request) {

  try {

    const { message } = await req.json();

    const resposta = await gerarResposta(message);

    return Response.json({ resposta });

  } catch (error) {

    console.error(error);

    return Response.json(
      { erro: "Erro ao gerar resposta" },
      { status: 500 }
    );
  }

}
