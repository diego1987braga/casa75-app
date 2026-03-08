"use client"

import { useState } from "react"

export default function Home(){

const [msg,setMsg] = useState("")
const [resp,setResp] = useState("")
const [agent,setAgent] = useState("render")

async function enviar(){

const r = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:msg,
agent:agent
})
})

const data = await r.json()

setResp(data.resposta)

}

return(

<main style={{padding:40,fontFamily:"Arial"}}>

<h1>Sistema de Agentes IA</h1>

<select onChange={(e)=>setAgent(e.target.value)}>

<option value="render">Render IA</option>
<option value="croqui">Croqui → 3D</option>
<option value="moodboard">Moodboard</option>

</select>

<br/><br/>

<input
style={{width:400,padding:10}}
value={msg}
onChange={(e)=>setMsg(e.target.value)}
placeholder="Digite seu prompt"
/>

<button onClick={enviar} style={{marginLeft:10}}>
Enviar
</button>

<div style={{marginTop:30}}>

<h3>Resposta IA</h3>

<p>{resp}</p>

</div>

</main>

)

}
