import React, { useState } from 'react';
import { Box, Card, Grid, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 0; i < 95; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}

var CardResult = function CardResult(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/React.createElement(Card, {
    fill: true,
    pad: "medium"
  }, item.entry);
};

export var PaginatedGrid = function PaginatedGrid() {
  var _useState = useState(data.slice(0, 10)),
      currentData = _useState[0],
      setCurrentData = _useState[1];

  var _useState2 = useState([0, 10]),
      indices = _useState2[0],
      setIndices = _useState2[1];

  var handleChange = function handleChange(_ref2) {
    var startIndex = _ref2.startIndex,
        endIndex = _ref2.endIndex;
    var nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    height: {
      min: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: "small",
    rows: "small",
    gap: "medium",
    justify: "center"
  }, currentData.map(function (datum) {
    return /*#__PURE__*/React.createElement(CardResult, {
      item: datum,
      key: datum.entry
    });
  }))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/React.createElement(Text, null, "Showing ", indices[0] + 1, " - ", indices[1], " of ", data.length), /*#__PURE__*/React.createElement(Pagination, {
    numberItems: data.length,
    onChange: handleChange
  }))));
};
PaginatedGrid.storyName = 'Grid';
export default {
  title: 'Controls/Pagination/Grid'
};