import prompt from 'gulp-prompt';
import bump from 'gulp-bump';
import git from 'gulp-git';
import del from 'del';
import runSequence from 'run-sequence';
import childProcess from 'child_process';
import mkdirp from 'mkdirp';

import grommetToolboxConfig, {getPackageJSON} from './grommet-toolbox.config';

module.exports = function(gulp) {
  gulp.task('release:bump', (done) => {
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
      }, (res) => {
        gulp.src('./package.json')
        .pipe(bump({
          type: res.bump
        }))
        .pipe(gulp.dest('./')).on('end', () => {
          grommetToolboxConfig.copyAssets.push({
            filename: 'package.json',
            asset: JSON.stringify(getPackageJSON(), null, 2)
          });
          done();
        });
      }));
  });

  gulp.task('release:npm', (done) => {
    process.chdir('dist');
    childProcess.spawn('npm', ['publish'], {
      stdio: 'inherit'
    }).on('close', () => {
      process.chdir(__dirname);
      var version = 'v' + getPackageJSON().version;
      gulp.src('./')
        .pipe(git.add({
          args: '--all'
        }))
        .pipe(git.commit(version)).on('end', () => {
          git.push('origin', 'master', (err) => {
            if (err) {
              throw err;
            }

            git.tag(version, version, (err) => {
              if (err) {
                throw err;
              }

              git.push('origin', version, (err) => {
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

  gulp.task('release:createTmp', (done) => {
    del.sync(['./tmp']);
    mkdirp('./tmp', function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  gulp.task('release:bower', ['release:createTmp'], (done) => {
    git.clone('https://github.com/grommet/grommet-bower.git',
      {
        cwd: './tmp/'
      },
      (err) => {
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
          .pipe(git.commit(version)).on('end', () => {
            git.push('origin', 'master', (err) => {
              if (err) {
                throw err;
              }

              git.tag(version, version, (err) => {
                if (err) {
                  throw err;
                }

                git.push('origin', version, (err) => {
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

  gulp.task('release:stable', ['release:createTmp'], (done) => {
    if (process.env.CI) {
      git.clone('https://' + process.env.GH_TOKEN + '@github.com/grommet/grommet.git',
        {
          cwd: './tmp/'
        },
        (err) => {
          if (err) {
            throw err;
          }

          process.chdir('./tmp/grommet');
          git.checkout('stable', (err) => {
            if (err) {
              throw err;
            }

            del.sync(['./**/*']);

            gulp.src('../../dist/**').pipe(gulp.dest('./')).on('end', () => {
              git.status({
                args: '--porcelain'
              }, (err, stdout) => {
                if (err) {
                  throw err;
                }

                if (stdout && stdout !== '') {
                  gulp.src('./')
                    .pipe(git.add({
                      args: '--all'
                    }))
                    .pipe(git.commit('Stable dev version update.')).on('end', () => {
                      git.push('origin', 'stable', { quiet: true }, (err) => {
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

  gulp.task('release:clean', () => {
    del.sync(['./tmp']);
  });

  gulp.task('release:prepare', (done) => {
    runSequence('release:bump', 'dist-bower', 'dist', done);
  });

  gulp.task('release:perform', (done) => {
    runSequence('release:npm', 'release:bower', 'release:clean', done);
  });
};
