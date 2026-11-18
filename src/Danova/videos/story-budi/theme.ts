// ============================================================
// "Toko Budi Tutup Jam 02.17" — story tokens, timeline, data
// Motif cerita: jam 02.17 (dibuka & ditutup di jam yang sama)
// + papan toko yang dibalik dari TUTUP -> BUKA 24 JAM.
// ============================================================

import { COLORS } from "../../brand";
import { FONTS } from "../../fonts";

export const H = FONTS.heading; // Poppins
export const B = FONTS.body; // Inter

export const T = {
  ...COLORS,
  night: "#060A18",
  nightWarm: "#120910",
  ink: "#05070D",
  deepBlue: "#0A1640",
  dawnTop: "#16204A",
  dawnMid: "#FF6B35",
  dawnLow: "#FFD23F",
  glass: "rgba(255,255,255,0.06)",
  glassLine: "rgba(255,255,255,0.12)",
  muted: "#9AA4B8",
};

export const FPS = 30;

// Timeline (frames @30fps), disusun mengikuti panjang voiceover. Total 1508f = 50 detik.
export const SCENES = {
  hook: { from: 0, dur: 150 }, // 02.17, Budi belum tidur
  chaos: { from: 150, dur: 348 }, // 47 chat, isinya sama, yang telat kabur
  insight: { from: 498, dur: 200 }, // 47 -> 3, tokonya "tutup"
  turn: { from: 698, dur: 285 }, // papan dibalik, website menjawab pertanyaan
  night: { from: 983, dur: 325 }, // 02.17 lagi, Budi tidur -> pagi 6 pesanan tercatat rapi
  cta: { from: 1308, dur: 200 },
} as const;

export type SceneKey = keyof typeof SCENES;
export const SCENE_ORDER: SceneKey[] = ["hook", "chaos", "insight", "turn", "night", "cta"];
export const TOTAL_FRAMES = SCENES.cta.from + SCENES.cta.dur;

export const rp = (n: number) =>
  "Rp " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Data cerita ----------
export const SHOP = "Kopi Budi";

export const INCOMING = [
  { name: "Rina", text: "Kak, harga berapa?", time: "02.17" },
  { name: "Dimas", text: "Ready gak kak?", time: "02.18" },
  { name: "+62 812-xxxx", text: "Ada katalognya?", time: "02.19" },
  { name: "Sari", text: "Ongkir ke Bekasi brp kak", time: "02.21" },
  { name: "Andre", text: "P", time: "02.22" },
  { name: "Mega", text: "harga?", time: "02.24" },
  { name: "Yoga", text: "Tokonya asli kan kak? takut ketipu", time: "02.26" },
  { name: "Lia", text: "Bisa kirim hari ini kak?", time: "02.29" },
  { name: "Rina", text: "kak??", time: "02.33" },
];

export const PRODUCTS = [
  { name: "Signature Blend", size: "250 g", price: 125000, tone: "#7A4A2B" },
  { name: "House Blend", size: "250 g", price: 95000, tone: "#9C6B3F" },
  { name: "Drip Bag", size: "isi 10", price: 65000, tone: "#5C3A22" },
  { name: "Cold Brew", size: "1 liter", price: 110000, tone: "#3E2716" },
];

// Pertanyaan dari chat -> sudah dijawab di landing page
export const QA = [
  { q: "Harga berapa kak?", a: "Daftar harga lengkap" },
  { q: "Ongkir ke Bekasi?", a: "Info ongkir & area kirim" },
  { q: "Tokonya asli kan?", a: "Alamat, foto & ulasan" },
];

// Form pesanan yang masuk dari landing page waktu Budi tidur (tercatat otomatis, belum dibayar)
export const ORDERS = [
  { who: "Rina", item: "Signature Blend", qty: 1, city: "Bekasi", time: "02.17" },
  { who: "Yoga", item: "House Blend", qty: 2, city: "Depok", time: "02.41" },
  { who: "Sari", item: "Drip Bag", qty: 1, city: "Bekasi", time: "03.05" },
  { who: "Lia", item: "Cold Brew", qty: 1, city: "Jaktim", time: "04.12" },
  { who: "Dimas", item: "Signature Blend", qty: 2, city: "Bogor", time: "05.36" },
  { who: "Mega", item: "Drip Bag", qty: 1, city: "Tangerang", time: "06.48" },
];

// ---------- Voiceover ----------
// Clip dibuat oleh `python scripts/story-budi-vo.py` -> public/audio/story-budi/vo-XX.mp3.
// at = frame lokal di dalam scene; frames = panjang clip (lihat vo.json, update kalau clip dibuat ulang).
export const VO: { id: string; scene: keyof typeof SCENES; at: number; frames: number }[] = [
  { id: "01", scene: "hook", at: 6, frames: 87 },
  { id: "02", scene: "hook", at: 96, frames: 37 },
  { id: "03", scene: "chaos", at: 4, frames: 38 },
  { id: "04", scene: "chaos", at: 78, frames: 163 },
  { id: "05", scene: "chaos", at: 248, frames: 88 },
  { id: "06", scene: "insight", at: 6, frames: 70 },
  { id: "07", scene: "insight", at: 80, frames: 108 },
  { id: "08", scene: "turn", at: 6, frames: 49 },
  { id: "09", scene: "turn", at: 80, frames: 195 },
  { id: "10", scene: "night", at: 6, frames: 121 },
  { id: "11", scene: "night", at: 152, frames: 159 },
  { id: "12", scene: "cta", at: 10, frames: 55 },
  { id: "13", scene: "cta", at: 72, frames: 107 },
];
