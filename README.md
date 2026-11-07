# Mikhayl Portfolio — React + Vite

Portfolio website migrated from HTML/CSS/Vanilla JS to **React + Vite** with 1:1 visual fidelity, complete feature parity, zero visual regression, and clean modular code architecture.

## 🚀 Quick Start

### 1. Jalankan Development Server
```bash
npm run dev
```
Buka browser di: `http://localhost:5173/`

### 2. Build untuk Production
```bash
npm run build
```
Hasil build siap deploy di folder `dist/`.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📁 Struktur Direktori

```
Portofolio-main/
├── public/                 # Aset statis publik
│   ├── fonts/              # vanilla.otf
│   ├── img/                # background, easter, pameran, profil
│   └── musik/              # Semua file MP3 background & easter egg
├── src/
│   ├── components/         # Komponen reusable & overlay
│   │   ├── EasterEggPopup.jsx   # Modal popup teks/gambar/video easter egg
│   │   ├── FlipCard.jsx         # 3D Flip Card dengan touch swipe & click
│   │   ├── FxCanvas.jsx         # Partikel bintang & kembang api canvas
│   │   ├── ImageModal.jsx       # Modal zoom gambar layar penuh
│   │   ├── KonamiFlash.jsx      # Efek layar putih sekejap Konami Code
│   │   ├── LinuxTerminal.jsx    # Terminal simulasi interaktif
│   │   ├── MatrixOverlay.jsx    # Efek hujan kode Matrix digital hijau
│   │   ├── MobileEggMenu.jsx    # Menu pop-up tombol rahasia 🥚
│   │   ├── MusicPopup.jsx       # Dialog awal pemutar musik latar
│   │   ├── Navbar.jsx           # Navigasi sticky, music btn, theme toggle, drawer
│   │   ├── NowPlayingWidget.jsx # Pemutar musik vinyl & visualizer Spotify
│   │   ├── Preloader.jsx        # Layar animasi inisialisasi awal
│   │   ├── RasaPopup.jsx        # Pop-up rahasia klik 5x kata "rasa"
│   │   ├── SkillModal.jsx       # Dialog detail keahlian
│   │   └── SnakeCanvas.jsx      # Background game snake autonomous
│   ├── data/
│   │   └── config.js            # Pusat data: profil, musik, pameran, easter eggs
│   ├── effects/
│   │   └── premiumEffects.js    # Spotlight, tilt 3D, hero parallax & reveal
│   ├── hooks/
│   │   ├── useMusic.js          # Pengelola audio latar & audio efek rahasia
│   │   ├── useScrollReveal.js   # IntersectionObserver untuk animasi scroll
│   │   ├── useTheme.js          # Dark / Light Mode (persistensi localStorage)
│   │   └── useTypewriter.js     # Efek mesin tik dua arah dengan jeda
│   ├── sections/
│   │   ├── About.jsx            # Section / 01 — Who Am I (Flip card + Spotify)
│   │   ├── Personality.jsx      # Section / 02 — My Vibe (Flip card info)
│   │   ├── Daily.jsx            # Section / 03 — Everyday (Flip card info)
│   │   ├── Pameran.jsx          # Section / 04 — Display (Grid, Detail, Slider, Video)
│   │   ├── GitHub.jsx           # Section / 05 — Open Source (API Live + Matrix Graph)
│   │   ├── Skills.jsx           # Section / 06 — Expertise (Bento grid + Modal)
│   │   ├── Contact.jsx          # Section / 07 — Support (Trakteer + 10x Unlock)
│   │   └── Footer.jsx           # Footer info & list keyword rahasia
│   ├── styles/
│   │   └── style.css            # Stylesheet portofolio lengkap & terintegrasi
│   ├── App.jsx                  # Root container & koordinator event global
│   └── main.jsx                 # Entry point React 19 + Vite
├── _legacy_vanilla/         # Backup file JS dan CSS vanilla sebelumnya
├── index.html               # Template Vite dengan CDN Tailwind & Confetti
├── package.json             # Konfigurasi dependensi npm
└── vite.config.js           # Konfigurasi bundler Vite
```

---

## ✨ Fitur-fitur Lengkap

1. **Preloader Layar Penuh**: Status loading berkala, animasi spinner dan bar indikator.
2. **Pemutar Musik Latar & Widget Now Playing**: Sinkronisasi rotasi piringan hitam, audio equalizer bar, progress durasi real-time.
3. **Tema Dark / Light**: Transisi warna halus, tersimpan di `localStorage`.
4. **3D Flip Cards**: Interaktif dengan klik dan swipe sentuhan di perangkat mobile.
5. **Pameran / Showcase SPA**:
   - Tampilan grid responsif dengan tombol expandable.
   - Halaman detail proyek dengan slider gambar (geser, sentuh, tombol panah keyboard).
   - Video player bawaan.
   - Zoom gambar lightbox.
6. **Integrasi GitHub Live API**:
   - Mengambil data repo asli secara dinamis dari GitHub API (`Mikhayl-05`).
   - GitHub profile strip.
   - Visualisasi Contribution Activity Matrix 52 minggu.
7. **Bento Grid Skills**: Efek hover spotlight interaktif dan pop-up rincian keahlian.
8. **Contact & Dukungan**: Integrasi Trakteer, efek kembang api canvas, confetti, dan deteksi long-press.
9. **Kumpulan Lengkap Easter Eggs**:
   - Ketik kata kunci: `credit`, `crush`, `sayangku`, `oshi`, `fineshyt`, `kimmy`, `genshin`, `pesantren`, `mikhayl`, `nerd`, `bored`, `osint`, `siapacewekitu`.
   - `matrix`: Layar penuh hujan kode digital Matrix.
   - `linux`: Simulasi interaktif terminal Linux mikhayl-laptop.
   - `konami`: Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) dengan efek kilatan dan confetti.
   - Double-click nama "MIKHAYL".
   - Shake perangkat HP (DeviceMotionEvent).
   - Klik 10× tombol Support untuk membuka tombol rahasia 🥚 di pojok kanan bawah.
   - Klik 5× kata "rasa" pada artikel pameran Surabaya.
   - Pesan rahasia pada Inspect Console pengembang.
