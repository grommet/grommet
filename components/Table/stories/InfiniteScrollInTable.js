"use strict";

exports.__esModule = true;
exports["default"] = exports.InfiniteScrollInTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var InfiniteScrollInTable = exports.InfiniteScrollInTable = function InfiniteScrollInTable() {
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
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
      items: results,
      onMore: function onMore() {
        return load();
      },
      step: step
    }, function (result) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, {
        key: result
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, result), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, "cartoon"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, "movie name"), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, "year"));
    }))))
    // </Grommet>
  );
};

InfiniteScrollInTable.storyName = 'InfiniteScroll';
InfiniteScrollInTable.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Table/InfiniteScroll'
};