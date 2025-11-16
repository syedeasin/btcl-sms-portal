/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

// Base URLs
export const API_BASE_URL = 'https://a2psms.btcliptelephony.gov.bd/FREESWITCHREST';
export const BULK_SMS_PORTAL_URL = 'https://a2psms.btcliptelephony.gov.bd:4000/';

// API Endpoints
export const API_ENDPOINTS = {
  // Partner endpoints
  partner: {
    getPartner: '/partner/get-partner',
    getPartnerExtra: '/partner/get-partner-extra',
    getPartnerDocument: '/partner/get-partner-document',
  },

  // Package endpoints
  package: {
    getPurchaseForPartner: '/package/getPurchaseForPartner',
  },

  // User/Dashboard endpoints
  user: {
    getTopupBalanceForUser: '/user/DashBoard/getTopupBalanceForUser',
  },
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// API request helper with default headers
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  return fetch(buildApiUrl(endpoint), mergedOptions);
};
