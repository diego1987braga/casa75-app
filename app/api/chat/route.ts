export async function POST(req: Request) {
  try {

    const body = await req.json()

    return Response.json({
      resposta: "API funcionando",
      recebido: body
    })

  } catch (error) {

    return Response.json({
      erro: "Erro na API",
      detalhe: String(error)
    }, { status: 500 })

  }
}
