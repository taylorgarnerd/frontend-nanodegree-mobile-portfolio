var gulp      = require('gulp'),
    htmlmin   = require('gulp-htmlmin'),
    minline   = require('gulp-minify-inline'),
    uglify    = require('gulp-uglify');
    imagemin  = require('gulp-imagemin');
    csso      = require('gulp-csso');


var config = {
  "build": "dist",
  "images": {
    "source": "img/**/*.+(png|jpg|gif|svg)",
    "target": "/img",
    "views": "images/"
  },
  "css": {
    "source": "css/*",
    "target": "/css"
  },
  "js": {
    "source": "js/*",
    "target": "/js"
  },
  "html": {
    "source": "*.html",
    "target": "/"
  },
  "views": {
    "images": {
      "source": "views/images/**/*.+(png|jpg|gif|svg)",
      "target": "/views/images"
    },
    "html": {
      "source": "views/*.html",
      "target": "/views"
    },
    "css": {
      "source": "views/css/*",
      "target": "/views/css"
    },
    "js": {
      "source": "views/js/*",
      "target": "/views/js"
    }
  }
};


gulp.task('views-html', function () {
  return gulp.src(config.views.html.source)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(minline())
  .pipe(gulp.dest(config.build + config.views.html.target))
})

gulp.task('views-css', function () {
  return gulp.src(config.views.css.source)
    .pipe(csso())
    .pipe(gulp.dest(config.build + config.views.css.target))
})

gulp.task('views-js', function () {
  return gulp.src(config.views.js.source)
  .pipe(uglify())
  .pipe(gulp.dest(config.build + config.views.js.target))
})

gulp.task('views-img', function() {
  return gulp.src(config.views.images.source)
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
  .pipe(imagemin().on('error', function(e){
          console.log(e);
       }))
  .pipe(gulp.dest(config.build + config.views.images.target));
});

gulp.task('html', function () {
  return gulp.src(config.html.source)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(minline())
    .pipe(gulp.dest(config.build + config.html.target))
});

gulp.task('css', function () {
  return gulp.src(config.css.source)
    .pipe(csso())
    .pipe(gulp.dest(config.build + config.css.target))
})

gulp.task('js', function () {
  return gulp.src(config.js.source)
  .pipe(uglify())
  .pipe(gulp.dest(config.build + config.js.target))
});

gulp.task('img', function() {
  return gulp.src(config.images.source)
  .pipe(imagemin({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(config.build + config.images.target));
});

gulp.task('build', ['html','js','css','img','views-html','views-js','views-css','views-img']);

gulp.task('default', ['build']);