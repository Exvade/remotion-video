// All timings for the CostComparison video, in frames @ 30fps.
// Voiceover phrase offsets were measured from the generated clips in
// voiceover.mp3 (Whisper transcript + silence detection), so visuals land on the words.

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const SCENES = {
  hook: { from: 0, dur: 175 },
  print: { from: 175, dur: 325 },
  digital: { from: 500, dur: 300 },
  savings: { from: 800, dur: 205 },
  cta: { from: 1005, dur: 165 },
} as const;

export type SceneKey = keyof typeof SCENES;
export const SCENE_ORDER: SceneKey[] = ["hook", "print", "digital", "savings", "cta"];
export const TOTAL_FRAMES = 1170;

/**
 * Narration recorded in one take (ElevenLabs) = voiceover.mp3. The VO slices below are cut from it and
 * placed on the video timeline by `python scripts/build-voice-track.py` -> voice-track.mp3 (rerun after edits).
 */
export const VOICE_TRACK_FILE = "voice-track.mp3";

type Phrase = { t: number; text: string; hl?: string };
/** at = video frame where the slice starts; src = second in voiceover.mp3; t = offset from src. */
type VoClip = { at: number; src: number; dur: number; phrases: Phrase[] };

export const VO: VoClip[] = [
  {
    at: 8,
    src: 0,
    dur: sec(5.18),
    phrases: [
      { t: 0, text: "Tiga ratus undangan.", hl: "Tiga ratus" },
      { t: 2.01, text: "Cetak, atau digital?" },
      { t: 3.92, text: "Mana yang lebih hemat?", hl: "hemat" },
    ],
  },
  {
    at: 180,
    src: 5.79,
    dur: sec(7.32),
    phrases: [
      { t: 0, text: "Undangan cetak:" },
      { t: 1.51, text: "enam ribu per lembar,", hl: "enam ribu" },
      { t: 3.24, text: "kali tiga ratus tamu.", hl: "tiga ratus" },
      { t: 4.85, text: "Ditambah ongkir,", hl: "ongkir" },
      { t: 6.44, text: "tiga ratus ribu.", hl: "tiga ratus ribu" },
    ],
  },
  {
    at: 412,
    src: 13.66,
    dur: sec(2.23),
    phrases: [
      { t: 0, text: "Totalnya," },
      { t: 0.83, text: "dua juta seratus ribu.", hl: "dua juta seratus ribu" },
    ],
  },
  {
    at: 510,
    src: 16.44,
    dur: sec(9.27),
    phrases: [
      { t: 0, text: "Undangan digital?" },
      { t: 1.48, text: "Cuma sembilan puluh sembilan ribu.", hl: "sembilan puluh sembilan ribu" },
      { t: 3.72, text: "Langsung sebar lewat WhatsApp,", hl: "WhatsApp" },
      { t: 6.0, text: "lengkap dengan RSVP dan peta lokasi.", hl: "RSVP" },
    ],
  },
  {
    at: 810,
    src: 26.3,
    dur: sec(6.03),
    phrases: [
      { t: 0, text: "Kamu hemat lebih dari dua juta rupiah.", hl: "dua juta" },
      { t: 3.16, text: "Pas buat souvenir,", hl: "souvenir" },
      { t: 4.48, text: "catering,", hl: "catering" },
      { t: 4.95, text: "atau bulan madu.", hl: "bulan madu" },
    ],
  },
  {
    at: 1015,
    src: 32.99,
    dur: sec(3.74),
    phrases: [
      { t: 0, text: "Pesan undangan digitalmu sekarang." },
      { t: 2.39, text: "Link-nya ada di bio!", hl: "bio" },
    ],
  },
];

/** Absolute frame of a phrase-level cue inside voiceover clip `i`. */
export const cue = (i: number, s: number) => VO[i].at + sec(s);
/** Same cue, relative to a scene's start (for use inside a <Sequence>). */
export const local = (scene: SceneKey, i: number, s: number) =>
  cue(i, s) - SCENES[scene].from;

export type Caption = { from: number; to: number; text: string; hl?: string };

export const CAPTIONS: Caption[] = VO.flatMap((clip) =>
  clip.phrases.map((p, idx) => {
    const next = clip.phrases[idx + 1];
    return {
      from: clip.at + sec(p.t),
      to: next ? clip.at + sec(next.t) : clip.at + clip.dur + 6,
      text: p.text,
      hl: p.hl,
    };
  }),
);

type Sfx = { file: string; at: number; volume: number };

export const SFX: Sfx[] = [
  // hook
  { file: "pop.wav", at: cue(0, 2.01), volume: 0.5 },
  { file: "pop.wav", at: cue(0, 2.64), volume: 0.5 },
  { file: "ding.wav", at: cue(0, 3.92), volume: 0.22 },
  { file: "whoosh.wav", at: SCENES.print.from - 8, volume: 0.45 },
  // print receipt
  { file: "tick.wav", at: cue(1, 1.51), volume: 0.5 },
  { file: "tick.wav", at: cue(1, 3.24), volume: 0.5 },
  { file: "tick.wav", at: cue(1, 4.85), volume: 0.5 },
  { file: "tick.wav", at: cue(1, 6.44), volume: 0.5 },
  { file: "rise.wav", at: cue(2, 0.83) - 32, volume: 0.35 },
  { file: "cash.wav", at: cue(2, 0.83), volume: 0.45 },
  { file: "whoosh.wav", at: SCENES.digital.from - 8, volume: 0.45 },
  // digital
  { file: "ding.wav", at: cue(3, 1.48), volume: 0.35 },
  { file: "pop.wav", at: cue(3, 3.72), volume: 0.4 },
  { file: "pop.wav", at: cue(3, 3.72) + 9, volume: 0.4 },
  { file: "pop.wav", at: cue(3, 3.72) + 18, volume: 0.4 },
  { file: "tick.wav", at: cue(3, 6.0), volume: 0.4 },
  { file: "tick.wav", at: cue(3, 6.0) + 7, volume: 0.4 },
  { file: "tick.wav", at: cue(3, 6.0) + 14, volume: 0.4 },
  { file: "tick.wav", at: cue(3, 6.0) + 21, volume: 0.4 },
  { file: "whoosh.wav", at: SCENES.savings.from - 8, volume: 0.45 },
  // savings
  { file: "cash.wav", at: cue(4, 0) + 48, volume: 0.45 },
  { file: "pop.wav", at: cue(4, 3.16), volume: 0.45 },
  { file: "pop.wav", at: cue(4, 4.48), volume: 0.45 },
  { file: "pop.wav", at: cue(4, 4.95), volume: 0.45 },
  { file: "whoosh.wav", at: SCENES.cta.from - 8, volume: 0.45 },
  // cta
  { file: "ding.wav", at: cue(5, 2.39), volume: 0.35 },
];
