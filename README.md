# 🚀 PromptCraft - AI Prompt Generator

<div align="center">

![PromptCraft Logo](https://via.placeholder.com/150x150/667eea/ffffff?text=PromptCraft)

**Transform your simple ideas into powerful AI prompts**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Demo](https://promptcraft.vercel.app) • [Documentation](#-documentation) • [Features](#-features) • [Setup](#-quick-start)

</div>

---

## ✨ Features

### 🎨 Modern UI/UX

- **Glassmorphism Design** - Beautiful glass-effect cards with backdrop blur
- **Gradient Accents** - Vibrant purple-pink gradient theme
- **Smooth Animations** - Floating, pulse, fade-in, and hover effects
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Dark Theme** - Premium dark mode with gradient backgrounds

### 🔐 Authentication (Supabase)

- **Email/Password** - Traditional authentication
- **OAuth Providers** - Google & GitHub sign-in
- **Email Verification** - Secure account activation
- **Password Reset** - Self-service password recovery
- **Session Management** - Persistent login with auto-refresh

### 🤖 AI-Powered Features

- **Prompt Generation** - Transform simple ideas into detailed prompts
- **Smart Suggestions** - Quick-start templates
- **History Management** - Save and access previous prompts
- **Character Counter** - Real-time input tracking
- **Debounced Input** - Optimized performance

### 📊 Database Integration

- **User Prompts** - Save generated prompts to database
- **Templates Marketplace** - Browse and purchase prompt templates
- **Favorites System** - Bookmark favorite templates
- **Reviews & Ratings** - Community feedback
- **User Profiles** - Extended user information

### ⚡ Performance Optimizations

- **Debouncing** - Reduce unnecessary API calls
- **Local Storage** - Client-side caching
- **Lazy Loading** - Conditional component rendering
- **Memoization** - Prevent unnecessary re-renders
- **Custom Hooks** - Reusable logic patterns

---

## 🛠️ Tech Stack

| Category           | Technology                          |
| ------------------ | ----------------------------------- |
| **Framework**      | Next.js 14.2.3 (App Router)         |
| **Authentication** | Supabase Auth                       |
| **Database**       | Supabase (PostgreSQL)               |
| **Styling**        | Tailwind CSS 3.4.1                  |
| **UI Components**  | Custom React Components             |
| **Fonts**          | Inter, Space Grotesk (Google Fonts) |
| **AI API**         | OpenRouter                          |
| **Deployment**     | Vercel                              |

---

## 📦 Quick Start

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- OpenRouter API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/promptcraft.git
   cd promptcraft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   copy .env.example .env.local
   ```

   Edit `.env.local` with your credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   OPENROUTER_API_KEY=your-openrouter-key
   ```

4. **Setup Supabase database**

   - Follow the guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
   - Run the SQL schema in Supabase SQL Editor

5. **Run development server**

   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📖 Documentation

### Project Structure

```
promptcraft/
├── app/                      # Next.js app directory
│   ├── auth/                # Authentication pages
│   │   ├── signin/         # Sign in page
│   │   ├── signup/         # Sign up page
│   │   └── callback/       # OAuth callback
│   ├── marketplace/        # Marketplace pages
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.jsx            # Homepage
├── components/             # React components
│   ├── AuthProvider.js    # Auth context provider
│   ├── Navbar.jsx         # Navigation bar
│   ├── Footer.jsx         # Footer component
│   └── ...
├── lib/                    # Utility libraries
│   ├── supabase.js        # Supabase client & helpers
│   ├── hooks.js           # Custom React hooks
│   ├── utils.js           # Utility functions
│   └── constants.js       # App constants
├── supabase/              # Supabase configuration
│   └── schema.sql         # Database schema
├── public/                # Static assets
└── ...
```

### Key Files

- **`lib/supabase.js`** - Supabase client configuration and helper functions
- **`components/AuthProvider.js`** - Global authentication state management
- **`app/globals.css`** - Design system with CSS variables and animations
- **`lib/hooks.js`** - Custom React hooks (useDebounce, useLocalStorage, etc.)
- **`lib/constants.js`** - Application constants and configuration

---

## 🎨 Design System

### Color Palette

```css
/* Primary Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Secondary Gradient */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Accent Gradient */
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

### Typography

- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Code**: Monospace

### Components

- **Glass Cards**: `glass-card` class
- **Gradient Text**: `gradient-text` class
- **Hover Scale**: `hover-scale` class
- **Animations**: float, pulse-glow, shimmer, fade-in, shake

---

## 🔧 Configuration

### Environment Variables

| Variable                        | Description                  | Required |
| ------------------------------- | ---------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL         | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key       | ✅       |
| `DATABASE_URL`                  | PostgreSQL connection string | ✅       |
| `OPENROUTER_API_KEY`            | OpenRouter API key           | ✅       |
| `NEXT_PUBLIC_SITE_URL`          | Site URL (for OAuth)         | ✅       |
| `MIDTRANS_SERVER_KEY`           | Midtrans payment key         | ❌       |
| `MIDTRANS_CLIENT_KEY`           | Midtrans client key          | ❌       |

### Supabase Setup

See detailed guide: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

1. Create Supabase project
2. Get API keys
3. Run database schema
4. Configure OAuth providers
5. Setup email templates

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**

   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_SITE_URL` to your Vercel domain

4. **Deploy**

   - Click "Deploy"
   - Wait for build to complete

5. **Update OAuth Redirects**
   - Update Google/GitHub OAuth redirect URLs
   - Update Supabase redirect URLs

---

## 📊 Database Schema

### Tables

- **prompts** - User generated prompts
- **templates** - Marketplace templates
- **purchases** - Template purchases
- **favorites** - User favorites
- **reviews** - Template reviews
- **profiles** - Extended user profiles

### Security

- ✅ Row Level Security (RLS) enabled
- ✅ User-specific data isolation
- ✅ Public/private content separation
- ✅ Secure authentication flow

---

## 🎯 Roadmap

- [x] Modern UI/UX with glassmorphism
- [x] Supabase authentication
- [x] Email/password sign up/in
- [x] OAuth (Google, GitHub)
- [x] Database integration
- [x] Prompt history
- [x] Local storage caching
- [ ] Marketplace functionality
- [ ] Template creation
- [ ] Payment integration (Midtrans)
- [ ] Real-time collaboration
- [ ] API access for developers
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OpenRouter](https://openrouter.ai/) - AI API aggregator
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📞 Support

Need help?

- 📧 Email: support@promptcraft.app
- 💬 Discord: [Join our community](https://discord.gg/promptcraft)
- 📖 Docs: [Read the documentation](#-documentation)
- 🐛 Issues: [Report a bug](https://github.com/yourusername/promptcraft/issues)

---

<div align="center">

**Made with ❤️ by the PromptCraft Team**

⭐ Star us on GitHub — it helps!

[Website](https://promptcraft.app) • [Twitter](https://twitter.com/promptcraft) • [Discord](https://discord.gg/promptcraft)

</div>
