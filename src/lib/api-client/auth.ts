// lib/api-client/auth.ts
import axios from 'axios';

const BASE_URL = 'https://iptsp.cosmocom.net:8001/AUTHENTICATION';

export interface LoginResponse {
    token: string;
    authRoles: { id: number; name: string; description: string }[];
    sessionStartDateTime: string;
    userContext: string;
    message: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, payload);
        return response.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};
