# Case Study

Tulisan mendalam tentang lima sistem yang saya bangun. Isinya arsitektur, keputusan
teknis, dan kesalahan yang terjadi — bukan daftar fitur.

Angka commit diambil dari `git shortlog -sne`. Kalau saya bukan penulis utamanya,
itu ditulis apa adanya.

| # | Proyek | Peran | Stack inti | Ukuran |
|---|---|---|---|---|
| 01 | [**Sawit Tracking**](sawit-tracking.md) — logistik sawit + akuntansi buku besar | Pengembang utama · 362/561 commit | Go · `net/http` · MariaDB · Redis · Vue 3 · TS | ±200.000 baris |
| 02 | [**Loyalin Reborn**](loyalin-reborn.md) — POS & loyalitas multi-tenant | Fullstack · 263/618 commit | Go · Gin · GORM · Vue 3 · Flutter | ±231.000 baris |
| 03 | [**Undangan Digital**](undangan-digital.md) — platform undangan pernikahan | Pengembang tunggal | Go · Gin · Vue 3 · TS · Tailwind 4 | ±42.000 baris |
| 04 | [**VapeKanbaru Admin**](vapekanbaru-admin.md) — panel operasional ritel | Pengembang utama panel · 26/47 commit | Nuxt 2 · Vue 2 · Tailwind · PWA | ±14.000 baris |
| 05 | [**Kreasi Uap**](kreasi-uap.md) — profil perusahaan + CMS | Pengembang | Laravel · Blade · Alpine · Tailwind | ±12.500 baris |

---

## Kalau waktu Anda terbatas

- **Ingin melihat kedalaman teknis** → [Sawit Tracking](sawit-tracking.md),
  bagian *Penjaga bagan akun* dan *Aturan paginasi yang lahir dari bug diam*.
- **Ingin melihat jangkauan** → [Loyalin Reborn](loyalin-reborn.md) — satu backend Go,
  satu SPA Vue, dan tiga aplikasi Flutter, ketiganya saya sentuh.
- **Ingin melihat kerja solo dari nol** → [Undangan Digital](undangan-digital.md) —
  213 template dari satu set variabel CSS, dan 32 fungsi test.

---

← [Kembali ke README utama](../README.md)
