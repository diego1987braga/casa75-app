import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Conecta ao Neon usando a variável que a Vercel criou automaticamente
const sql = neon(process.env.STORAGE_URL!); 

export async function POST(req: Request) {
  try {
    const { action, username, password, masterKey } = await req.json();

    // Cria a tabela de usuários se for a primeira vez
    await sql`CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'arquiteto'
    )`;

    if (action === 'login') {
      const result = await sql`SELECT * FROM usuarios WHERE username = ${username.toLowerCase()}`;
      if (result.length > 0 && result[0].password === password) {
        return NextResponse.json({ success: true, name: username });
      }
      return NextResponse.json({ success: false }, { status: 401 });
    }

    // Só você usa esta parte com sua Master Key da Vercel
    if (action === 'create' && masterKey === process.env.MASTER_ADMIN_KEY) {
      await sql`INSERT INTO usuarios (username, password) VALUES (${username.toLowerCase()}, ${password})`;
      return NextResponse.json({ success: true, message: 'Usuário criado!' });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
