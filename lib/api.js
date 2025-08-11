// API client for backend endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Dashboard API functions
export const dashboardApi = {
    getDashboardData: () => apiRequest('/private/dashboard'),
    updateDashboardData: (data) => apiRequest('/private/dashboard', {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),
    upgradeToCreator: (data) => apiRequest('/private/upgrade', {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),
    getStripeOnboarding: () => apiRequest('/private/stripe/onboarding'),
    getStripeDashboard: () => apiRequest('/private/stripe/dashboard'),
};

// Stripe API functions
export const stripeApi = {
    subscribeToCreator: (creatorId) => apiRequest(`/private/subscribe/${creatorId}`, {
        method: 'POST',
    }),
};

// Subscription API functions
export const subscriptionApi = {
    getSubscriptions: () => apiRequest('/private/creator/subscribed'),
    getSubscribers: () => apiRequest('/private/subscriber'),
};

// Post API functions
export const postApi = {
    getAllPosts: () => apiRequest('/private/post'),
    getCreatorPosts: (creatorId) => apiRequest(`/private/post/${creatorId}`),
    createPost: (data) => apiRequest('/private/post', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    editPost: (postId, data) => apiRequest(`/private/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),
    deletePost: (postId) => apiRequest(`/private/post/${postId}`, {
        method: 'DELETE',
    }),
    likePost: (postId) => apiRequest(`/private/post/${postId}/like`, {
        method: 'POST',
    }),
};

// Auth API functions
export const authApi = {
    register: (data) => apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    login: (data) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Utility functions
export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('token');
    }
    return false;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
};
