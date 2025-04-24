import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather',
  description: 'Check the weather in your location',
  icons: {
    icon: '/favicon.ico'
  },
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