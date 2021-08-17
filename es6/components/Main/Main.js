function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box } from '../Box';

var Main = function Main(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(Box, _extends({
    as: "main",
    fill: "vertical",
    flex: "grow",
    overflow: "auto"
  }, rest));
};

export { Main };