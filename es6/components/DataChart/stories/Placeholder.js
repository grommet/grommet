import React from 'react';
import { Box, DataChart } from 'grommet';
export var Placeholder = function Placeholder() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataChart, {
      data: [{
        date: '2022-01-02'
      }, {
        date: '2022-02-02'
      }, {
        date: '2022-03-02'
      }],
      series: ['date', 'percent'],
      bounds: {
        y: [0, 100]
      },
      guide: {
        y: {
          granularity: 'medium'
        }
      },
      placeholder: "no data"
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataChart/Placeholder'
};