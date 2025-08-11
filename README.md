# UIT Blog Platform

A modern subscription-based content platform built with Next.js and Express.js.

## Features

- **User Management**: User registration, authentication, and role-based access
- **Content Creation**: Rich text editor for creating and editing blog posts
- **Subscription System**: Premium content gating and subscription management
- **Creator Dashboard**: Analytics, post management, and subscriber insights
- **User Dashboard**: Content discovery, bookmarks, and subscription management
- **Admin Dashboard**: Platform monitoring and user management
- **AI Chatbot**: Intelligent assistance for platform features

## API Structure

The frontend now uses a centralized API client (`lib/api.ts`) that maps to all backend endpoints from `PrivateResController.js`.

### API Endpoints

#### Dashboard API

- `GET /private/dashboard` - Get user dashboard data
- `PATCH /private/dashboard` - Update dashboard data
- `GET /private/creator/subscribed` - Get user's subscriptions
- `GET /private/subscriber` - Get creator's subscribers
- `GET /private/bookmarks` - Get user's bookmarks
- `PATCH /private/upgrade` - Upgrade user to creator

#### Post API

- `POST /private/post` - Create a new post
- `GET /private/post` - Get all posts for current user
- `GET /private/post/:creatorId` - Get posts for specific creator
- `PATCH /private/post/:postId` - Edit a post
- `DELETE /private/post/:postId` - Delete a post
- `POST /private/post/:postId/like` - Like/unlike a post

#### Stripe API

- `GET /private/stripe/onboarding` - Retry Stripe onboarding
- `GET /private/stripe/dashboard` - Get Stripe dashboard link

#### Subscription API

- `POST /private/subscribe/:creatorId` - Subscribe to a creator

#### Auth API

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

## Environment Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Mistral AI Configuration (for chatbot)
NEXT_PUBLIC_MISTRAL_API_URL=https://api.mistral.ai/v1/chat/completions
NEXT_PUBLIC_MISTRAL_API_KEY=your_mistral_api_key_here
NEXT_PUBLIC_MISTRAL_MODEL=mistral-large-latest

# Stripe Configuration (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Backend server running on port 5000

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables (see above)

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables for backend

4. Start the backend server:

```bash
npm start
```

## Component Updates

### Creator Dashboard

- Now fetches real data from API endpoints
- Displays actual posts, subscribers, and analytics
- Implements real post deletion and like functionality
- Shows real-time statistics based on backend data

### User Dashboard

- Fetches real posts and subscription data
- Implements real like and bookmark functionality
- Shows actual reading statistics and user data
- Displays real subscription information

### Admin Dashboard

- Fetches platform statistics from real data
- Shows actual user counts, post counts, and revenue
- Displays real subscription breakdowns
- Implements proper loading and error states

## API Client Features

- **Centralized Configuration**: All API endpoints in one place
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Consistent error handling across all API calls
- **Authentication**: Automatic token management for protected routes
- **FormData Support**: Proper handling of file uploads and form submissions

## Usage Examples

### Using the API Client

```typescript
import { postApi, dashboardApi } from '@/lib/api'

// Create a new post
const createPost = async (formData: FormData) => {
  try {
    const result = await postApi.createPost(formData)
    console.log('Post created:', result.post)
  } catch (error) {
    console.error('Failed to create post:', error)
  }
}

// Get dashboard data
const getDashboard = async () => {
  try {
    const data = await dashboardApi.getDashboardData()
    console.log('Dashboard data:', data)
  } catch (error) {
    console.error('Failed to fetch dashboard:', error)
  }
}
```

### Error Handling

The API client automatically handles HTTP errors and provides meaningful error messages:

```typescript
try {
  const data = await postApi.getAllPosts()
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message)
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for UiT SE ADBMS Course (CS-7313) by:

- Wint War Shwe Yee
- Naw Lal Yee Than Han  
- Chaw Su Han
- Kaung Myat Thu
- Kaung Kyaw Han
