# Geneval Evaluation

## 1. Workflow Summary

Note: Geneval and Geneval++ are two separate, independent benchmarks.

1. Configure model weights and output path inside the script.
2. Run the shell script to generate images and evaluate scores.
3. Review per-sample results and summary scores.

The script launches distributed generation with torchrun and saves images to `$output_path/images`.
Configuration inside the script:

- model_path: path to Echo-4o weights (download from https://huggingface.co/Yejy53/Echo-4o).
- output_path: output root (default: `results/geneval_outputs`).
- metadata_file: defaults to `./eval/gen/geneval/prompts/evaluation_metadata_long.jsonl`
- batch_size, num_images, resolution, max_latent_size: tune for memory/speed.

```shell
bash scripts/eval/run_geneval.sh
```

The script evaluates the generated images with `evaluate_images_mp.py`, writes per-sample results to `$output_path/results.jsonl`, and then runs `summary_scores.py` to print a summary.

- Images: `$output_path/images/`
- Raw results: `$output_path/results.jsonl`
- Summary: `$output_path\geneval_results.txt`

All outputs are saved under `$output_path`.

# Geneval++ Evaluation

## 1. Workflow Summary

1. Generate images using the prompts from `Geneval++.txt`.
2. Run `Eval-gpt-4.1-geneval++.py` with the required parameters.
3. Review the tag-wise and overall accuracy metrics in the output.

## 2. Image Generation

Use your image generation model to produce images based on the prompts in **Geneval++.txt**.  
Save each generated image with a filename corresponding to the **line number** in the prompt file:

```shell
1.jpg
2.jpg
3.jpg
...
```

## 3. Evaluation

The script `Eval-gpt-4.1-geneval++.py` calculates evaluation metrics for the generated images.

### Required Parameters

```shell
meta_path = Path("Geneval++.jsonl")  # Provided Geneval++ metadata
image_dir = Path("image")            # Directory containing generated images
output_path = Path("Output.json")    # File path for evaluation results
```

You will also need to provide your API key when running the evaluation.

## 4. Example Output

```shell
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
```

---

# Imagine-Bench

## 1. Workflow Summary

1. Generate images using the prompts from `Imagine.txt`.
2. Run `Eval-gpt-4.1-Imagine.py` with the required parameters.
3. Review the evaluation results, including full JSON outputs and score summaries.

## 2. Image Generation

Use your image generation model to produce images based on the prompts in **Imagine.txt**.  
Save each generated image with a filename corresponding to the **line number** in the prompt file:

```shell
1.jpg
2.jpg
3.jpg
...
```

## 3. Evaluation

The script **Eval-gpt-4.1-Imagine.py** calculates evaluation metrics for the generated images.

### Command Example

```shell
python Eval-gpt-4.1-Imagine.py \
--json_path data.jsonl \
--image_dir images \
--output_dir results \
--api_key "sk-XX-key" \
--model "gpt-4.1-2025-04-14" \
--result_full full.json \
--result_scores scores.jsonl
```

## 4. Example Output

```shell
[Per-Type Average Scores]
  Attribute shift: 8.821
  Hybridization: 9.339
  Spatiotemporal: 8.377
  TWO_OBJECT: 7.813

[Overall Weighted Score]: 8.613
```

---

# OmniContext Evaluation

## 1. Workflow Summary

1. Download the OmniContext dataset and convert it to images and metadata.
2. Configure paths and environment variables in the script.
3. Run the script to generate images, auto-score, and summarize statistics.

## 2. Data Preparation

- Download the dataset from:
  https://huggingface.co/datasets/OmniGen2/OmniContext

- Save the dataset locally in Arrow format and convert to images/metadata:

```shell
python omnicontext/arrow2json.py
```

This will produce:

- Images under: `omnicontext/data/images/{task_type}/*.jpg`
- Metadata file: `omnicontext/data/metadata.jsonl`

## 3. Evaluation

Open `scripts/eval/run_omnicontext.sh` and verify/update variables:

- `model_path`: model weights directory
- `images_dir`: converted images directory (e.g., `omnicontext/data/images`)
- `metadata_file`: metadata file path (e.g., `omnicontext/data/metadata.jsonl`)
- `result_dir`: output directory (e.g., `results/omnicontext_outputs/`)
- `openai_url` and `openai_key`: for automatic scoring

Run:

```shell
bash scripts/eval/run_omnicontext.sh
```

## 4. Outputs

- Generated images per task type under `result_dir`
- Auto-scoring results under `result_dir` via `omnicontext.test_omnicontext_score`
- Statistics summary under `result_dir` via `omnicontext.calculate_statistics`

All outputs are saved under `result_dir`.
