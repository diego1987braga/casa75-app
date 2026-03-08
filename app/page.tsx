"use client"

import { useState } from "react"

export default function Home(){

const [agent,setAgent] = useState("render")
const [message,setMessage] = useState("")
const [chat,setChat] = useState<any[]>([])

async function send(){

 if(!message) return

 const userMessage={
   role:"user",
   content:message
 }

 setChat([...chat,userMessage])

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

 const aiMessage={
   role:"assistant",
   content:data.resposta
 }

 setChat(c=>[...c,aiMessage])

 setMessage("")
}

return(

<div style={{
display:"flex",
height:"100vh",
fontFamily:"Arial"
}}>

{/* sidebar */}

<div style={{
width:260,
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
<option value="briefing">Analista de Briefing</option>

<option value="materiais">Curador de Materiais</option>

<option value="financeiro">ROI Master</option>

<option value="marketing">Marketing IA</option>

<option value="gestao">Gestão IA</option>

</select>

</div>

{/* chat */}

<div style={{
flex:1,
display:"flex",
flexDirection:"column"
}}>

{/* mensagens */}

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

{/* input */}

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
padding:12,
fontSize:16
}}
/>

<button
onClick={send}
style={{
marginLeft:10,
padding:"12px 20px",
background:"#007aff",
color:"#fff",
border:"none",
cursor:"pointer"
}}
>
Enviar
</button>

</div>

</div>

</div>

)

}
