"use strict";

exports.__esModule = true;
exports["default"] = exports.LongContent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var _themes = require("../../../themes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
  }, "Scroll this content column. The wizard header at the top and the footer at the bottom stay pinned \u2014 only the middle scrolls. When the `kind` prop is set to `narrow` or `wide`, only this content column narrows; the header and footer still span the full wizard width."), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
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
  var _useState = (0, _react.useState)('full'),
    kind = _useState[0],
    setKind = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    result = _useState2[0],
    setResult = _useState2[1];

  // Custom footer inlines the story's `kind` selector on the left and
  // Previous / Next on the right; styling matches theme.wizard.footer.
  var renderFooter = function renderFooter(_ref2) {
    var previous = _ref2.previous,
      next = _ref2.next,
      complete = _ref2.complete,
      isFirstStep = _ref2.isFirstStep,
      isLastStep = _ref2.isLastStep;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      gap: "small",
      pad: {
        horizontal: 'large',
        vertical: 'none'
      },
      background: "background-front",
      height: "xxsmall",
      flex: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.ResponsiveContext.Consumer, null, function (size) {
      return size === 'small' ? /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        flex: "grow"
      }) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        gap: "small",
        flex: "grow"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        weight: "bold"
      }, "Wizard kind:"), /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
        name: "wizard-kind",
        direction: "row",
        gap: "medium",
        options: ['full', 'narrow', 'wide'],
        value: kind,
        onChange: function onChange(event) {
          return setKind(event.target.value);
        }
      }));
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      gap: "small"
    }, !isFirstStep && /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Previous",
      onClick: previous
    }), isLastStep ? /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Complete",
      primary: true,
      onClick: complete
    }) : /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Next",
      primary: true,
      onClick: next
    })));
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Long content wizard",
    kind: kind,
    header: {
      title: 'Create resource'
    },
    steps: steps,
    footer: renderFooter,
    onComplete: function onComplete(value) {
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
  })));
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Long Content'
};