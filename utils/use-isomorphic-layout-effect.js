"use strict";

exports.__esModule = true;
exports["default"] = exports.useLayoutEffect = void 0;

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
var useLayoutEffect = typeof window !== 'undefined' ? _react.useLayoutEffect : _react.useEffect;
exports.useLayoutEffect = useLayoutEffect;
var _default = useLayoutEffect;
exports["default"] = _default;