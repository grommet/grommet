"use strict";

exports.__esModule = true;
exports.DataView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataForm = require("../Data/DataForm");
var _DataContext = require("../../contexts/DataContext");
var _FormContext = require("../Form/FormContext");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _Select = require("../Select");
var _propTypes = require("./propTypes");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DataView = function DataView(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    view = _useContext.view,
    views = _useContext.views,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    noForm = _useContext2.noForm;
  (0, _react.useEffect)(function () {
    if (noForm) addToolbarKey('_view');
  }, [addToolbarKey, noForm]);
  if (!views) return null;
  var names = views.map(function (v) {
    return v.name;
  });
  var id = dataId + "-view";
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
      placeholder: noForm ? 'Select view ...' : undefined,
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  }
  if (noForm) content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
    footer: false,
    updateOn: "change"
  }, content);
  return content;
};
exports.DataView = DataView;
DataView.propTypes = _propTypes.DataViewPropTypes;