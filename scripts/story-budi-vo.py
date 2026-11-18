"""Generate the StoryBudiWebsite voiceover, one clip per line.

Voice: Microsoft Edge neural TTS (id-ID-ArdiNeural) via `edge-tts`.
Each clip is loudness-normalised to about -15 LUFS and saved to public/audio/story-budi/vo-XX.mp3.
Clip lengths (in frames @30fps) are written to src/Danova/videos/story-budi/vo.json so
the video can place every line and size every scene around it.

    python scripts/story-budi-vo.py            # all lines
    python scripts/story-budi-vo.py 03 07      # only these clips
"""
import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/audio/story-budi"
META = ROOT / "src/Danova/videos/story-budi/vo.json"
VOICE = "id-ID-ArdiNeural"
RATE = "+6%"
FPS = 30

# id, scene, text
LINES = [
    ("01", "hook", "Jam dua lewat tujuh belas. Budi belum tidur."),
    ("02", "hook", "HP-nya nggak berhenti bunyi."),
    ("03", "chaos", "Empat puluh tujuh chat masuk."),
    ("04", "chaos", "Isinya? Hampir sama semua. Harga berapa, ready nggak, ongkirnya berapa."),
    ("05", "chaos", "Pas Budi akhirnya bales... pembelinya udah kabur ke toko sebelah."),
    ("06", "insight", "Dari empat puluh tujuh chat, cuma tiga yang beli."),
    ("07", "insight", "Produknya bagus. Tokonya aja yang tutup, pas orang mau beli."),
    ("08", "turn", "Terus, Budi bikin website."),
    ("09", "turn", "Harga, ongkir, tokonya asli atau nggak... semua udah dijawab di websitenya. Yang mau pesan, tinggal isi form."),
    ("10", "night", "Jam dua lewat tujuh belas lagi. Bedanya, kali ini Budi tidur."),
    ("11", "night", "Bangun-bangun, enam pesanan udah tercatat rapi. Tinggal konfirmasi, tanpa begadang."),
    ("12", "cta", "Toko lo juga bisa buka dua puluh empat jam."),
    ("13", "cta", "DM kata website ke Danova Digital. Konsultasi gratis."),
]


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


async def make(cid: str, text: str) -> None:
    raw = OUT / f"vo-{cid}.raw.mp3"
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(raw))
    # trim leading/trailing silence, normalise loudness
    af = (
        "silenceremove=start_periods=1:start_threshold=-45dB,"
        "areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
        "silenceremove=stop_periods=-1:stop_duration=0.32:stop_threshold=-42dB:stop_silence=0.28,"
        "loudnorm=I=-15:TP=-1.5:LRA=11"
    )
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(raw), "-af", af, "-ar", "44100", "-b:a", "192k", str(OUT / f"vo-{cid}.mp3")],
        check=True,
    )
    raw.unlink()


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    only = set(sys.argv[1:])
    for cid, _, text in LINES:
        if not only or cid in only:
            await make(cid, text)
    meta = []
    for cid, scene, text in LINES:
        f = OUT / f"vo-{cid}.mp3"
        meta.append({"id": cid, "scene": scene, "text": text, "frames": round(duration(f) * FPS)})
        print(f"vo-{cid} {meta[-1]['frames']:>4}f  {text}")
    META.write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf8")


asyncio.run(main())
