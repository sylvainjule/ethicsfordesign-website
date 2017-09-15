# Ethics for Design

![ethics-for-design](https://user-images.githubusercontent.com/14079751/30344982-b92f90c0-9803-11e7-8502-de9565f471a0.jpg)

This repo is the backstage of [ethicsfordesign.com](http://ethicsfordesign.com).

If you're interested in translating one (or several, or even a small slice) of the subtitles, please [follow this link](https://github.com/sylvainjule/ethicsfordesign-subtitles) in order to find the roadmap to do so. PR are most welcome !

This website is built using [Kirby CMS](http://github.com/getkirby), please purchase a license before using it publicly.

##  Note

You can clone this repo and run it locally, but keep in mind that :

- The video files are way too large to be uploaded on github, therefore the [player folder](https://github.com/sylvainjule/ethicsfordesign-website/tree/master/content/5-player) is missing its :

```
ethics-for-design-mainvid.mp4
ethics-for-design-mainvid.ogg
ethics-for-design-mainvid.webm
```
	
Those files will soon be available [here](https://vimeo.com/232973887).

- You'll have to rename the `config.github.php` as `config.php`, we couldn't push it since the real config contains our license key.

- For the same reason, the fonts are missing. You'll fallback to a default sans-serif font. We used the [Neue Haas Grotesk (round dot)](https://commercialtype.com/catalog/neue_haas_grotesk) from Commercial Type. Fonts need to go into the `assets/fonts` folder.

## Usage 


- Clone the repo :

```
git clone http://github.com/sylvainjule/ethicsfordesign-website
```

- Access the repo and init `npm`

```
cd ethicsfordesign
npm init
```

- Install `gulp` and the required modules

```
npm i -D gulp gulp-sass gulp-autoprefixer browser-sync gulp-concat gulp-csso gulp-rename gulp-uglify gulp-util
```

- Run the prod task (will launch BrowserSync, and compile `.scss`/ `.js`files on save)

```
gulp dev-watch-sync --prod
```

## Credits

Art direction and graphic design by [Clément Le Tulle-Neyret](http://www.clement-ltn.com/). Direction, production and motion design by [Gauthier Roussilhe](http://gauthierroussilhe.com).

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/).