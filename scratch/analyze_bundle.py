import re
import json

with open("/tmp/christian_bundle.js", "r", encoding="utf-8") as f:
    text = f.read()

# Find audio mentions
print("=== AUDIO FILES ===")
for ext in ["mp3", "wav", "ogg", "m4a", "audio"]:
    matches = re.findall(rf'["\'][^"\']*{ext}[^"\']*["\']', text, re.IGNORECASE)
    print(f"Extension {ext}: {len(matches)} matches")
    for m in set(matches[:15]):
        print("  ", m)

# Search for story objects or array of tales
print("\n=== STORY SEARCH ===")
# Look for title, region, audioUrl or audio
for term in ["audioUrl", "audio_url", "audioSrc", "soundUrl", "audio:"]:
    pos = text.find(term)
    if pos != -1:
        print(f"Found {term} at {pos}:")
        print(text[max(0, pos-100):min(len(text), pos+300)])
        print("-" * 50)
