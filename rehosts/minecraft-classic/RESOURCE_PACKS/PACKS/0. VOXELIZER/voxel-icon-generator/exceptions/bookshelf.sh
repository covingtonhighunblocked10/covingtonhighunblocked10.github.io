#!/bin/bash
source $(dirname "$0")/../common.sh

top="assets/minecraft/textures/block/oak_planks.png"
sides="assets/minecraft/textures/block/bookshelf.png"
generateIso "$top" "$sides" "$sides" "icons/bookshelf.png"

