'use client';

import { Header } from '@/components/layout/Header';
import {
  Check,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Maximize2,
  Package,
  RotateCw,
  X,
  XCircle,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock packages data
const packages = [
  {
    id: 'small',
    name: 'Small Business',
    sms: 20000,
    rate: 0.32,
    validity: 30,
    features: [
      'Basic API Access',
      'Email Support',
      'Standard Delivery',
      'Basic Reports',
      'Single Sender ID',
    ],
  },
  {
    id: 'medium',
    name: 'Medium Business',
    sms: 50000,
    rate: 0.3,
    validity: 60,
    features: [
      'Advanced API',
      'Priority Support',
      'Fast Delivery',
      'Custom Sender ID',
      'Detailed Analytics',
      'Multiple Projects',
    ],
  },
  {
    id: 'large',
    name: 'Large Business',
    sms: 100000,
    rate: 0.28,
    validity: 90,
    features: [
      'Premium API',
      '24/7 Phone Support',
      'Instant Delivery',
      'Multiple Sender IDs',
      'Advanced Analytics',
      'Dedicated Manager',
      'Priority Routing',
    ],
  },
];

interface PartnerExtra {
  partnerId: number;
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
  city: string;
  state: string;
  postalCode: string;
  nid: string;
  tradeLicenseNumber: string;
  tin: string;
  taxReturnDate: string;
  countryCode: string;
  tinCertificateAvailable: boolean;
  nidFrontAvailable: boolean;
  nidBackAvailable: boolean;
  vatDocAvailable: boolean;
  tradeLicenseAvailable: boolean;
  photoAvailable: boolean;
  binCertificateAvailable: boolean;
  slaAvailable: boolean;
  btrcRegistrationAvailable: boolean;
  lastTaxReturnAvailable: boolean;
  uploadedBy: string;
  uploadedAt: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  partnerId: number;
}

interface PackageAccount {
  id: number | null;
  idPackagePurchase: number | null;
  name: string;
  lastAmount: number;
  balanceBefore: number;
  balanceAfter: number;
  uom: string;
  packageId: number;
  quantity: number;
  selected: boolean;
}

interface PurchaseForPartner {
  purchaseDate: string | null;
  expireDate: string | null;
  packageAccounts: PackageAccount[];
}

interface ActivePackageDetails {
  purchased: number | null;
  used: number | null;
  remaining: number | null;
  purchaseDate: string | null;
  expireDate: string | null;
}

// Image Viewer Modal Component
const ImageViewerModal = ({
  imageUrl,
  imageName,
  onClose,
}: {
  imageUrl: string;
  imageName: string;
  onClose: () => void;
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">{imageName}</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <button
            onClick={handleZoomOut}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all backdrop-blur-sm"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
            {Math.round(zoom * 100)}%
          </div>

          <button
            onClick={handleZoomIn}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all backdrop-blur-sm"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <div className="w-px h-8 bg-white/30 mx-2" />

          <button
            onClick={handleRotate}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all backdrop-blur-sm"
            title="Rotate"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          <button
            onClick={handleReset}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all backdrop-blur-sm"
            title="Reset"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        className="flex items-center justify-center w-full h-full p-20 cursor-move"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <img
          src={imageUrl}
          alt={imageName}
          className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [partnerExtra, setPartnerExtra] = useState<PartnerExtra | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState('active');
  const [currentPackage, setCurrentPackage] = useState(packages[1]);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);
  const [purchaseForPartner, setPurchaseForPartner] =
    useState<PurchaseForPartner | null>(null);
  const [imageViewerData, setImageViewerData] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const bulkSmsPortalUrl = 'https://a2psms.btcliptelephony.gov.bd:4000/';
  const API_BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST';
  const partnerID = localStorage.getItem('partnerId');

  console.log('purchaseForPartner', purchaseForPartner);

  useEffect(() => {
    fetchUserData();
    fetchPurchaseForPartner(Number(partnerID));
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const email = localStorage.getItem('userEmail') || '';
      const password = localStorage.getItem('userPassword') || '';
      const storedUserData = localStorage.getItem('registrationData');

      let basicUserData: UserData;

      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        basicUserData = {
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          email: parsedData.email,
          phone: parsedData.phone,
          password: parsedData.password,
          partnerId: parsedData.partnerId,
        };
      } else {
        basicUserData = {
          firstName: 'John',
          lastName: 'Doe',
          email: email || 'john.doe@example.com',
          phone: '+880 1712345678',
          password: password || '********',
          partnerId: 123,
        };
      }

      setUserData(basicUserData);

      if (partnerID) {
        await fetchPartnerExtra(Number(partnerID));
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPartnerExtra = async (partnerId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/partner/get-partner-extra`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ id: partnerId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch partner data');
      }

      const data: PartnerExtra = await response.json();
      setPartnerExtra(data);
    } catch (err) {
      console.error('Error fetching partner extra:', err);
    }
  };

  const fetchPurchaseForPartner = async (partnerId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/package/getPurchaseForPartner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ idPartner: partnerId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch partner data');
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];
        setPurchaseForPartner({
          packageAccounts: firstItem.packageAccounts || [],
          purchaseDate: firstItem.purchaseDate ?? null,
          expireDate: firstItem.expireDate ?? null,
        });
      } else {
        setPurchaseForPartner({
          packageAccounts: [],
          purchaseDate: null,
          expireDate: null,
        });
      }
    } catch (err) {
      console.error('Error fetching partner extra:', err);
    }
  };

  const activePackageInfo = (
    packageData: PurchaseForPartner | null
  ): ActivePackageDetails => {
    if (
      !packageData ||
      !packageData.packageAccounts ||
      packageData.packageAccounts.length === 0
    ) {
      return {
        purchased: null,
        used: null,
        remaining: null,
        purchaseDate: null,
        expireDate: null,
      };
    }

    const activePackageAccount = packageData.packageAccounts[0];

    return {
      purchased: activePackageAccount?.quantity ?? null,
      used: activePackageAccount
        ? activePackageAccount.quantity - activePackageAccount.balanceAfter
        : null,
      remaining: activePackageAccount?.balanceAfter ?? null,
      purchaseDate: packageData.purchaseDate ?? null,
      expireDate: packageData.expireDate ?? null,
    };
  };

  const detectFileType = async (blob: Blob): Promise<string> => {
    const buffer = await blob.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    if (
      bytes[0] === 0x25 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x44 &&
      bytes[3] === 0x46
    ) {
      return '.pdf';
    }

    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return '.jpg';
    }

    if (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47
    ) {
      return '.png';
    }

    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
      return '.gif';
    }

    if (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return '.webp';
    }

    return '.bin';
  };

  const isImageFile = (extension: string): boolean => {
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(
      extension.toLowerCase()
    );
  };

  const viewDocument = async (documentType: string, documentName: string) => {
    if (!partnerID) return;

    try {
      setViewingDoc(documentType);
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/partner/get-partner-document`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            partnerId: +partnerID,
            documentType: documentType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load document');
      }

      const blob = await response.blob();
      const mimeType = blob.type;

      let extension = '.pdf';

      if (mimeType && mimeType !== 'application/octet-stream') {
        if (mimeType.includes('image/jpeg') || mimeType.includes('image/jpg')) {
          extension = '.jpg';
        } else if (mimeType.includes('image/png')) {
          extension = '.png';
        } else if (mimeType.includes('image/gif')) {
          extension = '.gif';
        } else if (mimeType.includes('image/webp')) {
          extension = '.webp';
        } else if (mimeType.includes('application/pdf')) {
          extension = '.pdf';
        }
      } else {
        extension = await detectFileType(blob);
      }

      const baseFileName = documentName.replace(/\.[^/.]+$/, '');
      const finalFileName = `${baseFileName}${extension}`;

      if (isImageFile(extension)) {
        const url = window.URL.createObjectURL(blob);
        setImageViewerData({ url, name: finalFileName });
      } else {
        alert(
          'This document is not an image. Please use the download button to view PDF files.'
        );
      }
    } catch (err) {
      console.error('Error viewing document:', err);
      alert('Failed to load document. Please try again.');
    } finally {
      setViewingDoc(null);
    }
  };

  const downloadDocument = async (
    documentType: string,
    documentName: string
  ) => {
    if (!partnerID) return;

    try {
      setDownloadingDoc(documentType);
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/partner/get-partner-document`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            partnerId: +partnerID,
            documentType: documentType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download document');
      }

      const blob = await response.blob();
      const mimeType = blob.type;

      let extension = '.pdf';

      if (mimeType && mimeType !== 'application/octet-stream') {
        if (mimeType.includes('image/jpeg') || mimeType.includes('image/jpg')) {
          extension = '.jpg';
        } else if (mimeType.includes('image/png')) {
          extension = '.png';
        } else if (mimeType.includes('image/gif')) {
          extension = '.gif';
        } else if (mimeType.includes('image/webp')) {
          extension = '.webp';
        } else if (mimeType.includes('application/pdf')) {
          extension = '.pdf';
        }
      } else {
        extension = await detectFileType(blob);
      }

      const baseFileName = documentName.replace(/\.[^/.]+$/, '');
      const finalFileName = `${baseFileName}${extension}`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = finalFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading document:', err);
      alert('Failed to download document. Please try again.');
    } finally {
      setDownloadingDoc(null);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-600 mb-4">
            {error || 'Failed to load user data'}
          </p>
          <button
            onClick={fetchUserData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const documents = [
    {
      type: 'tradelicense',
      name: 'Trade License',
      available: partnerExtra?.tradeLicenseAvailable,
    },
    {
      type: 'tin',
      name: 'TIN Certificate',
      available: partnerExtra?.tinCertificateAvailable,
    },
    {
      type: 'taxreturn',
      name: 'Tax Return',
      available: partnerExtra?.lastTaxReturnAvailable,
    },
    {
      type: 'nidfront',
      name: 'NID Front Side',
      available: partnerExtra?.nidFrontAvailable,
    },
    {
      type: 'nidback',
      name: 'NID Back Side',
      available: partnerExtra?.nidBackAvailable,
    },
    {
      type: 'bin',
      name: 'BIN Certificate',
      available: partnerExtra?.binCertificateAvailable,
    },
    {
      type: 'vat',
      name: 'VAT Document',
      available: partnerExtra?.vatDocAvailable,
    },
    {
      type: 'btrc',
      name: 'BTRC Registration',
      available: partnerExtra?.btrcRegistrationAvailable,
    },
    { type: 'photo', name: 'Photo', available: partnerExtra?.photoAvailable },
    {
      type: 'sla',
      name: 'SLA Document',
      available: partnerExtra?.slaAvailable,
    },
  ];

  const packageDetails = activePackageInfo(purchaseForPartner);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Image Viewer Modal */}
      {imageViewerData && (
        <ImageViewerModal
          imageUrl={imageViewerData.url}
          imageName={imageViewerData.name}
          onClose={() => {
            if (imageViewerData.url) {
              window.URL.revokeObjectURL(imageViewerData.url);
            }
            setImageViewerData(null);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.firstName} {userData.lastName}!
          </h2>
          <p className="text-gray-600">
            Here's an overview of your SMS account
          </p>
        </div>

        {/* Bulk SMS Portal Link */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-xl font-semibold mb-2">
                Bulk SMS Portal
              </h3>
              <p className="text-green-100 text-sm">
                Access the portal to send SMS messages
              </p>
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
              <h3 className="text-lg font-semibold text-gray-900">
                Account Status
              </h3>
              {accountStatus === 'active' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  accountStatus === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
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
              <h3 className="text-lg font-semibold text-gray-900">
                Current Package
              </h3>
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
                      {new Date(packageDetails.purchaseDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                )}

                {packageDetails.expireDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expire Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(packageDetails.expireDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
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
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Portal Credentials
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username (Email)
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
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
                <svg
                  className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-3 text-sm text-blue-700">
                  Keep your credentials secure. Never share your password with
                  anyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <p className="text-gray-900 font-medium">
                {userData.firstName} {userData.lastName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <p className="text-gray-900 font-medium">{userData.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <p className="text-gray-900 font-medium">{userData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NID Number
              </label>
              <p className="text-gray-900 font-medium">
                {partnerExtra?.nid || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        {partnerExtra && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <p className="text-gray-900">{partnerExtra.address1}</p>
              </div>
              {partnerExtra.address2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <p className="text-gray-900">{partnerExtra.address2}</p>
                </div>
              )}
              {partnerExtra.address3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 3
                  </label>
                  <p className="text-gray-900">{partnerExtra.address3}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <p className="text-gray-900">{partnerExtra.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Division
                </label>
                <p className="text-gray-900">{partnerExtra.state}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <p className="text-gray-900">{partnerExtra.postalCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <p className="text-gray-900">
                  {partnerExtra.countryCode === 'BD'
                    ? 'Bangladesh'
                    : partnerExtra.countryCode}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Business Information */}
        {partnerExtra && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trade License Number
                </label>
                <p className="text-gray-900 font-medium">
                  {partnerExtra.tradeLicenseNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TIN Number
                </label>
                <p className="text-gray-900 font-medium">{partnerExtra.tin}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Return Date
                </label>
                <p className="text-gray-900 font-medium">
                  {new Date(partnerExtra.taxReturnDate).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uploaded By
                </label>
                <p className="text-gray-900 font-medium">
                  {partnerExtra.uploadedBy}
                </p>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Uploaded Documents
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents?.map((doc) => (
                  <div
                    key={doc.type}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        {doc.name}
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => viewDocument(doc.type, `${doc.name}`)}
                        disabled={viewingDoc === doc.type}
                        className="flex-1 flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 py-2 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {viewingDoc === doc.type ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            View
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          downloadDocument(doc.type, `${doc.name}`)
                        }
                        disabled={downloadingDoc === doc.type}
                        className="flex-1 flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 py-2 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
