var runSequence = require('run-sequence');

module.exports = function(gulp, options, dist) {
  gulp.task('syncPre', function(callback) {
    return runSequence('dist', callback);
  });

  gulp.task('sync', ['syncPre'], function() {
    if (options.sync) {
      var rsync = require('gulp-rsync');
      gulp.src(dist)
        .pipe(rsync({
          root: dist,
          hostname: options.sync.hostname,
          username: options.sync.username,
          destination: options.sync.remoteDestination,
          recursive: true,
          relative: true,
          incremental: true,
          silent: true,
          clean: true,
          emptyDirectories: true,
          exclude: ['.DS_Store']
        }));
    }

  });
};
