#!/bin/bash
#Run `brew install coreutils` if shuf not present on mac.
sketch_folder=$1
image_folder=$3
echo 'For class: '"$5"
[ ! -d "montage/$5" ] && mkdir -p montage/"$5"
count=`ls "$sketch_folder"/*."$2" | wc -l`
image_list=`ls "$image_folder"/*."$4" | shuf -r -n $count`
i=1
for sketch in "$sketch_folder"/*."$2"; do
  name=`basename "$sketch" ."$2"`
  image=`echo "$image_list" | sed -n "$i"p`
  montage "$sketch" "$image" -geometry 256x256+0+0 montage/"$5"/"$name"."$6"
  i=$((i+1))
done


