import React from 'react';
import { Close } from "grommet-icons/es6/icons/Close";
import { Send } from "grommet-icons/es6/icons/Send";
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Icon = function Icon() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small"
  }, " plain=true (no padding, no border) "), /*#__PURE__*/React.createElement(Box, {
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
  }, " plain=false (includes padding and border)"), /*#__PURE__*/React.createElement(Box, {
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
  }, " plain=undefined (with padding, no border) "), /*#__PURE__*/React.createElement(Box, {
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
Icon.story = {
  name: 'Icon plain'
};