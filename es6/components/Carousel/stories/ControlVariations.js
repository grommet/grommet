import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Cloud } from "grommet-icons/es6/icons/Cloud";
import { Amazon } from "grommet-icons/es6/icons/Amazon";
import { Box, Carousel, Text } from 'grommet';
export var ControlVariations = function ControlVariations() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      direction: "row",
      gap: "medium",
      pad: "small",
      align: "center",
      justify: "center",
      fill: "horizontal"
    }, /*#__PURE__*/React.createElement(Box, {
      align: "center",
      gap: "small",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "Continuous slides with both arrow and selector controls"), /*#__PURE__*/React.createElement(Carousel, {
      wrap: true,
      height: "medium",
      width: "medium"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-1"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "black"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "brand"
    }, /*#__PURE__*/React.createElement(Cloud, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Amazon, {
      size: "xlarge"
    })))), /*#__PURE__*/React.createElement(Box, {
      gap: "small",
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "With selector controls and initial child set"), /*#__PURE__*/React.createElement(Carousel, {
      height: "medium",
      width: "medium",
      initialChild: 2,
      controls: "selectors"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "pink"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "black"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-2"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-1"
    }, /*#__PURE__*/React.createElement(Cloud, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Amazon, {
      size: "xlarge"
    })))), /*#__PURE__*/React.createElement(Box, {
      align: "center",
      gap: "small",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "With arrow controls and initial child set"), /*#__PURE__*/React.createElement(Carousel, {
      height: "medium",
      width: "medium",
      controls: "arrows",
      initialChild: 3
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "pink"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "black"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-1"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-2"
    }, /*#__PURE__*/React.createElement(Cloud, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Amazon, {
      size: "xlarge"
    })))))
    // </Grommet>
  );
};

ControlVariations.storyName = 'Control variations';
export default {
  title: 'Media/Carousel/Control variations'
};