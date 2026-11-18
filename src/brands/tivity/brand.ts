// ============================================================
// Tivity — Brand Configuration
// Palet diambil dari logo (huruf "T" plum + bunga wisteria + daun).
// Logo: public/brands/tivity/logo/tivity-logo.png
//
// Catatan: videos/CostComparison/ui.tsx masih punya salinan palet & font sendiri.
// Video Tivity yang baru sebaiknya import dari file ini.
// ============================================================

import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadGreatVibes } from "@remotion/google-fonts/GreatVibes";
import { brandFile } from "../../shared/assets";

export const FONTS = {
  serif: loadPlayfair("normal", { weights: ["500", "700", "800"], subsets: ["latin"] }).fontFamily, // judul
  sans: loadMontserrat("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin"] }).fontFamily, // isi
  script: loadGreatVibes("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily, // aksen
} as const;

export const COLORS = {
  cream: "#FBF6F3",
  blush: "#F6E6E8",
  lilac: "#EFE4F1",
  card: "#FFFFFF",
  ink: "#2A1430",
  muted: "#7A6680",
  plum: "#5E2A64",
  plumDeep: "#3A0F42",
  plumNight: "#260A2C",
  wisteria: "#B58BC4",
  wisteriaSoft: "#DCC6E4",
  rose: "#E3A9B9",
  roseSoft: "#F3D3DB",
  leaf: "#6F9A5C",
  leafSoft: "#CFE0C4",
} as const;

export const LOGO = brandFile("tivity", "logo/tivity-logo.png");
