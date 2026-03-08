export async function gerarResposta(prompt: string) {
  // 1. Check for the key before calling the SDK
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro"
    });

    const result = await model.generateContent(prompt);
    
    // 2. Ensure the response actually contains text
    const text = result.response.text();
    if (!text) throw new Error("Empty response from Gemini");

    return text;
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    throw error; // Rethrow so your route.ts catch block can handle it
  }
}
