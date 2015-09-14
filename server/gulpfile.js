var gulp = require('gulp');
var rsync = require('gulp-rsync');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');
var chug = require('gulp-chug');

gulp.task('sync', ['sync-docs'], function() {
  gulp.src('.')
    .pipe(rsync({
      root: '.',
      hostname: 'grommet.io',
      username: 'grommet',
      destination: '/var/www/html/server',
      recursive: true,
      relative: true,
      progress: true,
      incremental: true,
      clean: true,
      silent: false,
      emptyDirectories: true,
      exclude: ['.DS_Store', 'node_modules']
    }));
});

gulp.task('dev', function() {
  nodemon({
    script: 'server.js'
  }).on('start', function() {
    console.log('[node-server] started: opening the app in your default browser...');
    //give sometime for the server to start
    setTimeout(function() {
      gulp.src('../dist/index.html')
      .pipe(open({
        uri: 'http://localhost:8000/'
      }));
    }, 500);
  });
});

gulp.task('sync-docs', function() {
  var argv = require('yargs').argv;
  if (argv.skipDocs) {
    return;
  }
  return gulp.src('../docs/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['sync']
  }));
});
