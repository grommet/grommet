const ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    ['env', {
      loose: true,
      modules: ENV === 'es6' ? false : 'commonjs',
    }],
  ],
};
