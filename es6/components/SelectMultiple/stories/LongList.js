import React from 'react';
import { Box, SelectMultiple } from 'grommet';
var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});
export var LongList = function LongList() {
  var _React$useState = React.useState([]),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  var _React$useState2 = React.useState(dummyOptions.slice(0, 200)),
    options = _React$useState2[0],
    setOptions = _React$useState2[1];
  var onMore = function onMore() {
    setTimeout(function () {
      setOptions(dummyOptions.slice(0, options.length + 200));
    }, 1000);
  };
  var onChange = function onChange(_ref) {
    var nextSelected = _ref.value;
    return setSelected(nextSelected);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(SelectMultiple, {
      showSelectedInline: true,
      placeholder: "select an option...",
      value: selected,
      options: options,
      dropHeight: "medium",
      onMore: onMore,
      onChange: onChange
    }))
    // </Grommet>
  );
};

LongList.storyName = 'Long list';
LongList.parameters = {
  chromatic: {
    disable: true
  }
};
LongList.args = {
  full: true
};
export default {
  title: 'Input/SelectMultiple/Long list'
};