// All timings for the CostComparison video, in frames @ 30fps.
// Voiceover phrase offsets were measured from the generated clips in
// voiceover.mp3 (Whisper transcript + silence detection), so visuals land on the words.

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const SCENES = {
  hook: { from: 0, dur: 185 },
  print: { from: 185, dur: 365 },
  digital: { from: 550, dur: 300 },
  savings: { from: 850, dur: 230 },
  cta: { from: 1080, dur: 165 },
} as const;

export type SceneKey = keyof typeof SCENES;
export const SCENE_ORDER: SceneKey[] = ["hook", "print", "digital", "savings", "cta"];
export const TOTAL_FRAMES = 1245;

/**
 * Narration recorded in one take (ElevenLabs v3 with audio tags, see VOICEOVER_COST_COMPARISON.md)
 * = voiceover.mp3. The VO slices below are cut from it and placed on the video timeline by
 * `python scripts/tivity/build-voice-track.py` -> voice-track.mp3 (rerun after edits).
 */
export const VOICE_TRACK_FILE = "voice-track.mp3";

type Phrase = { t: number; text: string; hl?: string };
/** at = video frame where the slice starts; src = second in voiceover.mp3; t = offset from src. */
type VoClip = { at: number; src: number; dur: number; phrases: Phrase[] };

export const VO: VoClip[] = [
  {
    at: 8,
    src: 0.07,
    dur: sec(5.66),
    phrases: [
      { t: 0, text: "Tiga ratus undangan.", hl: "Tiga ratus" },
      { t: 2.03, text: "Cetak, atau digital?" },
      { t: 4.53, text: "Mana yang lebih hemat?", hl: "hemat" },
    ],
  },
  {
    at: 190,
    src: 6.22,
    dur: sec(7.82),
    phrases: [
      { t: 0, text: "Undangan cetak:" },
      { t: 1.18, text: "enam ribu per lembar,", hl: "enam ribu" },
      { t: 2.74, text: "kali tiga ratus tamu.", hl: "tiga ratus" },
      { t: 4.46, text: "Ditambah ongkir,", hl: "ongkir" },
      { t: 6.61, text: "tiga ratus ribu.", hl: "tiga ratus ribu" },
    ],
  },
  {
    at: 437,
    src: 14.35,
    dur: sec(3.18),
    phrases: [
      { t: 0, text: "Totalnya?" },
      { t: 0.83, text: "dua juta seratus ribu!", hl: "dua juta seratus ribu" },
    ],
  },
  {
    at: 560,
    src: 17.86,
    dur: sec(8.24),
    phrases: [
      { t: 0, text: "Undangan digital?" },
      { t: 1.7, text: "Cuma sembilan puluh sembilan ribu!", hl: "sembilan puluh sembilan ribu" },
      { t: 3.84, text: "Langsung sebar lewat WhatsApp,", hl: "WhatsApp" },
      { t: 5.32, text: "lengkap dengan RSVP dan peta lokasi.", hl: "RSVP" },
    ],
  },
  {
    at: 860,
    src: 26.35,
    dur: sec(6.7),
    phrases: [
      { t: 0, text: "Kamu hemat lebih dari dua juta rupiah.", hl: "dua juta" },
      { t: 2.65, text: "Pas buat souvenir,", hl: "souvenir" },
      { t: 4.21, text: "catering,", hl: "catering" },
      { t: 5.45, text: "atau bulan madu.", hl: "bulan madu" },
    ],
  },
  {
    at: 1090,
    src: 33.35,
    dur: sec(3.45),
    phrases: [
      { t: 0, text: "Pesan undangan digitalmu sekarang." },
      { t: 2.11, text: "Link-nya ada di bio!", hl: "bio" },
    ],
  },
];

/** Start (seconds, relative to its clip) of phrase `j` in voiceover clip `i`. */
export const P = (i: number, j: number) => VO[i].phrases[j].t;

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
  { file: "pop.wav", at: cue(0, P(0, 1)), volume: 0.5 },
  { file: "pop.wav", at: cue(0, P(0, 1) + 0.66), volume: 0.5 },
  { file: "ding.wav", at: cue(0, P(0, 2)), volume: 0.22 },
  { file: "whoosh.wav", at: SCENES.print.from - 8, volume: 0.45 },
  // print receipt
  { file: "tick.wav", at: cue(1, P(1, 1)), volume: 0.5 },
  { file: "tick.wav", at: cue(1, P(1, 2)), volume: 0.5 },
  { file: "tick.wav", at: cue(1, P(1, 3)), volume: 0.5 },
  { file: "tick.wav", at: cue(1, P(1, 4)), volume: 0.5 },
  { file: "rise.wav", at: cue(2, P(2, 1)) - 32, volume: 0.35 },
  { file: "cash.wav", at: cue(2, P(2, 1)), volume: 0.45 },
  { file: "whoosh.wav", at: SCENES.digital.from - 8, volume: 0.45 },
  // digital
  { file: "ding.wav", at: cue(3, P(3, 1)), volume: 0.35 },
  { file: "pop.wav", at: cue(3, P(3, 2)), volume: 0.4 },
  { file: "pop.wav", at: cue(3, P(3, 2)) + 9, volume: 0.4 },
  { file: "pop.wav", at: cue(3, P(3, 2)) + 18, volume: 0.4 },
  { file: "tick.wav", at: cue(3, P(3, 3)), volume: 0.4 },
  { file: "tick.wav", at: cue(3, P(3, 3)) + 7, volume: 0.4 },
  { file: "tick.wav", at: cue(3, P(3, 3)) + 14, volume: 0.4 },
  { file: "tick.wav", at: cue(3, P(3, 3)) + 21, volume: 0.4 },
  { file: "whoosh.wav", at: SCENES.savings.from - 8, volume: 0.45 },
  // savings
  { file: "cash.wav", at: cue(4, 0) + 48, volume: 0.45 },
  { file: "pop.wav", at: cue(4, P(4, 1)), volume: 0.45 },
  { file: "pop.wav", at: cue(4, P(4, 2)), volume: 0.45 },
  { file: "pop.wav", at: cue(4, P(4, 3)), volume: 0.45 },
  { file: "whoosh.wav", at: SCENES.cta.from - 8, volume: 0.45 },
  // cta
  { file: "ding.wav", at: cue(5, P(5, 1)), volume: 0.35 },
];
