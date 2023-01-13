"use strict";

exports.__esModule = true;
exports.DataFilters = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Filter = require("grommet-icons/icons/Filter");
var _Box = require("../Box");
var _Button = require("../Button");
var _DataFilter = require("../DataFilter");
var _DataForm = require("../Data/DataForm");
var _DropButton = require("../DropButton");
var _Header = require("../Header");
var _Heading = require("../Heading");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["drop", "children", "heading"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var dropProps = {
  align: {
    top: 'bottom',
    right: 'right'
  }
};
var DataFilters = function DataFilters(_ref) {
  var drop = _ref.drop,
    children = _ref.children,
    heading = _ref.heading,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    clearFilters = _useContext.clearFilters,
    data = _useContext.data,
    messages = _useContext.messages,
    properties = _useContext.properties,
    view = _useContext.view;
  var _useContext2 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext2.format;
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var controlled = drop;
  var clearControl = clearFilters && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: format({
      id: 'dataFilters.clear',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    onClick: clearFilters
  }));
  var filters;
  if (_react.Children.count(children) === 0) {
    var filtersFor;
    if (!properties && data && data.length) filtersFor = Object.keys(data[0]);else if (Array.isArray(properties)) filtersFor = properties;else if (typeof properties === 'object') filtersFor = Object.keys(properties);else filtersFor = [];
    filters = filtersFor.map(function (property) {
      return /*#__PURE__*/_react["default"].createElement(_DataFilter.DataFilter, {
        key: property,
        property: property
      });
    });
  }
  var content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, _extends({
    pad: controlled ? 'medium' : undefined,
    gap: "small",
    onDone: function onDone() {
      return setShowContent(false);
    }
  }, !controlled ? rest : {}), !drop && /*#__PURE__*/_react["default"].createElement(_Header.Header, null, /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    margin: "none",
    level: 2,
    size: "small"
  }, heading || format({
    id: 'dataFilters.heading',
    messages: messages == null ? void 0 : messages.dataFilters
  })), !controlled && clearControl), filters, children);
  if (!controlled) return content;
  var badge = 0;
  if (view != null && view.properties) badge += Object.keys(view.properties).length;
  if (view != null && view.search) badge += 1;
  if (view != null && view.sort) badge += 1;
  if (!badge) badge = undefined;

  // drop
  var control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, {
    "aria-label": format({
      id: 'dataFilters.open',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    kind: "toolbar",
    icon: /*#__PURE__*/_react["default"].createElement(_Filter.Filter, null),
    dropProps: dropProps,
    dropContent: content,
    badge: badge,
    open: showContent,
    onOpen: function onOpen() {
      return setShowContent(undefined);
    },
    onClose: function onClose() {
      return setShowContent(undefined);
    }
  });
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    flex: false,
    direction: "row",
    gap: "small"
  }, rest), control, clearControl);
};
exports.DataFilters = DataFilters;
DataFilters.propTypes = _propTypes.DataFiltersPropTypes;