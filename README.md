# REST API Pencatatan Peminjaman Buku Perpustakaan 📚

## 📌 Deskripsi Umum & Tujuan Proyek
Proyek ini dibuat untuk memenuhi tugas Responsi Praktikum Pemrograman Perangkat Bergerak (PPB) 2026. Proyek ini berupa RESTful API sederhana yang dibangun menggunakan **Node.js** dan **Express.js** dengan **Supabase** sebagai layanan *Database-as-a-Service* (BaaS). 

Tujuan utama dari proyek ini adalah untuk menyediakan layanan *backend* (API) sistem pencatatan peminjaman buku perpustakaan. API ini mendemonstrasikan implementasi fitur CRUD (Create, Read, Update, Delete) secara penuh, serta dilengkapi dengan fitur *filter query* untuk mencari data spesifik (misalnya berdasarkan status peminjaman).

---

## 🚀 Link Hasil Deployment Vercel
API telah berhasil di-*deploy* ke Vercel agar dapat diakses secara publik dan diintegrasikan dengan aplikasi *front-end* atau *mobile*.

🔗 **Base URL Vercel:** `[MASUKKAN_LINK_VERCEL_KAMU_DISINI_CONTOH: https://ppb-responsi-loans.vercel.app]`

---

## 🗄️ Struktur Data / Schema
Data disimpan pada database PostgreSQL (Supabase) di dalam tabel bernama `loans`. Berikut adalah skema struktur datanya:

| Nama Kolom    | Tipe Data | Keterangan                                      |
| ------------- | --------- | ----------------------------------------------- |
| `id`          | `uuid`    | Primary Key, *default: gen_random_uuid()*       |
| `member_name` | `text`    | Nama anggota perpustakaan yang meminjam (Wajib) |
| `book_title`  | `text`    | Judul buku yang dipinjam (Wajib)                |
| `borrow_date` | `date`    | Tanggal peminjaman buku (Wajib)                 |
| `return_date` | `date`    | Tanggal pengembalian buku (Boleh kosong/Null)   |
| `status`      | `text`    | Status peminjaman (Default: `'Dipinjam'`)       |

**Query SQL untuk membuat tabel (dijalankan di SQL Editor Supabase):**
```sql
create table loans (
    id uuid primary key default gen_random_uuid(),
    member_name text not null,
    book_title text not null,
    borrow_date date not null,
    return_date date,
    status text not null default 'Dipinjam'
);
```

---

## 🛠️ Panduan Instalasi & Cara Menjalankan Lokal (Tutorial)

Bagi pengembang yang ingin mencoba atau mengembangkan API ini secara lokal, silakan ikuti langkah-langkah berikut:

**1. Clone Repository**
Buka terminal/Git Bash dan *clone* repositori ini ke komputer Anda:
```bash
git clone https://github.com/Peanodd/ppb-responsi-loans.git
cd ppb-responsi-loans
```

**2. Instalasi Dependensi**
Pastikan Anda sudah menginstal Node.js. Jalankan perintah berikut untuk menginstal semua *library* yang dibutuhkan (Express, Supabase-js, Dotenv):
```bash
npm install
```

**3. Konfigurasi Environment Variables (Supabase)**
* Buat file baru bernama `.env` di folder utama (root) proyek.
* Masukkan URL dan *Anon Key* dari *project* Supabase Anda ke dalam file `.env` dengan format berikut:
```env
SUPABASE_URL=https://[PROJECT-ID].supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5...
PORT=3000
```

**4. Jalankan Server Lokal**
Mulai server dalam mode *development* menggunakan `nodemon` dengan perintah:
```bash
npm run dev
```
Jika berhasil, terminal akan menampilkan pesan: `Server running on port 3000`. API siap diuji coba melalui `http://localhost:3000/api/loans`.

---

## 📡 Contoh Request dan Response (Dokumentasi Endpoint)

Berikut adalah panduan dan contoh hasil pengujian ke-5 endpoint utama menggunakan Postman.

### 1. Create (Menambah Data Peminjaman)
* **Endpoint:** `POST /api/loans`
* **Request Body (JSON):**
```json
{
  "member_name": "Yoshio",
  "book_title": "Pemrograman Perangkat Bergerak",
  "borrow_date": "2026-10-10",
  "status": "Dipinjam"
}
```
* **Response (201 Created):**
```json
{
  "id": "c9a781b2-1111-4f8a-9c78-123456789abc",
  "member_name": "Yoshio",
  "book_title": "Pemrograman Perangkat Bergerak",
  "borrow_date": "2026-10-10",
  "return_date": null,
  "status": "Dipinjam"
}
```

### 2. Read All (Melihat Seluruh Data Peminjaman)
* **Endpoint:** `GET /api/loans`
* **Response (200 OK):**
```json
[
  {
    "id": "c9a781b2-1111-4f8a-9c78-123456789abc",
    "member_name": "Yoshio",
    "book_title": "Pemrograman Perangkat Bergerak",
    "borrow_date": "2026-10-10",
    "return_date": null,
    "status": "Dipinjam"
  },
  {
    "id": "d8b672c3-2222-5g9b-0d89-987654321def",
    "member_name": "Budi Santoso",
    "book_title": "Jaringan Komputer Lanjut",
    "borrow_date": "2026-09-01",
    "return_date": null,
    "status": "Terlambat"
  }
]
```

### 3. Read Filter (Melihat Data dengan Filter Status)
* **Endpoint:** `GET /api/loans?status=Terlambat`
* **Response (200 OK):**
```json
[
  {
    "id": "d8b672c3-2222-5g9b-0d89-987654321def",
    "member_name": "Budi Santoso",
    "book_title": "Jaringan Komputer Lanjut",
    "borrow_date": "2026-09-01",
    "return_date": null,
    "status": "Terlambat"
  }
]
```

### 4. Update (Memperbarui Data - Cth: Mengembalikan Buku)
* **Endpoint:** `PUT /api/loans/:id` *(Ganti `:id` dengan UUID asli)*
* **Request Body (JSON):**
```json
{
  "status": "Dikembalikan",
  "return_date": "2026-10-14"
}
```
* **Response (200 OK):**
```json
{
  "id": "c9a781b2-1111-4f8a-9c78-123456789abc",
  "member_name": "Yoshio",
  "book_title": "Pemrograman Perangkat Bergerak",
  "borrow_date": "2026-10-10",
  "return_date": "2026-10-14",
  "status": "Dikembalikan"
}
```

### 5. Delete (Menghapus Data Peminjaman)
* **Endpoint:** `DELETE /api/loans/:id` *(Ganti `:id` dengan UUID asli)*
* **Response (200 OK):**
```json
{
  "message": "Data peminjaman berhasil dihapus"
}
```