import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'kuma ʕ•ᴥ•ʔ',
  description: 'kuma ninja studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/kuma_icon.png" />
        <link rel="stylesheet" href="https://use.typekit.net/nws2yze.css" />
        <link rel="stylesheet" href="https://use.typekit.net/nws2yze.css"></link>
      </head>
      <body>{children}</body>
    </html>
  )
} 