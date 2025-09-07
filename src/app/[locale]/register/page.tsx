// 'use client'
//
// import React, { useEffect, useRef, useState } from 'react'
// import {Header} from "@/components/layout/Header";
//
// export default function RegisterPage() {
//   const [step, setStep] = useState<number>(1)
//
//   const [personalInfo, setPersonalInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   })
//
//   const [otherInfo, setOtherInfo] = useState({
//     address1: '',
//     address2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: '',
//     nidNumber: '',
//     tradeLicenseNumber: '',
//     tinNumber: '',
//     taxReturnDate: '',
//     nidFile: null as File | null,
//     tradeLicenseFile: null as File | null,
//     tinFile: null as File | null,
//     taxReturnFile: null as File | null,
//     jointStockFile: null as File | null,
//     btrcFile: null as File | null,
//     photoFile: null as File | null,
//     slaFile: null as File | null,
//     termsAccepted: false
//   })
//
//
//   const [otp, setOtp] = useState<string>('')
//
//   // OTP timer state
//   const [secondsLeft, setSecondsLeft] = useState<number>(60)
//   const intervalRef = useRef<number | null>(null)
//
//   // start timer helper
//   const startTimer = (initial = 60) => {
//     setSecondsLeft(initial)
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current)
//       intervalRef.current = null
//     }
//     intervalRef.current = window.setInterval(() => {
//       setSecondsLeft(prev => {
//         if (prev <= 1) {
//           if (intervalRef.current) {
//             clearInterval(intervalRef.current)
//             intervalRef.current = null
//           }
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000) as unknown as number
//   }
//
//   // On entering step 3, start the OTP timer
//   useEffect(() => {
//     if (step === 3) {
//       startTimer(60)
//     } else {
//       // clear timer if we leave step 3
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//         intervalRef.current = null
//       }
//     }
//
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//         intervalRef.current = null
//       }
//     }
//   }, [step])
//
//   // format mm:ss
//   const formatTime = (s: number) => {
//     const m = Math.floor(s / 60)
//     const sec = s % 60
//     const mm = m.toString().padStart(2, '0')
//     const ss = sec.toString().padStart(2, '0')
//     return `${mm}:${ss}`
//   }
//
//   const handleFileChange = (field: string, file: File | null) => {
//     setOtherInfo(prev => ({ ...prev, [field]: file }))
//   }
//
//   const handleNext = () => {
//     if (step < 3) setStep(prev => prev + 1)
//   }
//
//   const handleBack = () => {
//     if (step > 1) setStep(prev => prev - 1)
//   }
//
//   const resendOtp = () => {
//     // simulate OTP sending request
//     console.log('Resend OTP requested — simulate API call')
//     // restart timer
//     startTimer(60)
//   }
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//
//     if (step !== 3) {
//       // protect against accidental form submit on earlier steps
//       return
//     }
//
//     // Confirm / final submit (Confirm button triggers this)
//     // Here you'd call your API to verify OTP & create account
//     console.log('Final submit with data:', { personalInfo, otherInfo, otp })
//     alert('Submitted (simulate). Check console for payload.')
//   }
//
//   return (
//       <div className="min-h-screen bg-gray-50">
//         <Header/>
//         <div className="min-h-screen bg-gray-50 py-10">
//           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
//             {/* Title */}
//             <div className="text-center mb-8">
//               <h1 className="text-2xl font-bold text-black">
//                 {step === 1 && 'Create Your Account'}
//                 {step === 2 && 'Upload Your Documents'}
//                 {step === 3 && 'Confirm OTP Verification'}
//               </h1>
//               <p className="text-gray-600">Please provide your information to get started</p>
//             </div>
//
//             {/* Steps header (tabs) */}
//             <div className="flex border mb-6">
//               {['Personal Information', 'Other Information', 'Verification'].map((label, i) => (
//                   <div
//                       key={i}
//                       onClick={() => setStep(i + 1)}
//                       className={`flex-1 text-center py-3 border-r last:border-r-0 cursor-pointer ${
//                           step === i + 1 ? 'bg-gray-100 font-medium text-black' : 'bg-white text-black'
//                       }`}
//                   >
//                     {i + 1}. {label}
//                   </div>
//               ))}
//             </div>
//
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* STEP 1 */}
//               {step === 1 && (
//                   <>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-black font-medium mb-1">First Name</label>
//                         <input
//                             type="text"
//                             value={personalInfo.firstName}
//                             onChange={e => setPersonalInfo({...personalInfo, firstName: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                             required
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">Last Name</label>
//                         <input
//                             type="text"
//                             value={personalInfo.lastName}
//                             onChange={e => setPersonalInfo({...personalInfo, lastName: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                             required
//                         />
//                       </div>
//                     </div>
//
//                     <div>
//                       <label className="block text-black font-medium mb-1">Email Address</label>
//                       <input
//                           type="email"
//                           value={personalInfo.email}
//                           onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                           required
//                       />
//                     </div>
//
//                     <div>
//                       <label className="block text-black font-medium mb-1">Phone Number</label>
//                       <input
//                           type="tel"
//                           value={personalInfo.phone}
//                           onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})}
//                           placeholder="+880 1XXXXXXXXX"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                           required
//                       />
//                     </div>
//
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-black font-medium mb-1">Password</label>
//                         <input
//                             type="password"
//                             value={personalInfo.password}
//                             onChange={e => setPersonalInfo({...personalInfo, password: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                             required
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">Confirm Password</label>
//                         <input
//                             type="password"
//                             value={personalInfo.confirmPassword}
//                             onChange={e => setPersonalInfo({...personalInfo, confirmPassword: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                             required
//                         />
//                       </div>
//                     </div>
//                   </>
//               )}
//
//               {/* STEP 2 */}
//               {step === 2 && (
//                   <>
//                     {/* New Address Fields */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                       <div>
//                         <label className="block text-black font-medium mb-1">Address 1</label>
//                         <input
//                             type="text"
//                             value={otherInfo.address1 || ''}
//                             onChange={e => setOtherInfo({ ...otherInfo, address1: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Address 2</label>
//                         <input
//                             type="text"
//                             value={otherInfo.address2 || ''}
//                             onChange={e => setOtherInfo({ ...otherInfo, address2: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">City</label>
//                         <input
//                             type="text"
//                             value={otherInfo.city || ''}
//                             onChange={e => setOtherInfo({ ...otherInfo, city: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">State</label>
//                         <input
//                             type="text"
//                             value={otherInfo.state || ''}
//                             onChange={e => setOtherInfo({ ...otherInfo, state: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Postal Code</label>
//                         <input
//                             type="text"
//                             value={otherInfo.postalCode || ''}
//                             onChange={e => setOtherInfo({ ...otherInfo, postalCode: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Country</label>
//                         <input
//                             type="text"
//                             value={otherInfo.country || ''}
//                             onChange={e => setOtherInfo({ ...otherInfo, country: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                     </div>
//
//                     {/* Existing Fields */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-black font-medium mb-1">NID Number</label>
//                         <input
//                             type="text"
//                             value={otherInfo.nidNumber}
//                             onChange={e => setOtherInfo({ ...otherInfo, nidNumber: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload NID</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('nidFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">Trade License Number</label>
//                         <input
//                             type="text"
//                             value={otherInfo.tradeLicenseNumber}
//                             onChange={e => setOtherInfo({ ...otherInfo, tradeLicenseNumber: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload Trade License</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('tradeLicenseFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">TIN Number</label>
//                         <input
//                             type="text"
//                             value={otherInfo.tinNumber}
//                             onChange={e => setOtherInfo({ ...otherInfo, tinNumber: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload TIN</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('tinFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">Tax Return Date</label>
//                         <input
//                             type="date"
//                             value={otherInfo.taxReturnDate}
//                             onChange={e => setOtherInfo({ ...otherInfo, taxReturnDate: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload Last Tax Return</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('taxReturnFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload Joint Stock Registration Documents</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('jointStockFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload BTRC Registration</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('btrcFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload Photo</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('photoFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-black font-medium mb-1">Upload SLA</label>
//                         <input
//                             type="file"
//                             onChange={e => handleFileChange('slaFile', e.target.files?.[0] ?? null)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                         />
//                       </div>
//                     </div>
//
//                     <label className="flex items-center mt-4">
//                       <input
//                           type="checkbox"
//                           checked={otherInfo.termsAccepted}
//                           onChange={e => setOtherInfo({ ...otherInfo, termsAccepted: e.target.checked })}
//                           className="mr-2 text-black"
//                       />
//                       <span className="text-black">Check our </span>
//                       <span className="text-[#00A651] ml-1 cursor-pointer">terms &amp; conditions</span>
//                     </label>
//                   </>
//               )}
//
//
//               {/* STEP 3 (OTP) */}
//               {step === 3 && (
//                   <>
//                     <div>
//                       <label className="block text-black font-medium mb-1">Please provide verification code</label>
//                       <input
//                           type="text"
//                           value={otp}
//                           onChange={e => setOtp(e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//                       />
//                     </div>
//
//                     <div className="flex gap-4">
//                       {/* Confirm is the submit button for the form */}
//                       <button type="submit" className="flex-1 bg-[#00A651] text-white py-2 px-4 rounded-md">
//                         Confirm
//                       </button>
//
//                       {/* Send Again - shows timer while disabled */}
//                       <button
//                           type="button"
//                           onClick={() => {
//                             if (secondsLeft === 0) {
//                               resendOtp()
//                             }
//                           }}
//                           disabled={secondsLeft > 0}
//                           aria-disabled={secondsLeft > 0}
//                           className={`flex-1 text-white py-2 px-4 rounded-md ${
//                               secondsLeft > 0 ? 'bg-black/80 cursor-not-allowed' : 'bg-black'
//                           }`}
//                       >
//                         {secondsLeft > 0 ? `Send Again (${formatTime(secondsLeft)})` : 'Send Again'}
//                       </button>
//                     </div>
//                   </>
//               )}
//
//               {/* Navigation (only show on steps 1 & 2) */}
//               {step !== 3 && (
//                   <div className="flex justify-between pt-4 gap-4">
//                     {step > 1 ? (
//                         <button type="button" onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded-md w-full">
//                           Back
//                         </button>
//                     ) : (
//                         <div/>
//                     )}
//
//                     <button type="button" onClick={handleNext} className="bg-[#00A651] text-white px-4 py-2 rounded-md w-full">
//                       Next Step
//                     </button>
//                   </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//         )
//         }



'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Header } from "@/components/layout/Header"
import { createPartner, addPartnerDetails } from '@/lib/api-client/partner'

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

type OtpInfo = {
  otp: string
}

export default function RegisterPage() {
  const [step, setStep] = useState<number>(1)
  const [secondsLeft, setSecondsLeft] = useState<number>(60)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intervalRef = useRef<number | null>(null)

  // Form hooks for each step
  const personalInfoForm = useForm<PersonalInfo>({
    mode: 'onBlur'
  })

  const otherInfoForm = useForm<OtherInfo>({
    mode: 'onBlur'
  })

  const otpForm = useForm<OtpInfo>({
    mode: 'onBlur'
  })

  const { formState: { isValid: isPersonalInfoValid } } = personalInfoForm
  const { formState: { isValid: isOtherInfoValid } } = otherInfoForm

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

  // On entering step 3, start the OTP timer
  useEffect(() => {
    if (step === 3) {
      startTimer(60)
    } else {
      // clear timer if we leave step 3
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
  }, [step])

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
      const isValid = await personalInfoForm.trigger()
      if (isValid) setStep(prev => prev + 1)
    } else if (step === 2) {
      const isValid = await otherInfoForm.trigger()
      if (isValid) setStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1)
  }

  const resendOtp = () => {
    // simulate OTP sending request
    console.log('Resend OTP requested — simulate API call')
    // restart timer
    startTimer(60)
  }

  const handlePersonalInfoSubmit: SubmitHandler<PersonalInfo> =  (data) => {
    console.log('Personal info submitted:', data)

    setStep(2)
  }

  const handleOtherInfoSubmit: SubmitHandler<OtherInfo> = async (data) => {
    console.log("Other info submitted:", data);
    setIsSubmitting(true);

    try {
      // 1. Gather both form data
      const personalInfoData = personalInfoForm.getValues();
      const otherInfoData = otherInfoForm.getValues();
      console.log(otherInfoData)
      // 2. First call: create partner
      const partnerResponse = await createPartner({
        partnerName: `${personalInfoData.firstName} ${personalInfoData.lastName}`,
        telephone: personalInfoData.phone,
        email: personalInfoData.email,
        address1: otherInfoData.address1,
        address2: otherInfoData.address2 || "",
        city: otherInfoData.city,
        state: otherInfoData.state,
        postalCode: otherInfoData.postalCode,
        country: otherInfoData.country,
        alternateNameInvoice: "Invoice Name",
        alternateNameOther: "Other Name",
        vatRegistrationNo: otherInfoData.tinNumber || "N/A",
        invoiceAddress: otherInfoData.address1,
        customerPrePaid: 1,
        partnerType: 1,
        defaultCurrency: 1,
        callSrcId: 2,
      });

      console.log("Partner created:", partnerResponse);

      // 🔑 Extract partnerId (assuming backend returns something like idPartner)
      const idPartner = partnerResponse?.idPartner;
      if (!idPartner) {
        throw new Error("Partner ID missing in createPartner response");
      }

      // 3. Second call: add partner details
      const detailsResponse = await addPartnerDetails({
        partnerId: idPartner,
        doctype: "nid", // or pass dynamically
        phonenumber: personalInfoData.phone,
        email: personalInfoData.email,
        firstName: personalInfoData.firstName,
        lastName: personalInfoData.lastName,
        dob: "1995-01-01", // pick from form if you have it
        address1: otherInfoData.address1,
        address2: otherInfoData.address2,
        address3: otherInfoData.address3,
        address4: otherInfoData.address4,
        gender: "Male",
        // city: otherInfoData.city,
        // state: otherInfoData.state,
        // postalCode: otherInfoData.postalCode,
        countryCode: otherInfoData.country,
        docSerialNumber: otherInfoData.nidNumber,
        docexpirydate: otherInfoData.taxReturnDate,


        tradeliscense: otherInfoData.tradeLicenseFile ?? undefined,
        tincertificate: otherInfoData.tinFile ?? undefined,
        identityCardFrontSide:otherInfoData.identityCardFrontSide ?? undefined,
        identityCardBackSide:otherInfoData.identityCardBackSide ?? undefined,
        bincertificate:otherInfoData.bincertificate ?? undefined,
        taxReturnFile:otherInfoData.taxReturnFile ?? undefined,
        btrcFile:otherInfoData.btrcFile ?? undefined,
        jointStockFile:otherInfoData.jointStockFile ?? undefined,
        photoFile:otherInfoData.photoFile ?? undefined,
        slaFile:otherInfoData.slaFile ?? undefined,


        // add other files if provided
      });

      console.log("Partner details added:", detailsResponse);

      alert("Registration completed successfully!");
      setStep(3);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };









  const handleOtpSubmit: SubmitHandler<OtpInfo> = async (data) => {
    setIsSubmitting(true)
    try {
      // Step 1: Create partner
      // Show success message
      alert('Registration completed successfully!')

    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div className="min-h-screen bg-gray-50 py-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-black">
                {step === 1 && 'Create Your Account'}
                {step === 2 && 'Upload Your Documents'}
                {step === 3 && 'Confirm OTP Verification'}
              </h1>
              <p className="text-gray-600">Please provide your information to get started</p>
            </div>

            {/* Steps header (tabs) */}
            <div className="flex border mb-6">
              {['Personal Information', 'Other Information', 'Verification'].map((label, i) => (
                  <div
                      key={i}
                      onClick={() => {
                        if (i === 0 || (i === 1 && isPersonalInfoValid) || (i === 2 && isPersonalInfoValid && isOtherInfoValid)) {
                          setStep(i + 1)
                        }
                      }}
                      className={`flex-1 text-center py-3 border-r last:border-r-0 cursor-pointer ${
                          step === i + 1 ? 'bg-gray-100 font-medium text-black' : 'bg-white text-black'
                      } ${
                          (i === 1 && !isPersonalInfoValid) || (i === 2 && (!isPersonalInfoValid || !isOtherInfoValid))
                              ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {i + 1}. {label}
                  </div>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
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
                    <div/>
                    <button
                        type="submit"
                        className="bg-[#00A651] text-white px-4 py-2 rounded-md w-full"
                    >
                      Next Step
                    </button>
                  </div>
                </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
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
                          // 👇 removed "rules" so it's optional
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
                              <span className="text-[#00A651] ml-1 cursor-pointer">terms &amp; conditions</span>
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
                        className="bg-[#00A651] text-white px-4 py-2 rounded-md w-full"
                    >
                      Next Step
                    </button>
                  </div>
                </form>
            )}

            {/* STEP 3 (OTP) */}
            {step === 3 && (
                <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-black font-medium mb-1">Please provide verification code</label>
                    <Controller
                        name="otp"
                        control={otpForm.control}
                        rules={{
                          required: 'OTP is required',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'OTP must be 6 digits'
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

                  <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-[#00A651] text-white py-2 px-4 rounded-md"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                          if (secondsLeft === 0) {
                            resendOtp()
                          }
                        }}
                        disabled={secondsLeft > 0 || isSubmitting}
                        aria-disabled={secondsLeft > 0 || isSubmitting}
                        className={`flex-1 text-white py-2 px-4 rounded-md ${
                            secondsLeft > 0 ? 'bg-black/80 cursor-not-allowed' : 'bg-black'
                        }`}
                    >
                      {secondsLeft > 0 ? `Send Again (${formatTime(secondsLeft)})` : 'Send Again'}
                    </button>
                  </div>
                </form>
            )}
          </div>
        </div>
      </div>
  )
}