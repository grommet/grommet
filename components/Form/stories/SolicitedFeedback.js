"use strict";

exports.__esModule = true;
exports["default"] = exports.SolicitedFeedback = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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