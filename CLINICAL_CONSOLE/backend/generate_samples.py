import io
import base64
import os
from PIL import Image, ImageDraw

def create_sample_fundus(case_type):
    img = Image.new('RGB', (480, 480), (14, 18, 26))
    draw = ImageDraw.Draw(img)
    
    # Outer dark retinal circle
    draw.ellipse([20, 20, 460, 460], fill=(145, 45, 20), outline=(210, 110, 50), width=3)
    # Inner glow
    draw.ellipse([45, 45, 435, 435], fill=(170, 58, 25))
    
    # Optic Disc
    od_x, od_y = 130, 240
    draw.ellipse([od_x - 35, od_y - 45, od_x + 35, od_y + 45], fill=(245, 215, 150), outline=(255, 235, 180), width=2)
    # Physiological cup
    draw.ellipse([od_x - 16, od_y - 20, od_x + 16, od_y + 20], fill=(255, 248, 210))
    
    # Macula / Fovea
    mac_x, mac_y = 310, 245
    draw.ellipse([mac_x - 30, mac_y - 30, mac_x + 30, mac_y + 30], fill=(130, 38, 18))
    draw.ellipse([mac_x - 8, mac_y - 8, mac_x + 8, mac_y + 8], fill=(105, 28, 12))
    
    # Major retinal blood vessels branching from optic disc
    vessels = [
        [(od_x, od_y), (160, 160), (220, 100), (320, 75), (410, 90)],
        [(od_x, od_y), (160, 320), (230, 380), (330, 405), (410, 390)],
        [(od_x, od_y), (110, 150), (80, 100)],
        [(od_x, od_y), (110, 330), (75, 380)],
    ]
    for v in vessels:
        draw.line(v, fill=(95, 18, 12), width=5)
        offset_v = [(x + 4, y + 2) for (x, y) in v]
        draw.line(offset_v, fill=(185, 32, 20), width=3)

    if case_type == 'moderate':
        # Add microaneurysms and hard exudates
        mas = [(280, 200), (340, 210), (320, 290), (260, 270), (350, 180)]
        for x, y in mas:
            draw.ellipse([x-4, y-4, x+4, y+4], fill=(85, 10, 10))
        # Hard exudates
        exs = [(330, 270), (340, 275), (345, 265), (355, 272), (338, 285)]
        for x, y in exs:
            draw.ellipse([x-5, y-5, x+5, y+5], fill=(245, 230, 140))
            
    elif case_type == 'severe':
        # Cotton wool spots
        cws = [(220, 180), (270, 330), (370, 160)]
        for x, y in cws:
            draw.ellipse([x-14, y-10, x+14, y+10], fill=(230, 225, 220), outline=(250, 245, 235))
        # Hemorrhages
        hems = [(290, 180), (250, 310), (360, 320), (380, 220), (330, 330)]
        for x, y in hems:
            draw.ellipse([x-9, y-7, x+9, y+7], fill=(80, 5, 5))
        # Neovascularization network
        draw.line([(od_x + 20, od_y - 20), (170, 200), (185, 185), (175, 170)], fill=(200, 40, 30), width=2)
        draw.line([(od_x + 10, od_y - 30), (160, 190), (150, 175)], fill=(200, 40, 30), width=2)

    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=92)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode('utf-8')

os.makedirs(r'frontend/src/data', exist_ok=True)

normal_b64 = create_sample_fundus('normal')
mod_b64 = create_sample_fundus('moderate')
sev_b64 = create_sample_fundus('severe')

with open(r'frontend/src/data/sampleCases.js', 'w', encoding='utf-8') as f:
    f.write('export const SAMPLE_CASES = [\n')
    f.write('  {\n    id: "normal-1",\n    title: "Healthy Retinal Fundus",\n    category: "Class 0: No DR",\n    badgeColor: "emerald",\n    description: "Uniform vascular caliber, clear macula, sharp optic disc margins.",\n    imageUrl: "' + normal_b64 + '",\n    filename: "retina_healthy_OD.jpg"\n  },\n')
    f.write('  {\n    id: "moderate-1",\n    title: "Moderate NPDR Fundus",\n    category: "Class 2: Moderate DR",\n    badgeColor: "amber",\n    description: "Multiple microaneurysms, blot hemorrhages and outer plexiform hard exudates.",\n    imageUrl: "' + mod_b64 + '",\n    filename: "retina_moderate_dr_OS.jpg"\n  },\n')
    f.write('  {\n    id: "severe-1",\n    title: "Severe Proliferative DR",\n    category: "Class 4: Proliferative DR",\n    badgeColor: "rose",\n    description: "Neovascularization elsewhere (NVE), cotton wool spots and retinal ischemia.",\n    imageUrl: "' + sev_b64 + '",\n    filename: "retina_pdr_highrisk_OD.jpg"\n  }\n];\n')

print('sampleCases.js generated successfully!')
