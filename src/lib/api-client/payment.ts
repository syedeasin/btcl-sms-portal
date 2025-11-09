// lib/api-client/payment.ts
import axios from 'axios';

// const BASE_URL = 'http://103.95.96.76:8080/api/payment';
const BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/api/payment';

export const initiateSSLCommerzPayment = async (payload: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/ssl/initiate/`, payload);
        return response.data;
    } catch (error) {
        console.error('SSLCommerz Payment Error:', error);
        throw error;
    }
};
// export const initiateNagadPayment = async (payload: any) => {
//     return axios.post(`${BASE_URL}/nagad/initiate/`, payload);
// };
//
// export const initiateBkashPayment = async (payload: any) => {
//     return axios.post(`${BASE_URL}/bkash/initiate/`, payload);
// };