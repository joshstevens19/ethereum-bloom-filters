const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const path = require('path');
const fs = require('fs');

gulp.task('default', done => {
  const package = require('./package.json');
  const versionFolder = path.join('./web-scripts', `${package.version}`);
  const latestFolder = path.join('./web-scripts', 'latest');

  if (!fs.existsSync(versionFolder)) {
    fs.mkdirSync(versionFolder);
  }

  const entry = 'dist/index.js';

  browserify({
    entries: entry
  })
    .bundle()
    .pipe(source(`ethereum-bloom-filters-${package.version}.min.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(versionFolder));

  browserify({
    entries: entry
  })
    .bundle()
    .pipe(source(`ethereum-bloom-filters-latest.min.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(latestFolder));

  done();
});
