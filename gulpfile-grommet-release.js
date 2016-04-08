import prompt from 'gulp-prompt';
import bump from 'gulp-bump';
import git from 'gulp-git';
import del from 'del';
import runSequence from 'run-sequence';
import childProcess from 'child_process';
import mkdirp from 'mkdirp';

import grommetToolboxConfig, {getPackageJSON} from './grommet-toolbox.config';

module.exports = function(gulp) {
  gulp.task('release:bump', function(done) {
    gulp.src('./')
      .pipe(prompt.prompt({
        type: 'input',
        name: 'bump',
        message: 'What type of bump would you like to do (patch, minor, major)?',
        validate: function(pass) {
          if (pass !== 'patch' && pass !== 'minor' && pass !== 'major') {
            return false;
          }
          return true;
        }
      }, function(res) {
        gulp.src('./docs/package.json')
        .pipe(bump({
          type: res.bump
        })).pipe(gulp.dest('./docs'));

        gulp.src('./package.json')
        .pipe(bump({
          type: res.bump
        }))
        .pipe(gulp.dest('./')).on('end', function() {
          grommetToolboxConfig.copyAssets.push({
            filename: 'package.json',
            asset: JSON.stringify(getPackageJSON(), null, 2)
          });
          done();
        });
      }));
  });

  gulp.task('release:npm', function(done) {
    process.chdir('dist');
    childProcess.spawn('npm', ['publish'], {
      stdio: 'inherit'
    }).on('close', function() {
      process.chdir(__dirname);
      var version = 'v' + getPackageJSON().version;
      gulp.src('./')
        .pipe(git.add({
          args: '--all'
        }))
        .pipe(git.commit(version)).on('end', function() {
          git.push('origin', 'master', function(err) {
            if (err) {
              throw err;
            }

            git.tag(version, version, function(err) {
              if (err) {
                throw err;
              }

              git.push('origin', version, function(err) {
                if (err) {
                  throw err;
                }
                process.chdir(__dirname);
                done();
              });
            });
          });
        });
    });
  });

  gulp.task('release:createTmp', function(done) {
    del.sync(['./tmp']);
    mkdirp('./tmp', function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  gulp.task('release:bower', ['release:createTmp'], function(done) {
    git.clone('https://github.com/grommet/grommet-bower.git',
      {
        cwd: './tmp/'
      },
      function(err) {
        if (err) {
          throw err;
        }
        gulp.src('./dist-bower/**').pipe(gulp.dest('./tmp/grommet-bower'));

        var version = 'v' + getPackageJSON().version;
        process.chdir('./tmp/grommet-bower');
        gulp.src('./*')
          .pipe(git.add({
            args: '--all'
          }))
          .pipe(git.commit(version)).on('end', function() {
            git.push('origin', 'master', function(err) {
              if (err) {
                throw err;
              }

              git.tag(version, version, function(err) {
                if (err) {
                  throw err;
                }

                git.push('origin', version, function(err) {
                  if (err) {
                    throw err;
                  }
                  process.chdir(__dirname);
                  done();
                });
              });
            });
          });
      }
    );
  });

  gulp.task('release:stable', ['release:createTmp'], function(done) {
    if (process.env.CI) {
      git.clone('https://' + process.env.GH_TOKEN + '@github.com/grommet/grommet.git',
        {
          cwd: './tmp/'
        },
        function(err) {
          if (err) {
            throw err;
          }

          process.chdir('./tmp/grommet');
          git.checkout('stable', function(err) {
            if (err) {
              throw err;
            }

            del.sync(['./**/*']);

            gulp.src('../../dist/**').pipe(gulp.dest('./')).on('end', function() {
              git.status({
                args: '--porcelain'
              }, function(err, stdout) {
                if (err) {
                  throw err;
                }

                if (stdout && stdout !== '') {
                  gulp.src('./')
                    .pipe(git.add({
                      args: '--all'
                    }))
                    .pipe(git.commit('Stable dev version update.')).on('end', function() {
                      git.push('origin', 'stable', { quiet: true }, function(err) {
                        if (err) {
                          throw err;
                        }

                        process.chdir(__dirname);
                        done();
                      });
                    });
                } else {
                  console.log('No difference since last commit, skipping stable release.');

                  process.chdir(__dirname);
                  done();
                }
              });
            });
          });
        }
      );
    } else {
      console.warn('Skipping release. Release:stable task should be executed by CI only.');
    }
  });

  gulp.task('release:clean', function() {
    del.sync(['./tmp']);
  });

  gulp.task('release', function(done) {
    runSequence('release:bump', ['dist-bower', 'dist'], 'release:npm', 'release:bower', 'release:clean', done);
  });
};
