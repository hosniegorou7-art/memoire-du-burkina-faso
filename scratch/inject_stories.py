import re
import json
from define_new_stories import new_stories

base_path = "/home/masqueyyy/.gemini/antigravity/scratch/faso-contes-legendes"

# 1. Update static/js/data/stories.js
stories_js_path = f"{base_path}/static/js/data/stories.js"
with open(stories_js_path, "r", encoding="utf-8") as f:
    code = f.read()

# Insert new stories at the beginning of FASO_STORIES_DB array
json_stories = json.dumps(new_stories, ensure_ascii=False, indent=2)
# Remove outer brackets
inner_json = json_stories.strip()[1:-1].strip()

# Target where array starts
target = "const FASO_STORIES_DB = ["
if target in code and "suruku-ni-sonsannin" not in code:
    new_code = code.replace(target, target + "\n" + inner_json + ",\n")
    with open(stories_js_path, "w", encoding="utf-8") as f:
        f.write(new_code)
    print("Updated static/js/data/stories.js successfully")
else:
    print("static/js/data/stories.js already contains new stories or target not found")

# 2. Update static/js/data.js
data_js_path = f"{base_path}/static/js/data.js"
with open(data_js_path, "r", encoding="utf-8") as f:
    dcode = f.read()

target_d = "const FASO_STORIES = ["
if target_d in dcode and "suruku-ni-sonsannin" not in dcode:
    new_dcode = dcode.replace(target_d, target_d + "\n" + inner_json + ",\n")
    with open(data_js_path, "w", encoding="utf-8") as f:
        f.write(new_dcode)
    print("Updated static/js/data.js successfully")
else:
    print("static/js/data.js already contains new stories or target not found")

# 3. Update app.py
app_py_path = f"{base_path}/app.py"
with open(app_py_path, "r", encoding="utf-8") as f:
    acode = f.read()

target_a = "STORIES_DATA = ["
if target_a in acode and "suruku-ni-sonsannin" not in acode:
    new_acode = acode.replace(target_a, target_a + "\n" + inner_json + ",\n")
    with open(app_py_path, "w", encoding="utf-8") as f:
        f.write(new_acode)
    print("Updated app.py successfully")
else:
    print("app.py already contains new stories or target not found")
