import React from 'react';
import { grommet, Box, Grommet, Spinner } from 'grommet';

var RoundSpinner = function RoundSpinner(_ref) {
  var round = _ref.round;
  return /*#__PURE__*/React.createElement(Spinner, {
    round: round,
    border: false,
    size: "large",
    background: "linear-gradient(to right, #fc466b, #3f5efb)"
  });
};

export var Round = function Round() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "medium",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RoundSpinner, {
    round: false
  }), /*#__PURE__*/React.createElement(RoundSpinner, {
    round: "small"
  }), /*#__PURE__*/React.createElement(RoundSpinner, {
    round: "medium"
  }), /*#__PURE__*/React.createElement(RoundSpinner, {
    round: "full"
  })));
};
Round.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Spinner/Round'
};