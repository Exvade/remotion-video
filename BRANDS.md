# Panduan folder brand

Proyek ini dipakai untuk 3 brand: **Danova Digital**, **Bilaastore**, dan **Tivity**.
Setiap brand punya **dua folder** dengan nama yang sama:

| Mau simpan apa? | Taruh di mana |
|---|---|
| Logo (PNG/SVG) | `public/brands/<brand>/logo/` |
| Foto produk, gambar, ilustrasi | `public/brands/<brand>/images/` |
| File font (.ttf/.otf/.woff2), kalau tidak ada di Google Fonts | `public/brands/<brand>/fonts/` |
| Voiceover & audio khusus brand | `public/brands/<brand>/audio/<nama-video>/` |
| **Panduan brand** (warna, tone, tagline, aturan logo) | `src/brands/<brand>/README.md` |
| **Warna & font dalam kode** (dipakai video) | `src/brands/<brand>/brand.ts` |
| Video brand tersebut | `src/brands/<brand>/videos/` |
| Script pendukung (generate VO, dll.) | `scripts/<brand>/` |

`<brand>` selalu salah satu dari: `danova-digital`, `bilaastore`, `tivity`.

Aturan gampangnya:
- **File** (gambar, audio, font) masuk ke `public/brands/<brand>/`. Remotion hanya bisa membaca file dari `public/`.
- **Tulisan dan kode** (panduan, warna, video) masuk ke `src/brands/<brand>/`.

## Struktur lengkap

```
remotion-video/
├── BRANDS.md                    ← file ini
├── public/
│   ├── brands/
│   │   ├── danova-digital/      logo/ images/ fonts/ audio/story-budi/
│   │   ├── bilaastore/          logo/ images/ fonts/ audio/
│   │   └── tivity/              logo/tivity-logo.png  audio/cost-comparison/
│   └── shared/
│       └── audio/               efek suara & musik untuk semua brand (pop, whoosh, ding, music.mp3, …)
├── src/
│   ├── Root.tsx                 daftar semua video (sidebar Remotion Studio)
│   ├── shared/assets.ts         helper brandFile() & sharedAudio()
│   ├── brands/
│   │   ├── danova-digital/      README.md, brand.ts, fonts.ts, components/, illustrations/, videos/
│   │   ├── bilaastore/          README.md, brand.ts (template, belum diisi), videos/
│   │   └── tivity/              README.md, brand.ts, videos/CostComparison/
│   └── _starter/                contoh bawaan Remotion (HelloWorld), boleh diabaikan
└── scripts/
    ├── danova-digital/          story-budi-vo.py
    ├── tivity/                  build-voice-track.py
    └── shared/                  elevenlabs-voices.py
```

## Memakai file brand di video

```tsx
import { brandFile, sharedAudio } from "../../../shared/assets";

<Img src={brandFile("bilaastore", "logo/bilaastore-logo.png")} />
<Audio src={sharedAudio("whoosh.wav")} />
```

## Menambah video baru

1. Buat folder di `src/brands/<brand>/videos/<NamaVideo>/`.
2. Ambil warna & font dari `src/brands/<brand>/brand.ts`. Jangan menulis kode warna langsung di video.
3. Daftarkan videonya di `src/Root.tsx`, di dalam `<Folder>` brand tersebut.
