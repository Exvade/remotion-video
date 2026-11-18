// ============================================================
// "Toko Budi Tutup Jam 02.17" — tokens, timeline, data
// Gaya: clean startup — putih + biru muda, kartu membulat, bayangan lembut,
// tipografi Inter. Motif cerita: jam 02.17 + status toko Tutup -> Buka 24 jam.
// ============================================================

import { FONTS } from "../../fonts";
import voData from "./vo.json";

export const H = FONTS.body; // Inter (judul, tebal & rapat)
export const B = FONTS.body; // Inter

export const T = {
  ink: "#0B1B3A", // teks utama (navy)
  sub: "#5B6B8C", // teks sekunder
  faint: "#9AA8C3",
  line: "#DCE6F5",
  white: "#FFFFFF",
  bg: "#F5F9FF",
  sky: "#EAF3FF",
  sky2: "#D7E8FF",
  sky3: "#B9D6FF",
  blue: "#2F6BFF",
  blueLight: "#5AA9FF",
  green: "#16A34A",
  greenSoft: "#E7F7EE",
  red: "#E5484D",
  redSoft: "#FDECEC",
  sun: "#FFC861",
} as const;

/** Bayangan lembut kebiruan. */
export const shadow = (d = 12) => `0 ${d}px ${d * 3}px rgba(28, 70, 160, ${0.08 + d * 0.004}), 0 1px 3px rgba(28, 70, 160, .06)`;
export const border = `1.5px solid ${T.line}`;

export const FPS = 30;
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Timeline ----------
// Disusun otomatis dari vo.json (hasil scripts/danova-digital/story-budi-vo.py), jadi kalau VO dibuat
// ulang dengan suara lain, semua scene ikut menyesuaikan panjangnya.
export type SceneKey = "hook" | "chaos" | "insight" | "turn" | "night" | "cta";
export const SCENE_ORDER: SceneKey[] = ["hook", "chaos", "insight", "turn", "night", "cta"];

const LEAD = 8; // jeda sebelum kalimat pertama di tiap scene
const GAP = 10; // jeda antar kalimat
const EXTRA_BEFORE: Record<string, number> = { "11": 28 }; // ruang untuk transisi subuh
const TAIL: Record<SceneKey, number> = { hook: 14, chaos: 18, insight: 16, turn: 18, night: 20, cta: 66 };

type VoRow = { id: string; scene: string; text: string; frames: number };
export type VoLine = { id: string; scene: SceneKey; text: string; frames: number; at: number; from: number };

const build = () => {
  const rows = voData as VoRow[];
  const scenes = {} as Record<SceneKey, { from: number; dur: number }>;
  const lines: VoLine[] = [];
  let cursor = 0;
  for (const key of SCENE_ORDER) {
    let at = LEAD;
    for (const r of rows.filter((x) => x.scene === key)) {
      at += EXTRA_BEFORE[r.id] ?? 0;
      lines.push({ id: r.id, scene: key, text: r.text, frames: r.frames, at, from: cursor + at });
      at += r.frames + GAP;
    }
    const dur = at - GAP + TAIL[key];
    scenes[key] = { from: cursor, dur };
    cursor += dur;
  }
  return { scenes, lines, total: cursor };
};

const TL = build();
export const SCENES = TL.scenes;
export const VO = TL.lines;
export const TOTAL_FRAMES = TL.total;

/** Kalimat VO berdasarkan id ("01".."13"); `at` = frame lokal di dalam scene-nya. */
export const line = (id: string) => {
  const l = VO.find((v) => v.id === id);
  if (!l) throw new Error(`VO ${id} tidak ada di vo.json`);
  return l;
};

/**
 * Perkiraan kapan sebuah kata diucapkan di dalam kalimat (frame lokal scene).
 * Dibagi rata menurut jumlah huruf, tanda baca dihitung sebagai jeda.
 */
export const wordAt = (id: string, wordIndex: number) => wordTimes(id)[wordIndex];

export const wordTimes = (id: string) => {
  const l = line(id);
  const words = l.text.split(" ");
  const weight = (w: string) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 2 + (/[.?!]$/.test(w) ? 6 : /[,…]$|\.\.\.$/.test(w) ? 4 : 0);
  const total = words.reduce((s, w) => s + weight(w), 0);
  let acc = 0;
  return words.map((w) => {
    const t = l.at + (acc / total) * l.frames;
    acc += weight(w);
    return t;
  });
};

// ---------- Data cerita ----------
export const SHOP = "Kopi Budi";

export const INCOMING = [
  { name: "Rina", text: "Kak, harga berapa?", time: "02.17" },
  { name: "Dimas", text: "Ready gak kak?", time: "02.18" },
  { name: "Sari", text: "Ongkir ke Bekasi brp", time: "02.21" },
  { name: "Andre", text: "P", time: "02.22" },
  { name: "Mega", text: "harga??", time: "02.24" },
  { name: "Yoga", text: "Tokonya asli kan kak?", time: "02.26" },
  { name: "Lia", text: "Bisa kirim hari ini?", time: "02.29" },
];

export const PRODUCTS = [
  { name: "Signature", size: "250 g", price: 125000, tone: "#7A4A2B" },
  { name: "House Blend", size: "250 g", price: 95000, tone: "#B07A45" },
  { name: "Drip Bag", size: "isi 10", price: 65000, tone: "#5C3A22" },
  { name: "Cold Brew", size: "1 liter", price: 110000, tone: "#3E2716" },
];

// Form pesanan yang masuk waktu Budi tidur (tercatat otomatis, belum dibayar)
export const ORDERS = [
  { who: "Rina", item: "Signature", qty: 1, city: "Bekasi", time: "02.17" },
  { who: "Yoga", item: "House Blend", qty: 2, city: "Depok", time: "02.41" },
  { who: "Sari", item: "Drip Bag", qty: 1, city: "Bekasi", time: "03.05" },
  { who: "Lia", item: "Cold Brew", qty: 1, city: "Jaktim", time: "04.12" },
  { who: "Dimas", item: "Signature", qty: 2, city: "Bogor", time: "05.36" },
  { who: "Mega", item: "Drip Bag", qty: 1, city: "Tangerang", time: "06.48" },
];

export const rp = (n: number) => "Rp" + Math.round(n / 1000) + "rb";
