"use strict";

exports.__esModule = true;
exports["default"] = exports.Modal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _Wizard = require("../Wizard");
var _WizardFooter = require("../WizardFooter");
var _WizardContext = require("../WizardContext");
var _themes = require("../../../themes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// Wizard inside a modal Layer. `onCancel` wires the header X to the
// parent-owned close handler. A custom footer composed via <WizardFooter>
// children preserves the themed shell while omitting the Cancel button.
var NoCancelFooter = function NoCancelFooter() {
  var _useWizard = (0, _WizardContext.useWizard)(),
    isFirstStep = _useWizard.isFirstStep,
    isLastStep = _useWizard.isLastStep,
    canGoNext = _useWizard.canGoNext,
    canGoPrevious = _useWizard.canGoPrevious,
    previous = _useWizard.previous,
    next = _useWizard.next,
    complete = _useWizard.complete;
  return /*#__PURE__*/_react["default"].createElement(_WizardFooter.WizardFooter, null, !isFirstStep && /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Previous",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPrevious, {
      "aria-hidden": "true"
    }),
    disabled: !canGoPrevious,
    onClick: previous
  }), isLastStep ? /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Complete",
    primary: true,
    disabled: !canGoNext,
    onClick: complete
  }) : /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Next",
    primary: true,
    reverse: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNext, {
      "aria-hidden": "true"
    }),
    disabled: !canGoNext,
    onClick: next
  }));
};
var steps = [{
  id: 'details',
  title: 'Details',
  description: 'Enter details for the new resource.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Describe the resource you are creating.");
  }
}, {
  id: 'configure',
  title: 'Configure',
  description: 'Configure options for this resource.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Pick configuration options.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Confirm and create the resource.");
  }
}];
var Modal = exports.Modal = function Modal() {
  var _useState = (0, _react.useState)(false),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = (0, _react.useState)('narrow'),
    kind = _useState2[0],
    setKind = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    result = _useState3[0],
    setResult = _useState3[1];
  var _useState4 = (0, _react.useState)(0),
    resetKey = _useState4[0],
    setResetKey = _useState4[1];
  var close = function close() {
    setOpen(false);
    setResetKey(function (key) {
      return key + 1;
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.ResponsiveContext.Consumer, null, function (size) {
    return size !== 'small' && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "Wizard kind:"), /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
      name: "modal-wizard-kind",
      direction: "row",
      gap: "medium",
      options: ['full', 'narrow', 'wide'],
      value: kind,
      onChange: function onChange(event) {
        return setKind(event.target.value);
      }
    }));
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Open wizard",
    onClick: function onClick() {
      return setOpen(true);
    }
  })), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    modal: true,
    full: kind === 'full',
    position: "center",
    onEsc: close,
    onClickOutside: close
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: kind === 'full',
    width: kind === 'full' ? undefined : 'xlarge',
    height: kind === 'full' ? undefined : 'large'
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    key: resetKey,
    "aria-label": "Modal wizard",
    kind: kind,
    header: {
      title: 'Create resource'
    },
    steps: steps,
    footer: /*#__PURE__*/_react["default"].createElement(NoCancelFooter, null),
    onComplete: function onComplete(value) {
      setResult({
        status: 'complete',
        value: value
      });
      close();
    },
    onCancel: close
  }))), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    message: result.value && Object.keys(result.value).length > 0 ? "Completed: " + JSON.stringify(result.value) : undefined,
    onClose: function onClose() {
      return setResult(null);
    }
  })));
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Modal'
};