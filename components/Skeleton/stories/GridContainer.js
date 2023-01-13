"use strict";

exports.__esModule = true;
exports["default"] = exports.GridContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _excluded = ["title"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
  return /*#__PURE__*/_react["default"].createElement(_grommet.Card, _extends({
    pad: "medium",
    gap: "large",
    round: "medium",
    flex: "grow"
  }, rest), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "large",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "xsmall",
    height: "xsmall",
    background: "brand",
    round: "small",
    flex: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large",
    color: "text-strong",
    weight: "bold",
    skeleton: {
      width: 'xsmall'
    }
  }, title), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Add",
    reverse: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormAdd, null),
    secondary: true
  })));
};
var GridContainer = function GridContainer() {
  var _useState = (0, _react.useState)(true),
    loading = _useState[0],
    setLoading = _useState[1];
  (0, _react.useEffect)(function () {
    setTimeout(function () {
      return setLoading(!loading);
    }, 3000);
  }, [loading]);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    skeleton: loading ? skeleton : undefined
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "small",
    gap: "small",
    columns: ['medium', 'medium']
  }, labels.map(function (label, index) {
    return /*#__PURE__*/_react["default"].createElement(Item, {
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
exports.GridContainer = GridContainer;
GridContainer.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Skeleton/GridContainer'
};
exports["default"] = _default;