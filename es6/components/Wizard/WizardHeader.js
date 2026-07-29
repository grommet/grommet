var _excluded = ["title", "children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// Header above the progress track. Hosts the close (X) button which
// invokes `cancel` from context.
export var WizardHeader = function WizardHeader(_ref) {
  var _theme$wizard, _headerTheme$title, _headerTheme$close;
  var title = _ref.title,
    children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _React$useContext = React.useContext(MessageContext),
    format = _React$useContext.format;
  var _useWizard = useWizard(),
    cancel = _useWizard.cancel,
    messages = _useWizard.messages;
  var headerTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.header;

  // Custom children override the themed title.
  var content = children !== undefined ? children : title && /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: headerTheme == null || (_headerTheme$title = headerTheme.title) == null ? void 0 : _headerTheme$title.size,
    margin: "none"
  }, title);
  var CloseIcon = headerTheme == null || (_headerTheme$close = headerTheme.close) == null ? void 0 : _headerTheme$close.icon;
  var closeLabel = (messages == null ? void 0 : messages.close) || format({
    id: 'wizard.close'
  }) || 'Close';
  return /*#__PURE__*/React.createElement(Box, _extends({
    pad: headerTheme == null ? void 0 : headerTheme.pad,
    background: headerTheme == null ? void 0 : headerTheme.background,
    border: headerTheme == null ? void 0 : headerTheme.border,
    direction: "row",
    align: "center",
    justify: "between",
    flex: false
  }, rest), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    flex: true
  }, content), /*#__PURE__*/React.createElement(Button, {
    a11yTitle: closeLabel,
    icon: CloseIcon ? /*#__PURE__*/React.createElement(CloseIcon, {
      "aria-hidden": "true"
    }) : undefined,
    onClick: cancel
  }));
};
WizardHeader.displayName = 'WizardHeader';