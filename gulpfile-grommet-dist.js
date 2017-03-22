import gulpWebpack from 'webpack-stream';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-cssnano';
import file from 'gulp-file';
import gulpif from 'gulp-if';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import del from 'del';
import runSequence from 'run-sequence';

import {getPackageJSON} from './grommet-toolbox.config';

var bowerWebpackConfig = {
  output: {
    filename: 'grommet.js',
    libraryTarget: 'var',
    library: 'Grommet'
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/scss'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.json', '.htm', '.html', '.scss', '.svg']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components|src\/lib)/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?mimetype=image/svg'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?mimetype=image/jpg'
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }
    ]
  },
  plugins: [
    //new webpack.optimize.DedupePlugin()
  ]
};

var bowerMinWebpackConfig = Object.assign({}, bowerWebpackConfig, {
  output: {
    filename: 'grommet.min.js',
    libraryTarget: 'var',
    library: 'Grommet'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  //new webpack.optimize.DedupePlugin()
  ]
});

module.exports = function(gulp) {

  gulp.task('generate-index-icons', function (done) {
    var iconsFolder = path.join(__dirname, './src/img/icons');
    var iconsMap = [];
    fs.readdir(iconsFolder, function(err, icons) {
      icons.forEach(function (icon, index) {

        if (/\.svg$/.test(icon)) {
          const componentName = icon.replace(/^(.)|-([a-z])/g, function (g) {
            return g.length > 1 ? g[1].toUpperCase() : g.toUpperCase();
          });

          iconsMap.push(
            `export { default as ${componentName.replace('.svg', '').replace(/^3d/, 'ThreeD').replace('-', '')}Icon } from './${componentName.replace('.svg', '')}';`
          );

          if (index === icons.length - 1) {

            const destinationFile = path.join(
              __dirname, './src/js/components/icons/base/index.js'
            );
            fs.writeFile(destinationFile, iconsMap.join('\n'), function(err) {
              if (err) {
                throw err;
              }

              done();
            });
          }
        }
      });
    });
  });

  gulp.task('dist-css', () => {
    gulp.src('src/scss/hpinc/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet-hpinc.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));

    gulp.src('src/scss/hpe/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet-hpe.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));

    gulp.src('src/scss/aruba/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet-aruba.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));

    return gulp.src('src/scss/vanilla/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));
  });

  function distCss(path, name, minify) {
    return gulp.src(path)
      .pipe(sass({
        includePaths: ['node_modules']
      }))
      .pipe(rename(name))
      .pipe(gulpif(minify, minifyCss()))
      .pipe(gulp.dest('dist-bower/css'));
  }

  function distBower(config, done) {
    return gulp.src('src/js/index.js')
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest('dist-bower')).on('end', done);
  }

  gulp.task('dist-bower:exploded', function(done) {
    distBower(bowerWebpackConfig, done);
  });

  gulp.task('dist-bower:minified', function(done) {
    distBower(bowerMinWebpackConfig, done);
  });

  gulp.task('dist-bower:preprocess', ['generate-index-icons'], (done) => {
    del.sync(['dist-bower']);

    distCss('src/scss/vanilla/*.scss', 'grommet.css');
    distCss('src/scss/vanilla/*.scss', 'grommet.min.css', true);
    distCss('src/scss/hpe/*.scss', 'grommet-hpe.css');
    distCss('src/scss/hpe/*.scss', 'grommet-hpe.min.css', true);
    distCss('src/scss/hpinc/*.scss', 'grommet-hpinc.css');
    distCss('src/scss/hpinc/*.scss', 'grommet-hpinc.min.css', true);
    distCss('src/scss/aruba/*.scss', 'grommet-aruba.css');
    distCss('src/scss/aruba/*.scss', 'grommet-aruba.min.css', true);

    runSequence(['dist-bower:exploded', 'dist-bower:minified'], done);
  });

  gulp.task('dist-bower', ['dist-bower:preprocess'], () => {

    var bowerJSON = getPackageJSON();
    bowerJSON.dependencies = {
      'react': '^15.0.2',
      'grommet': '^' + bowerJSON.version
    };
    bowerJSON.ignore = [];
    bowerJSON.main = 'grommet.js';
    delete bowerJSON.devDependencies;
    delete bowerJSON.scripts;
    delete bowerJSON.config;

    return gulp.src('.')
      .pipe(file('bower.json', JSON.stringify(bowerJSON, null, 2)))
      .pipe(gulp.dest('dist-bower'));
  });
};
