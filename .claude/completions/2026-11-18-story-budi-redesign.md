# 2026-11-18 — Story Budi: VO Siti + redesign total

- VO diganti suara Siti (ElevenLabs, dibuat manual di website karena akun Free tidak bisa pakai
  Voice Library lewat API). Rekaman utuh `src/Danova/naskah-budi.mp3` dipotong per kalimat lalu
  diproses dengan `python scripts/story-budi-vo.py --import=<folder berisi 01..13.mp3>`.
- `story-budi-vo.py` butuh ffmpeg lengkap: dari PATH, atau `pip install imageio-ffmpeg`
  (ffmpeg bawaan Remotion tidak punya filter `silenceremove`).
- Timeline video sekarang dihitung dari `src/Danova/videos/story-budi/vo.json` (theme.ts `build()`),
  bukan angka manual. Beat visual pakai `line(id)` / `wordAt(id, i)`.
- Tampilan baru: clean startup — putih + biru muda, kartu membulat, bayangan lembut, Inter
  (user menolak neo-brutalism). Subtitle kata-per-kata (`Captions` di ui.tsx), transisi fade.
- `scripts/elevenlabs-voices.py`: cari/coba suara ElevenLabs (key di `.env`).

## Rapikan folder per brand (Danova Digital, Bilaastore, Tivity)
- Aturan folder: `BRANDS.md`. File aset -> `public/brands/<brand>/`, kode & panduan -> `src/brands/<brand>/`,
  sfx/musik bersama -> `public/shared/audio/`, helper `src/shared/assets.ts`.
- `src/Danova` -> `src/brands/danova-digital`, `src/CostComparison` -> `src/brands/tivity/videos/CostComparison`,
  HelloWorld -> `src/_starter`. Scripts -> `scripts/<brand>/` (ROOT = parents[2]).
- Bilaastore: README.md + brand.ts template (belum diisi). Tivity: README.md + brand.ts dari palet logo.
