// components/ProtectedRoute.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/api-client/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login')
        }
    }, [router])

    return <>{children}</>
}