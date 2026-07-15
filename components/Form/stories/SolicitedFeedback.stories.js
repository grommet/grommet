"use strict";

exports.__esModule = true;
exports["default"] = exports.SolicitedFeedback = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// This example shows a way to perform validation across multiple fields.
var SolicitedFeedback = exports.SolicitedFeedback = function SolicitedFeedback() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium",
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Header, {
      direction: "column",
      align: "start",
      gap: "xxsmall",
      pad: {
        horizontal: 'xxsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, "Let us know how your expirence was!")), /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      },
      validate: "submit",
      kind: "survey"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "star-rating",
      name: "rating",
      label: "Was this content helpful?"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.StarRating, {
      id: "star-rating",
      name: "rating"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "What would have improved your experience",
      htmlFor: "experience",
      name: "experience"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
      options: ['Better UI', 'Accessibility', 'Clear Label', 'Nothing'],
      id: "experience",
      name: "experience"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
      id: "comments",
      name: "comments"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
      align: !['xsmall', 'small'].includes(size) ? 'start' : undefined,
      margin: {
        top: 'medium',
        bottom: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Submit Feedback",
      primary: true,
      type: "submit"
    }))))
    // </Grommet>
  );
};
SolicitedFeedback.storyName = 'Solicited feedback';
var _default = exports["default"] = {
  title: 'Input/Form/Solicited feedback'
};