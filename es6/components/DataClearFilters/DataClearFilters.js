var _excluded = ["onClick"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext } from 'react';
import { DataClearFiltersPropTypes } from './propTypes';
import { Button } from '../Button';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
var DataClearFilters = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$data$button;
  var _onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var _useContext2 = useContext(DataContext),
    clearFilters = _useContext2.clearFilters,
    messages = _useContext2.messages;
  return /*#__PURE__*/React.createElement(Button, _extends({
    ref: ref,
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    label: format({
      id: 'dataFilters.clear',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    onClick: function onClick(event) {
      clearFilters();
      if (_onClick) _onClick(event);
    }
  }, rest));
});
DataClearFilters.displayName = 'DataClearFilters';
DataClearFilters.propTypes = DataClearFiltersPropTypes;
export { DataClearFilters };