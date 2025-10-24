/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Tambahkan deklarasi untuk variabel lingkungan lain yang Anda gunakan di sisi klien
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
