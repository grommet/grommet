import React from 'react';
import { Box, List } from 'grommet';
var data = [];
for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}
export var Selection = function Selection() {
  var _ref;
  var _React$useState = React.useState(),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(List, {
    "aria-label": "selection list",
    data: data.slice(0, 10),
    itemProps: selected >= 0 ? (_ref = {}, _ref[selected] = {
      background: 'brand'
    }, _ref) : undefined,
    onClickItem: function onClickItem(event) {
      return setSelected(selected === event.index ? undefined : event.index);
    }
  }));
};
export default {
  title: 'Visualizations/List/Selection'
};