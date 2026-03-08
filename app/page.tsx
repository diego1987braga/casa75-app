"use client"

import { useState } from "react"

export default function Home() {

  const [agent,setAgent] = useState("criacao")
  const [message,setMessage] = useState("")
  const [response,setResponse] = useState("")

  async function sendMessage(){

    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:message,
        agent:agent
      })
    })

    const data = await res.json()

    setResponse(data.resposta)
  }

  return (

    <main style={{padding:40,fontFamily:"Arial"}}>

      <h2>Agente: {agent.toUpperCase()}</h2>

      <select
        value={agent}
        onChange={(e)=>setAgent(e.target.value)}
      >

        <option value="criacao">Criação IA</option>
        <option value="projeto">Projeto IA</option>
        <option value="financeiro">Financeiro IA</option>
        <option value="marketing">IA de Marketing</option>
        <option value="gestao">Gestão IA</option>

      </select>

      <br/><br/>

      <input
        style={{width:400,padding:10}}
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Digite sua pergunta"
      />

      <button
        style={{marginLeft:10,padding:10}}
        onClick={sendMessage}
      >
        Enviar
      </button>

      <div style={{marginTop:30}}>

        <b>Resposta da IA:</b>
        <p>{response}</p>

      </div>

    </main>

  )
}
