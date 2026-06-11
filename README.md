# Portfolio — Muhammad Nur Pauzi Al Bustomi

Static portfolio website dengan **Decap CMS** untuk edit konten via web UI.

🌐 **Live site**: https://jancuksin-collab.github.io/portfolio  
🔐 **Admin dashboard**: https://jancuksin-collab.github.io/portfolio/admin/

---

## 📁 Struktur
```
portfolio/
├── index.html              # Halaman utama
├── admin/                  # Decap CMS dashboard
│   ├── index.html
│   └── config.yml
├── data/                   # Semua konten editable (JSON)
│   ├── profile.json
│   ├── skills.json
│   ├── achievements.json
│   ├── projects.json
│   ├── career.json
│   ├── education.json
│   └── research.json
├── assets/images/
│   ├── profile.jpg
│   └── uploads/            # Upload dari CMS masuk sini
├── styles.css
├── script.js
├── .github/workflows/
│   └── deploy.yml          # Auto-deploy ke GitHub Pages
├── .nojekyll               # Bypass Jekyll processing
└── README.md
```

---

## 🚀 Setup Awal (sudah dilakukan)

1. Repo dibuat di GitHub: `jancuksin-collab/portfolio`
2. GitHub Pages diaktifkan dengan source: **GitHub Actions**
3. Setiap push ke `main` → auto-deploy

URL: `https://jancuksin-collab.github.io/portfolio`

---

## ✏️ Cara Edit Konten (Dashboard Admin)

### Login
1. Buka https://jancuksin-collab.github.io/portfolio/admin/
2. Klik **"Login with GitHub"**
3. Authorize Decap CMS

> **Penting**: Decap CMS butuh **GitHub OAuth app** untuk login. Setup di https://github.com/settings/developers → New OAuth App. Homepage URL = `https://jancuksin-collab.github.io`, Callback = `https://api.netlify.com/auth/decap-cms` (kalau pakai Netlify Identity) atau pakai **Netlify** sebagai OAuth proxy (recommended).

### Quick setup dengan Netlify (5 menit, gratis)
1. Buka https://app.netlify.com/ → **Add new site** → **Deploy manually**
2. Drag & drop folder `portfolio/`
3. Aktifkan **Identity** di site settings
4. Di **Identity → Services → Git Gateway**, enable
5. Invite user dengan email `albustomipauzi@gmail.com`
6. Update `admin/config.yml` bagian `backend` jadi:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```
7. Login di CMS → mulai edit!

> Atau kalau mau **pure GitHub** (tanpa Netlify), perlu setup GitHub OAuth App manual. Lihat: https://decapcms.org/docs/github-backend/

---

## ✏️ Edit Konten

| Section | File JSON | Edit dari CMS |
|---|---|---|
| Profil (nama, bio, kontak) | `data/profile.json` | ✅ |
| Skills & kategori | `data/skills.json` | ✅ |
| Pencapaian/Prestasi | `data/achievements.json` | ✅ |
| Proyek | `data/projects.json` | ✅ |
| Karier & Organisasi | `data/career.json` | ✅ |
| Pendidikan | `data/education.json` | ✅ |
| Riset, Konferensi, Pelatihan | `data/research.json` | ✅ |

**Workflow edit**:
1. Login ke `/admin/`
2. Pilih section yang mau diedit
3. Klik **"New Post"** atau edit existing
4. Simpan → otomatis create PR/commit
5. **Publish** → merge ke `main` → GitHub Actions deploy → live dalam ~1 menit

---

## 🎨 Kustomisasi

### Ganti foto profil
Replace `assets/images/profile.jpg` langsung, atau:
1. Login ke `/admin/`
2. Buka tab **Media** di sidebar
3. Upload foto baru (rasio 1:1, min. 300x300px)

### Ganti accent color
Edit `styles.css` bagian `:root`:
```css
--accent: #facc15;        /* kuning, ganti sesuai selera */
```

### Tambah section baru
1. Bikin `data/section-baru.json`
2. Tambah collection di `admin/config.yml`
3. Tambah HTML section di `index.html` + render function di `script.js`

---

## 🛠 Local Development

```bash
cd portfolio
python3 -m http.server 8000
# Buka http://localhost:8000
```

Atau dengan Node:
```bash
npx serve
```

> ⚠️ CMS tidak jalan via `file://`, harus via HTTP server. Tapi halaman utama (`index.html`) tetep bisa dibuka langsung.

---

## ✉ Kontak
Email: albustomipauzi@gmail.com
