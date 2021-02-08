import React, { useState } from 'react';
import { Box, CheckBox, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
var boxStyle = {
  position: 'relative',
  display: 'block'
};
var titleBoxBackground = {
  color: 'neutral-1'
};
var titleBoxStyle = {
  position: 'sticky',
  top: 0
};
var checkboxes = Array(8).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var removeItemFromArray = function removeItemFromArray(array, value) {
  return array.filter(function (item) {
    return item !== value;
  });
};

export var WithStickyDiv = function WithStickyDiv() {
  var _useState = useState([]),
      checks = _useState[0],
      setChecks = _useState[1];

  var onCheck = function onCheck(value) {
    return function (_ref) {
      var target = _ref.target;

      if (target.checked) {
        setChecks([].concat(checks, [value]));
      } else {
        setChecks(removeItemFromArray(checks, value));
      }
    };
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    height: "120px",
    width: "120px",
    overflow: "auto",
    style: boxStyle
  }, /*#__PURE__*/React.createElement(Box, {
    background: titleBoxBackground,
    style: titleBoxStyle
  }, "Click & Scroll"), checkboxes.map(function (item) {
    return /*#__PURE__*/React.createElement(CheckBox, {
      key: item,
      checked: checks.includes(item),
      label: item,
      onChange: onCheck(item)
    });
  }))));
};
WithStickyDiv.storyName = 'With sticky div';
export default {
  title: 'Input/CheckBox/With sticky div'
};