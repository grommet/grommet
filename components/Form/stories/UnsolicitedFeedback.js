"use strict";

exports.__esModule = true;
exports["default"] = exports.UnSolicitedFeedback = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// create a floating button for story example
// temp fix until this theme issue is resolved:
// https://github.com/grommet/grommet-theme-hpe/issues/283
var PositionedFeedbackButton = (0, _styledComponents["default"])(_grommet.Button).withConfig({
  displayName: "UnsolicitedFeedback__PositionedFeedbackButton",
  componentId: "sc-5qlys5-0"
})(["position:fixed;bottom:0px;border-radius:6px;right:0px;z-index:10;color:", ";"], function (props) {
  return props.theme.global.colors['text-strong'].dark;
});

// This example shows a way to perform validation across multiple fields.
var UnSolicitedFeedback = function UnSolicitedFeedback() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  var _useState = (0, _react.useState)(false),
    isSuccessful = _useState[0],
    setIsSuccessful = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    open = _useState2[0],
    setOpen = _useState2[1];
  var onOpen = function onOpen() {
    return setOpen(true);
  };
  var onClose = function onClose() {
    return setOpen(undefined);
  };
  var closeFeedbackModal = function closeFeedbackModal() {
    setTimeout(function () {
      setOpen(false);
      setIsSuccessful(false);
    }, 2000);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(PositionedFeedbackButton, {
      onClick: onOpen,
      margin: {
        vertical: 'medium',
        horizontal: 'medium'
      },
      elevation: "large",
      color: "brand",
      label: "Submit Feedback",
      a11yTitle: "This button launches a modal to give feedback.",
      primary: true,
      alignSelf: "start"
    }), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
      onClickOutside: onClose,
      onEsc: onClose
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: "vertical",
      overflow: "auto",
      width: !['xsmall', 'small'].includes(size) ? 'medium' : undefined,
      pad: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Header, {
      direction: "column",
      align: "start",
      gap: "xxsmall",
      pad: {
        horizontal: 'xxsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 4,
      size: "small",
      margin: "none"
    }, "Let us know how your expirence was!")), /*#__PURE__*/_react["default"].createElement(_grommet.Box
    // Padding used to prevent focus from being cutoff
    , {
      pad: {
        horizontal: 'xxsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      method: "post",
      validate: "submit",
      kind: "survey",
      onSubmit: function onSubmit(value) {
        console.log('submit', value);
        setIsSuccessful(true);
        closeFeedbackModal();
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "thumbs-rating",
      name: "rating",
      label: "Was this content helpful?"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.ThumbsRating, {
      id: "thumbs-rating",
      name: "rating"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
      id: "comments",
      name: "comments"
    })), !isSuccessful ? /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
      margin: {
        top: 'medium',
        bottom: 'small'
      },
      direction: "row",
      justify: "end",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      onClick: onClose,
      label: "Cancel"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Submit Feedback",
      primary: true,
      type: "submit"
    })) : /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
      margin: {
        top: 'medium',
        bottom: 'small'
      },
      align: "end"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "large"
    }, "Thank you for your response!")))))))
    // </Grommet>
  );
};
exports.UnSolicitedFeedback = UnSolicitedFeedback;
UnSolicitedFeedback.storyName = 'UnSolicited feedback';
UnSolicitedFeedback.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/Form/UnSolicited feedback'
};
exports["default"] = _default;