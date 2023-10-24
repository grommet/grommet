import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Form, Layer, FormField, Footer, Text, TextArea, Header, Heading, ThumbsRating, ResponsiveContext } from 'grommet';

// create a floating button for story example
// temp fix until this theme issue is resolved:
// https://github.com/grommet/grommet-theme-hpe/issues/283
var PositionedFeedbackButton = styled(Button).withConfig({
  displayName: "UnsolicitedFeedback__PositionedFeedbackButton",
  componentId: "sc-5qlys5-0"
})(["position:fixed;bottom:0px;border-radius:6px;right:0px;z-index:10;color:", ";"], function (props) {
  return props.theme.global.colors['text-strong'].dark;
});

// This example shows a way to perform validation across multiple fields.
export var UnSolicitedFeedback = function UnSolicitedFeedback() {
  var size = useContext(ResponsiveContext);
  var _useState = useState(false),
    isSuccessful = _useState[0],
    setIsSuccessful = _useState[1];
  var _useState2 = useState(false),
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
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PositionedFeedbackButton, {
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
    }), open && /*#__PURE__*/React.createElement(Layer, {
      onClickOutside: onClose,
      onEsc: onClose
    }, /*#__PURE__*/React.createElement(Box, {
      fill: "vertical",
      overflow: "auto",
      width: !['xsmall', 'small'].includes(size) ? 'medium' : undefined,
      pad: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Header, {
      direction: "column",
      align: "start",
      gap: "xxsmall",
      pad: {
        horizontal: 'xxsmall'
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 4,
      size: "small",
      margin: "none"
    }, "Let us know how your expirence was!")), /*#__PURE__*/React.createElement(Box
    // Padding used to prevent focus from being cutoff
    , {
      pad: {
        horizontal: 'xxsmall'
      }
    }, /*#__PURE__*/React.createElement(Form, {
      method: "post",
      validate: "submit",
      kind: "survey",
      onSubmit: function onSubmit(value) {
        console.log('submit', value);
        setIsSuccessful(true);
        closeFeedbackModal();
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      htmlFor: "thumbs-rating",
      name: "rating",
      label: "Was this content helpful?"
    }, /*#__PURE__*/React.createElement(ThumbsRating, {
      id: "thumbs-rating",
      name: "rating"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/React.createElement(TextArea, {
      id: "comments",
      name: "comments"
    })), !isSuccessful ? /*#__PURE__*/React.createElement(Footer, {
      margin: {
        top: 'medium',
        bottom: 'small'
      },
      direction: "row",
      justify: "end",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: onClose,
      label: "Cancel"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Submit Feedback",
      primary: true,
      type: "submit"
    })) : /*#__PURE__*/React.createElement(Footer, {
      margin: {
        top: 'medium',
        bottom: 'small'
      },
      align: "end"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "large"
    }, "Thank you for your response!")))))))
    // </Grommet>
  );
};

UnSolicitedFeedback.storyName = 'UnSolicited feedback';
UnSolicitedFeedback.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/Form/UnSolicited feedback'
};