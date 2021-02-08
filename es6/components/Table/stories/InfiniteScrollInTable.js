import React, { useState } from 'react';
import { Box, Heading, grommet, Grommet, InfiniteScroll, Table, TableRow, TableBody, TableCell, TableHeader, Text } from 'grommet';
export var InfiniteScrollInTable = function InfiniteScrollInTable() {
  var step = 25;

  var _useState = useState(Array.from({
    length: 50
  }, function () {
    return Math.floor(Math.random() * 1000000);
  })),
      results = _useState[0],
      setResults = _useState[1];

  var load = function load() {
    console.log("InfiniteScroll fires onMore after loading " + step + " items");
    setResults([].concat(results, Array.from({
      length: 50
    }, function () {
      return Math.floor(Math.random() * 1000000);
    })));
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    basis: "small"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "small"
  }, /*#__PURE__*/React.createElement("strong", null, "InfiniteScroll embedded in a Table"), /*#__PURE__*/React.createElement(Text, null, "Scroll down to load more data, open console to see loading info"))), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Key"), /*#__PURE__*/React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Cartoon"), /*#__PURE__*/React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Movie"), /*#__PURE__*/React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Year"))), /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(InfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, marker));
    },
    scrollableAncestor: "window",
    items: results,
    onMore: function onMore() {
      return load();
    },
    step: step
  }, function (result) {
    return /*#__PURE__*/React.createElement(TableRow, {
      key: result
    }, /*#__PURE__*/React.createElement(TableCell, null, result), /*#__PURE__*/React.createElement(TableCell, null, "cartoon"), /*#__PURE__*/React.createElement(TableCell, null, "movie name"), /*#__PURE__*/React.createElement(TableCell, null, "year"));
  })))));
};
InfiniteScrollInTable.storyName = 'InfiniteScroll';
InfiniteScrollInTable.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Table/InfiniteScroll'
};