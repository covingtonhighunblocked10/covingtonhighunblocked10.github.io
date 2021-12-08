#!/bin/bash
COLOR="#81bd6b"
TOP="assets/minecraft/textures/block/grass_block_top.png"
SIDE="assets/minecraft/textures/block/grass_block_side.png"
OVERLAY="assets/minecraft/textures/block/grass_block_side_overlay.png"
convert \
   \( \( \( \( "$TOP" \( +clone -fill "$COLOR" -colorize 100% \) -compose multiply -composite \) \
      -distort SRT 90 \) -scale 512x512\< \) -alpha set -virtual-pixel transparent \
      +distort Affine '0,512 0,0   0,0 -87,-50  512,512 87,-50' \) \
   \( \( "$SIDE" -scale 512x512\< -brightness-contrast -20,-20% \) -alpha set -virtual-pixel transparent \
      +distort Affine '512,0 0,0   0,0 -87,-50  512,512 0,100' \) \
   \( \( "$SIDE" -scale 512x512\< -brightness-contrast -40,-40% \) -alpha set -virtual-pixel transparent \
      +distort Affine '  0,0 0,0   0,512 0,100    512,0 87,-50' \) \
   \( \( \( "$OVERLAY" \( +clone -fill "$COLOR" -colorize 100% \) -compose multiply -composite \) \
      -scale 512x512\< -brightness-contrast -40,-40% \) -alpha set -virtual-pixel transparent \
      +distort Affine '512,0 0,0   0,0 -87,-50  512,512 0,100' \) \
   \( \( \( "$OVERLAY" \( +clone -fill "$COLOR" -colorize 100% \) -compose multiply -composite \) \
      -scale 512x512\< -brightness-contrast -40,-40% \) -alpha set -virtual-pixel transparent \
      +distort Affine '  0,0 0,0   0,512 0,100    512,0 87,-50' \) \
   \
   -background none -compose plus -layers merge +repage \
   -compose over "icons/grass_block.png"
