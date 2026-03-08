import { gerarResposta } from "@/lib/gemini"

export async function POST(req:Request){

  const {message} = await req.json()

  const resposta = await gerarResposta(message)

  return Response.json({
    resposta
  })

}
