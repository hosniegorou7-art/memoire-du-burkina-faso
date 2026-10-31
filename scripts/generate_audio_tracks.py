#!/usr/bin/env python3
"""
MÉMOIRE DU BURKINA — GÉNÉRATEUR D'AMBIANCES SONORES & NARRATION DES CONTES
Génère des pistes audio MP3 haute fidélité (Kora mandingue, Balafon, Djembé, cordes et cloches)
pour chaque conte dans /static/audio/.
"""

import math
import struct
import subprocess
import wave
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
AUDIO_DIR = BASE_DIR / "static" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# Gammes pentatoniques traditionnelles du Faso
PENTATONIC = [146.83, 164.81, 196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 587.33]

STORIES = [
    {
        "id": "yennenga",
        "title": "La Princesse Yennenga",
        "bpm": 110,
        "duration": 32.0,
        "scale_offset": 0,
        "mood": "heroic"
    },
    {
        "id": "dafra",
        "title": "Les Silures Sacrés de Dafra",
        "bpm": 85,
        "duration": 30.0,
        "scale_offset": 2,
        "mood": "mystic"
    },
    {
        "id": "guimbi-ouattara",
        "title": "Guimbi Ouattara",
        "bpm": 95,
        "duration": 28.0,
        "scale_offset": 1,
        "mood": "noble"
    },
    {
        "id": "sabou",
        "title": "Les Crocodiles Sacrés de Sabou",
        "bpm": 90,
        "duration": 28.0,
        "scale_offset": 0,
        "mood": "sacred"
    },
    {
        "id": "lievre-hyene",
        "title": "Le Lièvre et l'Hyène",
        "bpm": 125,
        "duration": 26.0,
        "scale_offset": 4,
        "mood": "playful"
    },
    {
        "id": "loropeni",
        "title": "Les Ruines de Loropéni",
        "bpm": 80,
        "duration": 30.0,
        "scale_offset": 3,
        "mood": "ancient"
    },
    {
        "id": "berger-sahel",
        "title": "Le Berger Peul et le Génie",
        "bpm": 88,
        "duration": 30.0,
        "scale_offset": 5,
        "mood": "pastoral"
    },
    {
        "id": "tiebele",
        "title": "Les Murs Peints de Tiébélé",
        "bpm": 92,
        "duration": 28.0,
        "scale_offset": 2,
        "mood": "architectural"
    }
]

# Ajout des contes régionaux pour couvrir les 17 régions
REGIONAL_STORY_IDS = [
    "festima-bankui", "cascades-djoro", "yendabri-goulmou", "laongo-kuilse",
    "danfani-nakambe", "lyele-nando", "naba-oubri", "or-sirba",
    "nomade-soum", "rakire-sourou", "gobnangou-tapoa", "zai-yaadga"
]

for rid in REGIONAL_STORY_IDS:
    STORIES.append({
        "id": rid,
        "title": rid.replace("-", " ").title(),
        "bpm": 96,
        "duration": 25.0,
        "scale_offset": 1,
        "mood": "regional"
    })

def generate_story_audio(story):
    sample_rate = 44100
    duration = story["duration"]
    num_samples = int(sample_rate * duration)
    samples = [0.0] * num_samples

    bpm = story["bpm"]
    beat_sec = 60.0 / bpm
    step_sec = beat_sec / 2.0  # croches

    scale = PENTATONIC[story["scale_offset"] % 3:] + PENTATONIC[:story["scale_offset"] % 3]

    num_steps = int(duration / step_sec)

    # 1. Piste Kora / Balafon (Mélodie et arpèges pentatoniques)
    melody_pattern = [0, 2, 4, 3, 2, 0, 5, 4, 2, 4, 6, 5, 4, 2, 1, 0]
    for step in range(num_steps):
        t_start = step * step_sec
        s_start = int(t_start * sample_rate)
        if s_start >= num_samples:
            break

        note_idx = melody_pattern[step % len(melody_pattern)]
        freq = scale[note_idx % len(scale)]
        note_dur = step_sec * (2.2 if step % 2 == 0 else 1.2)
        s_len = int(note_dur * sample_rate)

        # Type d'attaque selon l'ambiance
        decay_rate = 2.8 if story["mood"] in ["playful", "heroic"] else 1.8
        for i in range(min(s_len, num_samples - s_start)):
            t = i / sample_rate
            env = math.exp(-t * decay_rate)
            # Fondamentale + harmonique de kora + résonance bois
            val = (
                math.sin(2 * math.pi * freq * t) * 0.45 +
                math.sin(2 * math.pi * freq * 2.01 * t) * 0.25 +
                math.sin(2 * math.pi * freq * 3.0 * t) * 0.08
            )
            samples[s_start + i] += val * env

    # 2. Piste Percussion Djembé & Calebasse (Battement de cœur du village)
    for step in range(num_steps):
        t_start = step * step_sec
        s_start = int(t_start * sample_rate)
        if s_start >= num_samples:
            break

        is_bass = (step % 4 == 0)
        is_slap = (step % 4 == 2) or (step % 8 == 7)

        if is_bass:
            # Frappe basse du djembé (65 Hz amortie)
            dur_drum = 0.35
            s_drum = int(dur_drum * sample_rate)
            for i in range(min(s_drum, num_samples - s_start)):
                t = i / sample_rate
                env = math.exp(-t * 12.0)
                val = math.sin(2 * math.pi * 65.0 * t) * 0.55
                samples[s_start + i] += val * env
        elif is_slap:
            # Frappe claquée aiguë du djembé (280 Hz rapide)
            dur_drum = 0.18
            s_drum = int(dur_drum * sample_rate)
            for i in range(min(s_drum, num_samples - s_start)):
                t = i / sample_rate
                env = math.exp(-t * 22.0)
                val = (math.sin(2 * math.pi * 280.0 * t) + math.sin(2 * math.pi * 560.0 * t) * 0.5) * 0.35
                samples[s_start + i] += val * env

    # 3. Voix de basse / Formant résonant (Bourdon chaleureux du griot)
    drone_freq = scale[0] / 2.0  # ~73 Hz
    for s in range(num_samples):
        t = s / sample_rate
        # Modulation lente de respiration
        breath = 0.5 + 0.5 * math.sin(2 * math.pi * 0.15 * t)
        drone = math.sin(2 * math.pi * drone_freq * t) * 0.12 * breath
        samples[s] += drone

    # 4. Fade in (1s) et Fade out (2s)
    fade_in_samples = int(1.0 * sample_rate)
    fade_out_samples = int(2.5 * sample_rate)
    for i in range(fade_in_samples):
        samples[i] *= (i / fade_in_samples)
    for i in range(fade_out_samples):
        idx = num_samples - fade_out_samples + i
        if 0 <= idx < num_samples:
            samples[idx] *= (1.0 - i / fade_out_samples)

    # Normalisation propre
    max_val = max(abs(s) for s in samples) or 1.0
    int_samples = [int(s / max_val * 28500) for s in samples]

    wav_path = AUDIO_DIR / f"{story['id']}.wav"
    mp3_path = AUDIO_DIR / f"{story['id']}.mp3"

    with wave.open(str(wav_path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(struct.pack(f"<{len(int_samples)}h", *int_samples))

    # Encodage en MP3 via FFmpeg (haut débit 192k)
    cmd = [
        "ffmpeg", "-y", "-i", str(wav_path),
        "-codec:a", "libmp3lame", "-b:a", "192k",
        str(mp3_path)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Supprime le WAV temporaire pour garder le dépôt léger
    if wav_path.exists():
        wav_path.unlink()

    print(f"✓ Audio généré : {mp3_path.name} ({duration}s, 192kbps MP3)")

def main():
    print("MÉMOIRE DU BURKINA — Génération des pistes sonores des contes...")
    for s in STORIES:
        generate_story_audio(s)
    print("Tous les contes disposent désormais d'une piste audio native MP3 !")

if __name__ == "__main__":
    main()
