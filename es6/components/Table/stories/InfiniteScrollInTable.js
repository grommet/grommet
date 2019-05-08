import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Heading, grommet, Grommet, InfiniteScroll, Table, TableRow, TableBody, TableCell, TableHeader, Text } from 'grommet';

var InfiniteScrollInTable = function InfiniteScrollInTable() {
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

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    basis: "small"
  }, React.createElement(Heading, {
    level: 3
  }, React.createElement(Box, {
    gap: "small"
  }, React.createElement("strong", null, "InfiniteScroll embedded in a Table"), React.createElement(Text, null, "Scroll down to load more data, open console to see loading info"))), React.createElement(Table, null, React.createElement(TableHeader, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Key"), React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Cartoon"), React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Movie"), React.createElement(TableCell, {
    scope: "col",
    border: "bottom"
  }, "Year"))), React.createElement(TableBody, null, React.createElement(InfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return React.createElement(TableRow, null, React.createElement(TableCell, null, marker));
    },
    scrollableAncestor: "window",
    items: results,
    onMore: function onMore() {
      return load();
    },
    step: step
  }, function (result) {
    return React.createElement(TableRow, {
      key: result
    }, React.createElement(TableCell, null, result), React.createElement(TableCell, null, "cartoon"), React.createElement(TableCell, null, "movie name"), React.createElement(TableCell, null, "year"));
  })))));
};

storiesOf('Table', module).add('InfiniteScroll', function () {
  return React.createElement(InfiniteScrollInTable, null);
});