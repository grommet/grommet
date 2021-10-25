import React from 'react';
import { Close } from "grommet-icons/es6/icons/Close";
import { Send } from "grommet-icons/es6/icons/Send";
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, Text } from 'grommet';
export var Icon = function Icon() {
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small"
  }, " plain=true "), /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    plain: true,
    icon: /*#__PURE__*/React.createElement(Close, null),
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    plain: true,
    icon: /*#__PURE__*/React.createElement(Send, null),
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    plain: true,
    icon: /*#__PURE__*/React.createElement(User, null),
    onClick: function onClick() {}
  }))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small"
  }, " plain=false "), /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    plain: false,
    icon: /*#__PURE__*/React.createElement(Close, null),
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    plain: false,
    icon: /*#__PURE__*/React.createElement(Send, null),
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    plain: false,
    icon: /*#__PURE__*/React.createElement(User, null),
    onClick: function onClick() {}
  }))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small"
  }, " plain=undefined "), /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Close, null),
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Send, null),
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(User, null),
    onClick: function onClick() {}
  }))));
};
Icon.storyName = 'Icon plain';
export default {
  title: "Controls/Button/Icon plain"
};