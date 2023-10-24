"use strict";

exports.__esModule = true;
exports.DataTableGroupBy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataForm = require("../Data/DataForm");
var _DataContext = require("../../contexts/DataContext");
var _FormContext = require("../Form/FormContext");
var _FormField = require("../FormField");
var _Select = require("../Select");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["id", "options"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var DataTableGroupBy = exports.DataTableGroupBy = function DataTableGroupBy(_ref) {
  var idProp = _ref.id,
    options = _ref.options,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    view = _useContext.view,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    noForm = _useContext2.noForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--groupby";
  (0, _react.useEffect)(function () {
    if (noForm) addToolbarKey('_groupBy');
  }, [addToolbarKey, noForm]);
  if (!options) return null;
  var content = /*#__PURE__*/_react["default"].createElement(_Select.Select, _extends({
    id: id,
    name: "_groupBy",
    showSelectedInline: true,
    placeholder: noForm ? 'Group by' : undefined,
    options: options,
    labelKey: "label",
    clear: view != null && view.groupBy ? {
      position: 'top',
      label: format({
        id: 'dataTableGroupBy.clear',
        messages: messages == null ? void 0 : messages.dataTableGroupBy
      })
    } : undefined,
    value: view == null ? void 0 : view.groupBy
  }, rest));
  if (noForm)
    // likely in Toolbar
    content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    htmlFor: id,
    label: format({
      id: 'dataTableGroupBy.label',
      messages: messages == null ? void 0 : messages.dataTableGroupBy
    })
  }, content);
  return content;
};
DataTableGroupBy.propTypes = _propTypes.DataTableGroupByPropTypes;