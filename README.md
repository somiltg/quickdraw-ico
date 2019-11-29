# Quick, Draw! icons download

SVG icons generated from the [quickdraw dataset](https://github.com/googlecreativelab/quickdraw-dataset).

Modified version of [this](https://github.com/prayerslayer/quickdraw-ico) respository that enables downloading quick
 draw images in desired format.  
![Preview](screen.png)

## I just want to see the icons

1. Clone repository
2. `yarn` or `npm install`
3. `npm run example`
4. Go to `localhost:8080`

## Generate own icon set

This is a bit complicated.

### Download drawings


1. Sign up at Google if you haven't
2. [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/)
3. Run `gsutil -m cp 'gs://quickdraw_dataset/full/simplified/*' drawings`  or add your simplified ndjsons to drawings
  folder. 
4. Wait, this downloads ~22 GB. Change the wildcard and play with `gsutil ls` if you don't want all of the drawings.

### Generate icons

1. Clone project
2. `yarn` or `npm i`
3. `npm run build`, this calls the CLI script in `./bin`. You can pass parameters after a double-dash like so: `npm
 run build -- --n 2`
4. SVG images are created in svg folder. 

### Look at icons

    npm run preview
    # preview available at localhost:8080
    
### Convert to png or other format. 

    # run script in svg folder.
    sh convert_to_png.sh
    # just modify the format in output line inside to change the format. 
    

