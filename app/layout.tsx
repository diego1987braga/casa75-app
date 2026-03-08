export const metadata = {
  title: "Casa75 AI",
  description: "Plataforma IA arquitetura"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
