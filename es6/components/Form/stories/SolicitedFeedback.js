import React, { useContext } from 'react';
import { Box, Button, Form, FormField, Footer, TextArea, Header, Heading, StarRating, RadioButtonGroup, ResponsiveContext } from 'grommet';

// This example shows a way to perform validation across multiple fields.
export var SolicitedFeedback = function SolicitedFeedback() {
  var size = useContext(ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large",
      gap: "medium",
      width: "medium"
    }, /*#__PURE__*/React.createElement(Header, {
      direction: "column",
      align: "start",
      gap: "xxsmall",
      pad: {
        horizontal: 'xxsmall'
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, "Let us know how your expirence was!")), /*#__PURE__*/React.createElement(Form, {
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      },
      validate: "submit",
      kind: "survey"
    }, /*#__PURE__*/React.createElement(FormField, {
      htmlFor: "star-rating",
      name: "rating",
      label: "Was this content helpful?"
    }, /*#__PURE__*/React.createElement(StarRating, {
      id: "star-rating",
      name: "rating"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "What would have improved your experience",
      htmlFor: "experience",
      name: "experience"
    }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      options: ['Better UI', 'Accessibility', 'Clear Label', 'Nothing'],
      id: "experience",
      name: "experience"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/React.createElement(TextArea, {
      id: "comments",
      name: "comments"
    })), /*#__PURE__*/React.createElement(Footer, {
      align: !['xsmall', 'small'].includes(size) ? 'start' : undefined,
      margin: {
        top: 'medium',
        bottom: 'small'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Submit Feedback",
      primary: true,
      type: "submit"
    }))))
    // </Grommet>
  );
};

SolicitedFeedback.storyName = 'Solicited feedback';
export default {
  title: 'Input/Form/Solicited feedback'
};