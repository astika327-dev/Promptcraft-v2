# PromptCraft

PromptCraft adalah platform AI siap produksi yang memungkinkan Anda membuat prompt berkualitas tinggi yang dioptimalkan untuk model AI target seperti GPT-4, Claude 3.5, dan lainnya.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fastika327-dev%2Fpromptcraft&env=VITE_API_BASE_URL&root-directory=client)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/astika327-dev/promptcraft)
---

## Fitur

- **Generasi Prompt Cerdas**: Masukkan tujuan Anda dan dapatkan prompt yang dibuat secara ahli.
- **Dukungan Multi-Model**: Optimalkan prompt untuk GPT-4, Claude 3.5, Llama 3, Gemini, dan Stable Diffusion.
- **Galeri Template**: Mulai cepat dengan templat bawaan untuk berbagai kasus penggunaan.
- **Arsitektur Siap Produksi**: Frontend dan backend yang dapat diskalakan dan siap untuk di-deploy.
- **Salin Sekali Klik**: Salin prompt yang dihasilkan dengan mudah ke clipboard Anda.

## Tumpukan Teknologi

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI (Python 3.11+), Uvicorn
- **AI Gateway**: OpenRouter
- **Database**: PostgreSQL (direkomendasikan Supabase)
- **Deployment**: Vercel (Frontend), Render (Backend), Supabase (Database)

---

## Pengaturan Lokal

### Prasyarat

- Node.js (v18+) dan npm
- Python (v3.11+) dan pip
- Akun [OpenRouter](https://openrouter.ai/) untuk mendapatkan API key
- Akun [Supabase](https://supabase.com/) untuk URL database (opsional untuk pengembangan lokal)

### 1. Backend (Server)

```bash
# 1. Pindah ke direktori server
cd server

# 2. (Direkomendasikan) Buat dan aktifkan lingkungan virtual
python -m venv venv

# Aktifkan virtual environment:
# - Di macOS/Linux (bash/zsh):
source venv/bin/activate
# - Di Windows (Command Prompt/PowerShell):
# venv\Scripts\activate

# 3. Instal dependensi
pip install -r requirements.txt

# 4. Buat file .env dari contoh
cp .env.example .env

# 5. Tambahkan API key OpenRouter Anda ke file .env
# OPENROUTER_API_KEY="your_openrouter_api_key_here"

# 6. Jalankan server backend
uvicorn main:app --reload
```
Server API sekarang akan berjalan di `http://localhost:8000`.

### 2. Frontend (Client)

```bash
# 1. (Jika Anda dari direktori server) Kembali ke direktori root proyek
cd ..

# 2. Pindah ke direktori client
cd client

# 3. Instal dependensi
npm install

# 4. Jalankan server pengembangan frontend
npm run dev
```
Aplikasi React sekarang akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sedang digunakan).

---

## Deployment

### 1. Database (Supabase)

1. **Buat Proyek Baru**: Buka [Supabase](https://supabase.com/) dan buat proyek baru.
2. **Dapatkan URL Database**: Navigasikan ke `Settings` -> `Database`. Di bawah `Connection string`, salin URI.
3. **Simpan URL Ini**: Anda akan memerlukannya untuk deployment backend.

### 2. Backend (Render)

1. **Buat Layanan Web Baru**: Buka [Render](https://render.com/) dan klik `New` -> `Web Service`.
2. **Hubungkan Repositori Anda**: Hubungkan repositori GitHub Anda.
3. **Konfigurasi Pengaturan**:
   - **Environment**: `Python 3`
   - **Root Directory**: `server`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Tambahkan Variabel Lingkungan**:
   - `OPENROUTER_API_KEY`: Kunci API OpenRouter Anda.
   - `DATABASE_URL`: URL koneksi Supabase Anda.
   - `PYTHON_VERSION`: `3.11.0` (atau versi yang Anda gunakan)
5. **Deploy**: Klik `Create Web Service`. Setelah selesai, salin URL layanan Anda.

### 3. Frontend (Vercel)

1. **Buat Proyek Baru**: Buka [Vercel](https://vercel.com/) dan klik `Add New...` -> `Project`.
2. **Impor Repositori Anda**: Hubungkan repositori GitHub Anda.
3. **Konfigurasi Proyek**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
4. **Tambahkan Variabel Lingkungan**:
   - `VITE_API_BASE_URL`: URL backend Render yang Anda salin sebelumnya.
5. **Deploy**: Klik `Deploy`.
