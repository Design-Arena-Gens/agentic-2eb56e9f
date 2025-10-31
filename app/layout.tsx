import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bloom - AI Todo List',
  description: 'Your AI-powered productivity companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
