#!/bin/bash

generateIso () {
  convert \
   \( \( \( "$1" -distort SRT 90 \) -scale 512x512\< \) -alpha set -virtual-pixel transparent \
      +distort Affine '0,512 0,0   0,0 -87,-50  512,512 87,-50' \) \
   \( \( "$2" -scale 512x512\< -brightness-contrast -40,-40% \) -alpha set -virtual-pixel transparent \
      +distort Affine '512,0 0,0   0,0 -87,-50  512,512 0,100' \) \
   \( \( "$3" -scale 512x512\< -brightness-contrast -20,-20% \) -alpha set -virtual-pixel transparent \
      +distort Affine '  0,0 0,0   0,512 0,100    512,0 87,-50' \) \
   \
   -background none -compose plus -layers merge +repage \
   -compose over "$4"
}

generateFlatWithName () {
  yes | cp -vrf "assets/minecraft/textures/block/${1}.png" "icons/${2}.png"
}

generateFlat () {
  generateFlatWithName "$1" "$1"
}

generateLeaves () {
  convert \
   \( \( \( \( "$1" \( +clone -fill "$2" -colorize 100% \) -compose multiply -composite \) \
      -distort SRT 90 \) -scale 512x512\< \) -alpha set -virtual-pixel transparent \
      +distort Affine '0,512 0,0   0,0 -87,-50  512,512 87,-50' \) \
   \( \( \( "$1" \( +clone -fill "$2" -colorize 100% \) -compose multiply -composite \) \
      -scale 512x512\< -brightness-contrast -40,-40% \) -alpha set -virtual-pixel transparent \
      +distort Affine '512,0 0,0   0,0 -87,-50  512,512 0,100' \) \
   \( \( \( "$1" \( +clone -fill "$2" -colorize 100% \) -compose multiply -composite \) \
      -scale 512x512\< -brightness-contrast -20,-20% \) -alpha set -virtual-pixel transparent \
      +distort Affine '  0,0 0,0   0,512 0,100    512,0 87,-50' \) \
   \
   -background none -compose plus -layers merge +repage \
   -compose over "$3"
}

generateEgg () {
  echo "Generating egg $1"
  convert \
   \( icons/spawn_egg.png \( +clone -fill "$2" -colorize 100% \) -compose multiply -composite \) \
   \( icons/spawn_egg_overlay.png \( +clone  -fill "$3" -colorize 100% \) -compose multiply -composite \) \
   -composite icons/${1}_spawn_egg.png
}

