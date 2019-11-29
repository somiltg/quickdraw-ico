mkdir converted
for i in *.svg; do # Whitespace-safe but not recursive.
    name=`basename "$i" .svg`
    cairosvg $i -o converted/$name.png -H 256 -W 256
    echo "converted $i"
done
