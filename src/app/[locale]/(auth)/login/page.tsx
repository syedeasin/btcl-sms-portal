// 'use client'
//
// import { useState } from 'react'
// import { useTranslations } from 'next-intl'
// // import { signIn } from 'next-auth/react'
// import { loginUser } from '@/lib/api-client/auth';
// import { useRouter } from 'next/navigation'
// import { Header } from '@/components/layout/Header'
// import { Footer } from '@/components/layout/Footer'
// import { Button } from '@/components/ui/Button'
// import { Input } from '@/components/ui/Input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
// import Link from 'next/link'
//
// interface LoginFormData {
//   email: string
//   password: string
// }
//
// interface FormErrors {
//   [key: string]: string
// }
//
// export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
//   const t = useTranslations()
//   const router = useRouter()
//
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: '',
//     password: ''
//   })
//   const [errors, setErrors] = useState<FormErrors>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [loginError, setLoginError] = useState('')
//
//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {}
//
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+(@[^\s@]+\.[^\s@]+)?$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address or username';
//     }
//
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     }
//
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }
//
//   const handleInputChange = (field: keyof LoginFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//
//     // Clear errors when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }))
//     }
//     if (loginError) {
//       setLoginError('')
//     }
//   }
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//
//     if (!validateForm()) return;
//
//     setIsLoading(true);
//     try {
//       // const response = await loginUser({
//       //   email: formData.email,
//       //   password: formData.password,
//       // });
//       const response = await loginUser({
//         email: formData.email,
//         password: formData.password,
//       });
//
//       if (response.token) {
//         // Store token in localStorage or cookies (you may want to use Secure cookies or HttpOnly cookies via backend)
//         localStorage.setItem('authToken', response.token);
//
//         // Redirect user to dashboard or wherever
//         router.push(`/${locale}/dashboard`);
//       } else {
//         setLoginError('Invalid email or password');
//       }
//     } catch (error) {
//       setLoginError('Login failed. Please check your credentials and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//
//       <div className="py-20">
//         <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl font-bold">
//                 {t('auth.login.title')}
//               </CardTitle>
//               <CardDescription>
//                 Enter your credentials to access your account
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {loginError && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm font-medium text-red-800">
//                           {loginError}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//
//                 <Input
//                   label={t('auth.login.email')}
//                   type="text"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   error={errors.email}
//                   required
//                   autoComplete="email"
//                 />
//
//                 <Input
//                   label={t('auth.login.password')}
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) => handleInputChange('password', e.target.value)}
//                   error={errors.password}
//                   required
//                   autoComplete="current-password"
//                 />
//
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <input
//                       id="remember-me"
//                       name="remember-me"
//                       type="checkbox"
//                       className="h-4 w-4 text-btcl-primary focus:ring-btcl-primary border-gray-300 rounded"
//                     />
//                     <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                       {t('auth.login.remember')}
//                     </label>
//                   </div>
//
//                   <div className="text-sm">
//                     <Link
//                       href={`/${locale}/auth/forgot-password`}
//                       className="font-medium text-btcl-primary hover:text-btcl-secondary"
//                     >
//                       {t('auth.login.forgot')}
//                     </Link>
//                   </div>
//                 </div>
//
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   loading={isLoading}
//                   disabled={isLoading}
//                 >
//                   {t('auth.login.submit')}
//                 </Button>
//               </form>
//
//               <div className="mt-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300" />
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">
//                       Don't have an account?
//                     </span>
//                   </div>
//                 </div>
//
//                 <div className="mt-6 text-center">
//                   <Link
//                     href={`/${locale}/register`}
//                     className="font-medium text-btcl-primary hover:text-btcl-secondary"
//                   >
//                     {t('auth.login.register_link')}
//                   </Link>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//
//       <Footer />
//     </div>
//   )
// }
//
//
//
//
//





'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const router = useRouter()

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
    const result = await signIn('https://iptsp.cosmocom.net:8001/AUTHENTICATION/auth/login', {
      redirect: false,
      email: formData.email,
      password: formData.password
    })

    setIsLoading(false)

    if (result?.error) {
      setLoginError('Invalid email or password')
    } else {
      router.push(`/${locale}/dashboard`)
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
                      type="text" // ← changed from "email" to "text"
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

                  <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
                    {t('auth.login.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
  )
}
