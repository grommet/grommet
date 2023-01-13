"use strict";

exports.__esModule = true;
exports.DataSearch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Search = require("grommet-icons/icons/Search");
var _DataForm = require("../Data/DataForm");
var _FormContext = require("../Form/FormContext");
var _Skeleton = require("../Skeleton");
var _TextInput = require("../TextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DataSearch = function DataSearch(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var skeleton = (0, _Skeleton.useSkeleton)();
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    dataId = _useContext2.id,
    messages = _useContext2.messages,
    noForm = _useContext2.noForm;
  var content = skeleton ? null : /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.DataSearch
    }),
    id: dataId + "--search",
    name: "_search",
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
    type: "search"
  }, rest));
  if (noForm) content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, {
    footer: false
  }, content);
  return content;
};
exports.DataSearch = DataSearch;
DataSearch.propTypes = _propTypes.DataSearchPropTypes;