import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Conecta ao seu banco de dados Neon automaticamente
const sql = neon(process.env.POSTGRES_URL!);

export async function POST(req: Request) {
  try {
    const { action, username, password, masterKey } = await req.json();

    // Cria a tabela de usuários se for a primeira vez que o código roda
    await sql`CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'arquiteto'
    )`;

    // Lógica para o cliente fazer Login
    if (action === 'login') {
      const result = await sql`SELECT * FROM usuarios WHERE username = ${username.toLowerCase()}`;
      if (result.length > 0 && result[0].password === password) {
        return NextResponse.json({ success: true, name: username });
      }
      return NextResponse.json({ success: false, message: 'Usuário ou senha inválidos' }, { status: 401 });
    }

    // Lógica para VOCÊ criar novos clientes usando sua MASTER_ADMIN_KEY
    if (action === 'create' && masterKey === process.env.MASTER_ADMIN_KEY) {
      await sql`INSERT INTO usuarios (username, password) VALUES (${username.toLowerCase()}, ${password})
                ON CONFLICT (username) DO NOTHING`;
      return NextResponse.json({ success: true, message: 'Escritório cadastrado com sucesso!' });
    }

    return NextResponse.json({ error: 'Ação não permitida' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
