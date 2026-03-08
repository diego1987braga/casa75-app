import { gerarResposta } from "../../../lib/gemini";

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const pergunta = body.message || "Olá"

    const resposta = await gerarResposta(pergunta)

    return Response.json({
      resposta: resposta
    })

  } catch (error) {

    console.error(error)

    return Response.json({
      resposta:"Erro ao gerar resposta"
    })

  }

}
