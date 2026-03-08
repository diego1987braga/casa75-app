"use client"

import { useState } from "react"

export default function Home() {

  const [agent, setAgent] = useState("Mentor")
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<string[]>([])

  async function sendMessage() {

    if (!message) return

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        agent: agent
      })
    })

    const data = await res.json()

    setChat([...chat, "Você: " + message, "IA: " + data.resposta])

    setMessage("")
  }

  return (

    <main style={{padding:40,fontFamily:"Arial"}}>

      <h2>Modo: {agent.toUpperCase()}</h2>

      <select
        value={agent}
        onChange={(e)=>setAgent(e.target.value)}
      >
        <option value="calebe">Calebe</option>
        <option value="render">Render</option>
        <option value="croqui">Croqui</option>
        <option value="moodboard">Moodboard</option>
      </select>

      <br/><br/>

      <input
        style={{width:400,padding:10}}
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Digite sua mensagem"
      />

      <button
        style={{marginLeft:10,padding:10}}
        onClick={sendMessage}
      >
        Enviar
      </button>

      <div style={{marginTop:30}}>

        {chat.map((msg,index)=>(
          <p key={index}>{msg}</p>
        ))}

      </div>

    </main>

  )
}
