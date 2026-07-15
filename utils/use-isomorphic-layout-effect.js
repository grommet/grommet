"use strict";

exports.__esModule = true;
exports.useLayoutEffect = exports["default"] = void 0;
var _react = require("react");
/* eslint-disable no-restricted-imports */

/**
 * A substitute for React's useLayoutEffect, which does not generate warnings on
 * SSR. It is named useLayoutEffect so that all eslint rules applying to the
 * original useLayoutEffect would also apply to it.
 * This solution was suggested by Alex Reardon.
 * @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 * @see https://github.com/grommet/grommet/issues/4765
 */
var useLayoutEffect = exports.useLayoutEffect = typeof window !== 'undefined' ? _react.useLayoutEffect : _react.useEffect;
var _default = exports["default"] = useLayoutEffect;