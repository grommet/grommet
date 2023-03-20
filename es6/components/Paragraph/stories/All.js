import React from 'react';
import { Paragraph } from 'grommet';
var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', '10px'];
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";
export var All = function All() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizes.map(function (size) {
    return /*#__PURE__*/React.createElement(Paragraph, {
      key: size,
      size: size
    }, "Paragraph " + size, paragraphFiller);
  }), /*#__PURE__*/React.createElement(Paragraph, {
    color: "status-critical"
  }, "This is an error message."), /*#__PURE__*/React.createElement(Paragraph, {
    fill: true
  }, "This is a full-width paragraph, using the \"fill\" property:", ' ', paragraphFiller), /*#__PURE__*/React.createElement(Paragraph, {
    dangerouslySetInnerHTML: {
      __html: 'This is a dangerouslySetInnerHTML!'
    }
  }));
};
export default {
  title: 'Type/Paragraph/All'
};