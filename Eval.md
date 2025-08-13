# Geneval++ Image Generation & Evaluation

## 1. Workflow Summary

1. Generate images using the prompts from `Geneval++.txt`.
2. Run `Eval-gpt-4.1-geneval++.py` with the required parameters.
3. Review the tag-wise and overall accuracy metrics in the output.

---

## 2. Image Generation

Use your image generation model to produce images based on the prompts in **Geneval++.txt**.  
Save each generated image with a filename corresponding to the **line number** in the prompt file:

1.jpg
2.jpg
3.jpg
...

---

## 3. Evaluation

The script **Eval-gpt-4.1-geneval++.py** calculates evaluation metrics for the generated images.

### Required Parameters

meta_path = Path("Geneval++.jsonl")  # Provided Geneval++ metadata
image_dir = Path("image")            # Directory containing generated images
output_path = Path("Output.json")    # File path for evaluation results

You will also need to provide your API key when running the evaluation.

---

## 4. Example Output

📊 Tag-wise Accuracy Report:
🟩 Tag: color_attr             | Accuracy: 85.00% (34/40)
🟩 Tag: spatial_count_attr     | Accuracy: 62.50% (25/40)
🟩 Tag: color_spatial_attr     | Accuracy: 62.50% (25/40)
🟩 Tag: color_count_attr       | Accuracy: 75.00% (30/40)
🟩 Tag: multi_object_count_attr| Accuracy: 85.00% (34/40)
🟩 Tag: size_spatial_attr      | Accuracy: 77.50% (31/40)
🟩 Tag: counting               | Accuracy: 65.00% (26/40)

⭐ Overall score (mean of tag accuracies): 73.21%
ℹ️ Overall accuracy (all samples): 73.21%
