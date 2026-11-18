"""Build one voice track that lines up with the CostComparison video timeline.

Reads the VO slices (at / src / dur) from src/brands/tivity/videos/CostComparison/timeline.ts, cuts them
out of public/brands/tivity/audio/cost-comparison/voiceover.mp3 and places each at its video frame.
Output: public/brands/tivity/audio/cost-comparison/voice-track.mp3

Run again whenever voiceover.mp3 or the VO timings in timeline.ts change:
    python scripts/tivity/build-voice-track.py
"""
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FPS = 30
TIMELINE = ROOT / "src/brands/tivity/videos/CostComparison/timeline.ts"
AUDIO_DIR = ROOT / "public/brands/tivity/audio/cost-comparison"
SRC = AUDIO_DIR / "voiceover.mp3"
OUT = AUDIO_DIR / "voice-track.mp3"
FFMPEG = shutil.which("ffmpeg")
if not FFMPEG:  # fall back to the binary from `pip install imageio-ffmpeg`
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
PRE, POST = 3, 6  # frames of padding so no consonant gets clipped

text = TIMELINE.read_text(encoding="utf8")
vo_block = text[text.index("export const VO"):text.index("/** Absolute frame")]
clips = [
    (int(at), float(src), round(float(dur) * FPS))
    for at, src, dur in re.findall(r"at:\s*(\d+),\s*src:\s*([\d.]+),\s*dur:\s*sec\(([\d.]+)\)", vo_block)
]
total = int(re.search(r"TOTAL_FRAMES\s*=\s*(\d+)", text).group(1))
assert clips, "no VO clips found in timeline.ts"

parts, labels = [], []
for i, (at, src, dur) in enumerate(clips):
    start = max(0.0, src - PRE / FPS)
    lead = src - start  # padding actually available before the phrase (less at file start)
    length = dur / FPS + lead + POST / FPS
    delay_ms = max(0, round((at / FPS - lead) * 1000))
    parts.append(f"[0:a]atrim=start={start:.3f}:duration={length:.3f},asetpts=PTS-STARTPTS,"
                 f"afade=t=in:d=0.02,afade=t=out:st={length - 0.04:.3f}:d=0.04,adelay={delay_ms}:all=1[v{i}]")
    labels.append(f"[v{i}]")
graph = ";".join(parts) + ";" + "".join(labels) + \
    f"amix=inputs={len(labels)}:normalize=0,apad,atrim=duration={total / FPS:.3f}[out]"

subprocess.run([FFMPEG, "-y", "-v", "error", "-i", str(SRC), "-filter_complex", graph,
                "-map", "[out]", "-ar", "44100", "-b:a", "192k", str(OUT)], check=True)
print(f"wrote {OUT.relative_to(ROOT)} from {len(clips)} slices")
