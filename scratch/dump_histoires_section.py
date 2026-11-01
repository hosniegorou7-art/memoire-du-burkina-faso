with open("/tmp/christian_bundle.js", "r") as f:
    text = f.read()

pos = text.find('id:"histoires"')
print(text[pos-200:pos+2500])
