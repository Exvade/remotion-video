# Naskah Narasi — Cost Comparison (v2)

Durasi: 39 detik (1170 frame @30fps, 1080×1920).
Narasi: ElevenLabs (Eleven Multilingual v2), satu take penuh di `public/audio/cost-comparison/voiceover.mp3`.
Video memutar potongan file itu per scene; titik potong & timing frasa ada di `src/CostComparison/timeline.ts` (`VO[].src`, `VO[].phrases[].t`).

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

## Ganti narasi

1. Generate ulang naskah sebagai satu file (voice & setting sama). Simpan mentahnya sebagai `voiceover-raw.mp3`.
2. Normalisasi volume ke ~-15 LUFS -> `voiceover.mp3` (rekaman ElevenLabs bawaan sekitar -30 LUFS, terlalu pelan).
3. Ukur ulang detik awal tiap bagian (`src`) dan frasa (`t`) di `src/CostComparison/timeline.ts`.
4. Jalankan `python scripts/build-voice-track.py` -> `voice-track.mp3` (satu track narasi yang sudah pas dengan timeline video).
