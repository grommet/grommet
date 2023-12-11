"use strict";

exports.__esModule = true;
exports.DataSearch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Search = require("grommet-icons/icons/Search");
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _DataContext = require("../../contexts/DataContext");
var _DataForm = require("../Data/DataForm");
var _DropButton = require("../DropButton");
var _DataFormContext = require("../../contexts/DataFormContext");
var _FormField = require("../FormField");
var _Skeleton = require("../Skeleton");
var _TextInput = require("../TextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _responsive = require("../../utils/responsive");
var _excluded = ["drop", "id", "responsive"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};
var DataSearch = exports.DataSearch = function DataSearch(_ref) {
  var _theme$data$button;
  var drop = _ref.drop,
    idProp = _ref.id,
    responsive = _ref.responsive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_DataFormContext.DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var skeleton = (0, _Skeleton.useSkeleton)();
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var id = idProp || dataId + "--search";
  (0, _react.useEffect)(function () {
    if (!inDataForm) addToolbarKey('_search');
  }, [addToolbarKey, inDataForm]);
  var content = skeleton ? null : /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    }),
    id: id,
    name: "_search",
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
    type: "search"
  }, rest));
  if (!inDataForm)
    // likely in Toolbar
    content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    htmlFor: id,
    label: format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    })
  }, content);
  if (!drop && (!responsive || !(0, _responsive.isSmall)(size))) return content;
  var control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    id: dataId + "--search-control",
    "aria-label": format({
      id: 'dataSearch.open',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
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
DataSearch.propTypes = _propTypes.DataSearchPropTypes;