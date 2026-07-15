var _excluded = ["header"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// Header region above the progress track. Always renders so the close
// (X) button is present; X invokes `cancel` from context (caller's
// `onCancel` or, if unset, self-close).
export var WizardHeader = function WizardHeader(_ref) {
  var _headerTheme$title, _headerTheme$title2;
  var header = _ref.header,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _React$useContext = React.useContext(MessageContext),
    format = _React$useContext.format;
  var _useWizard = useWizard(),
    cancel = _useWizard.cancel,
    messages = _useWizard.messages;
  var _ref2 = theme.wizard || {},
    headerTheme = _ref2.header,
    iconTheme = _ref2.icons;
  var resolved = header && typeof header === 'object' && ! /*#__PURE__*/React.isValidElement(header) ? header : null;

  // If caller passed a raw node, just render it inside the themed pad+border.
  var content = resolved ? /*#__PURE__*/React.createElement(React.Fragment, null, resolved.title && /*#__PURE__*/React.createElement(Heading, {
    level: headerTheme == null || (_headerTheme$title = headerTheme.title) == null ? void 0 : _headerTheme$title.level,
    size: headerTheme == null || (_headerTheme$title2 = headerTheme.title) == null ? void 0 : _headerTheme$title2.size,
    margin: "none"
  }, resolved.title), resolved.description && /*#__PURE__*/React.createElement(Text, {
    color: "text-weak"
  }, resolved.description)) : header;
  var CloseIcon = iconTheme == null ? void 0 : iconTheme.close;
  var closeLabel = (messages == null ? void 0 : messages.close) || format({
    id: 'wizard.close'
  }) || 'Close';
  return /*#__PURE__*/React.createElement(Box, _extends({
    pad: headerTheme == null ? void 0 : headerTheme.pad,
    background: headerTheme == null ? void 0 : headerTheme.background,
    border: headerTheme == null ? void 0 : headerTheme.border,
    height: headerTheme == null ? void 0 : headerTheme.height,
    direction: "row",
    align: "center",
    justify: "between",
    flex: false
  }, passThemeFlag, rest), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    flex: true
  }, content), /*#__PURE__*/React.createElement(Button, {
    a11yTitle: closeLabel,
    icon: CloseIcon ? /*#__PURE__*/React.createElement(CloseIcon, {
      "aria-hidden": "true"
    }) : undefined,
    plain: true,
    onClick: cancel
  }));
};
WizardHeader.displayName = 'WizardHeader';

// Consumer variant lets callers place <WizardHeader> as a child without
// having to pass the raw prop. It pulls its content from the current step
// title/description when no explicit header is set. It reads context so it
// stays in sync when the step changes.
export var WizardHeaderConsumer = function WizardHeaderConsumer() {
  var _useWizard2 = useWizard(),
    currentStepObj = _useWizard2.currentStepObj;
  if (!currentStepObj) return null;
  return /*#__PURE__*/React.createElement(WizardHeader, {
    header: {
      title: currentStepObj.title,
      description: currentStepObj.description
    }
  });
};
WizardHeaderConsumer.displayName = 'WizardHeaderConsumer';