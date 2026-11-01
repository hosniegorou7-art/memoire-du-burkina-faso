import re
import json

with open("/tmp/christian_bundle.js", "r", encoding="utf-8") as f:
    text = f.read()

# Let us find where stories array is defined
pos = text.find('audioUrl:"/Bissa.mp3"')
if pos != -1:
    start = text.rfind('[', 0, pos)
    end = text.find('];', pos)
    print("Found array chunk length:", end - start)
    # print context
    print(text[start:end+2])
