function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { Calendar, Grid, Text } from 'grommet';
import { Box } from '../../Box';
import { Main } from '../../Main';
var Container = function Container(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React.createElement(Box, _extends({
    align: "center",
    border: true,
    gap: "small",
    pad: "medium"
  }, rest));
};
export var ShowAdjacent = function ShowAdjacent() {
  var _useState = useState(new Date(2020, 6, 15).toDateString()),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Main, null, /*#__PURE__*/React.createElement(Grid, {
      columns: {
        count: 'fit',
        size: ['small', 'auto']
      },
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "showAdjacentDays = false"), /*#__PURE__*/React.createElement(Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13'],
      showAdjacentDays: false
    })), /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "showAdjacentDays = true"), /*#__PURE__*/React.createElement(Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13']
    })), /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "showAdjacentDays = \"trim\""), /*#__PURE__*/React.createElement(Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13'],
      showAdjacentDays: "trim"
    }))))
    // </Grommet>
  );
};
ShowAdjacent.storyName = 'Show adjacent days';
export default {
  title: 'Visualizations/Calendar/Show adjacent days'
};