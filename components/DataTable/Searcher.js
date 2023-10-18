"use strict";

exports.__esModule = true;
exports.Searcher = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _FormSearch = require("grommet-icons/icons/FormSearch");
var _defaultProps = require("../../default-props");
var _Box = require("../Box");
var _Button = require("../Button");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _TextInput = require("../TextInput");
var _utils = require("../../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Searcher = exports.Searcher = function Searcher(_ref) {
  var filtering = _ref.filtering,
    filters = _ref.filters,
    onFilter = _ref.onFilter,
    onFiltering = _ref.onFiltering,
    property = _ref.property;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var inputRef = (0, _react.useRef)();
  var needsFocus = filtering === property;
  (0, _react.useEffect)(function () {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);
  return filtering === property ? /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: function onEsc() {
      return onFiltering(undefined);
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: {
      min: 'xsmall'
    },
    flex: true,
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, {
    name: "search-" + property,
    a11yTitle: "Search by " + property,
    ref: inputRef,
    value: filters[property],
    onChange: function onChange(event) {
      return onFilter(property, event.target.value);
    },
    onBlur: function onBlur() {
      return onFiltering(undefined);
    }
  }))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, filters[property] ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false,
    pad: {
      horizontal: 'small'
    },
    direction: "row",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, null, filters[property])) : null, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    a11yTitle: "Open search by " + property,
    icon: /*#__PURE__*/_react["default"].createElement(_FormSearch.FormSearch, {
      color: (0, _utils.normalizeColor)(filtering === property ? 'brand' : 'border', theme)
    }),
    hoverIndicator: true,
    onClick: function onClick() {
      return onFiltering(filtering === property ? undefined : property);
    }
  }));
};
Searcher.displayName = 'Searcher';
Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, _defaultProps.defaultProps);