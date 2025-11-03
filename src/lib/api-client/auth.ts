// // lib/api-client/auth.ts
// import axios from 'axios';
//
// const BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/AUTHENTICATION';
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
// // Add RegisterPayload interface
// export interface RegisterPayload {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
// }
//
// // Add RegisterResponse interface (assuming it returns similar to login)
// export interface RegisterResponse {
//     token: string;
//     message?: string;
//     // Add other fields if your API returns them
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
//
// // NEW: Add registration function
// export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
//     try {
//         console.log('Registering user with payload:', payload);
//
//         // Try the /register endpoint first
//         const response = await axios.post<RegisterResponse>(
//             `${BASE_URL}/auth/register`,
//             payload
//         );
//
//         console.log('Registration response:', response.data);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Registration API error:', {
//                 status: error.response?.status,
//                 statusText: error.response?.statusText,
//                 data: error.response?.data,
//             });
//
//             // Provide more specific error messages
//             if (error.response?.status === 400) {
//                 throw new Error(error.response?.data?.message || 'Invalid registration data');
//             } else if (error.response?.status === 409) {
//                 throw new Error('User already exists with this email');
//             } else if (error.response?.status === 500) {
//                 throw new Error('Server error. Please try again later.');
//             }
//         }
//
//         console.error('Registration error:', error);
//         throw error;
//     }
// };
//
// // Token management functions
// export const setAuthToken = (token: string) => {
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('authToken', token);
//         // Also set default authorization header for axios
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
// };
//
// export const getAuthToken = (): string | null => {
//     if (typeof window !== 'undefined') {
//         return localStorage.getItem('authToken');
//     }
//     return null;
// };
//
// export const removeAuthToken = () => {
//     if (typeof window !== 'undefined') {
//         localStorage.removeItem('authToken');
//         delete axios.defaults.headers.common['Authorization'];
//     }
// };
//
// // Verify if user is authenticated
// export const isAuthenticated = (): boolean => {
//     return !!getAuthToken();
// };

// lib/api-client/auth.ts
import axios from 'axios';

const BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/AUTHENTICATION';

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

export interface RegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface RegisterResponse {
    token: string;
    message?: string;
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

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
        console.log('Registering user with payload:', payload);

        const response = await axios.post<RegisterResponse>(
            `${BASE_URL}/auth/register`,
            payload
        );

        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Registration API error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
            });

            if (error.response?.status === 400) {
                throw new Error(error.response?.data?.message || 'Invalid registration data');
            } else if (error.response?.status === 409) {
                throw new Error('User already exists with this email');
            } else if (error.response?.status === 500) {
                throw new Error('Server error. Please try again later.');
            }
        }

        console.error('Registration error:', error);
        throw error;
    }
};

// Token management functions
export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
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

// ✅ Add this alias function for compatibility
export const clearAuthToken = removeAuthToken;

// Verify if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};