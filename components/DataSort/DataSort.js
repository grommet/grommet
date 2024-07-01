"use strict";

exports.__esModule = true;
exports.DataSort = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Descend = require("grommet-icons/icons/Descend");
var _DataContext = require("../../contexts/DataContext");
var _Box = require("../Box");
var _DataForm = require("../Data/DataForm");
var _DropButton = require("../DropButton");
var _DataFormContext = require("../../contexts/DataFormContext");
var _FormField = require("../FormField");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _Select = require("../Select");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _useThemeValue = require("../../utils/useThemeValue");
var _excluded = ["drop", "options"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};
var Content = function Content(_ref) {
  var optionsArg = _ref.options;
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    data = _useContext.data,
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties;
  var _useContext2 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext2.format;
  var options = (0, _react.useMemo)(function () {
    return optionsArg || properties && Object.keys(properties).sort().filter(function (property) {
      var _properties$property;
      return !((properties == null || (_properties$property = properties[property]) == null ? void 0 : _properties$property.sort) === false);
    }) || data.length > 0 && Object.keys(data[0]).sort() || data;
  }, [data, optionsArg, properties]);
  var directionOptions = [{
    label: format({
      id: 'dataSort.ascending',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    value: 'asc'
  }, {
    label: format({
      id: 'dataSort.descending',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    value: 'desc'
  }];
  var sortPropertyId = dataId + "--sort-property";
  var sortDirectionId = dataId + "--sort-direction";
  return [/*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    key: "by",
    htmlFor: sortPropertyId,
    label: format({
      id: 'dataSort.by',
      messages: messages == null ? void 0 : messages.dataSort
    })
  }, /*#__PURE__*/_react["default"].createElement(_Select.Select, {
    id: sortPropertyId,
    name: "_sort.property",
    options: options
  })), /*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    key: "dir",
    htmlFor: sortDirectionId,
    label: format({
      id: 'dataSort.direction',
      messages: messages == null ? void 0 : messages.dataSort
    })
  }, /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, {
    id: sortDirectionId,
    name: "_sort.direction",
    options: directionOptions
  }))];
};
var DataSort = exports.DataSort = function DataSort(_ref2) {
  var _theme$data$button;
  var drop = _ref2.drop,
    options = _ref2.options,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useContext3 = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext3.id,
    messages = _useContext3.messages;
  var _useContext4 = (0, _react.useContext)(_DataFormContext.DataFormContext),
    inDataForm = _useContext4.inDataForm;
  var _useContext5 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext5.format;
  var theme = (0, _useThemeValue.useThemeValue)();
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var content = /*#__PURE__*/_react["default"].createElement(Content, {
    options: options
  });
  if (!inDataForm) content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
    footer: false,
    updateOn: "change"
  }, content);
  if (!drop) return content;
  var tip = format({
    id: 'dataSort.open',
    messages: messages == null ? void 0 : messages.dataSort
  });
  var control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    id: dataId + "--sort-control",
    "aria-label": tip,
    tip: tip,
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    icon: /*#__PURE__*/_react["default"].createElement(_Descend.Descend, null),
    dropProps: dropProps,
    dropContent: /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      pad: "small"
    }, content),
    open: showContent,
    onOpen: function onOpen() {
      return setShowContent(undefined);
    },
    onClose: function onClose() {
      return setShowContent(undefined);
    }
  }, rest));
  return control;
};
DataSort.propTypes = _propTypes.DataSortPropTypes;