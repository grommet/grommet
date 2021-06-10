"use strict";

exports.__esModule = true;
exports["default"] = exports.PaginatedGrid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var data = [];

for (var i = 0; i < 95; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}

var CardResult = function CardResult(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    fill: true,
    pad: "medium"
  }, item.entry);
};

var PaginatedGrid = function PaginatedGrid() {
  var _useState = (0, _react.useState)(data.slice(0, 10)),
      currentData = _useState[0],
      setCurrentData = _useState[1];

  var _useState2 = (0, _react.useState)([0, 10]),
      indices = _useState2[0],
      setIndices = _useState2[1];

  var handleChange = function handleChange(_ref2) {
    var startIndex = _ref2.startIndex,
        endIndex = _ref2.endIndex;
    var nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: {
      min: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "small",
    rows: "small",
    gap: "medium",
    justify: "center"
  }, currentData.map(function (datum) {
    return /*#__PURE__*/_react["default"].createElement(CardResult, {
      item: datum,
      key: datum.entry
    });
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Showing ", indices[0] + 1, " - ", indices[1], " of ", data.length), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
    numberItems: data.length,
    onChange: handleChange
  }))));
};

exports.PaginatedGrid = PaginatedGrid;
PaginatedGrid.storyName = 'Grid';
var _default = {
  title: 'Controls/Pagination/Grid'
};
exports["default"] = _default;