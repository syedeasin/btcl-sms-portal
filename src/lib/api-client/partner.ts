// lib/api-client/partner.ts
import axios from 'axios';

const BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST';
const AUTH_BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/AUTHENTICATION';

// OTP API functions - NO TOKEN REQUIRED
export const sendOtp = async (phoneNumber: string): Promise<{ message: string }> => {
    try {

        const response = await axios.post(
            `${BASE_URL}/otp/send`,
            { id: phoneNumber },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyOtp = async (phoneNumber: string, otp: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post(
            `${BASE_URL}/otp/varify`,
            {
                phoneNumber: phoneNumber.replace('+', ''),
                otp
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('❌ Verify OTP API error:', error);

        // Try with different parameter names
        try {
            const response = await axios.post(
                `${BASE_URL}/otp/varify`,
                {
                    id: phoneNumber,
                    code: otp
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            return response.data;
        } catch (secondError) {
            console.error('❌ Second attempt Verify OTP API error:', secondError);
            throw secondError;
        }
    }
};

export interface CreatePartnerPayload {
    partnerName: string;
    telephone: string;
    email: string;
    userPassword: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    alternateNameInvoice: string;
    alternateNameOther: string;
    vatRegistrationNo: string;
    invoiceAddress: string;
    customerPrePaid: number;
    partnerType: number;
    defaultCurrency: number;
    callSrcId: number;
}

export interface CreatePartnerResponse {
    idPartner?: number;
    id?: number;
    [key: string]: any;
}

interface PartnerDetailsPayload {
    partnerId: number;
    doctype: string;
    email: string;
    doc?: File;
    docSerialNumber: string;
    dob: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    address3?: string;
    address4?: string;
    gender: string;
    countryCode: string;
    phonenumber: string;
    identityCardFrontSide?: File;
    identityCardBackSide?: File;
    tincertificate?: File | File[];
    bincertificate?: File;
    tradeliscense?: File;
    docexpirydate?: string;
    taxReturnFile?: File;
    btrcFile?: File;
    jointStockFile?: File;
    photoFile?: File;
    slaFile?: File;
}

interface AddPartnerDetailsResponse {
    success: boolean;
    message?: string;
    data?: any;
}

interface LoginResponse {
    token: string;
    [key: string]: any;
}

// Create Partner - NO TOKEN REQUIRED
export const createPartner = async (payload: CreatePartnerPayload): Promise<CreatePartnerResponse> => {
    try {

        const response = await axios.post<CreatePartnerResponse>(
            `${BASE_URL}/partner/create-partner`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );


        if (!response.data) {
            throw new Error('No response data received from create partner API');
        }

        const responseData = {
            ...response.data,
            idPartner: response.data.idPartner || response.data.id,
            id: response.data.id || response.data.idPartner
        };

        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('❌ Create Partner API error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers,
                requestData: payload
            });

            if (error.response?.status === 400) {
                throw new Error(`Bad Request: ${JSON.stringify(error.response.data) || 'Invalid partner data'}`);
            } else if (error.response?.status === 401) {
                throw new Error('Authentication failed. Token may be expired.');
            } else if (error.response?.status === 500) {
                throw new Error('Server error. Please try again later.');
            }
        }
        throw error;
    }
};

// Login to get JWT token - FIXED: Using "user" instead of "email"
export const loginPartner = async (email: string, password: string): Promise<LoginResponse> => {
    try {

        // CRITICAL FIX: Backend expects "user" not "email"
        const loginPayload = {
            email,  // Changed from "email" to "user"
            password
        };


        const response = await axios.post<LoginResponse>(
            `${AUTH_BASE_URL}/auth/login`,
            loginPayload,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );


        if (!response.data || !response.data.token) {
            console.error('❌ No token in response:', response.data);
            throw new Error('No token received from login API');
        }


        // Validate token format (JWT should have 3 parts separated by dots)
        const tokenParts = response.data.token.split('.');
        if (tokenParts.length !== 3) {
            console.warn('⚠️ Token format may be invalid. Expected 3 parts, got:', tokenParts.length);
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('❌ Partner Login API error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                url: `${AUTH_BASE_URL}/auth/login`
            });

            if (error.response?.status === 401) {
                throw new Error('Invalid credentials for partner login');
            } else if (error.response?.status === 404) {
                throw new Error('Login endpoint not found. Please check the API URL.');
            } else if (error.response?.status === 500) {
                throw new Error('Server error during login. Please try again later.');
            }
        }
        console.error('❌ Unexpected login error:', error);
        throw error;
    }
};

// CRITICAL: Check if partner documents endpoint should be GET or POST
// Backend instruction says: "GET /FREESWITCHREST/partner/partner-documents"
// But you're trying to upload files, which typically requires POST

// Option 1: If backend expects POST to upload documents
export const addPartnerDetails = async (
    payload: PartnerDetailsPayload,
    authToken: string
): Promise<AddPartnerDetailsResponse> => {
    try {

        const formData = new FormData();

        // Append all non-file fields first
        const textFields = {
            partnerId: String(payload.partnerId),
            doctype: payload.doctype,
            docSerialNumber: payload.docSerialNumber,
            dob: payload.dob,
            firstName: payload.firstName,
            lastName: payload.lastName,
            address1: payload.address1,
            gender: payload.gender,
            countryCode: payload.countryCode,
            phonenumber: payload.phonenumber,
            email: payload.email,
            address2: payload.address2 || '',
            address3: payload.address3 || '',
            address4: payload.address4 || '',
            docexpirydate: payload.docexpirydate || ''
        };


        Object.entries(textFields).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        // Append files with proper field names
        const appendFile = (file: File | undefined, fieldName: string) => {
            if (file) {
                formData.append(fieldName, file, file.name);
            }
        };

        appendFile(payload.doc, 'doc');
        appendFile(payload.identityCardFrontSide, 'identityCardFrontSide');
        appendFile(payload.identityCardBackSide, 'identityCardBackSide');
        appendFile(payload.tincertificate as File, 'tincertificate');
        appendFile(payload.bincertificate, 'bincertificate');
        appendFile(payload.tradeliscense, 'tradeliscense');
        appendFile(payload.taxReturnFile, 'taxReturnFile');
        appendFile(payload.btrcFile, 'btrcFile');
        appendFile(payload.jointStockFile, 'jointStockFile');
        appendFile(payload.photoFile, 'photoFile');
        appendFile(payload.slaFile, 'slaFile');



        const response = await axios.post<AddPartnerDetailsResponse>(
            `${BASE_URL}/partner/partner-documents`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    // Let browser set Content-Type with boundary for FormData
                },
                timeout: 60000, // 60 second timeout for file uploads
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Add Partner Details API Error:", {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });

            if (error.response?.status === 403) {
                console.error('🔴 403 FORBIDDEN - Possible causes:');
                console.error('1. Token is invalid or expired');
                console.error('2. Token format is wrong (check if Bearer prefix is needed)');
                console.error('3. Partner ID does not match the authenticated user');
                console.error('4. Endpoint requires different HTTP method (GET vs POST)');
                console.error('5. Missing required permissions/roles in token');
                throw new Error('Access forbidden. Please check: 1) Token validity, 2) Partner ID matches authenticated user, 3) HTTP method is correct');
            } else if (error.response?.status === 401) {
                throw new Error('Unauthorized. The JWT token is not valid or has expired.');
            } else if (error.response?.status === 404) {
                throw new Error('Endpoint not found. The partner-documents endpoint may not exist or HTTP method may be wrong.');
            }

            throw new Error(error.response?.data?.message || "Failed to add partner details");
        } else {
            console.error("❌ Unexpected Error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};

// Option 2: Helper function to retrieve partner documents (if GET is correct)
export const getPartnerDocuments = async (
    partnerId: number,
    authToken: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/partner/partner-documents`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                params: {
                    partnerId // Or however backend expects the partner ID
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('❌ Get Partner Documents error:', {
                status: error.response?.status,
                data: error.response?.data
            });
        }
        throw error;
    }
};