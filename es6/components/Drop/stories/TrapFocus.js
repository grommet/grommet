import React, { useRef, useState } from 'react';
import { Grommet, grommet, Box, Button, Drop, Nav, Text } from 'grommet';
import { Calculator } from "grommet-icons/es6/icons/Calculator";
import { Bug } from "grommet-icons/es6/icons/Bug";
import { Achievement } from "grommet-icons/es6/icons/Achievement";

var TooltipButton = function TooltipButton(_ref) {
  var icon = _ref.icon,
      name = _ref.name;

  var _useState = useState(false),
      over = _useState[0],
      setOver = _useState[1];

  var ref = useRef();
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Button, {
    ref: ref,
    onMouseOver: function onMouseOver() {
      return setOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setOver(false);
    },
    onFocus: function onFocus() {
      return setOver(true);
    },
    onBlur: function onBlur() {
      return setOver(false);
    },
    plain: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      vertical: 'small'
    },
    align: "center"
  }, icon)), ref.current && over && /*#__PURE__*/React.createElement(Drop, {
    plain: true,
    align: {
      left: 'right'
    },
    target: ref.current,
    margin: {
      horizontal: 'small'
    } // trapFocus set to false allows tabbing through the buttons
    ,
    trapFocus: false
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: "brand"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "white"
  }, name))));
};

export var TrapFocus = function TrapFocus() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Nav, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(TooltipButton, {
    icon: /*#__PURE__*/React.createElement(Calculator, null),
    name: "Calculator"
  }), /*#__PURE__*/React.createElement(TooltipButton, {
    icon: /*#__PURE__*/React.createElement(Bug, null),
    name: "Bug"
  }), /*#__PURE__*/React.createElement(TooltipButton, {
    icon: /*#__PURE__*/React.createElement(Achievement, null),
    name: "Achievement"
  })));
};
TrapFocus.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};