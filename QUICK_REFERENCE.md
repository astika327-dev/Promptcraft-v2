# 🚀 PromptCraft - Quick Reference Guide

## 📋 Daftar Isi Cepat

- [Setup Cepat](#-setup-cepat)
- [Environment Variables](#-environment-variables)
- [Perintah Penting](#-perintah-penting)
- [File Penting](#-file-penting)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)

---

## ⚡ Setup Cepat

```bash
# 1. Clone & Install
git clone <repo-url>
cd promptcraft
npm install

# 2. Setup Environment
copy .env.example .env.local
# Edit .env.local dengan credentials Anda

# 3. Setup Supabase
# - Buat project di supabase.com
# - Copy schema.sql ke SQL Editor
# - Run schema

# 4. Run Development
npm run dev
# Buka http://localhost:3000
```

---

## 🔑 Environment Variables

```env
# WAJIB - Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."

# WAJIB - OpenRouter
OPENROUTER_API_KEY="sk-or-xxx"

# OPSIONAL - Database
DATABASE_URL="postgresql://..."

# OPSIONAL - Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 💻 Perintah Penting

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build production
npm run start        # Start production server
npm run lint         # Run linter

# Supabase (jika pakai Supabase CLI)
supabase init        # Initialize Supabase
supabase start       # Start local Supabase
supabase db push     # Push schema changes
supabase db reset    # Reset database
```

---

## 📁 File Penting

### Konfigurasi

- `.env.local` - Environment variables (JANGAN commit!)
- `.env.example` - Template environment variables
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Dokumentasi

- `README.md` - Project overview
- `SUPABASE_SETUP.md` - Supabase setup guide
- `UPGRADE_NOTES.md` - Upgrade details
- `SUMMARY.md` - Complete summary
- `QUICK_REFERENCE.md` - This file

### Core Files

- `app/layout.js` - Root layout
- `app/page.jsx` - Homepage
- `app/globals.css` - Global styles
- `lib/supabase.js` - Supabase client
- `components/AuthProvider.js` - Auth context

### Database

- `supabase/schema.sql` - Database schema

---

## 🔌 API Reference

### Supabase Auth

```javascript
import { signIn, signUp, signOut } from "@/lib/supabase";

// Sign up
const { data, error } = await signUp(email, password, {
  full_name: "John Doe",
});

// Sign in
const { data, error } = await signIn(email, password);

// Sign out
await signOut();

// OAuth
import { signInWithOAuth } from "@/lib/supabase";
await signInWithOAuth("google"); // or 'github'
```

### Supabase Database

```javascript
import { savePrompt, getPromptHistory, getTemplates } from "@/lib/supabase";

// Save prompt
await savePrompt(userId, inputText, generatedPrompt);

// Get history
const { data } = await getPromptHistory(userId, 10);

// Get templates
const { data } = await getTemplates({
  category: "Design",
  search: "logo",
});
```

### Custom Hooks

```javascript
import { useDebounce, useLocalStorage, useCopyToClipboard } from "@/lib/hooks";

// Debounce
const debouncedValue = useDebounce(value, 300);

// Local Storage
const [data, setData] = useLocalStorage("key", initialValue);

// Copy to Clipboard
const [copiedText, copy] = useCopyToClipboard();
await copy("text to copy");
```

### Auth Context

```javascript
import { useAuth } from "@/components/AuthProvider";

function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return <div>Hello {user.email}</div>;
}
```

---

## 🎨 CSS Classes

### Glass Effect

```jsx
<div className="glass-card rounded-2xl p-8">Content</div>
```

### Gradient Text

```jsx
<h1 className="gradient-text">Gradient Text</h1>
```

### Animations

```jsx
<div className="float-animation">Floating</div>
<div className="pulse-glow">Pulsing</div>
<div className="shimmer">Shimmer</div>
<div className="animate-fade-in">Fade In</div>
<div className="animate-shake">Shake</div>
```

### Hover Effects

```jsx
<button className="hover-scale">Hover me</button>
```

---

## 🐛 Troubleshooting

### Error: "Invalid API key"

```bash
# Check .env.local
# Pastikan NEXT_PUBLIC_SUPABASE_ANON_KEY benar
# Restart dev server
npm run dev
```

### Error: "RLS policy violation"

```bash
# Check apakah user sudah login
# Check RLS policies di Supabase dashboard
# Pastikan user_id match dengan auth.uid()
```

### OAuth tidak bekerja

```bash
# Check redirect URLs:
# - Google Console
# - GitHub Settings
# - Supabase Auth Settings
# Pastikan semua match
```

### Build error

```bash
# Clear cache
rm -rf .next
npm run build
```

### Database connection error

```bash
# Check DATABASE_URL di .env.local
# Test connection di Supabase dashboard
# Check firewall/network
```

---

## 📊 Database Tables

### prompts

```sql
id, user_id, input_text, generated_prompt, created_at, updated_at
```

### templates

```sql
id, user_id, title, description, prompt_template,
category, price, downloads, rating, is_published
```

### purchases

```sql
id, user_id, template_id, price_paid, purchased_at
```

### favorites

```sql
id, user_id, template_id, created_at
```

### reviews

```sql
id, user_id, template_id, rating, comment, created_at
```

### profiles

```sql
id, full_name, avatar_url, bio, website, created_at
```

---

## 🔐 Security Checklist

- [ ] `.env.local` ada di `.gitignore`
- [ ] Supabase RLS policies enabled
- [ ] OAuth redirect URLs configured
- [ ] Email verification enabled
- [ ] Strong password requirements
- [ ] HTTPS in production
- [ ] Environment variables di Vercel

---

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] Test semua fitur locally
- [ ] Run `npm run build` sukses
- [ ] Update environment variables
- [ ] Update OAuth redirect URLs
- [ ] Test authentication flow

### Vercel Deployment

- [ ] Push to GitHub
- [ ] Import project di Vercel
- [ ] Add environment variables
- [ ] Deploy
- [ ] Test production URL
- [ ] Update Supabase redirect URLs

### Post-deployment

- [ ] Test sign up/sign in
- [ ] Test OAuth
- [ ] Test prompt generation
- [ ] Test database operations
- [ ] Monitor errors di Vercel
- [ ] Monitor logs di Supabase

---

## 📞 Quick Links

- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Console**: https://console.cloud.google.com
- **GitHub Settings**: https://github.com/settings/developers
- **OpenRouter**: https://openrouter.ai

---

## 🎯 Common Tasks

### Add New Environment Variable

1. Add to `.env.local`
2. Add to `.env.example`
3. Restart dev server
4. Update Vercel if deployed

### Add New Database Table

1. Write SQL in `schema.sql`
2. Run in Supabase SQL Editor
3. Add RLS policies
4. Add helper functions in `lib/supabase.js`
5. Test locally

### Add New OAuth Provider

1. Enable in Supabase Auth
2. Get credentials from provider
3. Add to Supabase settings
4. Update sign-in page
5. Test flow

### Update Styles

1. Edit `app/globals.css` for global styles
2. Use Tailwind classes for components
3. Add custom classes in `@layer components`
4. Test responsive design

---

## 💡 Tips & Tricks

### Development

- Use `console.log()` untuk debugging
- Check browser DevTools Network tab
- Use React DevTools
- Check Supabase logs

### Performance

- Use `useCallback` untuk functions
- Use `useMemo` untuk expensive calculations
- Debounce user inputs
- Cache API responses

### Security

- Never commit `.env.local`
- Use environment variables
- Enable RLS di Supabase
- Validate user inputs
- Sanitize data

### Best Practices

- Write clean, readable code
- Add comments untuk complex logic
- Use TypeScript (optional)
- Write tests (optional)
- Follow Next.js conventions

---

<div align="center">

**Quick Reference v1.0**

_Bookmark this page untuk referensi cepat!_

</div>
