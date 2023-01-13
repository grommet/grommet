var _excluded = ["title"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Image, Text } from 'grommet';
import { FormAdd } from "grommet-icons/es6/icons/FormAdd";
var labels = [];
for (var i = 0; i < 10; i += 1) labels.push("Item " + i);
var skeleton = {
  message: {
    start: 'Loading',
    end: 'Content Loaded'
  }
};
var Item = function Item(_ref) {
  var title = _ref.title,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Card, _extends({
    pad: "medium",
    gap: "large",
    round: "medium",
    flex: "grow"
  }, rest), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "large",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "xsmall",
    height: "xsmall",
    background: "brand",
    round: "small",
    flex: false
  }, /*#__PURE__*/React.createElement(Image, null)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    size: "large",
    color: "text-strong",
    weight: "bold",
    skeleton: {
      width: 'xsmall'
    }
  }, title), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/React.createElement(Button, {
    label: "Add",
    reverse: true,
    icon: /*#__PURE__*/React.createElement(FormAdd, null),
    secondary: true
  })));
};
export var GridContainer = function GridContainer() {
  var _useState = useState(true),
    loading = _useState[0],
    setLoading = _useState[1];
  useEffect(function () {
    setTimeout(function () {
      return setLoading(!loading);
    }, 3000);
  }, [loading]);
  return /*#__PURE__*/React.createElement(Box, {
    skeleton: loading ? skeleton : undefined
  }, /*#__PURE__*/React.createElement(Grid, {
    pad: "small",
    gap: "small",
    columns: ['medium', 'medium']
  }, labels.map(function (label, index) {
    return /*#__PURE__*/React.createElement(Item, {
      key: label,
      title: label,
      skeleton: loading ? {
        animation: [{
          type: 'fadeIn',
          delay: index * 200
        }]
      } : undefined
    });
  })));
};
GridContainer.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Skeleton/GridContainer'
};