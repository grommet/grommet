"use strict";

exports.__esModule = true;
exports.DataSearch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Search = require("grommet-icons/icons/Search");
var _Box = require("../Box");
var _DataContext = require("../../contexts/DataContext");
var _DataForm = require("../Data/DataForm");
var _DropButton = require("../DropButton");
var _FormContext = require("../Form/FormContext");
var _Skeleton = require("../Skeleton");
var _TextInput = require("../TextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _excluded = ["id"],
  _excluded2 = ["drop", "id", "responsive"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};
var Content = function Content(_ref) {
  var id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    noForm = _useContext2.noForm;
  var skeleton = (0, _Skeleton.useSkeleton)();
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  (0, _react.useEffect)(function () {
    if (noForm) addToolbarKey('_search');
  }, [addToolbarKey, noForm]);
  var content = skeleton ? null : /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.DataSearch
    }),
    id: id || dataId + "--search",
    name: "_search",
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
    type: "search"
  }, rest));
  if (noForm) content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
    footer: false,
    updateOn: "change"
  }, content);
  return content;
};
var DataSearch = function DataSearch(_ref2) {
  var drop = _ref2.drop,
    id = _ref2.id,
    responsive = _ref2.responsive,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _useContext4 = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext4.id,
    messages = _useContext4.messages;
  var _useContext5 = (0, _react.useContext)(_FormContext.FormContext),
    noForm = _useContext5.noForm;
  var _useContext6 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext6.format;
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var content = /*#__PURE__*/_react["default"].createElement(Content, {
    id: drop ? undefined : id
  });
  if (noForm) content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
    footer: false
  }, content);
  if (!drop && (!responsive || size !== 'small' && size !== 'xsmall')) return content;
  var control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    id: id || dataId + "--search-control",
    "aria-label": format({
      id: 'dataSearch.open',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    kind: "toolbar",
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
exports.DataSearch = DataSearch;
DataSearch.propTypes = _propTypes.DataSearchPropTypes;