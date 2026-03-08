"use client"

import { useState } from "react";

export default function Home() {

  const [msg, setMsg] = useState("");
  const [resp, setResp] = useState("");

  async function enviar() {

    const r = await fetch("/api/chat",{
      method:"POST",
      body:JSON.stringify({message:msg})
    });

    const data = await r.json();

    setResp(data.resposta);
  }

  return (

    <main style={{padding:40,fontFamily:"Arial"}}>

      <h1>Agente IA Arquitetura</h1>

      <input
        style={{width:400,padding:10}}
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        placeholder="Digite seu prompt..."
      />

      <button
        onClick={enviar}
        style={{marginLeft:10,padding:10}}
      >
        Enviar
      </button>

      <div style={{marginTop:30}}>
        <b>Resposta IA:</b>
        <p>{resp}</p>
      </div>

    </main>
  );
}
