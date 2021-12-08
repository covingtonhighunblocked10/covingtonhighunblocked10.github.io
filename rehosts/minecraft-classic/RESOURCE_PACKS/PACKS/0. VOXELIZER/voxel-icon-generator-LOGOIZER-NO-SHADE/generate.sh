#!/bin/bash

BASEDIR=$(dirname "$0")
chmod -R +x ${BASEDIR}/exceptions
. ${BASEDIR}/common.sh

mkdir icons

for filename in assets/minecraft/textures/block/*.png; do
  echo "$filename"
  name="$(basename "$filename" .png)"
  noside="$(echo "$name" | sed 's/^\(.*\)_side$/\1/')"
  if [ -f ${BASEDIR}/exceptions/${name}.sh ]
  then
    ${BASEDIR}/exceptions/${name}.sh "$filename" "$name" "$noside"
  else
    if [ -f assets/minecraft/textures/block/${noside}_top.png ]
    then
      echo "top"
      if [ -f assets/minecraft/textures/block/${noside}_front.png ]
      then
        echo "front"
        generateIso "assets/minecraft/textures/block/${noside}_top.png" "assets/minecraft/textures/block/${noside}_front.png" "$filename" "icons/$noside.png"
      else
        generateIso "assets/minecraft/textures/block/${noside}_top.png" "$filename" "$filename" "icons/$noside.png"
      fi
    else
      echo "no top"
      generateIso "$filename" "$filename" "$filename" "icons/$name.png"
    fi
  fi
done

yes | cp -vrf assets/minecraft/textures/item/*.png icons/

echo "Running post processing"
${BASEDIR}/exceptions/post_proc.sh


