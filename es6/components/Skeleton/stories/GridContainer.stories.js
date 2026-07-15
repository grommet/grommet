var _excluded = ["title"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Text } from 'grommet';
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
  }), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
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