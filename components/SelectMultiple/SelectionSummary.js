"use strict";

exports.__esModule = true;
exports.SelectionSummary = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _Text = require("../Text");
var _utils = require("../Select/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var SelectionSummary = exports.SelectionSummary = function SelectionSummary(_ref) {
  var allOptions = _ref.allOptions,
    clearRef = _ref.clearRef,
    disabled = _ref.disabled,
    disabledKey = _ref.disabledKey,
    isSelected = _ref.isSelected,
    labelKey = _ref.labelKey,
    limit = _ref.limit,
    onChange = _ref.onChange,
    onMore = _ref.onMore,
    options = _ref.options,
    search = _ref.search,
    setActiveIndex = _ref.setActiveIndex,
    showSelectedInline = _ref.showSelectedInline,
    value = _ref.value,
    valueKey = _ref.valueKey;
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
  var summaryText = (value == null ? void 0 : value.length) === 0 || onMore || !value || search !== '' && search !== undefined ? ((value == null ? void 0 : value.length) || 0) + " selected" : ((value == null ? void 0 : value.length) || 0) + " selected of " + options.length;
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
    pad: showSelectedInline ? {
      left: 'xsmall',
      vertical: 'xsmall'
    } : 'xsmall',
    direction: "row",
    justify: "between",
    gap: "small",
    fill: "horizontal",
    flex: showSelectedInline,
    align: "center",
    height: {
      min: 'xxsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "small"
  }, summaryText), (options.length && (!limit || !(!value || (value == null ? void 0 : value.length) === 0 && selectedValuesDisabled()))) > 0 && (!onMore || onMore && (value == null ? void 0 : value.length) !== 0) && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    a11yTitle: showSelectAll ? "Select all " + options.length + " options" : (value == null ? void 0 : value.length) + " options selected. Clear all?",
    label: showSelectAll ? 'Select All' : 'Clear All',
    onClick: function onClick(event) {
      return summaryButtonClick(event);
    },
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    ref: clearRef
  }));
};