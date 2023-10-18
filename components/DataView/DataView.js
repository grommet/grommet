"use strict";

exports.__esModule = true;
exports.DataView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataForm = require("../Data/DataForm");
var _DataContext = require("../../contexts/DataContext");
var _FormContext = require("../Form/FormContext");
var _FormField = require("../FormField");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _Select = require("../Select");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["id"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var DataView = exports.DataView = function DataView(_ref) {
  var idProp = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    view = _useContext.view,
    views = _useContext.views,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    noForm = _useContext2.noForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--view";
  (0, _react.useEffect)(function () {
    if (noForm) addToolbarKey('_view');
  }, [addToolbarKey, noForm]);
  if (!views) return null;
  var names = views.map(function (v) {
    return v.name;
  });
  var content;
  if (!noForm && names.length < 7) {
    content = /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, _extends({
      id: id,
      name: "_view",
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  } else {
    content = /*#__PURE__*/_react["default"].createElement(_Select.Select, _extends({
      id: id,
      name: "_view",
      showSelectedInline: true,
      placeholder: noForm ? 'Select view' : undefined,
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  }
  if (noForm)
    // likely in Toolbar
    content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    htmlFor: id,
    label: format({
      id: 'dataView.label',
      messages: messages == null ? void 0 : messages.dataView
    })
  }, content);
  return content;
};
DataView.propTypes = _propTypes.DataViewPropTypes;