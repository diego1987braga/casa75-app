"use client"

import { useState } from "react"

export default function Home() {

  const [msg,setMsg] = useState("")
  const [resp,setResp] = useState("")

  async function enviar(){

    const r = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({message:msg})
    })

    const data = await r.json()

    setResp(data.resposta)
  }

  return (

    <main style={{padding:40}}>

      <h1>Agente IA</h1>

      <input
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
      />

      <button onClick={enviar}>
        Enviar
      </button>

      <p>{resp}</p>

    </main>
  )
}
