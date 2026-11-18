# Architecture Map

Proyek Remotion untuk 3 brand: Danova Digital, Bilaastore, Tivity. Panduan lengkap: `BRANDS.md`.

## Directory Structure

```
public/brands/<brand>/   logo/ images/ fonts/ audio/   (file aset, dibaca lewat staticFile)
public/shared/audio/     sfx & musik bersama
src/Root.tsx             daftar Composition, dikelompokkan per brand (<Folder>)
src/shared/assets.ts     brandFile(brand, path), sharedAudio(file)
src/brands/<brand>/      README.md (brand guide), brand.ts (warna/font), videos/
src/_starter/            contoh bawaan Remotion
scripts/<brand>/         script pendukung (VO, dll.), scripts/shared/ untuk umum
```

## Key File Locations

- **Main entry**: `src/index.ts` -> `src/Root.tsx`
- **Danova Story Budi**: `src/brands/danova-digital/videos/StoryBudiWebsite.tsx` + `story-budi/` (timeline dari `vo.json`)
- **Tivity CostComparison**: `src/brands/tivity/videos/CostComparison/`
- **Brand <slug>**: `danova-digital` | `tivity` | `bilaastore`
