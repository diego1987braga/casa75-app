import { gerarResposta } from "../../../lib/gemini"

export async function POST(req:Request){

const {message,agent} = await req.json()

let prompt = message

if(agent==="criacao"){
prompt = `
Você é um estúdio de criação arquitetônica.

Pode:
- gerar renders
- criar moodboards
- transformar croquis em conceito
- criar narrativa do projeto
- sugerir tendências

Pedido:
${message}
`
}

if(agent==="projeto"){
prompt = `
Você é um arquiteto técnico especialista em normas NBR.

Analise projetos, identifique erros técnicos,
sugira materiais e riscos.

Pedido:
${message}
`
}

if(agent==="financeiro"){
prompt = `
Você é um consultor financeiro para projetos imobiliários.

Calcule ROI, custo por m²,
valor de revenda e viabilidade.

Pedido:
${message}
`
}

if(agent==="marketing"){
prompt = `
Você é um especialista em marketing para arquitetura de alto padrão.

Crie:
- campanhas
- posts para Instagram
- copy de vendas

Pedido:
${message}
`
}

if(agent==="gestao"){
prompt = `
Você é um consultor de gestão para escritórios de arquitetura.

Ajude com:
- contratos
- processos
- organização do escritório
- relatórios de projeto

Pedido:
${message}
`
}

const resposta = await gerarResposta(prompt)

return Response.json({resposta})

}
