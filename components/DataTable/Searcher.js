"use strict";

exports.__esModule = true;
exports.Searcher = void 0;
var _react = _interopRequireWildcard(require("react"));
var _FormSearch = require("grommet-icons/icons/FormSearch");
var _Box = require("../Box");
var _Button = require("../Button");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _TextInput = require("../TextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Searcher = exports.Searcher = function Searcher(_ref) {
  var filtering = _ref.filtering,
    filters = _ref.filters,
    messages = _ref.messages,
    onFilter = _ref.onFilter,
    onFiltering = _ref.onFiltering,
    property = _ref.property;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var inputRef = (0, _react.useRef)();
  var buttonRef = (0, _react.useRef)();
  var needsFocus = filtering === property;
  var _useState = (0, _react.useState)(false),
    buttonNeedsFocus = _useState[0],
    setButtonNeedsFocus = _useState[1];
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  (0, _react.useEffect)(function () {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);

  // Focus the button after closing the search
  (0, _react.useEffect)(function () {
    if (buttonNeedsFocus && buttonRef.current) {
      buttonRef.current.focus();
      setButtonNeedsFocus(false);
    }
  }, [buttonNeedsFocus]);
  var a11yTitle = format({
    id: 'dataTable.searchBy',
    messages: messages,
    values: {
      property: property
    }
  });
  return filtering === property ? /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: function onEsc() {
      onFiltering(undefined);
      setButtonNeedsFocus(true);
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
    a11yTitle: a11yTitle,
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
    ref: buttonRef,
    a11yTitle: a11yTitle,
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