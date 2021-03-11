import React from 'react';
import { Grommet, Tip } from 'grommet';
export var Test = function Test() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: {
      tip: {
        drop: {
          background: 'red',
          elevation: 'large',
          margin: '21px',
          round: 'medium'
        }
      }
    }
  }, /*#__PURE__*/React.createElement(Tip, {
    plain: true,
    content: "tooltip"
  }, "Example"));
};
Test.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Tip/Test'
};