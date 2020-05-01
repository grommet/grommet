import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes'; // DSTCalendar has dates specifically chosen to identify issues with
// crossing the daylight savings time boundary (from California).

var DSTCalendar = function DSTCalendar() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    direction: "row",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    border: "right"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xlarge"
  }, "Daylight MST"), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: "2018-11-04T06:00:00.000Z",
    bounds: ['2013-11-06', '2018-12-06']
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: "2019-03-11T05:00:01.409Z",
    bounds: ['2019-03-01', '2019-03-31']
  }))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xlarge"
  }, "Daylight PST"), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: "2018-11-04T07:00:00.000Z",
    bounds: ['2013-11-06', '2018-12-06']
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: "2019-03-15T06:00:01.409Z",
    bounds: ['2019-03-01', '2019-03-31']
  })))));
};

storiesOf('Calendar', module).add('Daylight Savings Time', function () {
  return /*#__PURE__*/React.createElement(DSTCalendar, null);
});