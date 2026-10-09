# Library Loan REST API

## Deskripsi
Proyek ini adalah RESTful API sederhana yang dibangun menggunakan Node.js, Express.js, dan Supabase untuk mengelola sistem pencatatan peminjaman buku perpustakaan. API ini mendukung operasi CRUD penuh dan fitur filter berdasarkan status peminjaman.

## URL Deployment
API dapat diakses secara publik melalui Vercel:
**[MASUKKAN_URL_VERCEL_ANDA_DI_SINI]**

## Struktur Data (Schema)
Tabel `loans` pada Supabase:
- `id` (uuid, Primary Key)
- `member_name` (text, Not Null)
- `book_title` (text, Not Null)
- `borrow_date` (date, Not Null)
- `return_date` (date, Nullable)
- `status` (text, Default: 'Dipinjam')

## Panduan Instalasi Lokal
1. Instal dependensi: `npm install`
2. Ubah nama file `.env.example` menjadi `.env` dan masukkan kredensial Supabase Anda.
3. Jalankan server: `npm run dev`
