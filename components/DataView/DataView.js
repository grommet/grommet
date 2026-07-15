"use strict";

exports.__esModule = true;
exports.DataView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataForm = require("../Data/DataForm");
var _DataContext = require("../../contexts/DataContext");
var _DataFormContext = require("../../contexts/DataFormContext");
var _FormField = require("../FormField");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _Select = require("../Select");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["id"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DataView = exports.DataView = function DataView(_ref) {
  var idProp = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    view = _useContext.view,
    views = _useContext.views,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_DataFormContext.DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--view";
  (0, _react.useEffect)(function () {
    if (!inDataForm) addToolbarKey('_view');
  }, [addToolbarKey, inDataForm]);
  if (!views) return null;
  var names = views.map(function (v) {
    return v.name;
  });
  var content;
  if (inDataForm && names.length < 7) {
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
      placeholder: !inDataForm ? 'Select view' : undefined,
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  }
  if (!inDataForm)
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