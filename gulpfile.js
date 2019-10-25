const gulp = require("gulp"),
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync"),
  eslint = require("gulp-eslint");


gulp.task("lint", function(){
  return gulp
      .src("./js/*.js")
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task("scripts", 
  gulp.series("lint",
    function scripts() {
      return gulp
        .src("./js/*.js")
        .pipe(terser())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest("./build/js"));
    }
  )
);


gulp.task("say_hello", function(done) {
  console.log("Hello!");
  done();
});

/**
 * Browser Sync
 */
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch(["*.html", "build/js/*.js", "css/*.css"])
      .on("change", browserSync.reload);
});

gulp.task("watch", function() {
  gulp.watch("js/*.js", gulp.series("scripts"));
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));
{
  "name": "gulp-codealong",
  "version": "1.0.0",
  "description": "My first gulp project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "hello": "echo 'Hello'"
  },
  "keywords": [
    "gulp",
    "node",
    "npm"
  ],
  "author": "Jim",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.26.7",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-cssnano": "^2.1.3",
    "gulp-eslint": "^6.0.0",
    "gulp-rename": "^1.4.0",
    "gulp-sass": "^4.0.2",
    "gulp-terser": "^1.2.0"
  }
}