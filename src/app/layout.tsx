'use client'

import './globals.css'
import { SessionProvider } from 'next-auth/react'
import ToastProvider from '@/components/toastProvider/ToastProvider'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <SessionProvider>
            {children}
            <ToastProvider />
        </SessionProvider>
        </body>
        </html>
    )
}
