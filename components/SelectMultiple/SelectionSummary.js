"use strict";

exports.__esModule = true;
exports.SelectionSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _Text = require("../Text");
var _utils = require("../Select/utils");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var SelectionSummary = exports.SelectionSummary = function SelectionSummary(_ref) {
  var _theme$selectMultiple, _theme$selectMultiple2, _theme$selectMultiple3, _theme$selectMultiple4;
  var allOptions = _ref.allOptions,
    clearRef = _ref.clearRef,
    disabled = _ref.disabled,
    disabledKey = _ref.disabledKey,
    isSelected = _ref.isSelected,
    labelKey = _ref.labelKey,
    limit = _ref.limit,
    messages = _ref.messages,
    onChange = _ref.onChange,
    onMore = _ref.onMore,
    options = _ref.options,
    search = _ref.search,
    setActiveIndex = _ref.setActiveIndex,
    showSelectedInline = _ref.showSelectedInline,
    value = _ref.value,
    valueKey = _ref.valueKey;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var isDisabled = (0, _utils.useDisabled)(disabled, disabledKey, options, valueKey || labelKey);
  var selectedValuesDisabled = (0, _react.useCallback)(function () {
    var disabledSelected = 0;
    if (value) {
      for (var i = 0; i < allOptions.length; i += 1) {
        if ((0, _utils.arrayIncludes)(value, (0, _utils.getOptionValue)(i, options, valueKey || labelKey), valueKey || labelKey) && isDisabled(i)) disabledSelected += 1;
      }
      if (value.length === disabledSelected) return true;
    }
    return false;
  }, [value, allOptions, options, valueKey, labelKey, isDisabled]);
  var selectedInSearch = (0, _react.useCallback)(function () {
    return options == null ? void 0 : options.filter(function (option) {
      return (0, _utils.arrayIncludes)(value, option, valueKey || labelKey);
    });
  }, [options, value, valueKey, labelKey]);
  var showSelectAll = !!((value == null ? void 0 : value.length) === 0 || selectedValuesDisabled() || !value || selectedInSearch().length === 0);
  var messageId = (value == null ? void 0 : value.length) === 0 || onMore || !value || search !== '' && search !== undefined ? 'selectMultiple.selected' : 'selectMultiple.selectedOfTotal';
  var summaryText = format({
    id: messageId,
    messages: messages,
    values: {
      selected: (value == null ? void 0 : value.length) || 0,
      total: options.length
    }
  });
  var summaryButtonClick = function summaryButtonClick(event) {
    if (onChange) {
      var nextSelected = options.filter(function (i, index) {
        return showSelectAll ? !isDisabled(index) || isSelected(index) : isDisabled(index) && isSelected(index);
      });
      if (search !== '' && search !== undefined && value) {
        if (showSelectAll) {
          nextSelected = nextSelected.concat(value);
        } else {
          value.forEach(function (item) {
            if (!(0, _utils.arrayIncludes)(options, item, valueKey || labelKey)) {
              nextSelected.push(item);
            }
          });
        }
      }
      var nextValue = nextSelected.map(function (i) {
        return valueKey && valueKey.reduce ? (0, _utils.applyKey)(i, valueKey) : i;
      });
      onChange(event, {
        option: options,
        value: nextValue,
        selected: nextSelected
      });
    }
    if (limit && !showSelectAll) setActiveIndex(0);
  };
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: showSelectedInline ? (_theme$selectMultiple = theme.selectMultiple) == null || (_theme$selectMultiple = _theme$selectMultiple.summary) == null || (_theme$selectMultiple = _theme$selectMultiple.showSelectedInline) == null ? void 0 : _theme$selectMultiple.pad : (_theme$selectMultiple2 = theme.selectMultiple) == null || (_theme$selectMultiple2 = _theme$selectMultiple2.summary) == null ? void 0 : _theme$selectMultiple2.pad,
    direction: "row",
    justify: "between",
    gap: (_theme$selectMultiple3 = theme.selectMultiple) == null || (_theme$selectMultiple3 = _theme$selectMultiple3.summary) == null ? void 0 : _theme$selectMultiple3.gap,
    fill: "horizontal",
    flex: showSelectedInline,
    align: "center",
    height: (_theme$selectMultiple4 = theme.selectMultiple) == null || (_theme$selectMultiple4 = _theme$selectMultiple4.summary) == null ? void 0 : _theme$selectMultiple4.height
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "small"
  }, summaryText), (options.length && (!limit || !(!value || (value == null ? void 0 : value.length) === 0 && selectedValuesDisabled()))) > 0 && (!onMore || onMore && (value == null ? void 0 : value.length) !== 0) && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    a11yTitle: showSelectAll ? format({
      id: 'selectMultiple.selectAllA11y',
      messages: messages,
      values: {
        total: options.length
      }
    }) : format({
      id: 'selectMultiple.clearAllA11y',
      messages: messages,
      values: {
        selected: (value == null ? void 0 : value.length) || 0
      }
    }),
    label: format({
      id: showSelectAll ? 'selectMultiple.selectAll' : 'selectMultiple.clearAll',
      messages: messages
    }),
    onClick: function onClick(event) {
      return summaryButtonClick(event);
    },
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    ref: clearRef
  }));
};