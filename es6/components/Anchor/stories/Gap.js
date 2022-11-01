import React from 'react';
import { Upload } from "grommet-icons/es6/icons/Upload";
import { Anchor, Box } from 'grommet';
var GapAnchor = function GapAnchor() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Upload, null),
    label: "Small Gap",
    href: "#",
    gap: "small"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Upload, null),
    label: "Medium Gap",
    href: "#",
    gap: "medium"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Upload, null),
    label: "Large Gap",
    href: "#",
    gap: "large"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Upload, null),
    label: "5px Gap",
    href: "#",
    gap: "5px"
  }));
};
export var Gap = function Gap() {
  return /*#__PURE__*/React.createElement(GapAnchor, null);
};
export default {
  title: 'Controls/Anchor/Gap'
};