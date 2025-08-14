import os
from datasets import load_from_disk
import json
# Load dataset
dataset = load_from_disk("omnicontext/datasets")

# Set output paths
output_dir = "omnicontext/data/"
image_dir = os.path.join(output_dir, "images")
text_path = os.path.join(output_dir, "metadata.json")

# Create directories
os.makedirs(image_dir, exist_ok=True)

# Save images and instructions
result_list = []
for idx, sample in enumerate(dataset['train']):
    key = sample["key"]
    images = sample["input_images"]
    instruction = sample["instruction"]
    task_type = sample["task_type"]

    image_filenames = []
    for img_idx, img in enumerate(images):
        image_filename = f"{key}_{img_idx}.jpg"
        image_filenames.append(image_filename)
        image_path = os.path.join(image_dir, task_type, image_filename)
        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        img.save(image_path)

    result = {
        "id": key,
        "task_type": task_type,
        "ori_img": image_filenames,
        "ins_en": instruction
    }
    result_list.append(result)
# Save as JSON file
with open(text_path, 'w') as f:
    json.dump(result_list, f, ensure_ascii=False, indent=2)
