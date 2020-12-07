import React from 'react';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Box, Grommet, grommet, List, Text, Tip } from 'grommet';
export var data = [{
  city: 'Boise',
  state: 'Idaho'
}, {
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  city: 'Bay Area',
  state: 'California'
}, {
  city: 'San Diego',
  state: 'California'
}];
export var Children = function Children() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    height: "100%",
    align: "center"
  }, /*#__PURE__*/React.createElement(List, {
    data: data,
    pad: "medium",
    border: false
  }, function (datum) {
    return /*#__PURE__*/React.createElement(Tip, {
      content: datum.state,
      dropProps: {
        align: {
          left: 'right'
        }
      }
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row-responsive",
      gap: "medium",
      align: "center"
    }, /*#__PURE__*/React.createElement(Gremlin, {
      size: "large"
    }), /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, datum.city)));
  })));
};