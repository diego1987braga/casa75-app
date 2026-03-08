export const metadata = {
  title: "Sistema de Agentes IA",
  description: "Agentes IA"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  )
}
