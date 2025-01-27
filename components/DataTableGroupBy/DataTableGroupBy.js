"use strict";

exports.__esModule = true;
exports.DataTableGroupBy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataForm = require("../Data/DataForm");
var _DataContext = require("../../contexts/DataContext");
var _DataFormContext = require("../../contexts/DataFormContext");
var _FormField = require("../FormField");
var _Select = require("../Select");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["id", "options"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DataTableGroupBy = exports.DataTableGroupBy = function DataTableGroupBy(_ref) {
  var idProp = _ref.id,
    options = _ref.options,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    view = _useContext.view,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_DataFormContext.DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--groupby";
  (0, _react.useEffect)(function () {
    if (!inDataForm) addToolbarKey('_groupBy');
  }, [addToolbarKey, inDataForm]);
  if (!options) return null;
  var content = /*#__PURE__*/_react["default"].createElement(_Select.Select, _extends({
    id: id,
    name: "_groupBy",
    showSelectedInline: true,
    placeholder: !inDataForm ? 'Group by' : undefined,
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
  if (!inDataForm)
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