function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Box } from '../Box';
var Footer = function Footer(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: "footer",
    align: "center",
    direction: "row",
    flex: false,
    gap: "medium",
    justify: "between"
  }, rest));
};
export { Footer };