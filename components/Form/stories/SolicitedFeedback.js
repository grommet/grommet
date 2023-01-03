"use strict";

exports.__esModule = true;
exports["default"] = exports.SolicitedFeedback = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// This example shows a way to perform validation across multiple fields.
var SolicitedFeedback = function SolicitedFeedback() {
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
exports.SolicitedFeedback = SolicitedFeedback;
SolicitedFeedback.storyName = 'Solicited feedback';
var _default = {
  title: 'Input/Form/Solicited feedback'
};
exports["default"] = _default;