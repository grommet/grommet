import React from 'react';
import { Grid } from 'grommet';
import { Cards } from '../Cards';
var data = [];
for (var i = 0; i < 95; i += 1) {
  data.push("item " + (i + 1));
}
export var Paginated = function Paginated() {
  return /*#__PURE__*/React.createElement(Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Cards, {
    data: data,
    step: 9,
    show: {
      page: 7
    },
    paginate: true
  }));
};
export default {
  title: 'Visualizations/Cards/Paginated'
};