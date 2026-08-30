<div align="center">

# Rizki Fahturrahman

**Fullstack Engineer** — Go · Vue · Flutter

Saya membangun sistem yang dipakai bisnis untuk bekerja setiap hari:
buku besar akuntansi, logistik lapangan, penggajian, dan point-of-sale.

[**🌐 Lihat situs portofolio**](https://rizkifahtur.github.io/portfolio/) ·
[**📄 Case study**](case-studies/README.md) ·
[**GitHub**](https://github.com/rizkifahtur)

</div>

---

## Ringkas

| | |
|---|---|
| **Domain** | Akuntansi double-entry · Logistik · Point-of-sale · Loyalitas |
| **Bahasa** | Go · TypeScript · JavaScript · Dart · PHP · SQL |
| **Backend** | `net/http` · Gin · GORM · Nitro · Express · Laravel · MySQL/MariaDB · PostgreSQL · Redis |
| **Frontend** | Vue 3 · Nuxt 2/3 · Vite · Tailwind CSS · Pinia · ApexCharts · Leaflet |
| **Mobile** | Flutter · Dio · cetak thermal Bluetooth · serial port |
| **Operasional** | Nginx · systemd · PM2 · Docker · GitHub Actions · Play Console |

Yang membedakan pekerjaan saya bukan tumpukan teknologinya, tapi domainnya:
**sistem yang salah hitung sedikit saja akan merugikan pemakainya secara nyata**, dan
penggunanya bukan orang teknis.

---

## Proyek unggulan

Angka commit di bawah diambil apa adanya dari `git shortlog -sne`. Kalau saya bukan
penulis utamanya, itu ditulis — porsi kontribusi lebih berguna daripada klaim.

### 01 · [Sawit Tracking](case-studies/sawit-tracking.md)
**Pengembang utama · 362 dari 561 commit · ±200.000 baris**

Sistem logistik kelapa sawit yang menyatu dengan pembukuan akuntansi penuh — melacak
pengiriman, menagih gudang, menggaji supir, dan menutup buku dalam satu aplikasi.

- Mesin jurnal **double-entry** sendiri: transaksi operasional → jurnal draft → posting → laporan
- **Multi-tenant database-per-perusahaan**, 339 migrasi idempoten yang jalan otomatis
- **Penjaga bagan akun** + skrip pemeriksa migrasi, dibuat setelah satu migrasi menimpa akun akuntan tanpa jejak
- Backend Go **tanpa framework web** — `net/http`, router dan middleware chain ditulis sendiri

`Go 1.25` `net/http` `MariaDB` `Redis` `JWT` `excelize` `Vue 3` `TypeScript` `Vite` `Leaflet`

### 02 · [Loyalin Reborn](case-studies/loyalin-reborn.md)
**Fullstack · 263 dari 618 commit · ±231.000 baris**

Platform POS dan loyalitas multi-tenant. Satu backend Go melayani dashboard web, situs
marketing, dan tiga aplikasi Flutter — kasir, back-office, dan member.

- `DBManager` dengan pool GORM per tenant; cache prepared statement sengaja dimatikan agar koneksi berumur panjang tidak menghabiskan `max_prepared_stmt_count`
- Kasir Flutter dengan **cetak struk thermal Bluetooth** dan serial port, plus installer Windows berbahasa Indonesia
- **Satu build, dua pintu** — beranda statis, dashboard SPA, karena crawler WhatsApp tidak menjalankan JavaScript
- Registrasi mandiri lewat prosedur migrasi yang aman pada skema belum lengkap

`Go 1.25` `Gin` `GORM` `MySQL` `whatsmeow` `iPaymu` `Vue 3` `Tailwind 4` `Flutter` `Dio`

### 03 · [Undangan Digital](case-studies/undangan-digital.md)
**Pengembang tunggal · ±42.000 baris**

Platform undangan pernikahan digital dengan panel pemilik, tautan personal per tamu,
RSVP, check-in QR, dan buku kenangan.

- **213 template dalam 23 kategori** dari satu set custom property CSS — nol duplikasi markup
- **Kompresi foto di browser** sebelum unggah: PNG 3,6 MB → JPEG 286 KB
- **32 fungsi test** di 14 berkas, termasuk tanda tangan permintaan gateway pembayaran
- SQLite untuk dev tanpa setup, PostgreSQL untuk produksi

`Vue 3` `TypeScript` `Tailwind 4` `Pinia` `GSAP` `Go` `Gin` `GORM` `SQLite` `PostgreSQL`

### 04 · [VapeKanbaru Admin](case-studies/vapekanbaru-admin.md)
**Pengembang utama panel · 26 dari 47 commit · ±14.000 baris**

Panel operasional ritel: stempel loyalitas, voucher, katalog toko online, kurir dan
resi, broadcast WhatsApp, dan area khusus developer. 40+ halaman, PWA untuk tablet konter.

`Nuxt 2` `Vue 2` `Tailwind` `PWA` `QR Scanner`

### 05 · [Kreasi Uap](case-studies/kreasi-uap.md)
**Pengembang · ±12.500 baris**

Profil perusahaan dengan CMS penuh — 12 modul, setiap seksi beranda bisa diubah dari
panel admin. Blade + Alpine, bukan SPA, karena halamannya harus terindeks mesin pencari.

`Laravel` `Blade` `Spatie Permission` `Alpine.js` `Tailwind` `Vite`

---

## Kontribusi pada proyek tim

Repositori yang bukan saya pemiliknya. Porsi commit ditampilkan supaya jelas mana yang
saya pimpin dan mana yang saya bantu.

| Repositori | Yang saya kerjakan | Stack | Periode | Porsi |
|---|---|---|---|---|
| `loyalin-pos` | Laporan penjualan per kategori, form stok, pencarian produk, alur pemasangan PWA | Nuxt 3 · ApexCharts | 2025–2026 | 14 / 174 |
| `loyalin-mono` | Login PIN, voucher & diskon di form transaksi, alur tukar stempel | Turborepo · Nitro · Nuxt 3 | 2024–2025 | 35 / 259 |
| `loyalin-master` | Daftar merchant, manajemen perangkat, pengelolaan brand | Nuxt 3 · Nuxt UI · Knex | 2024 | 8 / 21 |
| `loyalin-api` | Pencarian lintas varian/SKU/brand, rate limiting pengiriman WhatsApp | Nitro · Bun · BullMQ | 2026 | 2 / 76 |

---

## Tentang repo ini

Situs portofolio statis — **HTML, CSS, dan JavaScript biasa**. Tanpa framework, tanpa
langkah build, tanpa dependensi runtime. Satu-satunya permintaan ke luar adalah Google Fonts.

```
portfolio/
├── index.html                    # seluruh isi situs
├── assets/
│   ├── css/style.css             # tema, tata letak, komponen
│   └── js/main.js                # tema gelap/terang, reveal, salin kontak
├── case-studies/                 # tulisan mendalam per proyek (Markdown + Mermaid)
│   ├── README.md
│   ├── sawit-tracking.md
│   ├── loyalin-reborn.md
│   ├── undangan-digital.md
│   ├── vapekanbaru-admin.md
│   └── kreasi-uap.md
├── .github/workflows/deploy.yml  # terbit otomatis ke GitHub Pages
└── .nojekyll
```

**Fitur situs:** tema gelap/terang mengikuti sistem dengan tombol pengubah yang diingat
di `localStorage` · animasi masuk yang menghormati `prefers-reduced-motion` · dapat
diakses keyboard dengan skip link · gaya cetak · seluruh isi tetap terbaca meski
JavaScript mati.

### Menjalankan di lokal

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

Membuka `index.html` langsung lewat `file://` juga jalan, hanya tombol salin
yang memakai jalur cadangan.

---

## Sebelum dipublikasikan — 4 hal yang perlu Anda ganti

Semua penanda ini ditandai komentar di dalam berkasnya.

| # | Apa | Di mana |
|---|---|---|
| 1 | **Kontak** — email, LinkedIn, WhatsApp | `index.html`, bagian `#kontak` (cari kata `PLACEHOLDER`) |
| 2 | **Lokasi** — saat ini "Indonesia · Remote" | `index.html`, kartu Ringkasan |
| 3 | **Nama repo** — kalau bukan `portfolio` | Cari-ganti `rizkifahtur/portfolio` di `index.html` |
| 4 | **URL situs** — `og:url` dan `canonical` | `index.html`, bagian `<head>` |

### Menerbitkan ke GitHub

```bash
cd portfolio
git init -b main
git add .
git commit -m "Portofolio: situs statis + lima case study"
git remote add origin git@github.com:rizkifahtur/portfolio.git
git push -u origin main
```

Lalu di GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Push berikutnya akan menerbitkan otomatis ke `https://rizkifahtur.github.io/portfolio/`.

---

## Catatan tentang kode sumber proyek

Repositori kelima proyek di atas milik klien dan tertutup. Case study di sini berisi
arsitektur, keputusan teknis, dan trade-off-nya — bukan kode. Saya senang membahasnya
lebih detail dalam diskusi langsung, termasuk bagian yang gagal dan alasannya.

---

<div align="center">
<sub>Dibuat tanpa framework · Lisensi <a href="LICENSE">MIT</a> untuk kode situs ini</sub>
</div>
