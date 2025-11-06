'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Header } from "@/components/layout/Header"
import { createPartner, addPartnerDetails, sendOtp, verifyOtp, loginPartner } from '@/lib/api-client/partner'
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import { loginUser, setAuthToken } from '@/lib/api-client/auth'
import {useAuth} from "@/lib/contexts/AuthContext";

// Country list with codes
const countries = [
    { code: 'BD', name: 'Bangladesh' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    // Add more countries as needed
];

type VerificationInfo = {
    phone: string
    otp: string
}

type PersonalInfo = {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    confirmPassword: string
}

type OtherInfo = {
    address1: string
    address2?: string
    address3: string
    address4?: string
    city: string
    state: string
    postalCode: string
    country: string
    nidNumber: string
    tradeLicenseNumber: string
    tinNumber: string
    taxReturnDate: string
    termsAccepted: boolean
    tradeLicenseFile: File | null
    tinFile: File | null
    taxReturnFile: File | null
    jointStockFile?: File | null
    btrcFile?: File | null
    photoFile?: File | null
    slaFile?: File | null
    identityCardFrontSide?: File
    identityCardBackSide?: File
    bincertificate?: File
}

export default function RegisterPage() {
    const [step, setStep] = useState<number>(1)
    const [secondsLeft, setSecondsLeft] = useState<number>(300)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [verifiedPhone, setVerifiedPhone] = useState('')
    const intervalRef = useRef<number | null>(null)
    const router = useRouter();
    const { checkAuth } = useAuth()

    // Form hooks for each step
    const verificationForm = useForm<VerificationInfo>({
        mode: 'onBlur'
    })

    const personalInfoForm = useForm<PersonalInfo>({
        mode: 'onBlur'
    })

    const otherInfoForm = useForm<OtherInfo>({
        mode: 'onBlur'
    })

    const { formState: { isValid: isVerificationValid } } = verificationForm
    const { formState: { isValid: isPersonalInfoValid } } = personalInfoForm
    const { formState: { isValid: isOtherInfoValid } } = otherInfoForm

    // Pre-fill phone number in personal info after verification
    useEffect(() => {
        if (verifiedPhone && step === 2) {
            personalInfoForm.setValue('phone', verifiedPhone)
        }
    }, [verifiedPhone, step, personalInfoForm])

    // start timer helper
    const startTimer = (initial = 60) => {
        setSecondsLeft(initial)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        intervalRef.current = window.setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                        intervalRef.current = null
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000) as unknown as number
    }

    // On entering step 1, start the OTP timer if OTP was sent
    useEffect(() => {
        if (step === 1 && otpSent) {
            startTimer(300)
        } else {
            // clear timer if we leave step 1
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [step, otpSent])

    // format mm:ss
    const formatTime = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        const mm = m.toString().padStart(2, '0')
        const ss = sec.toString().padStart(2, '0')
        return `${mm}:${ss}`
    }

    const handleNext = async () => {
        if (step === 1) {
            const isValid = await verificationForm.trigger()
            if (isValid) {
                // If OTP hasn't been sent yet, send it
                if (!otpSent) {
                    await handleSendOtp()
                } else {
                    // If OTP has been sent, verify it
                    await handleVerifyOtp()
                }
            }
        } else if (step === 2) {
            const isValid = await personalInfoForm.trigger()
            if (isValid) setStep(prev => prev + 1)
        } else if (step === 3) {
            const isValid = await otherInfoForm.trigger()
            if (isValid) setStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1)
    }

    const handleSendOtp = async () => {
        try {
            setIsSubmitting(true)
            const phone = verificationForm.getValues('phone')
            const response = await sendOtp(phone)
            console.log('OTP sent:', response)
            setOtpSent(true)
            startTimer(300)
            toast.success('OTP sent successfully!')
        } catch (error) {
            console.error('Failed to send OTP:', error)
            toast.error('Failed to send OTP. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleVerifyOtp = async () => {
        try {
            setIsSubmitting(true)
            const { phone, otp } = verificationForm.getValues()
            const response = await verifyOtp(phone, otp)
            console.log('OTP verified:', response)
            setVerifiedPhone(phone)
            toast.success('Phone number verified successfully!')
            setStep(2) // Move to personal info step
        } catch (error) {
            console.error('Failed to verify OTP:', error)
            toast.error('Invalid OTP. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resendOtp = async () => {
        try {
            const phone = verificationForm.getValues('phone')
            const response = await sendOtp(phone)
            console.log('OTP resent:', response)
            startTimer(300)
            toast.success('OTP resent successfully!')
        } catch (error) {
            console.error('Failed to resend OTP:', error)
            toast.error('Failed to resend OTP. Please try again.')
        }
    }

    const handlePersonalInfoSubmit: SubmitHandler<PersonalInfo> = (data) => {
        console.log('Personal info submitted:', data)
        setStep(3)
    }

    // Updated registration flow
    const handleOtherInfoSubmit: SubmitHandler<OtherInfo> = async (data) => {
        setIsSubmitting(true);

        try {
            console.log('🚀 Starting registration process...');

            // 1. Gather both form data
            const personalInfoData = personalInfoForm.getValues();
            const otherInfoData = otherInfoForm.getValues();

            console.log('📋 Form data gathered:', {
                email: personalInfoData.email,
                phone: personalInfoData.phone,
                name: `${personalInfoData.firstName} ${personalInfoData.lastName}`
            });

            // 2. First call: create partner (NO TOKEN REQUIRED)
            console.log('\n🔵 STEP 2: Creating partner account...');
            const partnerPayload = {
                partnerName: `${personalInfoData.firstName} ${personalInfoData.lastName}`,
                telephone: personalInfoData.phone,
                email: personalInfoData.email,
                userPassword: personalInfoData.password,
                address1: otherInfoData.address1,
                address2: otherInfoData.address2 || "",
                city: otherInfoData.city,
                state: otherInfoData.state,
                postalCode: otherInfoData.postalCode,
                country: otherInfoData.country,
                alternateNameInvoice: `${personalInfoData.firstName} ${personalInfoData.lastName}`,
                alternateNameOther: personalInfoData.phone,
                vatRegistrationNo: otherInfoData.tinNumber || "N/A",
                invoiceAddress: otherInfoData.address1,
                customerPrePaid: 1,
                partnerType: 1,
                defaultCurrency: 1,
                callSrcId: 2,
            };

            const partnerResponse = await createPartner(partnerPayload);

            // Extract partnerId
            const idPartner = partnerResponse?.idPartner || partnerResponse?.id;
            if (!idPartner) {
                console.error('❌ Partner response:', partnerResponse);
                throw new Error("Partner ID missing in createPartner response");
            }
            console.log('✅ Partner created with ID:', idPartner);

            // 3. Second call: login to get JWT token
            console.log('\n🔵 STEP 3: Logging in to get JWT token...');
            console.log('Login credentials:', {
                email: personalInfoData.email,
                passwordLength: personalInfoData.password.length
            });

            const loginResponse = await loginPartner(
                personalInfoData.email,
                personalInfoData.password
            );

            const jwtToken = loginResponse.token;
            if (!jwtToken) {
                console.error('❌ Login response:', loginResponse);
                throw new Error("JWT token missing in login response");
            }
            console.log('✅ JWT token received:', jwtToken.substring(0, 50) + '...');
            console.log('📋 Token payload:', {
                roles: loginResponse.authRoles,
                partnerId: loginResponse.idPartner || 'N/A',
                sessionStart: loginResponse.sessionStartDateTime
            });

            // Small delay to ensure token is propagated
            console.log('⏳ Waiting 2 seconds for token to be active...');
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 4. Third call: add partner details (WITH TOKEN)
            console.log('\n🔵 STEP 4: Adding partner documents with JWT token...');
            const detailsPayload = {
                partnerId: idPartner,
                doctype: "nid",
                phonenumber: personalInfoData.phone,
                email: personalInfoData.email,
                firstName: personalInfoData.firstName,
                lastName: personalInfoData.lastName,
                dob: "1995-01-01",
                address1: otherInfoData.address1,
                address2: otherInfoData.address2,
                address3: otherInfoData.address3,
                address4: otherInfoData.address4,
                gender: "Male",
                countryCode: otherInfoData.country,
                docSerialNumber: otherInfoData.nidNumber,
                docexpirydate: otherInfoData.taxReturnDate,
                // Files
                tradeliscense: otherInfoData.tradeLicenseFile ?? undefined,
                tincertificate: otherInfoData.tinFile ?? undefined,
                identityCardFrontSide: otherInfoData.identityCardFrontSide ?? undefined,
                identityCardBackSide: otherInfoData.identityCardBackSide ?? undefined,
                bincertificate: otherInfoData.bincertificate ?? undefined,
                taxReturnFile: otherInfoData.taxReturnFile ?? undefined,
                btrcFile: otherInfoData.btrcFile ?? undefined,
                jointStockFile: otherInfoData.jointStockFile ?? undefined,
                photoFile: otherInfoData.photoFile ?? undefined,
                slaFile: otherInfoData.slaFile ?? undefined,
            };

            console.log('Calling addPartnerDetails with token...');
            const detailsResponse = await addPartnerDetails(detailsPayload, jwtToken);
            console.log('✅ Partner details added successfully:', detailsResponse);

            // 5. Auto-login for the main app (if different from partner login)
            console.log('\n🔵 STEP 5: Auto-login to main app...');
            try {
                const appLoginResponse = await loginUser({
                    email: personalInfoData.email,
                    password: personalInfoData.password
                });

                setAuthToken(appLoginResponse.token);
                localStorage.setItem('userEmail', personalInfoData.email);
                localStorage.setItem('userPassword', personalInfoData.password);
                checkAuth();
                toast.success("Registration completed successfully! You are now logged in.");
                console.log('✅ Registration complete! Redirecting to dashboard...');
                router.push('/dashboard');
            } catch (loginError) {
                console.error('⚠️ Auto login failed:', loginError);
                // Still show success message but redirect to login page
                toast.success("Registration completed successfully! Please login with your credentials.");
                router.push('/login');
            }

        } catch (error) {
            console.error("❌ Registration failed:", error);
            // Provide more specific error messages
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-black">
                            {step === 1 && 'Verify Your Phone Number'}
                            {step === 2 && 'Create Your Account'}
                            {step === 3 && 'Upload Your Documents'}
                        </h1>
                        <p className="text-gray-600">Please provide your information to get started</p>
                    </div>

                    {/* Steps header (tabs) */}
                    <div className="flex border mb-6">
                        {['Verification', 'Personal Information', 'Other Information'].map((label, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    if (i === 0 || (i === 1 && isVerificationValid) || (i === 2 && isVerificationValid && isPersonalInfoValid)) {
                                        setStep(i + 1)
                                    }
                                }}
                                className={`flex-1 text-center py-3 border-r last:border-r-0 cursor-pointer ${
                                    step === i + 1 ? 'bg-gray-100 font-medium text-black' : 'bg-white text-black'
                                } ${
                                    (i === 1 && !isVerificationValid) || (i === 2 && (!isVerificationValid || !isPersonalInfoValid))
                                        ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {i + 1}. {label}
                            </div>
                        ))}
                    </div>

                    {/* STEP 1 - Verification */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-black font-medium mb-1">Phone Number</label>
                                <Controller
                                    name="phone"
                                    control={verificationForm.control}
                                    rules={{
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^\+8801[3-9]\d{8}$/,
                                            message: 'Must be a valid Bangladeshi phone number (+8801XXXXXXXXX)'
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <input
                                                type="tel"
                                                {...field}
                                                placeholder="+880 1XXXXXXXXX"
                                                disabled={otpSent}
                                                className={`w-full px-3 py-2 border ${
                                                    fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                } rounded-md text-black ${otpSent ? 'bg-gray-100' : ''}`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            {otpSent && (
                                <>
                                    <div>
                                        <label className="block text-black font-medium mb-1">Verification Code</label>
                                        <Controller
                                            name="otp"
                                            control={verificationForm.control}
                                            rules={{
                                                required: 'OTP is required',
                                                pattern: {
                                                    value: /^\d{5}$/,
                                                    message: 'OTP must be 5 digits'
                                                }
                                            }}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <input
                                                        type="text"
                                                        {...field}
                                                        className={`w-full px-3 py-2 border ${
                                                            fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                        } rounded-md text-black`}
                                                    />
                                                    {fieldState.error && (
                                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        {secondsLeft > 0 ? (
                                            <p>Time remaining: {formatTime(secondsLeft)}</p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={resendOtp}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="flex justify-between pt-4 gap-4">
                                <div/>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                    className="bg-[#00A651] text-white px-4 py-2 rounded-md w-full disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 - Personal Information */}
                    {step === 2 && (
                        <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-black font-medium mb-1">First Name</label>
                                    <Controller
                                        name="firstName"
                                        control={personalInfoForm.control}
                                        rules={{ required: 'First name is required' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Last Name</label>
                                    <Controller
                                        name="lastName"
                                        control={personalInfoForm.control}
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-black font-medium mb-1">Email Address</label>
                                <Controller
                                    name="email"
                                    control={personalInfoForm.control}
                                    rules={{
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <input
                                                type="email"
                                                {...field}
                                                className={`w-full px-3 py-2 border ${
                                                    fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                } rounded-md text-black`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block text-black font-medium mb-1">Phone Number</label>
                                <Controller
                                    name="phone"
                                    control={personalInfoForm.control}
                                    render={({ field }) => (
                                        <input
                                            type="tel"
                                            {...field}
                                            value={verifiedPhone}
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-gray-100"
                                        />
                                    )}
                                />
                                <p className="text-sm text-gray-500 mt-1">Phone number verified and cannot be changed</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-black font-medium mb-1">Password</label>
                                    <Controller
                                        name="password"
                                        control={personalInfoForm.control}
                                        rules={{
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters'
                                            },
                                            validate: {
                                                hasLowercase: value => /[a-z]/.test(value) || 'Must contain lowercase letter',
                                                hasUppercase: value => /[A-Z]/.test(value) || 'Must contain uppercase letter',
                                                hasNumber: value => /[0-9]/.test(value) || 'Must contain number'
                                            }
                                        }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input
                                                    type="password"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Confirm Password</label>
                                    <Controller
                                        name="confirmPassword"
                                        control={personalInfoForm.control}
                                        rules={{
                                            required: 'Please confirm your password',
                                            validate: value =>
                                                value === personalInfoForm.watch('password') || 'Passwords do not match'
                                        }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input
                                                    type="password"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4 gap-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-300 px-4 py-2 rounded-md w-full"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#00A651] text-white px-4 py-2 rounded-md w-full"
                                >
                                    Next Step
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 3 - Other Information (Same as before, just showing the submit button part) */}
                    {step === 3 && (
                        <form onSubmit={otherInfoForm.handleSubmit(handleOtherInfoSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-black font-medium mb-1">Address 1</label>
                                    <Controller
                                        name="address1"
                                        control={otherInfoForm.control}
                                        rules={{required: 'Address is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Address 2</label>
                                    <Controller
                                        name="address2"
                                        control={otherInfoForm.control}
                                        render={({field}) => (
                                            <input
                                                type="text"
                                                {...field}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Address 3</label>
                                    <Controller
                                        name="address3"
                                        control={otherInfoForm.control}
                                        render={({field}) => (
                                            <input
                                                type="text"
                                                {...field}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Address 4</label>
                                    <Controller
                                        name="address4"
                                        control={otherInfoForm.control}
                                        render={({field}) => (
                                            <input
                                                type="text"
                                                {...field}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">City</label>
                                    <Controller
                                        name="city"
                                        control={otherInfoForm.control}
                                        rules={{required: 'City is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">State</label>
                                    <Controller
                                        name="state"
                                        control={otherInfoForm.control}
                                        rules={{required: 'State is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Postal Code</label>
                                    <Controller
                                        name="postalCode"
                                        control={otherInfoForm.control}
                                        rules={{required: 'Postal code is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Country</label>
                                    <Controller
                                        name="country"
                                        control={otherInfoForm.control}
                                        rules={{required: 'Country is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <select
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                >
                                                    <option value="">Select Country</option>
                                                    {countries.map((country) => (
                                                        <option key={country.code} value={country.code}>
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <label className="block text-black font-medium mb-1">
                                        NID Number
                                    </label>
                                    <Controller
                                        name="nidNumber"
                                        control={otherInfoForm.control}
                                        rules={{required: "NID number is required"}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? "border-red-500" : "border-gray-300"
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {fieldState.error.message}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">
                                        Upload NID (Front Side)
                                    </label>
                                    <Controller
                                        name="identityCardFrontSide"
                                        control={otherInfoForm.control}
                                        rules={{required: "Front side is required"}}
                                        render={({field: {onChange}, fieldState}) => (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? "border-red-500" : "border-gray-300"
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload NID (Back Side)
                                    </label>
                                    <Controller
                                        name="identityCardBackSide"
                                        control={otherInfoForm.control}
                                        rules={{required: "Back side is required"}}
                                        render={({field: {onChange}, fieldState}) => (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? "border-red-500" : "border-gray-300"
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Trade License Number</label>
                                    <Controller
                                        name="tradeLicenseNumber"
                                        control={otherInfoForm.control}
                                        rules={{required: 'Trade license number is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Upload Trade License</label>
                                    <Controller
                                        name="tradeLicenseFile"
                                        control={otherInfoForm.control}
                                        rules={{required: 'Trade license file is required'}}
                                        render={({field: {onChange}, fieldState}) => (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">TIN Number</label>
                                    <Controller
                                        name="tinNumber"
                                        control={otherInfoForm.control}
                                        rules={{required: 'TIN number is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Upload TIN</label>
                                    <Controller
                                        name="tinFile"
                                        control={otherInfoForm.control}
                                        rules={{required: 'TIN file is required'}}
                                        render={({field: {onChange}, fieldState}) => (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload BIN Certificate
                                    </label>
                                    <Controller
                                        name="bincertificate"
                                        control={otherInfoForm.control}
                                        rules={{required: "BIN Certificate is required"}}
                                        render={({field: {onChange}, fieldState}) => (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? "border-red-500" : "border-gray-300"
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-medium mb-1">Tax Return Date</label>
                                    <Controller
                                        name="taxReturnDate"
                                        control={otherInfoForm.control}
                                        rules={{required: 'Tax return date is required'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <input
                                                    type="date"
                                                    {...field}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload Last Tax Return (Optional)
                                    </label>
                                    <Controller
                                        name="taxReturnFile"
                                        control={otherInfoForm.control}
                                        render={({field: {onChange}, fieldState}) => (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                    className={`w-full px-3 py-2 border ${
                                                        fieldState.error ? "border-red-500" : "border-gray-300"
                                                    } rounded-md text-black`}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload Joint Stock Registration Documents (Optional)
                                    </label>
                                    <Controller
                                        name="jointStockFile"
                                        control={otherInfoForm.control}
                                        render={({field: {onChange}}) => (
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload BTRC Registration (Optional)
                                    </label>
                                    <Controller
                                        name="btrcFile"
                                        control={otherInfoForm.control}
                                        render={({field: {onChange}}) => (
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload Photo (Optional)
                                    </label>
                                    <Controller
                                        name="photoFile"
                                        control={otherInfoForm.control}
                                        render={({field: {onChange}}) => (
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-black font-medium mb-1">
                                        Upload SLA (Optional)
                                    </label>
                                    <Controller
                                        name="slaFile"
                                        control={otherInfoForm.control}
                                        render={({field: {onChange}}) => (
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files?.[0] || null)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <Controller
                                name="termsAccepted"
                                control={otherInfoForm.control}
                                rules={{required: 'You must accept the terms and conditions'}}
                                render={({field, fieldState}) => (
                                    <>
                                        <label className="flex items-center mt-4">
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="mr-2 text-black"
                                            />
                                            <span className="text-black">Check our </span>
                                            <span
                                                className="text-[#00A651] ml-1 cursor-pointer">terms &amp; conditions</span>
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />

                            <div className="flex justify-between pt-4 gap-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-300 px-4 py-2 rounded-md w-full"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#00A651] text-white px-4 py-2 rounded-md w-full"
                                >
                                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}