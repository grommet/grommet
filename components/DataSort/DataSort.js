"use strict";

exports.__esModule = true;
exports.DataSort = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataContext = require("../../contexts/DataContext");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _DataForm = require("../Data/DataForm");
var _FormContext = require("../Form/FormContext");
var _FormField = require("../FormField");
var _Select = require("../Select");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DataSort = function DataSort(_ref) {
  var optionsArg = _ref.options;
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    data = _useContext.data,
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    noForm = _useContext2.noForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var options = (0, _react.useMemo)(function () {
    return optionsArg || properties && Object.keys(properties).sort() || Object.keys(data[0]).sort();
  }, [data, optionsArg, properties]);
  var directionOptions = [{
    label: format({
      id: 'dataSort.ascending',
      messages: messages == null ? void 0 : messages.DataSort
    }),
    value: 'asc'
  }, {
    label: format({
      id: 'dataSort.descending',
      messages: messages == null ? void 0 : messages.DataSort
    }),
    value: 'desc'
  }];
  var sortPropertyId = dataId + "--sort-property";
  var sortDirectionId = dataId + "--sort-direction";
  var content = [/*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    key: "by",
    htmlFor: sortPropertyId,
    label: format({
      id: 'dataSort.by',
      messages: messages == null ? void 0 : messages.DataSort
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
      messages: messages == null ? void 0 : messages.DataSort
    })
  }, /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, {
    id: sortDirectionId,
    name: "_sort.direction",
    options: directionOptions
  }))];
  if (noForm) content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
    footer: false
  }, content);
  return content;
};
exports.DataSort = DataSort;
DataSort.propTypes = _propTypes.DataSortPropTypes;