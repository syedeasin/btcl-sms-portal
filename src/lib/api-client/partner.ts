// lib/api-client/partner.ts
import axios from 'axios';

const BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST/partner/create-partner';1
const BASE_URL2 = "https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST/partner/partner-documents";
const OTP_BASE_URL = "https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST";

// const BASE_URL = 'http://103.95.96.76:8001/FREESWITCHREST/partner/create-partner';
// const BASE_URL2 = "http://103.95.96.76:8001/FREESWITCHREST/partner/partner-documents";
// const OTP_BASE_URL = "http://103.95.96.76:8001/FREESWITCHREST";
 const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siaWQiOjYsIm5hbWUiOiJST0xFX1NNU0FETUlOIiwiZGVzY3JpcHRpb24iOiJzbXNBZG1pbiJ9XSwiaWRQYXJ0bmVyIjoxLCJzdWIiOiJzbXNhZG1pbi5jb20iLCJpYXQiOjE3NjIwOTAyODYsImV4cCI6MTc2MjE3NjY4Nn0.sV6TUWOMvJdDlUlX5rXRlkwBUmWOocEpunlwqB64pdo";

// OTP API functions
export const sendOtp = async (phoneNumber: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post(
            `${OTP_BASE_URL}/otp/send`,
            { id: phoneNumber },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AUTH_TOKEN}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Send OTP API error:', error);
        throw error;
    }
};

export const verifyOtp = async (phoneNumber: string, otp: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post(
            `${OTP_BASE_URL}/otp/varify`,
            {
                phoneNumber: phoneNumber.replace('+', ''),
                otp
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AUTH_TOKEN}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Verify OTP API error:', error);

        // Try with different parameter names
        try {
            const response = await axios.post(
                `${OTP_BASE_URL}/otp/varify`,
                {
                    id: phoneNumber,
                    code: otp
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AUTH_TOKEN}`
                    },
                }
            );
            return response.data;
        } catch (secondError) {
            console.error('Second attempt Verify OTP API error:', secondError);
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
    idPartner?: number;  // Changed from 'id' to match actual response
    id?: number;         // Keep both for compatibility
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

export const createPartner = async (payload: CreatePartnerPayload): Promise<CreatePartnerResponse> => {
    try {
        console.log('Creating partner with payload:', payload);

        const response = await axios.post<CreatePartnerResponse>(
            BASE_URL,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AUTH_TOKEN}`
                },
            }
        );

        console.log('Create Partner Response:', response.data);

        // Handle potential response structure variations
        if (!response.data) {
            throw new Error('No response data received from create partner API');
        }

        // The API might return idPartner or id, handle both cases
        const responseData = {
            ...response.data,
            idPartner: response.data.idPartner || response.data.id,
            id: response.data.id || response.data.idPartner
        };

        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Create Partner API error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers,
                requestData: payload
            });

            // Provide more specific error messages
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

export const addPartnerDetails = async (
    payload: PartnerDetailsPayload
): Promise<AddPartnerDetailsResponse> => {
    try {
        console.log('Adding partner details for partnerId:', payload.partnerId);

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
                console.log(`Appending file ${fieldName}:`, file.name);
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

        const response = await axios.post<AddPartnerDetailsResponse>(BASE_URL2, formData, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                // Let browser set Content-Type with boundary for FormData
            },
        });

        console.log('Add Partner Details Response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API Error Details:", {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
            });
            throw new Error(error.response?.data?.message || "Failed to add partner details");
        } else {
            console.error("Unexpected Error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};