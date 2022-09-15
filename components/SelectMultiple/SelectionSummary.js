"use strict";

exports.__esModule = true;
exports.SelectionSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _Button = require("../Button");

var _Text = require("../Text");

var _utils = require("../Select/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SelectionSummary = function SelectionSummary(_ref) {
  var allOptions = _ref.allOptions,
      clearRef = _ref.clearRef,
      disabled = _ref.disabled,
      disabledKey = _ref.disabledKey,
      isSelected = _ref.isSelected,
      labelKey = _ref.labelKey,
      limit = _ref.limit,
      onChange = _ref.onChange,
      options = _ref.options,
      search = _ref.search,
      setActiveIndex = _ref.setActiveIndex,
      showSelectedInline = _ref.showSelectedInline,
      value = _ref.value,
      valueKey = _ref.valueKey;
  var isDisabled = (0, _utils.useDisabled)(disabled, disabledKey, options, valueKey || labelKey);
  var selectedValuesDisabled = (0, _react.useCallback)(function () {
    var disabledSelected = 0;

    for (var i = 0; i < allOptions.length; i += 1) {
      if (value.includes((0, _utils.getOptionValue)(i, options, valueKey || labelKey)) && isDisabled(i)) disabledSelected += 1;
    }

    if (value.length === disabledSelected) return true;
    return false;
  }, [value, allOptions, options, valueKey, labelKey, isDisabled]);
  if (search === '' || search === undefined) return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: showSelectedInline ? {
      vertical: 'xsmall'
    } : 'small',
    direction: "row",
    justify: "between",
    gap: "small",
    fill: "horizontal",
    flex: showSelectedInline
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    alignSelf: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "small"
  }, value.length === 0 ? "0 selected" : value.length + " selected of " + options.length)), (options.length && (!limit || !(value.length === 0 && selectedValuesDisabled()))) > 0 && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    a11yTitle: value.length === 0 || selectedValuesDisabled() ? "Select all " + options.length + " options" : value.length + " options selected. Clear all?",
    label: value.length === 0 || selectedValuesDisabled() ? 'Select All' : 'Clear All',
    onClick: function onClick(event) {
      var selectAll = value.length === 0 || selectedValuesDisabled();

      if (onChange) {
        var nextSelected = options.filter(function (i, index) {
          return selectAll ? !isDisabled(index) || isSelected(index) : isDisabled(index) && isSelected(index);
        });
        var nextValue = nextSelected.map(function (i) {
          return valueKey && valueKey.reduce ? (0, _utils.applyKey)(i, valueKey) : i;
        });
        onChange(event, {
          option: options,
          value: nextValue,
          selected: nextSelected
        });
      }

      if (limit && !selectAll) setActiveIndex(0);
    },
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    ref: clearRef
  }));
  return /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "small"
  }, value.length + " selected");
};

exports.SelectionSummary = SelectionSummary;