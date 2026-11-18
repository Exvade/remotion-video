# Naskah Narasi — Cost Comparison (v3)

Durasi: 41,5 detik (1245 frame @30fps, 1080×1920).
Narasi: ElevenLabs (Eleven v3 + audio tags, naskah di bawah), satu take penuh di `public/brands/tivity/audio/cost-comparison/voiceover.mp3`.
Video memutar potongan file itu per scene; titik potong & timing frasa ada di `src/brands/tivity/videos/CostComparison/timeline.ts` (`VO[].src`, `VO[].phrases[].t`).

| Bagian | Klip | Narasi |
|---|---|---|
| 0:00 | vo-01-hook | Tiga ratus undangan. Cetak, atau digital? Mana yang lebih hemat? |
| 0:06 | vo-02-print | Undangan cetak: enam ribu per lembar, kali tiga ratus tamu. Ditambah ongkir, tiga ratus ribu. |
| 0:13 | vo-03-total | Totalnya, dua juta seratus ribu. |
| 0:17 | vo-04-digital | Undangan digital? Cuma sembilan puluh sembilan ribu. Langsung sebar lewat WhatsApp, lengkap dengan RSVP dan peta lokasi. |
| 0:27 | vo-05-savings | Kamu hemat lebih dari dua juta rupiah. Pas buat souvenir, catering, atau bulan madu. |
| 0:34 | vo-06-cta | Pesan undangan digitalmu sekarang. Link-nya ada di bio! |

Musik latar & SFX (music, whoosh, pop, tick, ding, cash, rise) disintesis sendiri — bebas lisensi.

**Catatan:** narasi direkam untuk angka default (Rp 6.000 × 300 + ongkir Rp 300.000, digital Rp 99.000).
Kalau props angka diubah, visual ikut berubah tetapi suara tidak — rekam ulang narasinya, atau set `withAudio: false`.

## Naskah v3 (dengan audio tags, biar tidak datar)

Model: **Eleven v3** (audio tags tidak jalan di Multilingual v2). Stability: **Creative** atau **Natural**.

```
[curious] Tiga ratus undangan... [playfully] Cetak — atau digital? [whispers] Mana yang lebih HEMAT?

[matter-of-fact] Undangan cetak: enam ribu per lembar... kali tiga ratus tamu. [sighs] Ditambah ongkir... tiga ratus ribu.

[shocked] Totalnya? DUA JUTA... seratus ribu!

[excited] Undangan digital? [laughs softly] Cuma sembilan puluh sembilan ribu! [cheerfully] Langsung sebar lewat WhatsApp — lengkap dengan RSVP, dan peta lokasi.

[warmly] Kamu hemat lebih dari DUA JUTA rupiah. [excited] Pas buat souvenir... catering... [dreamy] atau bulan madu.

[confident] Pesan undangan digitalmu sekarang. [playfully] Link-nya ada di bio!
```

## Ganti narasi

1. Generate ulang naskah sebagai satu file (voice & setting sama). Simpan mentahnya sebagai `voiceover-raw.mp3`.
2. Normalisasi volume ke ~-15 LUFS -> `voiceover.mp3` (rekaman ElevenLabs bawaan sekitar -30 LUFS, terlalu pelan).
3. Ukur ulang detik awal tiap bagian (`src`) dan frasa (`t`) di `src/brands/tivity/videos/CostComparison/timeline.ts`.
4. Scene memakai `P(i, j)` (awal frasa) dari timeline, jadi cukup ubah angka `t` di `VO`.
5. Jalankan `python scripts/tivity/build-voice-track.py` -> `voice-track.mp3` (satu track narasi yang sudah pas dengan timeline video).
