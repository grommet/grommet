// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import gulp from 'gulp';
import fs from 'fs';
import coveralls from 'gulp-coveralls';

import grommetToolbox from 'grommet-toolbox';

import gulpDist from './gulpfile-grommet-dist';
import gulpRelease from './gulpfile-grommet-release';

grommetToolbox(gulp);

gulpDist(gulp);
gulpRelease(gulp);

gulp.task('coveralls', () => {
  var lcovPath = './coverage/lcov.info';
  fs.exists(lcovPath, function(exists) {
    if (exists) {
      gulp.src(lcovPath).pipe(coveralls());
    } else {
      console.error('Could not find lcov report file.');
      process.exit(1);
    }
  });
});

gulp.task('dev', () =>
  console.error(
    'Running "gulp dev" at Grommet root folder is not supported. If you want to start the website, run "gulp dev" at docs folder'
  )
);
