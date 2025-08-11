// API client for backend endpoints
// Base URL for the backend server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Types for API responses
export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'creator' | 'admin';
    profilePic?: string;
    bio?: string;
    bookMarks?: string[];
}

export interface Creator extends User {
    role: 'creator';
    subscribers?: User[];
    earnings?: number;
}

export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    attachments?: Array<{
        url: string;
        publicId: string;
    }>;
    isPremium: boolean;
    price?: number;
    status: 'draft' | 'published';
    createdAt: string;
    updatedAt: string;
    likes?: number;
    views?: number;
    comments?: number;
}

export interface Subscription {
    _id: string;
    subscriber: string;
    creator: string;
    plan: 'basic' | 'premium';
    status: 'active' | 'cancelled' | 'expired';
    nextBilling: string;
    price: number;
}

export interface DashboardData {
    username: string;
    profilePic?: string;
    bio?: string;
    role: string;
    subscriptions?: Subscription[];
    subscribers?: User[];
}

export interface Bookmark {
    _id: string;
    title: string;
    author: string;
    createdAt: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }
    return null;
};

// Helper function for API requests
const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = getAuthToken();
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
    }
};

// Dashboard API endpoints
export const dashboardApi = {
    // Get dashboard data for current user
    getDashboardData: (): Promise<DashboardData> =>
        apiRequest<DashboardData>('/private/dashboard'),

    // Update dashboard data
    updateDashboardData: (data: FormData): Promise<DashboardData> =>
        apiRequest<DashboardData>('/private/dashboard', {
            method: 'PATCH',
            body: data,
            headers: {}, // Let browser set content-type for FormData
        }),

    // Get user's subscriptions
    getSubscriptions: (): Promise<Subscription[]> =>
        apiRequest<Subscription[]>('/private/creator/subscribed'),

    // Get creator's subscribers
    getSubscribers: (): Promise<User[]> =>
        apiRequest<User[]>('/private/subscriber'),

    // Get user's bookmarks
    getBookmarks: (): Promise<Bookmark[]> =>
        apiRequest<Bookmark[]>('/private/bookmarks'),

    // Upgrade user to creator
    upgradeToCreator: (): Promise<{ message: string }> =>
        apiRequest<{ message: string }>('/private/upgrade', {
            method: 'PATCH',
        }),
};

// Stripe API endpoints
export const stripeApi = {
    // Retry Stripe onboarding
    retryOnboarding: (): Promise<{ message: string }> =>
        apiRequest<{ message: string }>('/private/stripe/onboarding'),

    // Get Stripe dashboard link
    getDashboardLink: (): Promise<{ url: string }> =>
        apiRequest<{ url: string }>('/private/stripe/dashboard'),
};

// Subscription API endpoints
export const subscriptionApi = {
    // Subscribe to a creator
    subscribeToCreator: (creatorId: string): Promise<{ message: string }> =>
        apiRequest<{ message: string }>(`/private/subscribe/${creatorId}`, {
            method: 'POST',
        }),
};

// Post API endpoints
export const postApi = {
    // Create a new post
    createPost: (data: FormData): Promise<{ message: string; post: Post }> =>
        apiRequest<{ message: string; post: Post }>('/private/post', {
            method: 'POST',
            body: data,
            headers: {}, // Let browser set content-type for FormData
        }),

    // Get all posts (for current user or specific creator)
    getAllPosts: (creatorId?: string): Promise<Post[]> => {
        const endpoint = creatorId ? `/private/post/${creatorId}` : '/private/post';
        return apiRequest<Post[]>(endpoint);
    },

    // Edit a post
    editPost: (postId: string, data: FormData): Promise<{ message: string; post: Post }> =>
        apiRequest<{ message: string; post: Post }>(`/private/post/${postId}`, {
            method: 'PATCH',
            body: data,
            headers: {}, // Let browser set content-type for FormData
        }),

    // Delete a post
    deletePost: (postId: string): Promise<{ message: string }> =>
        apiRequest<{ message: string }>(`/private/post/${postId}`, {
            method: 'DELETE',
        }),

    // Like/unlike a post
    likePost: (postId: string): Promise<{ message: string }> =>
        apiRequest<{ message: string }>(`/private/post/${postId}/like`, {
            method: 'POST',
        }),
};

// Auth API endpoints
export const authApi = {
    // Login user
    login: (email: string, password: string): Promise<{ message: string; token: string; user: User }> =>
        apiRequest<{ message: string; token: string; user: User }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    // Register user
    register: (userData: { username: string; email: string; password: string }): Promise<{ message: string; user: User }> =>
        apiRequest<{ message: string; user: User }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

// Utility function to logout user
export const logout = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/';
    }
};
