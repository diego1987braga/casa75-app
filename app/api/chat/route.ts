export async function POST(req: Request) {
  try {
    // 1. Check if the body actually exists before parsing
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
       return Response.json({ erro: "Content-Type must be application/json" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({})); // Safety catch for empty body
    const message = body?.message || "mensagem vazia";

    return Response.json({
      resposta: "API funcionando",
      recebido: message
    });

  } catch (error) {
    // This logs to the Vercel Dashboard (Functions tab)
    console.error("API Error:", error);

    return Response.json(
      { erro: "Erro interno da API", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
