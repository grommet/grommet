const ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    ['es2015', {
      loose: true,
      modules: ENV === 'es' ? false : 'commonjs',
    }],
  ],
};
