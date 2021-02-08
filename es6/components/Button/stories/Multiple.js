import React from 'react';
import { Grommet, Box, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { Add } from "grommet-icons/es6/icons/Add";
export var Multiple = function Multiple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    color: "dark-1",
    primary: true,
    icon: /*#__PURE__*/React.createElement(Add, {
      color: "accent-1"
    }),
    label: "Add",
    onClick: function onClick() {}
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    color: "dark-1",
    primary: true,
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    primary: true,
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    color: "light-2",
    primary: true,
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  }))));
};
export default {
  title: 'Controls/Button/Multiple'
};