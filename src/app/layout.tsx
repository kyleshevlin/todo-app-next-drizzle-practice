import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App with Next and Drizzle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} flex min-h-full flex-col gap-8 bg-slate-100`}
      >
        <header className="px-8 py-4">
          <h1 className="text-2xl font-bold">Todo App</h1>
        </header>

        <div className="grow px-8">{children}</div>

        <footer className="bg-slate-900 p-8 text-white">
          Made with a lot of trial and error.
        </footer>
      </body>
    </html>
  )
}
