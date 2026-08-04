"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// Controlled Wizard: parent owns currentStep and reacts to onStepChange.
var steps = [{
  id: 'one',
  title: 'One',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step one.");
  }
}, {
  id: 'two',
  title: 'Two',
  skippable: true,
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step two.");
  }
}, {
  id: 'three',
  title: 'Three',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step three.");
  }
}];
var Controlled = exports.Controlled = function Controlled() {
  var _useState = (0, _react.useState)('one'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    resetKey = _useState3[0],
    setResetKey = _useState3[1];
  var _useState4 = (0, _react.useState)(false),
    confirmCancel = _useState4[0],
    setConfirmCancel = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    wizardOpen = _useState5[0],
    setWizardOpen = _useState5[1];
  var handleCancel = function handleCancel() {
    setConfirmCancel(true);
  };
  var confirmCancelYes = function confirmCancelYes() {
    setConfirmCancel(false);
    setResult(null);
    setCurrentStep('one');
    setResetKey(function (key) {
      return key + 1;
    });
    setWizardOpen(false);
  };
  var confirmCancelNo = function confirmCancelNo() {
    setConfirmCancel(false);
  };
  var reopenWizard = function reopenWizard() {
    setWizardOpen(true);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, wizardOpen ? /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    key: resetKey,
    "aria-label": "Controlled wizard",
    title: "Configure workspace",
    showProgress: "horizontal",
    steps: steps,
    currentStep: currentStep,
    onStepChange: function onStepChange(event) {
      if (event.phase === 'navigated' && event.to) {
        setCurrentStep(event.to);
      }
    },
    onComplete: function onComplete(_ref) {
      var value = _ref.value;
      return setResult({
        status: 'complete',
        value: value
      });
    },
    onCancel: handleCancel
  }) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Reopen wizard",
    onClick: reopenWizard
  })), confirmCancel && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    modal: true,
    position: "center",
    onEsc: confirmCancelNo,
    onClickOutside: confirmCancelNo
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "medium",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none"
  }, "Cancel wizard?"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: "none"
  }, "Are you sure you want to cancel? Your progress will be lost."), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "end",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Keep editing",
    onClick: confirmCancelNo
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Yes, cancel",
    primary: true,
    color: "status-critical",
    onClick: confirmCancelYes
  })))), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    message: result.value && Object.keys(result.value).length > 0 ? "Completed: " + JSON.stringify(result.value) : undefined,
    onClose: function onClose() {
      return setResult(null);
    }
  }));
};
Controlled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Controlled'
};