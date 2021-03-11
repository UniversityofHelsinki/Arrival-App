'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

const chalk = require('chalk');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', gulp.series(['inject'], (done) => {
    console.log(chalk.red("Watch task has been disabled (needs o be refactored after upgrading Gulp from 3.x to 4.x)!"));
    console.log(chalk.red("Use the build task instead"));
    done();
    // gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload'], gulp.series('html'));

    // gulp.watch([
    //   path.join(conf.paths.src, '/app/**/*.css'),
    //   path.join(conf.paths.src, '/app/**/*.scss')
    // ], function (event) {
    //   if (isOnlyChange(event)) {
    //     gulp.start('styles-reload');
    //   } else {
    //     gulp.start('inject-reload');
    //   }
    // }, gulp.series('styles'));

    // gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function (event) {
    //   if (isOnlyChange(event)) {
    //     gulp.start('scripts-reload');
    //   } else {
    //     gulp.start('inject-reload');
    //   }
    // });

    // gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function (event) {
    //   browserSync.reload(event.path);
    // });
  }));
