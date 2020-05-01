function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box } from '../Box';

var Nav = function Nav(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(Box, _extends({
    as: "nav",
    flex: false,
    gap: "medium"
  }, rest));
};

var NavDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  NavDoc = require('./doc').doc(Nav);
}

var NavWrapper = NavDoc || Nav;
export { NavWrapper as Nav };