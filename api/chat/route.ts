import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const { action, username, password, masterKey } = await req.json();

    // Criar tabela se não existir (Executado apenas uma vez)
    await sql`CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`;

    if (action === 'login') {
      const users = await sql`SELECT * FROM usuarios WHERE username = ${username.toLowerCase()}`;
      if (users.length > 0 && users[0].password === password) {
        return NextResponse.json({ success: true, name: username });
      }
      return NextResponse.json({ success: false }, { status: 401 });
    }

    if (action === 'create' && masterKey === process.env.MASTER_ADMIN_KEY) {
      await sql`INSERT INTO usuarios (username, password, role) 
                VALUES (${username.toLowerCase()}, ${password}, 'arquiteto')
                ON CONFLICT (username) DO NOTHING`;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
