/* ==========================================================================
   Portofolio — perilaku halaman
   Tanpa dependensi. Semuanya progressive enhancement: kalau berkas ini gagal
   dimuat, halaman tetap terbaca penuh.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ------------------------------------------- Giliran masuk sekelompok */
  // Kartu yang berjajar masuk bergiliran, bukan serempak. Indeksnya dipasang
  // di sini supaya markup tidak perlu menghafal angka penundaan satu per satu.
  [['.figures', '.figure'], ['.focus', '.focus__item'], ['.stack', '.stack__col']].forEach(function (pasangan) {
    Array.prototype.forEach.call(document.querySelectorAll(pasangan[0]), function (grup) {
      Array.prototype.forEach.call(grup.querySelectorAll(pasangan[1]), function (anak, i) {
        anak.style.setProperty('--i', String(i));
      });
    });
  });

  /* -------------------------------------------------- Batang porsi kerja */
  // Satu alat ukur dipakai di dua tempat: tabel kontribusi dan kartu
  // statistik proyek. Nilainya selalu diturunkan dari rasio yang sudah
  // tertulis di halaman — tidak ada angka baru yang lahir di JavaScript.

  function pasangBatang(fill, porsi) {
    // Lebar inline adalah sumber kebenaran saat JavaScript mati. Begitu kita
    // hidup, lebarnya dipenuhkan dan yang dianimasikan adalah skalanya.
    fill.style.width = '100%';
    fill.style.setProperty('--share', '0');
    fill.setAttribute('data-share', String(porsi));
  }

  var batang = [];

  // 1. Tabel kontribusi — batangnya sudah ada di markup dengan lebar persen.
  Array.prototype.forEach.call(document.querySelectorAll('.share__fill'), function (fill) {
    var persen = parseFloat(fill.style.width);
    if (isNaN(persen)) return;
    pasangBatang(fill, Math.max(0, Math.min(1, persen / 100)));
    batang.push(fill);
  });

  // 2. Kartu statistik proyek — baris "362 / 561" ditumbuhi batangnya sendiri.
  Array.prototype.forEach.call(document.querySelectorAll('.stat'), function (stat) {
    var nilai = stat.querySelector('.stat__v');
    if (!nilai) return;

    var cocok = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(nilai.textContent);
    if (!cocok) return;

    var milikSaya = parseInt(cocok[1], 10);
    var total = parseInt(cocok[2], 10);
    if (!total) return;

    var bar = document.createElement('span');
    bar.className = 'share__bar';
    var fill = document.createElement('span');
    fill.className = 'share__fill';
    bar.appendChild(fill);

    stat.classList.add('stat--share');
    stat.appendChild(bar);
    pasangBatang(fill, milikSaya / total);
    batang.push(fill);
  });

  function isiBatang(fill) {
    fill.style.setProperty('--share', fill.getAttribute('data-share'));
  }

  if (batang.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      batang.forEach(isiBatang);
    } else {
      var barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          isiBatang(entry.target);
          barObserver.unobserve(entry.target);
        });
      }, { threshold: 0.5 });

      batang.forEach(function (fill) { barObserver.observe(fill); });

      // Jaring pengaman yang sama seperti reveal: batang kosong lebih buruk
      // daripada batang yang muncul tanpa animasi.
      setTimeout(function () {
        batang.forEach(isiBatang);
        barObserver.disconnect();
      }, 2500);
    }
  }

  /* ------------------------------------------ Sejauh mana halaman dibaca */
  var head = document.querySelector('.site-head');

  if (head) {
    var menunggu = false;

    function ukurProgres() {
      menunggu = false;
      var bisaDigulir = document.documentElement.scrollHeight - window.innerHeight;
      var p = bisaDigulir > 0 ? window.scrollY / bisaDigulir : 0;
      head.classList.toggle('is-scrolled', window.scrollY > 8);
      if (!reduceMotion) head.style.setProperty('--progress', String(Math.max(0, Math.min(1, p))));
    }

    window.addEventListener('scroll', function () {
      if (menunggu) return;
      menunggu = true;
      requestAnimationFrame(ukurProgres);
    }, { passive: true });

    window.addEventListener('resize', ukurProgres, { passive: true });
    ukurProgres();
  }

  /* --------------------------------------------- Filter galeri layar */
  var filter = document.querySelector('.shots-filter');
  if (filter) {
    var grupGaleri = document.querySelectorAll('.shot-group');
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-group]');
      if (!btn) return;
      var pilih = btn.getAttribute('data-group');
      Array.prototype.forEach.call(filter.querySelectorAll('button'), function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      Array.prototype.forEach.call(grupGaleri, function (g) {
        g.hidden = pilih !== 'semua' && g.id !== pilih;
      });
    });
  }

  /* ------------------------------------------------------- Lightbox */
  // Semua tautan [data-lightbox] tetap tautan biasa ke gambar penuh; kalau
  // berkas ini gagal dimuat, klik tetap membuka gambarnya di tab baru.
  var tautanGambar = document.querySelectorAll('a[data-lightbox]');
  if (tautanGambar.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Pratinjau tangkapan layar');
    lb.innerHTML =
      '<div class="lightbox__top">' +
        '<p class="lightbox__cap"></p>' +
        '<button class="lightbox__btn" type="button" data-lb="tutup" aria-label="Tutup">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="lightbox__stage"><img alt=""></div>' +
      '<div class="lightbox__nav">' +
        '<button class="lightbox__btn" type="button" data-lb="prev" aria-label="Sebelumnya">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>' +
        '</button>' +
        '<span class="mono lightbox__count"></span>' +
        '<button class="lightbox__btn" type="button" data-lb="next" aria-label="Berikutnya">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>' +
        '</button>' +
      '</div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lightbox__cap');
    var lbCount = lb.querySelector('.lightbox__count');
    var daftar = [];
    var posisi = 0;
    var pemicu = null;

    function terlihatSaja() {
      // Hanya gambar yang sedang tampil (filter galeri ikut dihormati).
      return Array.prototype.filter.call(tautanGambar, function (a) { return a.offsetParent !== null; });
    }

    function tampilkan(i) {
      posisi = (i + daftar.length) % daftar.length;
      var a = daftar[posisi];
      var img = a.querySelector('img');
      lbImg.src = a.getAttribute('href');
      lbImg.alt = img ? img.alt : '';
      var judul = a.getAttribute('data-title') || (img ? img.alt : '');
      var grup = a.getAttribute('data-group') || '';
      lbCap.innerHTML = '';
      lbCap.appendChild(document.createTextNode(judul));
      if (grup) {
        var s = document.createElement('span');
        s.textContent = grup;
        lbCap.appendChild(s);
      }
      lbCount.textContent = (posisi + 1) + ' / ' + daftar.length;
    }

    function buka(a) {
      daftar = terlihatSaja();
      if (!daftar.length) daftar = Array.prototype.slice.call(tautanGambar);
      pemicu = a;
      tampilkan(Math.max(0, daftar.indexOf(a)));
      lb.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      lb.querySelector('[data-lb="tutup"]').focus();
    }

    function tutup() {
      lb.classList.remove('is-open');
      document.documentElement.style.overflow = '';
      if (pemicu) pemicu.focus();
    }

    Array.prototype.forEach.call(tautanGambar, function (a) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        buka(a);
      });
    });

    lb.addEventListener('click', function (e) {
      var aksi = e.target.closest('[data-lb]');
      if (aksi) {
        var jenis = aksi.getAttribute('data-lb');
        if (jenis === 'tutup') tutup();
        else tampilkan(posisi + (jenis === 'next' ? 1 : -1));
        return;
      }
      if (e.target === lb || e.target.classList.contains('lightbox__stage')) tutup();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') tutup();
      else if (e.key === 'ArrowRight') tampilkan(posisi + 1);
      else if (e.key === 'ArrowLeft') tampilkan(posisi - 1);
    });

    var sentuhX = null;
    lb.addEventListener('touchstart', function (e) { sentuhX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sentuhX === null) return;
      var dx = e.changedTouches[0].clientX - sentuhX;
      if (Math.abs(dx) > 50) tampilkan(posisi + (dx < 0 ? 1 : -1));
      sentuhX = null;
    });
  }

  /* ------------------------------------------------------ Tahun footer */
  var tahun = document.getElementById('tahun');
  if (tahun) tahun.textContent = String(new Date().getFullYear());
})();
