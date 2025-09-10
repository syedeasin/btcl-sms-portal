// lib/api-client/partner.ts
import axios from 'axios';

// const BASE_URL = 'http://103.95.96.76:8001/FREESWITCHREST/partner/create-partner';
// const BASE_URL = 'http://192.168.0.213:8001/FREESWITCHREST/partner/create-partner';
const BASE_URL = 'http://103.95.96.76:8001/FREESWITCHREST/partner/create-partner';
// const BASE_URL2 ="http://192.168.0.213:5071/FREESWITCHREST/api/partnerdetails/add"
const BASE_URL2 ="http://103.95.96.76:8001/FREESWITCHREST/partner/partner-documents"
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJST0xFX0FETUlOIiwiZGVzY3JpcHRpb24iOiJhZG1pbiJ9XSwiaWRQYXJ0bmVyIjo3Miwic3ViIjoiYWRtaW50ZWxjby5jb20iLCJpYXQiOjE3NTc0ODQ3NzksImV4cCI6MTc1NzU3MTE3OX0.QxFkaQQKMpz5rHjPz9-lmiibNU4o74NUjIOWm1t7Fo8";

export interface CreatePartnerPayload {
    partnerName: string;
    telephone: string;
    email: string;
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
    id: number;
    // Add other response fields as needed based on API response
    [key: string]: any;
}

interface PartnerDetailsPayload {
    partnerId: number;
    doctype: string;
    email:string;
    doc?: File;  // File upload field
    docSerialNumber: string;
    dob: string; // Format: yyyy-MM-dd
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    address3?: string;
    address4?: string;
    gender: string;
    countryCode: string;
    phonenumber:string;
    identityCardFrontSide?:File;
    identityCardBackSide?:File;
    tincertificate?: File | File[]; // Can be single file or array
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
        const response = await axios.post<CreatePartnerResponse>(
            `${BASE_URL}`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AUTH_TOKEN}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Create Partner API error:', error);
        throw error;
    }
};




// export const addPartnerDetails = async (payload: PartnerDetailsPayload): Promise<AddPartnerDetailsResponse> => {
//     const API_URL = 'http://localhost:5070/api/partnerdetails/add';
//     const AUTH_TOKEN = 'your_auth_token_here'; // Replace with actual token
//
//     try {
//         const formData = new FormData();
//
//         // Required text fields
//         // @ts-ignore
//         formData.append('idPartner', payload.idPartner);
//         formData.append('doctype', payload.doctype);
//         formData.append('docSerialNumber', payload.docSerialNumber);
//         formData.append('dob', payload.dob);
//         formData.append('firstName', payload.firstName);
//         formData.append('lastName', payload.lastName);
//         formData.append('address1', payload.address1);
//         formData.append('gender', payload.gender);
//         formData.append('countryCode', payload.countryCode);
//
//         // Optional text fields
//         if (payload.address2) formData.append('address2', payload.address2);
//         if (payload.address3) formData.append('address3', payload.address3 || '""');
//         if (payload.address4) formData.append('address4', payload.address4 || '""');
//
//         // File uploads
//         if (payload.doc) formData.append('doc', payload.doc);
//
//         // Handle multiple tincertificate files (as shown in Postman)
//         if (payload.tincertificate) {
//             if (Array.isArray(payload.tincertificate)) {
//                 payload.tincertificate.forEach(file => {
//                     formData.append('tincertificate', file);
//                 });
//             } else {
//                 formData.append('tincertificate', payload.tincertificate);
//             }
//         }
//
//         if (payload.bincertificate) formData.append('bincertificate', payload.bincertificate);
//         if (payload.tradeliscense) formData.append('tradeliscense', payload.tradeliscense);
//         if (payload.docexpirydate) formData.append('docexpirydate', payload.docexpirydate);
//         if (payload.taxReturnFile) formData.append('taxReturnFile', payload.taxReturnFile);
//         if (payload.btrcFile) formData.append('btrcFile', payload.btrcFile);
//         if (payload.jointStockFile) formData.append('jointStockFile', payload.jointStockFile);
//         if (payload.photoFile) formData.append('photoFile', payload.photoFile);
//         if (payload.slaFile) formData.append('slaFile', payload.slaFile);
//         if (payload.identityCardFrontSide) formData.append('identityCardFrontSide', payload.identityCardFrontSide);
//         if (payload.identityCardBackSide) formData.append('identityCardBackSide', payload.identityCardBackSide);
//
//
//
//         const response = await axios.post<AddPartnerDetailsResponse>(BASE_URL2, formData, {
//             headers: {
//                 'Authorization': `Bearer ${AUTH_TOKEN}`,
//                 // Content-Type will be automatically set by Axios with boundary
//             },
//
//         });
//
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('API Error:', {
//                 status: error.response?.status,
//                 data: error.response?.data,
//                 message: error.message
//             });
//             throw new Error(error.response?.data?.message || 'Failed to add partner details');
//         } else {
//             console.error('Unexpected Error:', error);
//             throw new Error('An unexpected error occurred');
//         }
//     }
// };


export const addPartnerDetails = async (
    payload: PartnerDetailsPayload
): Promise<AddPartnerDetailsResponse> => {

    const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJST0xFX0FETUlOIiwiZGVzY3JpcHRpb24iOiJhZG1pbiJ9XSwiaWRQYXJ0bmVyIjo3Miwic3ViIjoiYWRtaW50ZWxjby5jb20iLCJpYXQiOjE3NTc0ODQ3NzksImV4cCI6MTc1NzU3MTE3OX0.QxFkaQQKMpz5rHjPz9-lmiibNU4o74NUjIOWm1t7Fo8";

    try {
        const formData = new FormData();

        // Required fields
        formData.append("partnerId", String(payload.partnerId));
        formData.append("doctype", payload.doctype);
        formData.append("docSerialNumber", payload.docSerialNumber);
        formData.append("dob", payload.dob);
        formData.append("firstName", payload.firstName);
        formData.append("lastName", payload.lastName);
        formData.append("address1", payload.address1);
        formData.append("gender", payload.gender);
        formData.append("countryCode", payload.countryCode);
        formData.append("phonenumber", payload.phonenumber);
        formData.append("email", payload.email);
        // Optional
        if (payload.address2) formData.append("address2", payload.address2);
        if (payload.address3) formData.append("address3", payload.address3);
        if (payload.address4) formData.append("address4", payload.address4);

        // File uploads
        if (payload.doc) formData.append("doc", payload.doc);

        if (payload.tincertificate) {
            if (Array.isArray(payload.tincertificate)) {
                payload.tincertificate.forEach((file) => {
                    formData.append("tincertificate", file);
                });
            } else {
                formData.append("tincertificate", payload.tincertificate);
            }
        }

        if (payload.bincertificate) formData.append("bincertificate", payload.bincertificate);
        if (payload.tradeliscense) formData.append("tradeliscense", payload.tradeliscense);
        if (payload.docexpirydate) formData.append("docexpirydate", payload.docexpirydate);
        if (payload.taxReturnFile) formData.append("taxReturnFile", payload.taxReturnFile);
        if (payload.btrcFile) formData.append("btrcFile", payload.btrcFile);
        if (payload.jointStockFile) formData.append("jointStockFile", payload.jointStockFile);
        if (payload.photoFile) formData.append("photoFile", payload.photoFile);
        if (payload.slaFile) formData.append("slaFile", payload.slaFile);
        if (payload.identityCardFrontSide) formData.append("identityCardFrontSide", payload.identityCardFrontSide);
        if (payload.identityCardBackSide) formData.append("identityCardBackSide", payload.identityCardBackSide);

        const response = await axios.post<AddPartnerDetailsResponse>(BASE_URL2, formData, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`, // ✅ token sent here
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API Error:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
            throw new Error(error.response?.data?.message || "Failed to add partner details");
        } else {
            console.error("Unexpected Error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};