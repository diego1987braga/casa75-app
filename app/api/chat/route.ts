export async function POST(req: Request) {

  try {

    const body = await req.json()

    const message = body?.message || "mensagem vazia"

    return Response.json({
      resposta: "API funcionando",
      recebido: message
    })

  } catch (error) {

    console.error(error)

    return Response.json(
      {
        erro: "Erro interno da API"
      },
      { status: 500 }
    )

  }

}
