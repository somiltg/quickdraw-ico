SKETCH_DIR="converted"
SKETCH_TYPE="png"
IMAGE_DIR="$HOME/Desktop/CS_682/project/SketchyGAN/Datasets/Sketchy/rendered_256x256/256x256/photo/tx_000000000000"
IMAGE_TYPE="jpg"
FINAL_IMAGE_TYPE="jpg"
for class_name in "$@"; do
sh create_montage_per_class.sh "$SKETCH_DIR"/"$class_name" "$SKETCH_TYPE" "$IMAGE_DIR"/"$class_name" "$IMAGE_TYPE" "$class_name" "$FINAL_IMAGE_TYPE"
done