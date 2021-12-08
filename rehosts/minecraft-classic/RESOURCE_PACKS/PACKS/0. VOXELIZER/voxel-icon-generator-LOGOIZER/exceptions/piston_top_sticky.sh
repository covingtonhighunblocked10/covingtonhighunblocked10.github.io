#!/bin/bash
source $(dirname "$0")/../common.sh

top="assets/minecraft/textures/block/piston_top_sticky.png"
front="assets/minecraft/textures/block/piston_side.png"
right="$front"
generateIso "$top" "$front" "$right" "icons/sticky_piston.png"


