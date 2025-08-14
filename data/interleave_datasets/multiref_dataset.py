# Copyright 2025 Bytedance Ltd. and/or its affiliates.
# SPDX-License-Identifier: Apache-2.0

import io
import random
from PIL import Image, ImageFile, PngImagePlugin

from .interleave_t2i_dataset import InterleavedBaseIterableDataset, ParquetStandardIterableDataset
from ..data_utils import pil_img2rgb


Image.MAX_IMAGE_PIXELS = 200000000
ImageFile.LOAD_TRUNCATED_IMAGES = True
MaximumDecompressedSize = 1024
MegaByte = 2 ** 20
PngImagePlugin.MAX_TEXT_CHUNK = MaximumDecompressedSize * MegaByte


class UnifiedMultiRefIterableDataset(InterleavedBaseIterableDataset, ParquetStandardIterableDataset):

    def parse_row(self, row):
        image_num = len(row["image_list"])

        data = self._init_data()
        for idx in range(image_num - 1):
            data = self._add_image(
                data, 
                pil_img2rgb(Image.open(io.BytesIO(row["image_list"][idx]))),
                need_loss=False, 
                need_vae=True, 
                need_vit=True, 
            )
        data = self._add_text(data, row['instruction_list'][0].item(), need_loss=False)
        
        data = self._add_image(
            data, 
            pil_img2rgb(Image.open(io.BytesIO(row["image_list"][-1]))),
            need_loss=True, 
            need_vae=False, 
            need_vit=False,
        )
        
        return data
