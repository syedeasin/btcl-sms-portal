

// 'use client'
//
// import { useEffect, useState } from 'react'
// import { Eye, EyeOff, Copy, Check, ExternalLink, Package, CheckCircle, XCircle, Download, Loader2 } from 'lucide-react'
// import {Header} from "@/components/layout/Header";
//
// // Mock packages data
// const packages = [
//   {
//     id: 'small',
//     name: 'Small Business',
//     sms: 20000,
//     rate: 0.32,
//     validity: 30,
//     features: ['Basic API Access', 'Email Support', 'Standard Delivery', 'Basic Reports', 'Single Sender ID']
//   },
//   {
//     id: 'medium',
//     name: 'Medium Business',
//     sms: 50000,
//     rate: 0.30,
//     validity: 60,
//     features: ['Advanced API', 'Priority Support', 'Fast Delivery', 'Custom Sender ID', 'Detailed Analytics', 'Multiple Projects']
//   },
//   {
//     id: 'large',
//     name: 'Large Business',
//     sms: 100000,
//     rate: 0.28,
//     validity: 90,
//     features: ['Premium API', '24/7 Phone Support', 'Instant Delivery', 'Multiple Sender IDs', 'Advanced Analytics', 'Dedicated Manager', 'Priority Routing']
//   }
// ]
//
// interface PartnerExtra {
//   partnerId: number
//   address1: string
//   address2?: string
//   address3?: string
//   address4?: string
//   city: string
//   state: string
//   postalCode: string
//   nid: string
//   tradeLicenseNumber: string
//   tin: string
//   taxReturnDate: string
//   countryCode: string
//   tinCertificateAvailable: boolean
//   nidFrontAvailable: boolean
//   nidBackAvailable: boolean
//   vatDocAvailable: boolean
//   tradeLicenseAvailable: boolean
//   photoAvailable: boolean
//   binCertificateAvailable: boolean
//   slaAvailable: boolean
//   btrcRegistrationAvailable: boolean
//   lastTaxReturnAvailable: boolean
//   uploadedBy: string
//   uploadedAt: string
// }
//
// interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   password: string
//   partnerId: number
// }
//  interface PackagePurchase {
//   id: number | null;
//   idPackagePurchase: number | null;
//   name: string;
//   lastAmount: number;
//   balanceBefore: number;
//   balanceAfter: number;
//   uom: string;
//   packageId: number;
//   quantity: number;
//   selected: boolean;
// }
//
// export default function Dashboard() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [copiedField, setCopiedField] = useState<string | null>(null)
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [partnerExtra, setPartnerExtra] = useState<PartnerExtra | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [accountStatus, setAccountStatus] = useState('active')
//   const [currentPackage, setCurrentPackage] = useState(packages[1])
//   const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null)
// const [purchaseForPartner,setPurchaseForPartner] =  useState<PackagePurchase | null>(null)
//   const bulkSmsPortalUrl = 'https://a2psms.btcliptelephony.gov.bd:4000/'
//   const API_BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST'
// const partnerID = localStorage.getItem('partnerId')
//   console.log("purchaseForPartner",purchaseForPartner)
//
//   useEffect(() => {
//     fetchUserData(),
//     fetchPurchaseForPartner(Number(partnerID))
//   }, [])
//
//   const fetchUserData = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//
//       // Get user basic info from localStorage
//       const email = localStorage.getItem('userEmail') || ''
//       const password = localStorage.getItem('userPassword') || ''
//       const storedUserData = localStorage.getItem('registrationData')
//
//       let basicUserData: UserData
//
//       if (storedUserData) {
//         const parsedData = JSON.parse(storedUserData)
//         basicUserData = {
//           firstName: parsedData.firstName ,
//           lastName: parsedData.lastName ,
//           email: parsedData.email ,
//           phone: parsedData.phone ,
//           password: parsedData.password,
//           partnerId: parsedData.partnerId
//         }
//       }
//       else {
//         // Fallback mock data
//         basicUserData = {
//           firstName: 'John',
//           lastName: 'Doe',
//           email: email || 'john.doe@example.com',
//           phone: '+880 1712345678',
//           password: password || '********',
//           partnerId: 123 // This should come from your login API
//         }
//       }
//
//       setUserData(basicUserData)
//
//       // Fetch partner extra data from API
//       if (partnerID) {
//         await fetchPartnerExtra(Number(partnerID))
//       }
//     } catch (err) {
//       console.error('Error fetching user data:', err)
//       setError('Failed to load user data')
//     } finally {
//       setLoading(false)
//     }
//   }
//
//   const fetchPartnerExtra = async (partnerId: number) => {
//     try {
//       const authToken = localStorage.getItem('authToken')
//
//       const response = await fetch(`${API_BASE_URL}/partner/get-partner-extra`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`
//         },
//         body: JSON.stringify({ id: partnerId })
//       })
//
//       if (!response.ok) {
//         throw new Error('Failed to fetch partner data')
//       }
//
//       const data: PartnerExtra = await response.json()
//
//       setPartnerExtra(data)
//     } catch (err) {
//       console.error('Error fetching partner extra:', err)
//     }
//   }
//
//
//
//   const fetchPurchaseForPartner = async (partnerId: number) => {
//     try {
//       const authToken = localStorage.getItem('authToken')
//
//       const response = await fetch(`${API_BASE_URL}/package/getPurchaseForPartner`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ idPartner: partnerId }),
//       })
//
//       if (!response.ok) {
//         throw new Error('Failed to fetch partner data')
//       }
//
//       const data = await response.json()
//
//       setPurchaseForPartner(data)
//     } catch (err) {
//       console.error('Error fetching partner extra:', err)
//     }
//   }
//
//
//   const activePackageInfo = ({packageArr}: { packageArr: any }) => {
//     const activePackageInfo = packageArr[0]?.packageAccounts[0];
//     // @ts-ignore
//     const packageDetails = {
//       purchased: activePackageInfo?.quantity ?? null,
//       used: activePackageInfo?.balanceAfter - activePackageInfo?.quantity ?? null,
//       remaining: activePackageInfo?.balanceAfter ?? null,
//       purchaseDate: packageArr[0]?.purchaseDate ?? null,
//       expireDate: packageArr[0]?.expireDate ?? null,
//     };
//     return packageDetails;
//   };
//
//
//   const downloadDocument = async (documentType: string, documentName: string) => {
//     if (!partnerID) return
//
//     try {
//       setDownloadingDoc(documentType)
//       const authToken = localStorage.getItem('authToken')
//
//       const response = await fetch(`${API_BASE_URL}/partner/get-partner-document`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`
//         },
//         body: JSON.stringify({
//           idPartner:  +partnerID,
//           documentType: documentType
//         })
//       })
//
//       if (!response.ok) {
//         throw new Error('Failed to download document')
//       }
//
//       // Get the blob from response
//       const blob = await response.blob()
//
//       // Create a download link
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = documentName
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)
//     } catch (err) {
//       console.error('Error downloading document:', err)
//       alert('Failed to download document. Please try again.')
//     } finally {
//       setDownloadingDoc(null)
//     }
//   }
//
//   const copyToClipboard = async (text: string, field: string) => {
//     try {
//       await navigator.clipboard.writeText(text)
//       setCopiedField(field)
//       setTimeout(() => setCopiedField(null), 2000)
//     } catch (err) {
//       console.error('Failed to copy:', err)
//     }
//   }
//
//   const calculateTotal = (sms: number, rate: number) => {
//     return (sms * rate).toFixed(2)
//   }
//
//   if (loading) {
//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" />
//             <p className="text-gray-600">Loading dashboard...</p>
//           </div>
//         </div>
//     )
//   }
//
//   if (error || !userData) {
//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center bg-white p-8 rounded-xl shadow-md">
//             <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
//             <p className="text-gray-600 mb-4">{error || 'Failed to load user data'}</p>
//             <button
//                 onClick={fetchUserData}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//     )
//   }
//
//   const documents = [
//     { type: 'tradelicense', name: 'Trade License', available: partnerExtra?.tradeLicenseAvailable },
//     { type: 'tin', name: 'TIN Certificate', available: partnerExtra?.tinCertificateAvailable },
//     { type: 'taxreturn', name: 'Tax Return', available: partnerExtra?.lastTaxReturnAvailable },
//     { type: 'nidfront', name: 'NID Front Side', available: partnerExtra?.nidFrontAvailable },
//     { type: 'nidback', name: 'NID Back Side', available: partnerExtra?.nidBackAvailable },
//     { type: 'bin', name: 'BIN Certificate', available: partnerExtra?.binCertificateAvailable },
//     { type: 'vat', name: 'VAT Document', available: partnerExtra?.vatDocAvailable },
//     { type: 'btrc', name: 'BTRC Registration', available: partnerExtra?.btrcRegistrationAvailable },
//     { type: 'photo', name: 'Photo', available: partnerExtra?.photoAvailable },
//     { type: 'sla', name: 'SLA Document', available: partnerExtra?.slaAvailable }
//   ]
//
//   return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <Header/>
//
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Welcome Section */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               Welcome back, {userData.firstName} {userData.lastName}!
//             </h2>
//             <p className="text-gray-600">Here's an overview of your SMS account</p>
//           </div>
//
//           {/* Bulk SMS Portal Link */}
//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-white text-xl font-semibold mb-2">Bulk SMS Portal</h3>
//                 <p className="text-green-100 text-sm">Access the portal to send SMS messages</p>
//               </div>
//               <a
//                   href={bulkSmsPortalUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 SMS Admin Dashboard
//                 <ExternalLink className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//
//           {/* Account Status & Current Package */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
//                 {accountStatus === 'active' ? (
//                     <CheckCircle className="w-6 h-6 text-green-500" />
//                 ) : (
//                     <XCircle className="w-6 h-6 text-red-500" />
//                 )}
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                     accountStatus === 'active'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-red-100 text-red-700'
//                 }`}>
//                   {accountStatus === 'active' ? 'Active' : 'Inactive'}
//                 </div>
//               </div>
//               <p className="text-gray-600 text-sm mt-4">
//                 {accountStatus === 'active'
//                     ? 'Your account is active and ready to send SMS'
//                     : 'Please contact support to activate your account'}
//               </p>
//             </div>
//
//             <div className="bg-white rounded-xl shadow-md p-6">
//
//
//
//
//                 {purchaseForPartner?.map((pkg, index) => (
//                     <div
//                         key={index}
//
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           Current Package
//                         </h3>
//                         <Package className="w-6 h-6 text-green-600"/>
//                       </div>
//
//                       <div className="space-y-2">
//
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">purchased:</span>
//                           <span className="font-semibold text-gray-900">
//                 {pkg.quantity.toLocaleString()}
//               </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">used:</span>
//                           <span className="font-semibold text-gray-900">
//                 {pkg.quantity - pkg?.balanceAfter}
//               </span>
//                         </div>
//
//
//
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Balance Before:</span>
//                           <span className="font-semibold text-gray-900">
//                 {pkg.balanceBefore.toLocaleString()}
//               </span>
//                         </div>
//
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">After Balance:</span>
//                           <span className="font-semibold text-gray-900 text-green-600">
//                 {pkg.balanceAfter.toLocaleString()}
//               </span>
//                         </div>
//
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Last Amount:</span>
//                           <span className="font-semibold text-gray-900">
//                 {pkg.lastAmount.toLocaleString()}
//               </span>
//                         </div>
//
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">UOM:</span>
//                           <span className="font-semibold text-gray-900">{pkg.uom}</span>
//                         </div>
//                       </div>
//                     </div>
//                 ))}
//             </div>
//           </div>
//
//           {/* API Credentials */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">Portal Credentials</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Username (Email)</label>
//                 <div className="flex items-center gap-2">
//                   <div
//                       className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
//                     {userData.email}
//                   </div>
//                   <button
//                       onClick={() => copyToClipboard(userData.email, 'email')}
//                       className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                   >
//                     {copiedField === 'email' ? (
//                         <Check className="w-5 h-5 text-green-600"/>
//                     ) : (
//                         <Copy className="w-5 h-5 text-gray-600"/>
//                     )}
//                   </button>
//                 </div>
//               </div>
//
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                 <div className="flex items-center gap-2">
//                   <div
//                       className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
//                     {showPassword ? userData.password : '••••••••••••'}
//                   </div>
//                   <button
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                   >
//                     {showPassword ? (
//                         <EyeOff className="w-5 h-5 text-gray-600"/>
//                     ) : (
//                         <Eye className="w-5 h-5 text-gray-600"/>
//                     )}
//                   </button>
//                   <button
//                       onClick={() => copyToClipboard(userData.password, 'password')}
//                       className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                   >
//                     {copiedField === 'password' ? (
//                         <Check className="w-5 h-5 text-green-600"/>
//                     ) : (
//                         <Copy className="w-5 h-5 text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
//                 <div className="flex">
//                   <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   <p className="ml-3 text-sm text-blue-700">
//                     Keep your credentials secure. Never share your password with anyone.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//
//           {/* Personal Information */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <p className="text-gray-900 font-medium">{userData.firstName} {userData.lastName}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                 <p className="text-gray-900 font-medium">{userData.phone}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                 <p className="text-gray-900 font-medium">{userData.email}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
//                 <p className="text-gray-900 font-medium">{partnerExtra?.nid || 'N/A'}</p>
//               </div>
//             </div>
//           </div>
//
//           {/* Address Information */}
//           {partnerExtra && (
//               <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
//                     <p className="text-gray-900">{partnerExtra.address1}</p>
//                   </div>
//                   {partnerExtra.address2 && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
//                         <p className="text-gray-900">{partnerExtra.address2}</p>
//                       </div>
//                   )}
//                   {partnerExtra.address3 && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 3</label>
//                         <p className="text-gray-900">{partnerExtra.address3}</p>
//                       </div>
//                   )}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                     <p className="text-gray-900">{partnerExtra.city}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">State/Division</label>
//                     <p className="text-gray-900">{partnerExtra.state}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
//                     <p className="text-gray-900">{partnerExtra.postalCode}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                     <p className="text-gray-900">{partnerExtra.countryCode === 'BD' ? 'Bangladesh' : partnerExtra.countryCode}</p>
//                   </div>
//                 </div>
//               </div>
//           )}
//
//           {/* Business Information */}
//           {partnerExtra && (
//               <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Trade License Number</label>
//                     <p className="text-gray-900 font-medium">{partnerExtra.tradeLicenseNumber}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">TIN Number</label>
//                     <p className="text-gray-900 font-medium">{partnerExtra.tin}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Tax Return Date</label>
//                     <p className="text-gray-900 font-medium">
//                       {new Date(partnerExtra.taxReturnDate).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Uploaded By</label>
//                     <p className="text-gray-900 font-medium">{partnerExtra.uploadedBy}</p>
//                   </div>
//                 </div>
//
//                 {/* Uploaded Documents */}
//                 <div className="border-t pt-6">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {documents.map((doc) => (
//
//                             <div key={doc.type} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
//                               <div className="flex items-center justify-between mb-2">
//                                 <span className="text-sm font-medium text-gray-700">{doc.name}</span>
//                                 <CheckCircle className="w-5 h-5 text-green-600" />
//                               </div>
//                               <button
//                                   onClick={() => downloadDocument(doc.type, `${doc.name}.pdf`)}
//                                   disabled={downloadingDoc === doc.type}
//                                   className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
//                               >
//                                 {downloadingDoc === doc.type ? (
//                                     <>
//                                       <Loader2 className="w-4 h-4 animate-spin" />
//                                       Downloading...
//                                     </>
//                                 ) : (
//                                     <>
//                                       <Download className="w-4 h-4" />
//                                       Download
//                                     </>
//                                 )}
//                               </button>
//                             </div>
//
//                     ))}
//                   </div>
//                 </div>
//               </div>
//           )}
//         </div>
//       </div>
//   )
// }







'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Copy, Check, ExternalLink, Package, CheckCircle, XCircle, Download, Loader2 } from 'lucide-react'
import {Header} from "@/components/layout/Header";

// Mock packages data
const packages = [
  {
    id: 'small',
    name: 'Small Business',
    sms: 20000,
    rate: 0.32,
    validity: 30,
    features: ['Basic API Access', 'Email Support', 'Standard Delivery', 'Basic Reports', 'Single Sender ID']
  },
  {
    id: 'medium',
    name: 'Medium Business',
    sms: 50000,
    rate: 0.30,
    validity: 60,
    features: ['Advanced API', 'Priority Support', 'Fast Delivery', 'Custom Sender ID', 'Detailed Analytics', 'Multiple Projects']
  },
  {
    id: 'large',
    name: 'Large Business',
    sms: 100000,
    rate: 0.28,
    validity: 90,
    features: ['Premium API', '24/7 Phone Support', 'Instant Delivery', 'Multiple Sender IDs', 'Advanced Analytics', 'Dedicated Manager', 'Priority Routing']
  }
]

interface PartnerExtra {
  partnerId: number
  address1: string
  address2?: string
  address3?: string
  address4?: string
  city: string
  state: string
  postalCode: string
  nid: string
  tradeLicenseNumber: string
  tin: string
  taxReturnDate: string
  countryCode: string
  tinCertificateAvailable: boolean
  nidFrontAvailable: boolean
  nidBackAvailable: boolean
  vatDocAvailable: boolean
  tradeLicenseAvailable: boolean
  photoAvailable: boolean
  binCertificateAvailable: boolean
  slaAvailable: boolean
  btrcRegistrationAvailable: boolean
  lastTaxReturnAvailable: boolean
  uploadedBy: string
  uploadedAt: string
}

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  partnerId: number
}

interface PackageAccount {
  id: number | null
  idPackagePurchase: number | null
  name: string
  lastAmount: number
  balanceBefore: number
  balanceAfter: number
  uom: string
  packageId: number
  quantity: number
  selected: boolean
}

interface PurchaseForPartner {
  purchaseDate: string | null
  expireDate: string | null
  packageAccounts: PackageAccount[]
}

interface ActivePackageDetails {
  purchased: number | null
  used: number | null
  remaining: number | null
  purchaseDate: string | null
  expireDate: string | null
}

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [partnerExtra, setPartnerExtra] = useState<PartnerExtra | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accountStatus, setAccountStatus] = useState('active')
  const [currentPackage, setCurrentPackage] = useState(packages[1])
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null)
  const [purchaseForPartner, setPurchaseForPartner] = useState<PurchaseForPartner | null>(null)

  const bulkSmsPortalUrl = 'https://a2psms.btcliptelephony.gov.bd:4000/'
  const API_BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST'
  const partnerID = localStorage.getItem('partnerId')

  console.log("purchaseForPartner", purchaseForPartner)

  useEffect(() => {
    fetchUserData()
    fetchPurchaseForPartner(Number(partnerID))
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get user basic info from localStorage
      const email = localStorage.getItem('userEmail') || ''
      const password = localStorage.getItem('userPassword') || ''
      const storedUserData = localStorage.getItem('registrationData')

      let basicUserData: UserData

      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData)
        basicUserData = {
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          email: parsedData.email,
          phone: parsedData.phone,
          password: parsedData.password,
          partnerId: parsedData.partnerId
        }
      } else {
        // Fallback mock data
        basicUserData = {
          firstName: 'John',
          lastName: 'Doe',
          email: email || 'john.doe@example.com',
          phone: '+880 1712345678',
          password: password || '********',
          partnerId: 123
        }
      }

      setUserData(basicUserData)

      // Fetch partner extra data from API
      if (partnerID) {
        await fetchPartnerExtra(Number(partnerID))
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const fetchPartnerExtra = async (partnerId: number) => {
    try {
      const authToken = localStorage.getItem('authToken')

      const response = await fetch(`${API_BASE_URL}/partner/get-partner-extra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ id: partnerId })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch partner data')
      }

      const data: PartnerExtra = await response.json()
      setPartnerExtra(data)
    } catch (err) {
      console.error('Error fetching partner extra:', err)
    }
  }

  const fetchPurchaseForPartner = async (partnerId: number) => {
    try {
      const authToken = localStorage.getItem('authToken')

      const response = await fetch(`${API_BASE_URL}/package/getPurchaseForPartner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ idPartner: partnerId }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch partner data')
      }

      const data = await response.json()

      // Extract packageAccounts and dates from first item
      if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0]
        setPurchaseForPartner({
          packageAccounts: firstItem.packageAccounts || [],
          purchaseDate: firstItem.purchaseDate ?? null,
          expireDate: firstItem.expireDate ?? null
        })
      } else {
        setPurchaseForPartner({
          packageAccounts: [],
          purchaseDate: null,
          expireDate: null
        })
      }
    } catch (err) {
      console.error('Error fetching partner extra:', err)
    }
  }

  const activePackageInfo = (packageData: PurchaseForPartner | null): ActivePackageDetails => {
    if (!packageData || !packageData.packageAccounts || packageData.packageAccounts.length === 0) {
      return {
        purchased: null,
        used: null,
        remaining: null,
        purchaseDate: null,
        expireDate: null,
      }
    }

    const activePackageAccount = packageData.packageAccounts[0]

    return {
      purchased: activePackageAccount?.quantity ?? null,
      used: activePackageAccount ? (activePackageAccount.quantity - activePackageAccount.balanceAfter) : null,
      remaining: activePackageAccount?.balanceAfter ?? null,
      purchaseDate: packageData.purchaseDate ?? null,
      expireDate: packageData.expireDate ?? null,
    }
  }

  const downloadDocument = async (documentType: string, documentName: string) => {
    if (!partnerID) return

    try {
      setDownloadingDoc(documentType)
      const authToken = localStorage.getItem('authToken')

      const response = await fetch(`${API_BASE_URL}/partner/get-partner-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          idPartner: +partnerID,
          documentType: documentType
        })
      })

      if (!response.ok) {
        throw new Error('Failed to download document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = documentName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Error downloading document:', err)
      alert('Failed to download document. Please try again.')
    } finally {
      setDownloadingDoc(null)
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const calculateTotal = (sms: number, rate: number) => {
    return (sms * rate).toFixed(2)
  }

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
    )
  }

  if (error || !userData) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-600 mb-4">{error || 'Failed to load user data'}</p>
            <button
                onClick={fetchUserData}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
    )
  }

  const documents = [
    { type: 'tradelicense', name: 'Trade License', available: partnerExtra?.tradeLicenseAvailable },
    { type: 'tin', name: 'TIN Certificate', available: partnerExtra?.tinCertificateAvailable },
    { type: 'taxreturn', name: 'Tax Return', available: partnerExtra?.lastTaxReturnAvailable },
    { type: 'nidfront', name: 'NID Front Side', available: partnerExtra?.nidFrontAvailable },
    { type: 'nidback', name: 'NID Back Side', available: partnerExtra?.nidBackAvailable },
    { type: 'bin', name: 'BIN Certificate', available: partnerExtra?.binCertificateAvailable },
    { type: 'vat', name: 'VAT Document', available: partnerExtra?.vatDocAvailable },
    { type: 'btrc', name: 'BTRC Registration', available: partnerExtra?.btrcRegistrationAvailable },
    { type: 'photo', name: 'Photo', available: partnerExtra?.photoAvailable },
    { type: 'sla', name: 'SLA Document', available: partnerExtra?.slaAvailable }
  ]

  // Get active package details
  const packageDetails = activePackageInfo(purchaseForPartner)

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData.firstName} {userData.lastName}!
            </h2>
            <p className="text-gray-600">Here's an overview of your SMS account</p>
          </div>

          {/* Bulk SMS Portal Link */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-semibold mb-2">Bulk SMS Portal</h3>
                <p className="text-green-100 text-sm">Access the portal to send SMS messages</p>
              </div>
              <a
                  href={bulkSmsPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                SMS Admin Dashboard
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Account Status & Current Package */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
                {accountStatus === 'active' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    accountStatus === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                }`}>
                  {accountStatus === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                {accountStatus === 'active'
                    ? 'Your account is active and ready to send SMS'
                    : 'Please contact support to activate your account'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Package</h3>
                <Package className="w-6 h-6 text-green-600" />
              </div>

              {packageDetails.purchased !== null ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Purchased:</span>
                      <span className="font-semibold text-gray-900">
                    {packageDetails.purchased.toLocaleString()}
                  </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Used:</span>
                      <span className="font-semibold text-gray-900">
                    {packageDetails.used?.toLocaleString() ?? 'N/A'}
                  </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-semibold text-green-600">
                    {packageDetails.remaining?.toLocaleString() ?? 'N/A'}
                  </span>
                    </div>

                    {packageDetails.purchaseDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Purchase Date:</span>
                          <span className="font-semibold text-gray-900">
                      {new Date(packageDetails.purchaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                        </div>
                    )}

                    {packageDetails.expireDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Expire Date:</span>
                          <span className="font-semibold text-gray-900">
                      {new Date(packageDetails.expireDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                        </div>
                    )}
                  </div>
              ) : (
                  <p className="text-gray-500 text-sm">No active package found</p>
              )}
            </div>
          </div>

          {/* API Credentials */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Portal Credentials</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username (Email)</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
                    {userData.email}
                  </div>
                  <button
                      onClick={() => copyToClipboard(userData.email, 'email')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copiedField === 'email' ? (
                        <Check className="w-5 h-5 text-green-600" />
                    ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
                    {showPassword ? userData.password : '••••••••••••'}
                  </div>
                  <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Eye className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <button
                      onClick={() => copyToClipboard(userData.password, 'password')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copiedField === 'password' ? (
                        <Check className="w-5 h-5 text-green-600" />
                    ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-3 text-sm text-blue-700">
                    Keep your credentials secure. Never share your password with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900 font-medium">{userData.firstName} {userData.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <p className="text-gray-900 font-medium">{userData.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <p className="text-gray-900 font-medium">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
                <p className="text-gray-900 font-medium">{partnerExtra?.nid || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          {partnerExtra && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <p className="text-gray-900">{partnerExtra.address1}</p>
                  </div>
                  {partnerExtra.address2 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                        <p className="text-gray-900">{partnerExtra.address2}</p>
                      </div>
                  )}
                  {partnerExtra.address3 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 3</label>
                        <p className="text-gray-900">{partnerExtra.address3}</p>
                      </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <p className="text-gray-900">{partnerExtra.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Division</label>
                    <p className="text-gray-900">{partnerExtra.state}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <p className="text-gray-900">{partnerExtra.postalCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <p className="text-gray-900">{partnerExtra.countryCode === 'BD' ? 'Bangladesh' : partnerExtra.countryCode}</p>
                  </div>
                </div>
              </div>
          )}

          {/* Business Information */}
          {partnerExtra && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trade License Number</label>
                    <p className="text-gray-900 font-medium">{partnerExtra.tradeLicenseNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TIN Number</label>
                    <p className="text-gray-900 font-medium">{partnerExtra.tin}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Return Date</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(partnerExtra.taxReturnDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Uploaded By</label>
                    <p className="text-gray-900 font-medium">{partnerExtra.uploadedBy}</p>
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.type} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{doc.name}</span>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <button
                              onClick={() => downloadDocument(doc.type, `${doc.name}.pdf`)}
                              disabled={downloadingDoc === doc.type}
                              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
                          >
                            {downloadingDoc === doc.type ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Downloading...
                                </>
                            ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  Download
                                </>
                            )}
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  )
}