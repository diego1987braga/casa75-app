"use client"

import { useState } from "react"

export default function Home(){

const [agent,setAgent] = useState("render")
const [message,setMessage] = useState("")
const [chat,setChat] = useState<any[]>([])

async function send(){

 if(!message) return

 const user={
  role:"user",
  content:message
 }

 setChat(c=>[...c,user])

 const res = await fetch("/api/chat",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   message,
   agent
  })
 })

 const data = await res.json()

 const ai={
  role:"assistant",
  content:data.resposta
 }

 setChat(c=>[...c,ai])

 setMessage("")
}

return(

<div style={{
display:"flex",
height:"100vh",
fontFamily:"Arial"
}}>

{/* Sidebar */}

<div style={{
width:250,
background:"#111",
color:"#fff",
padding:20
}}>

<h2>Casa75 AI</h2>

<select
value={agent}
onChange={(e)=>setAgent(e.target.value)}
style={{width:"100%",padding:8}}
>

<option value="render">Render IA Master</option>
<option value="croqui">Visionário de Croquis</option>
<option value="cineasta">Cineasta IA</option>
<option value="moodboard">Moodboard</option>
<option value="mentor">Mentor Técnico</option>

</select>

</div>

{/* Chat */}

<div style={{
flex:1,
display:"flex",
flexDirection:"column"
}}>

<div style={{
flex:1,
padding:30,
overflowY:"auto",
background:"#f5f5f5"
}}>

{chat.map((m,i)=>(

<div key={i}
style={{
marginBottom:20,
textAlign:m.role==="user"?"right":"left"
}}
>

<div style={{
display:"inline-block",
padding:12,
borderRadius:10,
background:m.role==="user"?"#007aff":"#fff"
}}>

{m.content}

</div>

</div>

))}

</div>

<div style={{
padding:20,
borderTop:"1px solid #ddd",
display:"flex"
}}>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Pergunte algo..."
style={{
flex:1,
padding:12
}}
/>

<button
onClick={send}
style={{
marginLeft:10,
padding:"12px 20px",
background:"#007aff",
color:"#fff",
border:"none"
}}
>
Enviar
</button>

</div>

</div>

</div>

)

}
