function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
export var Sidebar = function Sidebar(_ref) {
  var children = _ref.children,
      footer = _ref.footer,
      header = _ref.header,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "footer", "header"]);

  return /*#__PURE__*/React.createElement(Box, _extends({
    pad: "small",
    gap: "large",
    height: {
      min: '100%'
    }
  }, rest), header, /*#__PURE__*/React.createElement(Box, {
    flex: true
  }, children), footer);
};
Sidebar.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node
};
Sidebar.defaultProps = {
  children: undefined,
  footer: undefined,
  header: undefined
};