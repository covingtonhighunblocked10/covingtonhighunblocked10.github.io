#!/bin/bash
source $(dirname "$0")/../common.sh

top="assets/minecraft/textures/block/snow.png"
sides="assets/minecraft/textures/block/grass_block_snow.png"
generateIso "$top" "$sides" "$sides" "icons/grass_block_snow.png"

