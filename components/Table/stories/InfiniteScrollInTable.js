"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var InfiniteScrollInTable = function InfiniteScrollInTable() {
  var step = 25;

  var _useState = (0, _react.useState)(Array.from({
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

  return _react.default.createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, _react.default.createElement(_grommet.Box, {
    pad: "small",
    basis: "small"
  }, _react.default.createElement(_grommet.Heading, {
    level: 3
  }, _react.default.createElement(_grommet.Box, {
    gap: "small"
  }, _react.default.createElement("strong", null, "InfiniteScroll embedded in a Table"), _react.default.createElement(_grommet.Text, null, "Scroll down to load more data, open console to see loading info"))), _react.default.createElement(_grommet.Table, null, _react.default.createElement(_grommet.TableHeader, null, _react.default.createElement(_grommet.TableRow, null, _react.default.createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Key"), _react.default.createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Cartoon"), _react.default.createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Movie"), _react.default.createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Year"))), _react.default.createElement(_grommet.TableBody, null, _react.default.createElement(_grommet.InfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return _react.default.createElement(_grommet.TableRow, null, _react.default.createElement(_grommet.TableCell, null, marker));
    },
    scrollableAncestor: "window",
    items: results,
    onMore: function onMore() {
      return load();
    },
    step: step
  }, function (result) {
    return _react.default.createElement(_grommet.TableRow, {
      key: result
    }, _react.default.createElement(_grommet.TableCell, null, result), _react.default.createElement(_grommet.TableCell, null, "cartoon"), _react.default.createElement(_grommet.TableCell, null, "movie name"), _react.default.createElement(_grommet.TableCell, null, "year"));
  })))));
};

(0, _react2.storiesOf)('Table', module).add('InfiniteScroll', function () {
  return _react.default.createElement(InfiniteScrollInTable, null);
});