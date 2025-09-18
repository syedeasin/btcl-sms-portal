'use client'

import './globals.css'
import { SessionProvider } from 'next-auth/react'
import ToastProvider from '@/components/toastProvider/ToastProvider'
import React, { useEffect } from 'react'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    useEffect(() => {
        // Clean up browser extension attributes to prevent hydration errors
        if (typeof document !== 'undefined') {
            const body = document.body;
            // Remove all common extension attributes
            const attributesToRemove = [
                'data-demoway-document-id',
                'cz-shortcut-listen',
                'data-new-gr-c-s-check-loaded',
                'data-gr-ext-installed'
            ];
            attributesToRemove.forEach(attr => body.removeAttribute(attr));
        }
    }, []);

    return (
        <html lang="en" dir="ltr">
        <head>
            <title>BTCL SMS</title>
            <meta name="description" content="BTCL SMS Management System" />
            <link rel="icon" href="/fabicon.png" />
        </head>
        <body className="__className_e8ce0c">
        <SessionProvider>
            {children}
            <ToastProvider />
        </SessionProvider>
        </body>
        </html>
    )
}