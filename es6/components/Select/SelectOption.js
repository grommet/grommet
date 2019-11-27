function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { withForwardRef } from '../hocs';

function areEqual(prevProps, nextProps) {
  var active = prevProps.active,
      disabled = prevProps.disabled,
      option = prevProps.option,
      selected = prevProps.selected;
  var nextActive = nextProps.active,
      nextDisabled = nextProps.disabled,
      nextOption = nextProps.option,
      nextSelected = nextProps.selected;
  return active === nextActive && selected === nextSelected && disabled === nextDisabled && option === nextOption;
}

var SelectOption = React.memo(function (_ref) {
  var forwardRef = _ref.forwardRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["forwardRef"]);

  return React.createElement(Box, {
    flex: false
  }, React.createElement(Button, _extends({
    tabIndex: "-1",
    ref: forwardRef,
    role: "menuitem",
    hoverIndicator: "background"
  }, rest)));
}, areEqual);
var SelectOptionWrapper = withForwardRef(SelectOption);
export { SelectOptionWrapper as SelectOption };