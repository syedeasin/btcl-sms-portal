import './globals.css'
import type { ReactNode } from 'react'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // Root layout just passes children through
  // The [locale] layout handles the HTML structure
  return children
}