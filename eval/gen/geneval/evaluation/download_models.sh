# Copyright (c) 2023 Dhruba Ghosh
# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates.
# SPDX-License-Identifier: MIT
#
# This file has been modified by ByteDance Ltd. and/or its affiliates. on 2025-05-20.
#
# Original file was released under MIT, with the full license text
# available at https://github.com/djghosh13/geneval/blob/main/LICENSE.
#
# This modified file is released under the same license.

#!/bin/bash

# Download Mask2Former object detection config and weights

if [ ! -z "$1" ]
then
    mkdir -p "$1"
    wget https://download.openmmlab.com/mmdetection/v2.0/mask2former/mask2former_swin-s-p4-w7-224_lsj_8x2_50e_coco/mask2former_swin-s-p4-w7-224_lsj_8x2_50e_coco_20220504_001756-743b7d99.pth -O "$1/mask2former_swin-s-p4-w7-224_lsj_8x2_50e_coco.pth"
fi
