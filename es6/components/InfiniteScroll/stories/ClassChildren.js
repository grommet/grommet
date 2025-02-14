function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, InfiniteScroll, Text } from 'grommet';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var MyItem = function MyItem(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    border: {
      side: 'bottom'
    },
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, null, item));
};
export var ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(InfiniteScroll, _extends({
      items: allItems
    }, props), function (item) {
      return /*#__PURE__*/React.createElement(MyItem, {
        key: item,
        item: item
      });
    }))
    // </Grommet>
  );
};
ClassChildrenInfiniteScroll.storyName = 'Class children';
export default {
  title: 'Utilities/InfiniteScroll/Class children'
};