import json
import os
import base64
import re
import argparse
import openai
from pathlib import Path
from typing import Dict, Any, List
from PIL import Image
import io
import time
from collections import defaultdict
from tqdm import tqdm


def parse_arguments():
    parser = argparse.ArgumentParser(description='Fantasy Object Image Evaluation Tool')
    parser.add_argument('--json_path', required=True)
    parser.add_argument('--image_dir', required=True)
    parser.add_argument('--output_dir', required=True)
    parser.add_argument('--api_key', required=True)
    parser.add_argument('--model', required=True)
    parser.add_argument('--result_full', required=True)
    parser.add_argument('--result_scores', required=True)
    return parser.parse_args()

def get_config(args):
    return {
        "json_path": args.json_path,
        "image_dir": args.image_dir,
        "output_dir": args.output_dir,
        "api_key": args.api_key,
        "model": args.model,
        "result_files": {
            "full": args.result_full,
            "scores": args.result_scores
        }
    }

def extract_scores(evaluation_text: str) -> Dict[str, float]:
    pattern = r"(Fantasy Fulfillment|Identity Preservation|Aesthetic Quality)\s*[:：]?\s*(\d{1,2})"
    scores = {
        "Fantasy Fulfillment": -1,
        "Identity Preservation": -1,
        "Aesthetic Quality": -1
    }
    for match in re.findall(pattern, evaluation_text):
        field, value = match
        field = field.strip()
        try:
            val = float(value)
            val = max(0, min(val, 10))
            if field in scores:
                scores[field] = val
        except ValueError:
            continue
    return scores

def encode_image(image_path: str) -> str:
    with Image.open(image_path) as img:
        img = img.convert("RGB")
        buffer = io.BytesIO()
        img.save(buffer, format="JPEG")
        return base64.b64encode(buffer.getvalue()).decode("utf-8")

def load_prompts(json_path: str) -> Dict[int, Dict[str, Any]]:
    data = {}
    with open(json_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                item = json.loads(line)
                data[item["id"]] = item
    return data

def build_messages(prompt_data: Dict, image_base64: str) -> list:
    return [
    {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "You are an AI quality auditor for text-to-image generation. Apply these rules with ABSOLUTE RUTHLESSNESS. Only images meeting the HIGHEST standards should receive top scores. Your job is to evaluate how well the image fulfills the fantasy design task, considering all instructions with maximum precision."
            }
        ]
    },
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": f"""Please evaluate strictly and return ONLY the three scores as requested.

# Fantasy Object Image Evaluation Protocol (Human-based tasks)

## Input Parameters
- PROMPT: [Original instruction provided to the model]
- EXPLANATION: [Detailed explanation of what the prompt is trying to achieve]

---

## Scoring Criteria (0–10 for each)

**Fantasy Fulfillment (0–10):**  
How well does the image realize the intended fantasy transformation described in the prompt?  
- 0: No sign of the transformation; the fantasy idea is entirely ignored or contradicted.
- 1–3: The transformation is misunderstood or poorly executed, with key fantasy features missing, wrong, or distorted.  
- 4–6: Some aspects of the transformation appear, but with clear flaws — such as vague, generic, or misaligned features.  
- 7–9: Most fantasy elements are present and understandable, but minor details may be off in material, form, or integration.
- 10: The transformation is fully and precisely implemented. Every visual element aligns with the prompt's intent — including texture, shape, integration, and plausibility.

To score 10, the image must exactly reflect the imagined transformation with no major deviations.

**Identity Preservation (0–10):**  
How clearly does the image preserve the recognizable identity of the original object/person despite the fantasy alteration?  
- 0: The object/person is completely unrecognizable or heavily distorted.  
- 1–3: The identity is barely preserved; key visual traits are missing or incorrect.  
- 4–6: Some identity traits remain, but many are altered, stylized, or inconsistent.  
- 7–9: The core features are retained well, with minor issues.  
- 10: The base object/person is clearly and faithfully represented in all major aspects.
Stylized or cartoon-like rendering should be rated **lower**, even if the shape is roughly preserved. Identity must be preserved in **realistic detail**, not just symbolic outline.

**Aesthetic Quality (0–10):**  
How visually appealing, clear, and realistic is the image overall?  
- 0: Poor quality, low resolution, or visually broken.  
- 1–3: Basic rendering flaws or artifacts significantly hurt visual quality.  
- 4–6: Adequate quality with moderate imperfections.  
- 7–9: High-quality rendering with good composition and polish.  
- 10: Excellent visual clarity, realism, and artistic balance.


---

## Output Format  
Return scores (0–10) and **brief justification** for each item.

Output Format Example:

Fantasy Fulfillment: <score>  
Reason: <one-sentence explanation>  

Identity Preservation: <score>  
Reason: <one-sentence explanation>  

Aesthetic Quality: <score>  
Reason: <one-sentence explanation>  

---

Only provide the scores and reasons. Do not include any extra formatting or comments.

---

## Enforcement Notes  
- Be extremely strict and objective.  
- A score of **10** must indicate complete success and flawless execution.  
- If the fantasy transformation is weak or confusing → downgrade **Fantasy Fulfillment**.  
- If the base object/person is unrecognizable or overly stylized → downgrade **Identity Preservation**.  
- If realism or visual appeal is compromised → downgrade **Aesthetic Quality**.  
- Reject images that exhibit cartoonish rendering or inconsistent fantasy logic.

---

Here are the inputs for evaluation:  
PROMPT: "{prompt_data['instruction']}"  
EXPLANATION: "{prompt_data['note']}"  

Please evaluate this image:
"""
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{image_base64}"
                }
            }
        ]
    }
]



def evaluate_image(prompt_data: Dict, image_path: str, config: Dict, max_retries: int = 3) -> Dict[str, Any]:
    for attempt in range(max_retries):
        try:
            image_b64 = encode_image(image_path)
            messages = build_messages(prompt_data, image_b64)
            response = client.chat.completions.create(
                model=config["model"],
                messages=messages,
                temperature=0.0,
                max_tokens=1024,
            )
            content = response.choices[0].message.content.strip()
            scores = extract_scores(content)
            min_fi = min(scores["Fantasy Fulfillment"], scores["Identity Preservation"])
            weighted_score = min_fi * 0.8 + scores["Aesthetic Quality"] * 0.2
            return {
                "evaluation": content,
                "Weighted Score": round(weighted_score, 3)
            }
        except Exception as e:
            print(f"[Attempt {attempt+1}] Evaluation failed for image {image_path}: {e}")
            time.sleep(2)
    return {
        "evaluation": f"Evaluation failed after {max_retries} attempts.",
        "Weighted Score": 0
    }

def save_results(data: List[Dict], filename: str, config: Dict):
    path = os.path.join(config["output_dir"], filename)
    with open(path, 'w', encoding='utf-8') as f:
        if filename.endswith('.jsonl'):
            for item in data:
                f.write(json.dumps(item, ensure_ascii=False) + "\n")
        else:
            json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[Saved] {filename}")

def main():
    args = parse_arguments()
    config = get_config(args)
    Path(config["output_dir"]).mkdir(parents=True, exist_ok=True)

    # ✅ 用传入的 API Key 初始化 client
    global client
    client = openai.OpenAI(
        api_key=config["api_key"]
    )

    prompts = load_prompts(config["json_path"])

    full_results = []
    score_results = []
    type_scores = defaultdict(lambda: {
        "Weighted Score": []
    })

    img_map = {}
    missing_ids = []   # 新增：记录缺失图片的ID

    for pid, pdata in prompts.items():
        found = False
        for ext in ["png", "jpg", "jpeg", "webp"]:
            candidate = os.path.join(config["image_dir"], f"{pid}.{ext}")
            if os.path.exists(candidate):
                img_map[pid] = candidate
                found = True
                break
        if not found:
            missing_ids.append(pid)  # 没找到就记录下来


    type_map = {
        "COLOR": "Attribute shift",
        "SHAPE": "Attribute shift",
        "SIZE": "Attribute shift",
        "MATERIAL": "Hybridization",
        "COMBINATION": "Hybridization",
        "TIME": "Spatiotemporal",
        "ENVIRONMENT": "Spatiotemporal",
        "Multi-Object": "Multi-Object"
    }

    for pid, pdata in tqdm(prompts.items(), desc="Evaluating", ncols=100):
        if pid not in img_map:
            continue
        result = evaluate_image(pdata, img_map[pid], config)
        merged_type = type_map.get(pdata["type"], pdata["type"])

        full_results.append({
            "id": pid,
            "instruction": pdata["instruction"],
            "note": pdata["note"],
            "type": merged_type,
            "image_path": img_map[pid],
            "evaluation": result["evaluation"]
        })

        score_results.append({
            "id": pid,
            "type": merged_type,
            "Weighted Score": result["Weighted Score"],
            "evaluation_text": result["evaluation"]
        })

        type_scores[merged_type]["Weighted Score"].append(result["Weighted Score"])

    save_results(full_results, config["result_files"]["full"], config)
    save_results(score_results, config["result_files"]["scores"], config)

    if missing_ids:
        print("\n[Missing Images]")
        print(", ".join(map(str, missing_ids)))

    print("\n[Per-Type Average Scores]")
    for task_type, score_dict in type_scores.items():
        if score_dict["Weighted Score"]:
            avg = round(sum(score_dict["Weighted Score"]) / len(score_dict["Weighted Score"]), 3)
            print(f"  {task_type}: {avg}")
        else:
            print(f"  {task_type}: (no data)")

    weights = {
        "Attribute shift": 3,
        "Hybridization": 2,
        "Spatiotemporal": 2,
        "TWO_OBJECT": 2
    }
    overall_score = 0
    total_weight = 0
    for tname, w in weights.items():
        if type_scores[tname]["Weighted Score"]:
            avg = sum(type_scores[tname]["Weighted Score"]) / len(type_scores[tname]["Weighted Score"])
            overall_score += avg * w
            total_weight += w
    if total_weight > 0:
        overall_score /= total_weight

    print(f"\n[Overall Weighted Score]: {round(overall_score, 3)}")

if __name__ == "__main__":
    main()


