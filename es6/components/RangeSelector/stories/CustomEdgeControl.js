function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customEdge = deepMerge(grommet, {
  rangeSelector: {
    edge: {
      type: /*#__PURE__*/React.createElement(Gremlin, {
        size: "large",
        color: "neutral-2"
      }) // it is also possible to use an actual node
      // type:  <div style={{ padding: '24px', background: 'red' }} />,

    }
  }
});
export var CustomEdgeControl = function CustomEdgeControl(_ref) {
  var _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
      rest = _objectWithoutPropertiesLoose(_ref, ["direction"]);

  var _useState = useState([2, 7]),
      range = _useState[0],
      setRange = _useState[1];

  var onChange = function onChange(values) {
    setRange(values);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customEdge
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "xlarge",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontFamily: 'Comic Sans MS'
    },
    color: "brand"
  }, "Feed the gremlins with grommets...", ' '), /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value) {
    return /*#__PURE__*/React.createElement(Box, {
      key: value,
      width: "xsmall",
      height: "xsmall",
      justify: "center",
      align: "center",
      pad: "small",
      border: false
    }, /*#__PURE__*/React.createElement(GrommetIcon, {
      color: "brand",
      size: "small"
    }));
  })), /*#__PURE__*/React.createElement(RangeSelector, _extends({
    direction: direction,
    min: 0,
    max: 9,
    size: "full",
    values: range,
    color: "accent-3",
    onChange: onChange
  }, rest)))));
};
CustomEdgeControl.story = {
  name: 'Custom edge controls'
};