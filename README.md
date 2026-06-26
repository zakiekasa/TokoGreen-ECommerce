# TokoGreen - Premium E-Commerce App

[![Laravel Version](https://img.shields.io/badge/laravel-v11.x-red.svg)](https://laravel.com)
[![React Version](https://img.shields.io/badge/react-v18.x-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-v5.x-blue.svg)](https://www.typescriptlang.org)
[![Bootstrap](https://img.shields.io/badge/bootstrap-v5.3-purple.svg)](https://getbootstrap.com)

**TokoGreen** adalah aplikasi e-commerce premium yang didesain dengan performa tinggi menggunakan arsitektur monorepo modern yang menggabungkan kekuatan backend **Laravel** dan interaktivitas SPA dari **React** + **TypeScript** melalui **Inertia.js**.

---

## 🎨 Panduan Desain & Estetika
Aplikasi ini didesain secara manual untuk menghadirkan visual yang bersih dan nyaman dipandang:
*   **Warna Utama**: Putih (`#FFFFFF`) - memberikan ruang pandang yang lapang dan bersih.
*   **Warna Teks**: Hitam (`#1A1A1A`) - teks tebal dengan kontras optimal untuk kenyamanan membaca.
*   **Warna Aksen**: Hijau (`#03AC0E`) - warna hijau cerah yang digunakan untuk tombol utama, harga, lencana promo, dan elemen interaktif.
*   **Tipografi**: Menggunakan kombinasi font **Outfit** untuk judul berkesan modern/premium dan **Inter** untuk keterbacaan tinggi di bagian teks produk/deskripsi.

---

## 🚀 Fitur Utama
1.  **Sistem Registrasi & Login (Multi-Role)**: Pengguna dapat mendaftar dengan memilih peran sebagai **Pembeli** (Buyer) atau **Penjual** (Seller).
2.  **Dashboard Penjual (CRUD Produk Toko)**: Fitur eksklusif bagi pengguna bersatus Penjual untuk mengelola barang dagangan mereka (Create, Read, Update, Delete) lengkap dengan pratinjau kartu produk secara real-time.
3.  **Halaman Utama & Catalog**: Banner slider dinamis (promo), daftar kategori dengan ikon, dan grid produk responsif.
4.  **Live Search & Filter**: Cari produk secara instan berdasarkan kata kunci dan filter berdasarkan kategori tanpa reload halaman.
5.  **Detail Produk Premium**: Tampilan 3 kolom desktop (Gambar, Info Detail, dan Widget Transaksi Kuantitas) serta rekomendasi produk serupa di bagian bawah.
6.  **Hybrid Cart (Keranjang Belanja)**: Mendukung penyimpanan keranjang berbasis database untuk pengguna terdaftar dan otomatis menggunakan *Session ID* lokal untuk pengguna tamu (guest).
7.  **Simulasi Checkout**: Form pengisian alamat pengiriman lengkap, pemilihan kurir/pembayaran (COD, Gopay, Transfer Bank), dan validasi instan.
8.  **Riwayat Transaksi**: Laporan transaksi sukses dengan nomor invoice unik, rincian barang yang dibeli, alamat pengiriman, dan status pesanan.

---

## 🛠️ Tech Stack & Arsitektur
*   **Backend**: Laravel 11 (Routing, Eloquent ORM, Database Transactions)
*   **Frontend**: React 18, TypeScript, Inertia.js React Adapter
*   **Vite**: Compiler aset ultra-cepat untuk TypeScript dan CSS
*   **Styling**: Bootstrap 5 + Bootstrap Icons + Custom CSS Overrides (`app.css`)
*   **Database**: SQLite

Untuk rincian desain struktur database dan integrasi data, silakan tinjau [ARCHITECTURE.md](file:///Users/zaki/Documents/Portofolio/ARCHITECTURE.md).

---

## 💻 Panduan Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda:

### Prasyarat
*   PHP >= 8.2 (Disarankan menggunakan Laravel Herd atau PHP 8.3+)
*   Composer
*   Node.js (LTS version) & NPM

### Langkah-langkah
1.  **Clone repositori ini**:
    ```bash
    git clone https://github.com/username/tokogreen.git
    cd tokogreen
    ```

2.  **Instalasi dependensi PHP (Laravel)**:
    ```bash
    composer install
    ```

3.  **Instalasi dependensi Frontend (React & Bootstrap)**:
    ```bash
    npm install
    ```

4.  **Salin berkas konfigurasi lingkungan**:
    ```bash
    cp .env.example .env
    ```

5.  **Konfigurasi Database**:
    Secara default, Laravel dikonfigurasi menggunakan SQLite. Buat berkas database SQLite kosong di direktori `database`:
    *   **Mac/Linux**:
        ```bash
        touch database/database.sqlite
        ```
    *   **Windows (PowerShell)**:
        ```bash
        New-Item database/database.sqlite
        ```

6.  **Jalankan migrasi database beserta seeder data produk**:
    ```bash
    php artisan migrate --seed
    ```

7.  **Hasilkan application key**:
    ```bash
    php artisan key:generate
    ```

8.  **Jalankan server lokal (gunakan dua terminal berbeda)**:
    *   **Terminal 1 (Laravel backend server)**:
        ```bash
        php artisan serve
        ```
    *   **Terminal 2 (Vite development server)**:
        ```bash
        npm run dev
        ```

Buka browser Anda dan akses `http://127.0.0.1:8000`.
