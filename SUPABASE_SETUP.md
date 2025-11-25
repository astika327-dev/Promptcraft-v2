# Supabase Integration Guide untuk PromptCraft

## 📋 Prerequisites

- Akun Supabase (gratis di [supabase.com](https://supabase.com))
- Node.js 14+ terinstall
- Git terinstall

## 🚀 Setup Supabase

### 1. Create Supabase Project

1. Buka [supabase.com](https://supabase.com) dan sign in
2. Click "New Project"
3. Isi detail project:
   - **Name**: PromptCraft
   - **Database Password**: (simpan password ini!)
   - **Region**: Pilih yang terdekat dengan user Anda
4. Click "Create new project"
5. Tunggu beberapa menit sampai project selesai dibuat

### 2. Get API Keys

1. Di dashboard Supabase, buka **Settings** → **API**
2. Copy credentials berikut:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (panjang)
   - **service_role key**: `eyJhbGc...` (untuk admin operations)

### 3. Setup Database Schema

1. Di dashboard Supabase, buka **SQL Editor**
2. Click "New Query"
3. Copy seluruh isi file `supabase/schema.sql`
4. Paste ke SQL Editor
5. Click "Run" atau tekan `Ctrl+Enter`
6. Tunggu sampai selesai (akan muncul "Success" message)

### 4. Configure Environment Variables

1. Copy file `.env.example` menjadi `.env.local`:

   ```bash
   copy .env.example .env.local
   ```

2. Edit `.env.local` dan isi dengan credentials Supabase Anda:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
   DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres"

   # OpenRouter API (for prompt generation)
   OPENROUTER_API_KEY="your-openrouter-api-key"

   # App Configuration
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

### 5. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 6. Setup OAuth Providers (Optional)

#### Google OAuth

1. Di Supabase Dashboard, buka **Authentication** → **Providers**
2. Enable **Google**
3. Buka [Google Cloud Console](https://console.cloud.google.com/)
4. Create new project atau pilih existing project
5. Enable **Google+ API**
6. Buka **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
7. Application type: **Web application**
8. Authorized redirect URIs:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
9. Copy **Client ID** dan **Client Secret**
10. Paste ke Supabase Google Provider settings
11. Click **Save**

#### GitHub OAuth

1. Di Supabase Dashboard, buka **Authentication** → **Providers**
2. Enable **GitHub**
3. Buka [GitHub Developer Settings](https://github.com/settings/developers)
4. Click **New OAuth App**
5. Fill in:
   - **Application name**: PromptCraft
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `https://your-project-ref.supabase.co/auth/v1/callback`
6. Click **Register application**
7. Copy **Client ID** dan generate **Client Secret**
8. Paste ke Supabase GitHub Provider settings
9. Click **Save**

### 7. Configure Email Templates (Optional)

1. Di Supabase Dashboard, buka **Authentication** → **Email Templates**
2. Customize templates untuk:
   - **Confirm signup**: Email verifikasi
   - **Invite user**: Undangan user
   - **Magic Link**: Passwordless login
   - **Change Email Address**: Konfirmasi perubahan email
   - **Reset Password**: Reset password

### 8. Setup Row Level Security (RLS)

RLS sudah dikonfigurasi di `schema.sql`. Verify dengan:

1. Buka **Database** → **Tables**
2. Click pada table (e.g., `prompts`)
3. Buka tab **Policies**
4. Pastikan policies sudah ada

## 🧪 Testing Authentication

### Test Email/Password Sign Up

```bash
npm run dev
```

1. Buka `http://localhost:3000/auth/signup`
2. Isi form dengan email dan password
3. Check email untuk verification link
4. Click link untuk verify
5. Sign in di `http://localhost:3000/auth/signin`

### Test OAuth Sign In

1. Buka `http://localhost:3000/auth/signin`
2. Click "Google" atau "GitHub" button
3. Authorize aplikasi
4. Akan redirect ke homepage setelah sukses

## 📊 Database Structure

### Tables

1. **prompts** - User generated prompts

   - `id`: UUID primary key
   - `user_id`: Reference to auth.users
   - `input_text`: Original user input
   - `generated_prompt`: AI generated prompt
   - `created_at`, `updated_at`: Timestamps

2. **templates** - Marketplace templates

   - `id`: UUID primary key
   - `user_id`: Template creator
   - `title`, `description`: Template info
   - `prompt_template`: Template content
   - `category`: Template category
   - `price`: Template price
   - `downloads`, `rating`: Stats
   - `is_published`: Visibility flag

3. **purchases** - Template purchases

   - `id`: UUID primary key
   - `user_id`: Buyer
   - `template_id`: Purchased template
   - `price_paid`: Amount paid
   - `purchased_at`: Purchase timestamp

4. **favorites** - User favorites

   - `id`: UUID primary key
   - `user_id`: User who favorited
   - `template_id`: Favorited template

5. **reviews** - Template reviews

   - `id`: UUID primary key
   - `user_id`: Reviewer
   - `template_id`: Reviewed template
   - `rating`: 1-5 stars
   - `comment`: Review text

6. **profiles** - Extended user info
   - `id`: UUID (same as auth.users.id)
   - `full_name`: User's full name
   - `avatar_url`: Profile picture
   - `bio`: User bio
   - `website`: User website

## 🔐 Security Features

### Row Level Security (RLS)

- ✅ Users can only view/edit their own data
- ✅ Published templates visible to everyone
- ✅ Reviews visible to everyone
- ✅ Purchases private to user

### Authentication

- ✅ Email/Password authentication
- ✅ OAuth (Google, GitHub)
- ✅ Email verification
- ✅ Password reset
- ✅ Session management

## 🛠️ API Usage Examples

### Save Prompt to Database

```javascript
import { savePrompt } from "@/lib/supabase";

const { data, error } = await savePrompt(
  user.id,
  "my input text",
  "generated prompt text"
);
```

### Get User's Prompt History

```javascript
import { getPromptHistory } from "@/lib/supabase";

const { data, error } = await getPromptHistory(user.id, 10);
```

### Get Marketplace Templates

```javascript
import { getTemplates } from "@/lib/supabase";

const { data, error } = await getTemplates({
  category: "Design",
  search: "logo",
});
```

### Create Template

```javascript
import { createTemplate } from "@/lib/supabase";

const { data, error } = await createTemplate(user.id, {
  title: "Professional Logo",
  description: "Create amazing logos",
  prompt_template: "Design a {style} logo...",
  category: "Design",
  price: 4.99,
  is_published: true,
});
```

## 🔄 Real-time Features (Optional)

Supabase mendukung real-time subscriptions:

```javascript
import { supabase } from "@/lib/supabase";

// Subscribe to new templates
const subscription = supabase
  .channel("templates")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "templates",
    },
    (payload) => {
      console.log("New template:", payload.new);
    }
  )
  .subscribe();

// Unsubscribe when done
subscription.unsubscribe();
```

## 📈 Analytics & Monitoring

### Supabase Dashboard

1. **Auth** → **Users**: Monitor user signups
2. **Database** → **Tables**: View data
3. **Storage** → **Buckets**: File uploads (if needed)
4. **Logs** → **Query Logs**: Monitor queries

### Custom Views

Schema includes helpful views:

```sql
-- Popular templates
SELECT * FROM popular_templates LIMIT 10;

-- User statistics
SELECT * FROM user_stats WHERE id = 'user-uuid';
```

## 🚨 Troubleshooting

### "Invalid API key"

- Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server after changing env vars

### "Row Level Security policy violation"

- Verify user is authenticated
- Check RLS policies in Supabase dashboard
- Ensure user_id matches authenticated user

### "Email not confirmed"

- Check spam folder for verification email
- Resend verification email from Supabase dashboard
- Or disable email confirmation in Auth settings (dev only)

### OAuth redirect issues

- Verify callback URL matches exactly
- Check OAuth provider settings
- Ensure HTTPS in production

## 🌐 Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project di Vercel
3. Add environment variables:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL`
   - `OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)

4. Update OAuth redirect URLs:
   - Google: `https://your-domain.com/auth/callback`
   - GitHub: `https://your-domain.com/auth/callback`
   - Supabase: `https://your-project.supabase.co/auth/v1/callback`

### Custom Domain

1. Add custom domain di Vercel
2. Update `NEXT_PUBLIC_SITE_URL` to your domain
3. Update OAuth redirect URLs
4. Update email templates dengan domain baru

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 💡 Tips

1. **Development**: Gunakan anon key, bukan service_role key
2. **Security**: Jangan commit `.env.local` ke Git
3. **Performance**: Add indexes untuk queries yang sering digunakan
4. **Backup**: Enable automatic backups di Supabase dashboard
5. **Monitoring**: Setup alerts untuk errors dan usage limits

## 🎉 You're Done!

Aplikasi PromptCraft sekarang sudah terintegrasi dengan Supabase! 🚀

Test semua fitur:

- ✅ Sign up / Sign in
- ✅ OAuth authentication
- ✅ Generate prompts
- ✅ Save to database
- ✅ View history
- ✅ Browse marketplace

Selamat coding! 🎨
