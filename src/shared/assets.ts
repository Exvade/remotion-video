// ============================================================
// Path helper untuk file di folder public/.
//   public/brands/<brand>/...  -> aset milik satu brand (logo, gambar, font, audio)
//   public/shared/audio/...    -> efek suara & musik yang dipakai semua brand
// ============================================================

import { staticFile } from "remotion";

export type Brand = "danova-digital" | "tivity" | "bilaastore";

/** File milik satu brand, contoh: brandFile("tivity", "logo/tivity-logo.png"). */
export const brandFile = (brand: Brand, path: string) => staticFile(`brands/${brand}/${path}`);

/** Efek suara / musik bersama, contoh: sharedAudio("pop.wav"). */
export const sharedAudio = (file: string) => staticFile(`shared/audio/${file}`);
