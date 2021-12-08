#!/bin/bash
source $(dirname "$0")/../common.sh

top="assets/minecraft/textures/block/furnace_top.png"
front="assets/minecraft/textures/block/dropper_front.png"
right="assets/minecraft/textures/block/furnace_side.png"
generateIso "$top" "$front" "$right" "icons/dropper.png"


