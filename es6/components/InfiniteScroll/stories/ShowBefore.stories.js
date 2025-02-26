function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, InfiniteScroll, Text } from 'grommet';
var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var Example = function Example(props) {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(InfiniteScroll, _extends({
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
    })
    // </Grommet>
  );
};
export var ShowBefore = function ShowBefore() {
  return /*#__PURE__*/React.createElement(Example, {
    replace: true,
    show: 27
  });
};
ShowBefore.storyName = 'Replace, show before step';
ShowBefore.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Utilities/InfiniteScroll/Replace, show before step'
};