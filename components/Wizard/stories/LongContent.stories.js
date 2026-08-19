"use strict";

exports.__esModule = true;
exports["default"] = exports.LongContent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Long-content step demonstrating that the wizard header, stepper, and
// footer remain in place while the content column scrolls internally.
// Uses form fields plus a big block of prose so vertical space is
// clearly exceeded on typical viewports.
var LongStepBody = function LongStepBody(_ref) {
  var heading = _ref.heading,
    _ref$count = _ref.count,
    count = _ref$count === void 0 ? 40 : _ref$count;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: {
      vertical: 'none'
    }
  }, heading), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    fill: true
  }, "Scroll this content column. The wizard header at the top and the footer at the bottom stay pinned \u2014 only the middle scrolls."), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Name",
    htmlFor: "long-content-name"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "long-content-name",
    placeholder: "Your name"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Notes",
    htmlFor: "long-content-notes"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    id: "long-content-notes",
    rows: 4,
    placeholder: "Notes\u2026"
  })), Array.from({
    length: count
  }).map(function (_, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_grommet.Paragraph, {
        key: index,
        fill: true
      }, "Filler paragraph " + (index + 1) + ". This wizard example intentionally\n          renders a lot of content so the scroll behavior is visible in\n          Storybook. Long-form documentation, review screens, and\n          confirmation lists commonly exceed the viewport height and\n          need the middle column to scroll while the primary\n          navigation stays visible.")
    );
  }));
};

// Step data intentionally omits `description` so the stepper shows
// only the step titles; the descriptive text is rendered instead as
// the content heading inside the white card via LongStepBody.
var steps = [{
  id: 'details',
  title: 'Details',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(LongStepBody, {
      heading: "Enter details for the new resource"
    });
  }
}, {
  id: 'configure',
  title: 'Configure',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(LongStepBody, {
      heading: "Configure options for this resource",
      count: 30
    });
  }
}, {
  id: 'review',
  title: 'Review',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(LongStepBody, {
      heading: "Review and finish",
      count: 60
    });
  }
}];
var LongContent = exports.LongContent = function LongContent() {
  var _useState = (0, _react.useState)(null),
    result = _useState[0],
    setResult = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Long content wizard",
    title: "Create resource",
    showProgress: "horizontal",
    steps: steps,
    onComplete: function onComplete(_ref2) {
      var value = _ref2.value;
      return setResult({
        status: 'complete',
        value: value
      });
    }
  }), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
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
LongContent.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Long Content'
};