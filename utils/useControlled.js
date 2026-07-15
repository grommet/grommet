"use strict";

exports.__esModule = true;
exports.useControlled = void 0;
var _react = require("react");
// This hook allows to manage components controlled and uncontrolled
var useControlled = exports.useControlled = function useControlled(_ref) {
  var prop = _ref.prop,
    defaultProp = _ref.defaultProp,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  // State to manage the uncontrolled property value
  var _useState = (0, _react.useState)(defaultProp),
    uncontrolledProp = _useState[0],
    setUncontrolledProp = _useState[1];
  // Check if the component is controlled based on whether 'prop' is defined
  var controlled = prop !== undefined;
  var value = controlled ? prop : uncontrolledProp;
  var handleChange = (0, _react.useCallback)(onChange, [onChange]);
  var setValue = (0, _react.useCallback)(function (nextValue) {
    // Only update internal value in uncontrolled cases
    if (!controlled) {
      setUncontrolledProp(nextValue);
    }
    handleChange(nextValue);
  }, [controlled, setUncontrolledProp, handleChange]);
  return [value, setValue];
};