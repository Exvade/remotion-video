"""Find and audition ElevenLabs voices for Indonesian voiceover.

Needs ELEVENLABS_API_KEY: an environment variable (on Windows the user-level value is also
read from the registry, so no restart is needed after `setx`), or a line
`ELEVENLABS_API_KEY=...` in the project's .env file (git-ignored).

    python scripts/shared/elevenlabs-voices.py list [N]        # top N Indonesian voices from the Voice
                                                        # Library + download their free previews
    python scripts/shared/elevenlabs-voices.py say ID [ID...]  # read the test line with these voice ids
                                                        # (costs ~100 characters per voice)

Output goes to voice-samples/elevenlabs/.
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "voice-samples/elevenlabs"
API = "https://api.elevenlabs.io"
MODEL = "eleven_multilingual_v2"
TEXT = "Jam dua lewat tujuh belas. Budi belum tidur. HP-nya nggak berhenti bunyi. Empat puluh tujuh chat masuk."


def api_key() -> str:
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key and sys.platform == "win32":
        import winreg
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment") as k:
                key = winreg.QueryValueEx(k, "ELEVENLABS_API_KEY")[0]
        except OSError:
            pass
    env_file = ROOT / ".env"
    if not key and env_file.exists():
        m = re.search(r"^\s*ELEVENLABS_API_KEY\s*=\s*['\"]?([^'\"\r\n]+)", env_file.read_text(encoding="utf8"), re.M)
        key = m and m.group(1)
    if not key:
        sys.exit("ELEVENLABS_API_KEY is not set. Run:  setx ELEVENLABS_API_KEY \"your-key\"")
    return key.strip()


def call(method: str, path: str, body: dict | None = None, raw: bool = False):
    req = urllib.request.Request(
        API + path,
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"xi-api-key": api_key(), "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
    except urllib.error.HTTPError as e:
        sys.exit(f"{method} {path} -> {e.code}: {e.read().decode(errors='replace')[:400]}")
    return data if raw else json.loads(data)


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:40]


def cmd_list(n: int) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    q = urllib.parse.urlencode({"language": "id", "page_size": n, "sort": "usage_character_count_1y"})
    voices = call("GET", f"/v1/shared-voices?{q}")["voices"]
    rows = []
    for i, v in enumerate(voices, 1):
        name = f"{i:02d}-{slug(v['name'])}"
        rows.append({k: v.get(k) for k in
                     ("voice_id", "public_owner_id", "name", "gender", "age", "accent", "descriptive", "use_case", "description")})
        if v.get("preview_url"):
            with urllib.request.urlopen(v["preview_url"], timeout=60) as r:
                (OUT / f"preview-{name}.mp3").write_bytes(r.read())
        print(f"{i:02d}  {v['voice_id']}  {v['name']}  [{v.get('gender')}, {v.get('age')}, {v.get('accent')}, "
              f"{v.get('descriptive')}, {v.get('use_case')}]")
    (OUT / "voices.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf8")


def cmd_say(ids: list[str], model: str = MODEL, text: str = TEXT, settings: dict | None = None, tag: str = "") -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    known = {}
    if (OUT / "voices.json").exists():
        known = {v["voice_id"]: v for v in json.loads((OUT / "voices.json").read_text(encoding="utf8"))}
    mine = {v["voice_id"] for v in call("GET", "/v2/voices?page_size=100")["voices"]}
    for vid in ids:
        info = known.get(vid, {})
        use = vid
        if vid not in mine and info.get("public_owner_id"):
            # a Voice Library voice has to be added to "My Voices" before it can speak
            res = call("POST", f"/v1/voices/add/{info['public_owner_id']}/{vid}", {"new_name": info["name"]})
            use = res.get("voice_id", vid)
        audio = call("POST", f"/v1/text-to-speech/{use}?output_format=mp3_44100_128",
                     {"text": text, "model_id": model, **({"voice_settings": settings} if settings else {})}, raw=True)
        path = OUT / f"say-{slug(info.get('name', vid))}{tag}.mp3"
        path.write_bytes(audio)
        print("ok", path.relative_to(ROOT))


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] not in ("list", "say"):
        sys.exit(__doc__)
    if sys.argv[1] == "list":
        cmd_list(int(sys.argv[2]) if len(sys.argv) > 2 else 15)
    else:
        cmd_say(sys.argv[2:])
