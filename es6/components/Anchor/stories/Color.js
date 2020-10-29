import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var ColorAnchor = function ColorAnchor() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Add",
    href: "#"
  })), /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Add",
    href: "#"
  })));
};

export var Color = function Color() {
  return /*#__PURE__*/React.createElement(ColorAnchor, null);
};