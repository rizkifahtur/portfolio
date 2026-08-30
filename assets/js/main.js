/* ==========================================================================
   Portofolio — perilaku halaman
   Tanpa dependensi. Semuanya progressive enhancement: kalau berkas ini gagal
   dimuat, halaman tetap terbaca penuh.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Tema */
  var toggle = document.getElementById('theme-toggle');

  function temaAktif() {
    var eksplisit = document.documentElement.getAttribute('data-theme');
    if (eksplisit) return eksplisit;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var baru = temaAktif() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', baru);
      try { localStorage.setItem('tema', baru); } catch (e) { /* storage diblokir */ }

      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', baru === 'dark' ? '#0B0C0E' : '#F6F4F0');
    });
  }

  /* -------------------------------------------------- Reveal saat scroll */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    // Tanpa observer atau saat pengguna minta minim gerak: tampilkan langsung.
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { revealObserver.observe(el); });

    // Jaring pengaman. Elemen .reveal mulai dari opacity 0, jadi kalau observer-nya
    // tidak pernah berjalan — tab latar belakang yang di-throttle, mesin perayap yang
    // menjalankan JS tapi tidak pernah menggulir, atau peramban yang berperilaku lain —
    // isi halaman hilang sama sekali. Setelah 2,5 detik, tampilkan apa pun yang tersisa.
    // Portofolio yang animasinya tidak jalan masih berguna; portofolio yang kosong tidak.
    setTimeout(function () {
      Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
      revealObserver.disconnect();
    }, 2500);
  }

  /* ------------------------------------------- Angka menghitung naik */
  var counters = document.querySelectorAll('[data-count]');

  function hitungNaik(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    var mulai = null;
    var durasi = 1100;

    function langkah(waktu) {
      if (mulai === null) mulai = waktu;
      var p = Math.min((waktu - mulai) / durasi, 1);
      // ease-out kubik — cepat di awal, melambat di akhir
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('id-ID');
      if (p < 1) requestAnimationFrame(langkah);
    }

    requestAnimationFrame(langkah);
  }

  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        hitungNaik(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
  }

  /* ------------------------------------------- Sorot menu seksi aktif */
  var seksi = document.querySelectorAll('main section[id]');
  var tautanNav = {};

  Array.prototype.forEach.call(document.querySelectorAll('.nav a[href^="#"]'), function (a) {
    tautanNav[a.getAttribute('href').slice(1)] = a;
  });

  if (seksi.length && 'IntersectionObserver' in window) {
    var terlihat = new Set();

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) terlihat.add(entry.target.id);
        else terlihat.delete(entry.target.id);
      });

      Object.keys(tautanNav).forEach(function (id) {
        tautanNav[id].removeAttribute('aria-current');
      });

      // Ambil seksi terlihat yang paling atas di dokumen.
      var urut = Array.prototype.filter.call(seksi, function (s) { return terlihat.has(s.id); });
      if (urut.length && tautanNav[urut[0].id]) {
        tautanNav[urut[0].id].setAttribute('aria-current', 'true');
      }
    }, { rootMargin: '-25% 0px -60% 0px' });

    Array.prototype.forEach.call(seksi, function (s) { navObserver.observe(s); });
  }

  /* ------------------------------------------------- Tombol salin teks */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var teks = btn.getAttribute('data-copy');
      var label = btn.textContent;

      function selesai(berhasil) {
        btn.textContent = berhasil ? 'Tersalin' : 'Gagal';
        btn.setAttribute('data-copied', String(berhasil));
        setTimeout(function () {
          btn.textContent = label;
          btn.removeAttribute('data-copied');
        }, 1800);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(teks).then(function () { selesai(true); },
                                                 function () { selesai(false); });
        return;
      }

      // Cadangan untuk konteks tanpa clipboard API (mis. buka lewat file://)
      try {
        var ta = document.createElement('textarea');
        ta.value = teks;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        selesai(ok);
      } catch (e) {
        selesai(false);
      }
    });
  });

  /* ------------------------------------------------------ Tahun footer */
  var tahun = document.getElementById('tahun');
  if (tahun) tahun.textContent = String(new Date().getFullYear());
})();
