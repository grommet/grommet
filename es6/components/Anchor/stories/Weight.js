import React from 'react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var WeightAnchor = function WeightAnchor() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Anchor default weight"
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Anchor weight Normal",
    weight: "normal"
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Anchor weight Bold",
    weight: "bold"
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Anchor weight 200",
    weight: 200
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Anchor weight 400",
    weight: 400
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Anchor weight 600",
    weight: 600
  })));
};

export var Weight = function Weight() {
  return /*#__PURE__*/React.createElement(WeightAnchor, null);
};
export default {
  title: 'Controls/Anchor/Weight'
};