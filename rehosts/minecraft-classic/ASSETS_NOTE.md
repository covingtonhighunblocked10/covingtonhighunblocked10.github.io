# Replacing a file doesn't always come with the expected outcome when modifying the game, and somethings aren't changed with files, but manual code edits



## For fluid blocks (lava/water)...

1. The texture you provide, is the still-frame image for use on browsers/computers that can't generate an animation.
2. Fluid blocks animation's appear to use programmatic approach to animate the fluid block:
    * Lava: search for `BABYLON.DynamicTexture("lavaTexture"` in app.js
    * Water: search for `BABYLON.DynamicTexture("waterTexture"` in app.js
   The following may be a helpful resources in figuring out how to generate the animation code for different textures:
    * Most promising: https://medium.com/@babylonjs/animated-gifs-in-webgl-55a6c7bc9c93 & https://github.com/matt-way/gifuct-js
    * Least promising: https://doc.babylonjs.com/how_to/how_to_use_procedural_textures
    
   You'll find that it uses a means of locating pixels in the image and changes each one, where in water's case it's with pixel transparencies.
3. Changing the texture file alone won't work because you'll also need to change the colors in the dynamic texture animation in RGB (using normal RGB integers from 0 to 255):
    * `p` = red
    * `m` = green
    * `g` = blue
4. The fluid colors when submerged are not so easily made clear, but goes as follows:
    * Lava: search for `e.fogLava` in app.js
    * Water: search for `e.fogWater` in app.js
    
   You'll find an area where it first sets a variable to the fogBlock, and then sets two different color attributes:
    * `diffuseColor`: When submerged and there is no fog, this is the color you'll primarily see
    * `fogColor`: When submerged and there is fog, you'll see a mix of the diffuseColor and this color (unless you set render distance to it's lowest, then it'll primarily be this color)
    
   IMPORTANT: You need to use decimal values from 0 to 1 when setting the RGB
5. There is one more color that is set with the initialization of the fluid blocks, and they don't appear to have much of an effect at all, but I suspect that they were supposed to be the start of map colors of blocks:
    * Lava: search for `"lava"==(Z=Q[L])&&(q=` in app.js
    * Water: search for `"water"==(Z=Q[L])&&(q=` in app.js
    
   As you'll find, it's relatively darker and simple colors of the type of block (and it's the same fogColor for the fluid block). But the changes of these colors don't show up in the game to my knowledge.
   
   IMPORTANT: You need to use decimal values from 0 to 1 when setting the RGB



## For normal fog...

* Don't know why you would want to change it, but you can change the color of fog if you want:
   * search for `e.fogWorld` in app.js
   
  This will be the primary fog color when walking on land (if fog is turned on).
  
  IMPORTANT: You need to use decimal values from 0 to 1 when setting the RGB



## For the generating level progress...

* Progress bar colors (there are multiple):
   * search for `headline: "Generating level"` in app.js
   
  You'll find every color used to create the progress bar, and they all use RGB (using normal RGB integers from 0 to 255).



## For sounds...

* Not you need 2 files to be most compatible with computers on the web:
   * MP3
   * OGG
   
  Normally, an OGG file will be better quality than an MP3, but in any case, use the file that has the higher bitrate to convert to the other format, if you don't already have both sound file versions.



## For fonts...

* What ever new font file you want to use, you must have the 3 types to be compatible with all devices:
   * EOT
   * WOFF
   * TTF
   
  It's a good idea to convert to the other types if you only have one font type.
  
  Besides just including the font files, if you want the font that is added, under a different name, then you'll need to do the following:
   * search for and find every instance of `"px Minecraft"` in app.js
   * search for and find every instance of `font-family` in style.css
   
  After finding the locations, you'll need to change the names and file locations accordingly.
  
  On another note, whether or not you want to change the font files, you can also change any other aspect of the font style (colors, size, etc.) from doing the searches.
  
  To change the hover color, search for `this.over&&(t="rgb(255,255,160)")` in app.js.



## Note about the block/fluid animations:

  I'm not sure what the best way is for editing/creating the fluid animations, but I know that it would definitely need to be re-coded to actually use a file that has pregenerated frames for animation.
