function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState } from 'react';
import { Calendar, Grid, Text } from 'grommet';
import { Box } from '../../Box';
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
    React.createElement(Grid, {
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
    })))
    // </Grommet>
  );
};

ShowAdjacent.storyName = 'Show adjacent days';
export default {
  title: "Visualizations/Calendar/Show adjacent days"
};