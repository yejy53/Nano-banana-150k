#!/bin/bash
# omnicontext test script - Multi-Images Text Inference Script

# Parameter settings
GPUS=4
export CUDA_VISIBLE_DEVICES=0,1,2,3

# Path configuration
model_path= "/path/to/Echo-4o/weights"  # Download from https://huggingface.co/Yejy53/Echo-4o
omnicontext_data_dir="omnicontext/datasets" # OmniContext dataset directory
images_dir="omnicontext/data/images"  # OmniContext images directory
metadata_file="omnicontext/data/metadata.json"  # Metadata JSON file
result_dir="results/omnicontext_outputs/"  # Output directory
openai_url="https://api.openai.com/v1/chat/completions"
openai_key="Your OpenAI API Key"
 

# Initialize conda
export PATH="/usr/local/lib/miniconda3/bin:$PATH"
source /usr/local/lib/miniconda3/etc/profile.d/conda.sh
export PYTHONPATH=$(pwd):$PYTHONPATH

# Generate images
conda deactivate
conda activate bagel

torchrun \
    --nnodes=1 \
    --node_rank=0 \
    --nproc_per_node=$GPUS \
    --master_addr=127.0.0.1 \
    --master_port=12345 \
    ./eval/gen/gen_images_omnicontext.py \
    --output_dir $result_dir \
    --metadata_file $metadata_file \
    --model-path $model_path \
    --image_dir $images_dir 

python -m omnicontext.test_omnicontext_score \
    --openai_url "$openai_url" \
    --test_data "$omnicontext_data_dir" \
    --result_dir "$result_dir" \
    --openai_key "$openai_key" \
    --max_workers 100

python -m omnicontext.calculate_statistics \
    --result_dir "$result_dir" \
    --save_path "$result_dir"