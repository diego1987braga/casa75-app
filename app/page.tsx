"use client"

import { useState } from "react"

export default function Home() {

  const [agent,setAgent] = useState("calebe")
  const [message,setMessage] = useState("")
  const [response,setResponse] = useState("")

  async function sendMessage(){

    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        messages:[
          { role:"user", content: message }
        ],
        agent:agent
      })
    })

    const data = await res.json()

    setResponse(data.resposta)
  }

  return(

    <main style={{padding:40,fontFamily:"Arial"}}>

      <h1 id="mode-title">
        Modo: {agent.toUpperCase()}
      </h1>

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
        onClick={sendMessage}
        style={{marginLeft:10,padding:10}}
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
