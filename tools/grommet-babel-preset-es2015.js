// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const ENV = process.env.BABEL_ENV;

module.exports = function () {
  return {
    presets: [
      ['@babel/preset-env', {
        loose: true,
        modules: ENV === 'es6' ? false : 'commonjs',
      }],
    ],
  };
};
