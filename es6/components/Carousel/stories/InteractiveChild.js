import React from 'react';
import { Box, Button, Carousel, Text } from 'grommet';
export var InteractiveSlides = function InteractiveSlides() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Carousel, {
      controls: "arrows",
      height: "medium",
      width: "medium"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "lavender",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "xlarge"
    }, "Slide 1"), /*#__PURE__*/React.createElement(Button, {
      label: "Button"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-3",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "xlarge"
    }, "Slide 2"), /*#__PURE__*/React.createElement(Button, {
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Button"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-5",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "xlarge"
    }, "Slide 3"), /*#__PURE__*/React.createElement(Button, {
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Button"
    }))))
    // </Grommet>
  );
};

InteractiveSlides.storyName = 'Interactive slides';
export default {
  title: 'Media/Carousel/Interactive slides'
};