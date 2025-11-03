'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthToken, removeAuthToken } from '@/lib/api-client/auth' // ✅ Changed here

interface AuthContextType {
    isAuthenticated: boolean
    loading: boolean
    logout: () => void
    checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const checkAuth = () => {
        const token = getAuthToken()
        setIsAuthenticated(!!token)
        setLoading(false)
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const logout = () => {
        removeAuthToken() // ✅ Changed here
        setIsAuthenticated(false)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}