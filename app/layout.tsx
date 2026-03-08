export const metadata = {
  title: "Sistema de Agentes IA",
  description: "Plataforma de IA"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}
