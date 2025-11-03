// 'use client'
//
// import { useState } from 'react'
// import { useTranslations } from 'next-intl'
// import { useRouter, useParams } from 'next/navigation' // Add useParams import
// import { Header } from '@/components/layout/Header'
// import { Button } from '@/components/ui/Button'
// import { Input } from '@/components/ui/Input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
// import Link from 'next/link'
// import { loginUser, setAuthToken } from '@/lib/api-client/auth'
//
// export default function LoginPage() { // Remove params from function signature
//   const params = useParams() // Get params using hook
//   const locale = params.locale as string // Extract locale from params
//   const t = useTranslations()
//   const router = useRouter()
//
//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [errors, setErrors] = useState({
//     password: "",
//     email: ""
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [loginError, setLoginError] = useState('')
//
//   const validateForm = () => {
//     const newErrors: any = {}
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required'
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid'
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }
//
//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     if (errors[field as keyof typeof errors]) {
//       setErrors(prev => ({ ...prev, [field]: '' }))
//     }
//     if (loginError) setLoginError('')
//   }
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!validateForm()) return
//
//     setIsLoading(true)
//     setLoginError('')
//
//     try {
//       // Use your custom login API
//       const response = await loginUser({
//         email: formData.email,
//         password: formData.password
//       })
//
//       // Store the authentication token
//       setAuthToken(response.token)
//
//       // Redirect to dashboard
//       router.push(`/${locale}/dashboard`)
//     } catch (error: any) {
//       console.error('Login error:', error)
//       setLoginError(
//           error.response?.data?.message ||
//           'Invalid email or password. Please try again.'
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="py-20">
//           <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">{t('auth.login.title')}</CardTitle>
//                 <CardDescription>Enter your credentials to access your account</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {loginError && (
//                       <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
//                         {loginError}
//                       </div>
//                   )}
//
//                   <Input
//                       label={t('auth.login.email')}
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       error={errors.email as string}
//                       required
//                       autoComplete="email"
//                   />
//
//                   <Input
//                       label={t('auth.login.password')}
//                       type="password"
//                       value={formData.password}
//                       onChange={(e) => handleInputChange('password', e.target.value)}
//                       error={errors.password as string}
//                       required
//                       autoComplete="current-password"
//                   />
//
//                   <div className="text-sm text-center">
//                     <Link
//                         href="/register"
//                         className="text-blue-600 hover:underline"
//                     >
//                       Don't have an account? Register here
//                     </Link>
//                   </div>
//
//                   <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
//                     {t('auth.login.submit')}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//   )
// }

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { loginUser, setAuthToken } from '@/lib/api-client/auth'
import { useAuth } from '@/lib/contexts/AuthContext' // ✅ Add this import
import toast from 'react-hot-toast' // ✅ Add this import

export default function LoginPage() {
    const params = useParams()
    const locale = params.locale as string
    const t = useTranslations()
    const router = useRouter()
    const { checkAuth } = useAuth() // ✅ Add this line

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({
        password: "",
        email: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    const validateForm = () => {
        const newErrors: any = {}
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
        if (loginError) setLoginError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        setLoginError('')

        try {
            // Use your custom login API
            const response = await loginUser({
                email: formData.email,
                password: formData.password
            })

            // Store the authentication token
            setAuthToken(response.token)
            localStorage.setItem('userEmail', formData.email)
            localStorage.setItem('userPassword', formData.password)
            // ✅ Update auth state in context
            checkAuth()

            // ✅ Show success message
            toast.success('Login successful!')

            // Redirect to dashboard
            router.push(`/${locale}/dashboard`)
        } catch (error: any) {
            console.error('Login error:', error)
            const errorMessage = error.response?.data?.message || 'Invalid email or password. Please try again.'
            setLoginError(errorMessage)
            // ✅ Show error toast
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="py-20">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold">{t('auth.login.title')}</CardTitle>
                            <CardDescription>Enter your credentials to access your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {loginError && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                                        {loginError}
                                    </div>
                                )}

                                <Input
                                    label={t('auth.login.email')}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    error={errors.email as string}
                                    required
                                    autoComplete="email"
                                />

                                <Input
                                    label={t('auth.login.password')}
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    error={errors.password as string}
                                    required
                                    autoComplete="current-password"
                                />

                                <div className="text-sm text-center">
                                    <Link
                                        href={`/${locale}/register`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Don't have an account? Register here
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
                                    {t('auth.login.submit')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}