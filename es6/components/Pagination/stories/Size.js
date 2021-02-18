import React from 'react';
import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Size = function Size() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "small",
    gap: "large"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Small"), /*#__PURE__*/React.createElement(Pagination, {
    numberItems: 237,
    size: "small"
  })), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Medium (Default)"), /*#__PURE__*/React.createElement(Pagination, {
    numberItems: 237,
    size: "medium"
  })), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Large"), /*#__PURE__*/React.createElement(Pagination, {
    numberItems: 237,
    size: "large"
  }))));
};
export default {
  title: 'Controls/Pagination/Size'
};