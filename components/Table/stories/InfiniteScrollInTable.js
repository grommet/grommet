"use strict";

exports.__esModule = true;
exports["default"] = exports.InfiniteScrollInTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    basis: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "InfiniteScroll embedded in a Table"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Scroll down to load more data, open console to see loading info"))), /*#__PURE__*/_react["default"].createElement(_grommet.Table, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Key"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Cartoon"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Movie"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
    scope: "col",
    border: "bottom"
  }, "Year"))), /*#__PURE__*/_react["default"].createElement(_grommet.TableBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, marker));
    },
    scrollableAncestor: "window",
    items: results,
    onMore: function onMore() {
      return load();
    },
    step: step
  }, function (result) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, {
      key: result
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, result), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, "cartoon"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, "movie name"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, "year"));
  })))));
};

exports.InfiniteScrollInTable = InfiniteScrollInTable;
InfiniteScrollInTable.storyName = 'InfiniteScroll';
InfiniteScrollInTable.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Table/InfiniteScroll'
};
exports["default"] = _default;