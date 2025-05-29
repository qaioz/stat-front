import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'stats demo',
  description: 'A demonstration of state management, caching, and optimistic locking with modern UI',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
