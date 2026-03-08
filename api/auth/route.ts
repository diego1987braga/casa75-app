import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, username, password, masterKey } = await req.json();

    // 1. Ação de Login (Verifica no banco de dados da Vercel)
    if (action === 'login') {
      const user: any = await kv.get(`user:${username.toLowerCase()}`);
      if (user && user.password === password) {
        return NextResponse.json({ success: true, role: user.role, name: username });
      }
      return NextResponse.json({ success: false, message: 'Acesso Negado' }, { status: 401 });
    }

    // 2. Ação Master (Só você usa para criar novos clientes/escritórios)
    // A MASTER_ADMIN_KEY você define lá no painel da Vercel
    if (action === 'create') {
      if (masterKey !== process.env.MASTER_ADMIN_KEY) {
        return NextResponse.json({ message: 'Chave Master Inválida' }, { status: 403 });
      }

      await kv.set(`user:${username.toLowerCase()}`, { 
        password, 
        role: 'arquiteto',
        createdAt: new Date() 
      });

      return NextResponse.json({ success: true, message: `Escritório ${username} criado com sucesso!` });
    }

    return NextResponse.json({ message: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor de autenticação' }, { status: 500 });
  }
}
