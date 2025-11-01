# Smart Communication Hub Frontend

A modern, real-time communication platform with AI-powered sentiment analysis and conversation insights. Built with Next.js, TypeScript, and Socket.IO for instant messaging capabilities.

## 📋 Project Summary

Smart Communication Hub is a full-featured real-time chat application that combines traditional messaging with AI-powered analytics. The platform allows users to:

- **Real-time messaging** - Send and receive messages instantly using Socket.IO
- **AI-powered insights** - Get automatic conversation summaries and sentiment analysis using Google's Gemini API
- **User management** - View online users and manage conversations
- **Responsive design** - Beautiful, modern UI that works seamlessly on desktop and mobile devices
- **Secure authentication** - JWT-based authentication with protected routes

## 🚀 Live Demo

[View Project on netlify](https://smart-communication-hub.netlify.app/)

## 🛠️ Tools & Libraries Used

### Core Framework

- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Real-time Communication

- **Socket.IO Client 4.8.1** - Real-time bidirectional event-based communication

### AI & Analytics

- **Google Gemini API (gemini-2.5-flash)** - AI-powered conversation analysis and sentiment detection

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React 0.548.0** - Beautiful icon library
- **AOS (Animate On Scroll) 2.3.4** - Scroll animation library
- **Typewriter Effect 2.22.0** - Typing animation for hero section

### Form Handling & Validation

- **React Hook Form 7.65.0** - Performant form library
- **Zod 4.1.12** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Validation resolver for React Hook Form

### UI Components

- **Radix UI** - Headless UI components
  - `@radix-ui/react-tabs` - Tabbed interface
  - `@radix-ui/react-slot` - Composability primitives
- **Class Variance Authority 0.7.1** - Component variants
- **clsx & tailwind-merge** - Conditional class utilities

### Notifications

- **React Hot Toast 2.6.0** - Elegant toast notifications

### Development Tools

- **ESLint 9** - Code linting
- **Next ESLint Config** - Next.js ESLint configuration

## 🤖 AI Tools Used in Development

This project leveraged AI tools to accelerate development and enhance functionality. Here's where and why AI was utilized:

### 1. Lovable - AI-Powered Website Builder

**Where it was used:**

- Initial design and layout inspiration
- Understanding platform structure and component organization
- UI/UX design patterns and best practices

**Why it was used:**

- **Design Inspiration**: Lovable helped visualize how the communication platform should look and function, providing a solid foundation for the user interface
- **Time Efficiency**: Instead of creating multiple designs from scratch in Figma (which had been done before), Lovable provided a quick way to explore different design approaches and iterate faster
- **Platform Understanding**: The AI tool helped conceptualize the overall structure, component relationships, and user flow of a modern communication platform

This approach significantly reduced the time spent on design iteration compared to traditional Figma-based design workflows, allowing for faster prototyping and development.

### 2. Google Gemini - AI Integration & Development Assistance

**Where it was used:**

- **Development**: Understanding how to integrate and call the Gemini Flash API
- **Implementation**: Getting guidance on API structure, request formatting, and response handling for AI insights feature
- **Runtime**: The application uses Gemini 2.5 Flash API to provide real-time conversation analysis

**Why it was used:**

- **API Integration Help**: Gemini AI was used as a development assistant to understand how to properly call the Gemini Flash API, including request formats, authentication, and response parsing
- **Feature Implementation**: The AI insights feature (conversation summaries and sentiment analysis) is powered by Gemini Flash API, which required understanding the API's capabilities and integration patterns
- **Learning Curve**: Instead of spending extensive time reading documentation and trial-and-error, Gemini helped quickly understand the API structure and implementation requirements

**Note**: While Gemini was used as a development assistant, the final implementation in `lib/services/ai.service.ts` integrates Gemini Flash API to provide actual AI-powered features in the application.

---

**Summary**: AI tools were strategically used to:

- Accelerate the design process (Lovable)
- Understand complex API integrations (Gemini)
- Reduce development time while maintaining code quality
- Provide the actual AI functionality within the application (Gemini Flash API)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A backend API server running (see environment variables)
- Google Gemini API key (for AI features)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd smart-communication-hub-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Environment Variables

| Variable                        | Description                           | Required              |
| ------------------------------- | ------------------------------------- | --------------------- |
| `NEXT_PUBLIC_API_URL`           | Backend API base URL                  | Yes                   |
| `NEXT_PUBLIC_SOCKET_SERVER_URL` | Socket.IO server URL                  | Yes                   |
| `NEXT_PUBLIC_GEMINI_API_KEY`    | Google Gemini API key for AI insights | Yes (for AI features) |

### Running the Application

1. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Build for production:

```bash
npm run build
npm start
```

## 📖 How to Use the App

### For First-Time Users

1. **Registration**

   - On the homepage, click the "Register" tab
   - Fill in your name, email, and password
   - Click "Register" to create your account
   - A success toast notification will confirm registration

2. **Login**
   - Enter your email and password
   - Click "Login" to access the dashboard
   - You'll be automatically redirected to the dashboard

### Using the Chat Interface

1. **Select a User**

   - The left sidebar displays all available users
   - Click on any user to start a conversation
   - Online users are indicated by a green status indicator

2. **Send Messages**

   - Type your message in the input field at the bottom
   - Click the send button or press Enter
   - Messages are sent instantly via Socket.IO

3. **View AI Insights**

   - Click the sparkle icon (✨) or open the AI sidebar
   - View conversation summary and sentiment analysis
   - Insights update automatically when new messages arrive

4. **Navigation**
   - **Mobile**: Use the menu icon (☰) to toggle the chat sidebar
   - **Desktop**: Sidebars are always visible
   - Logout using the logout icon in the sidebar

### Features

- **Real-time Messaging**: Messages appear instantly without page refresh
- **Online Status**: See which users are currently online
- **AI Insights**:
  - Get conversation summaries
  - View sentiment analysis (positive/negative)
  - Automatic analysis of message history
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Protected Routes**: Authentication required for dashboard access

## 📁 Project Structure

```
smart-communication-hub-frontend/
├── app/
│   ├── _components/          # React components
│   │   ├── Chat.tsx          # Main chat interface
│   │   ├── AiSidebar.tsx     # AI insights sidebar
│   │   ├── LoginForm.tsx     # Login form
│   │   └── ...               # Other components
│   ├── Context/              # React contexts
│   │   ├── Auth.context.tsx  # Authentication state
│   │   ├── Socket.context.tsx # Socket.IO connection
│   │   └── Sidebar.context.tsx # Sidebar state
│   ├── dashboard/            # Dashboard pages
│   │   ├── [id]/            # Dynamic chat route
│   │   ├── layout.tsx       # Dashboard layout
│   │   └── page.tsx         # Dashboard root
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   └── ui/                  # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       └── tabs.tsx
├── lib/
│   ├── services/            # API service functions
│   │   ├── ai.service.ts    # Gemini API integration
│   │   ├── auth.service.ts  # Authentication API
│   │   ├── message.service.ts # Messages API
│   │   └── user.service.ts  # Users API
│   ├── schema/              # Zod validation schemas
│   │   └── auth.schema.ts   # Login/Register schemas
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── package.json            # Dependencies
```

## 🔐 Authentication Flow

1. User registers/logs in through the homepage
2. Auth token is stored in localStorage
3. Token is validated on app load via `/auth/me` endpoint
4. Protected routes check authentication before rendering
5. Unauthenticated users are redirected to homepage

## 🌐 API Integration

The frontend communicates with a backend API for:

- **Authentication**: `/auth/register`, `/auth/login`, `/auth/me`
- **Users**: `/users` - Get all users
- **Messages**: `/messages/:userId` - Get conversation messages

Socket.IO handles real-time features:

- **send_message** - Send new messages
- **receive_message** - Receive incoming messages
- **send_userId** - Register user online
- **update_online_users** - Get online users list

## 🎨 UI/UX Features

- Clean, modern design with Tailwind CSS
- Smooth animations with AOS library
- Responsive mobile-first layout
- Loading states and error handling
- Toast notifications for user feedback
- Real-time online status indicators

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Notes

- Ensure your backend API server is running before starting the frontend
- The Socket.IO server must be configured to match `NEXT_PUBLIC_SOCKET_SERVER_URL`
- AI features require a valid Gemini API key
- Authentication tokens are stored in localStorage (consider using httpOnly cookies for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js and TypeScript
