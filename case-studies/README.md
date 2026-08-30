# Case Study

Tulisan mendalam tentang lima sistem yang saya bangun. Isinya arsitektur, keputusan
teknis, dan kesalahan yang terjadi — bukan daftar fitur.

Angka commit diambil dari `git shortlog -sne`. Kalau saya bukan penulis utamanya,
itu ditulis apa adanya.

Tiap tautan di bawah menuju halamannya di situs — diagramnya digambar dengan HTML dan
CSS, jadi terbaca tanpa memuat pustaka apa pun:
**<https://rizkifahtur.github.io/portfolio/>**

| # | Proyek | Peran | Stack inti | Ukuran |
|---|---|---|---|---|
| 01 | [**Sawit Tracking**](https://rizkifahtur.github.io/portfolio/case-studies/sawit-tracking.html) — logistik sawit + akuntansi buku besar | Pengembang utama · 362/561 commit | Go · `net/http` · MariaDB · Redis · Vue 3 · TS | ±200.000 baris |
| 02 | [**Loyalin Reborn**](https://rizkifahtur.github.io/portfolio/case-studies/loyalin-reborn.html) — POS & loyalitas multi-tenant | Fullstack · 263/618 commit | Go · Gin · GORM · Vue 3 · Flutter | ±231.000 baris |
| 03 | [**Undangan Digital**](https://rizkifahtur.github.io/portfolio/case-studies/undangan-digital.html) — platform undangan pernikahan | Pengembang tunggal | Go · Gin · Vue 3 · TS · Tailwind 4 | ±42.000 baris |
| 04 | [**VapeKanbaru Admin**](https://rizkifahtur.github.io/portfolio/case-studies/vapekanbaru-admin.html) — panel operasional ritel | Pengembang utama panel · 26/47 commit | Nuxt 2 · Vue 2 · Tailwind · PWA | ±14.000 baris |
| 05 | [**Kreasi Uap**](https://rizkifahtur.github.io/portfolio/case-studies/kreasi-uap.html) — profil perusahaan + CMS | Pengembang | Laravel · Blade · Alpine · Tailwind | ±12.500 baris |

---

## Kalau waktu Anda terbatas

- **Ingin melihat kedalaman teknis** → [Sawit Tracking](https://rizkifahtur.github.io/portfolio/case-studies/sawit-tracking.html),
  bagian *Penjaga bagan akun* dan *Aturan paginasi yang lahir dari bug diam*.
- **Ingin melihat jangkauan** → [Loyalin Reborn](https://rizkifahtur.github.io/portfolio/case-studies/loyalin-reborn.html) — satu backend Go,
  satu SPA Vue, dan tiga aplikasi Flutter, ketiganya saya sentuh.
- **Ingin melihat kerja solo dari nol** → [Undangan Digital](https://rizkifahtur.github.io/portfolio/case-studies/undangan-digital.html) —
  213 template dari satu set variabel CSS, dan 32 fungsi test.

---

← [Kembali ke README utama](../README.md)
