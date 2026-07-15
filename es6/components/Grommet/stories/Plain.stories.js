import React from 'react';
import { Grommet, Box } from 'grommet';
export var Plain = function Plain() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    plain: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("p", null, "Plain Grommet"))), /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("p", null, "Not plain Grommet"))));
};
export default {
  title: 'Utilities/Grommet/Plain'
};