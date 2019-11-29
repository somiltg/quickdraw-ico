mkdir converted
for i in svg/*.svg; do # Whitespace-safe but not recursive.
    name=`basename "$i" .svg`
    class_name=`echo "${name%-*}"` # Finds class name from last occurence
    dldir="./converted/$class_name"
    [ ! -d "$dldir" ] && mkdir -p "$dldir" # create if does not exist
    cairosvg $i -o "converted/$class_name/$name.png" -H 256 -W 256
    echo "converted $i"
done
