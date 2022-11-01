function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Box, InfiniteScroll, Text } from 'grommet';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var Example = function Example(props) {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(InfiniteScroll, _extends({
      items: allItems
    }, props), function (item) {
      return /*#__PURE__*/React.createElement(Box, {
        key: item,
        pad: "medium",
        border: {
          side: 'bottom'
        },
        align: "center"
      }, /*#__PURE__*/React.createElement(Text, null, item));
    }))
    // </Grommet>
  );
};

export var Show = function Show() {
  return /*#__PURE__*/React.createElement(Example, {
    show: 117
  });
};
Show.storyName = 'Show 118th item';
export default {
  title: 'Utilities/InfiniteScroll/Show 118th item'
};