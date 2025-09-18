// // lib/api-client/auth.ts
// import axios from 'axios';
//
// const BASE_URL = 'https://iptsp.cosmocom.net:8001/AUTHENTICATION';
//
// export interface LoginResponse {
//     token: string;
//     authRoles: { id: number; name: string; description: string }[];
//     sessionStartDateTime: string;
//     userContext: string;
//     message: string | null;
// }
//
// export interface LoginPayload {
//     email: string;
//     password: string;
// }
//
// export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
//     try {
//         const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, payload);
//         return response.data;
//     } catch (error) {
//         console.error('Login API error:', error);
//         throw error;
//     }
// };


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

// Add token management functions
export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
        // Also set default authorization header for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Verify if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};