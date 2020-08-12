import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Button, Chart, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Next } from "grommet-icons/es6/icons/Next";
import { Previous } from "grommet-icons/es6/icons/Previous";
import { calcs } from '../calcs';
import { generateData } from './data';
var intervalDays = {
  '1 week': 7,
  '30 days': 30,
  '1 year': 365
};

var ZoomChart = function ZoomChart(_ref) {
  var data = _ref.data,
      max = _ref.max;

  var _useState = useState(new Date(data[data.length - 1].time)),
      reference = _useState[0],
      setReference = _useState[1];

  var _useState2 = useState(Object.keys(intervalDays)[1]),
      interval = _useState2[0],
      setInterval = _useState2[1];

  var startDate = new Date(reference);
  startDate.setDate(reference.getDate() - intervalDays[interval]);
  var values = [];
  data.some(function (d) {
    var date = new Date(d.time);

    if (date > reference) {
      return true;
    }

    if (date >= startDate) {
      values.push({
        value: [d.time, d.value]
      });
    }

    return false;
  });

  var _calcs = calcs(values, {
    min: 0,
    max: max
  }),
      axis = _calcs.axis,
      bounds = _calcs.bounds,
      thickness = _calcs.thickness; // calculate next and previous references


  var days = intervalDays[interval];
  var nextReference = new Date(reference);
  nextReference.setDate(reference.getDate() + days);
  var firstReference = new Date(data[data.length - 1].time);

  if (nextReference > firstReference) {
    nextReference = firstReference;
  }

  var previousReference = new Date(reference);
  previousReference.setDate(reference.getDate() - days);
  var lastReference = new Date(data[0].time);
  lastReference.setDate(lastReference.getDate() + days);

  if (previousReference < lastReference) {
    previousReference = lastReference;
  }

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: true,
    icon: /*#__PURE__*/React.createElement(Previous, null),
    onClick: function onClick() {
      return setReference(previousReference);
    }
  }), /*#__PURE__*/React.createElement(Box, {
    flex: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "end"
  }, Object.keys(intervalDays).map(function (_int) {
    return /*#__PURE__*/React.createElement(Button, {
      key: _int,
      onClick: function onClick() {
        return setInterval(_int);
      }
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      color: interval === _int ? 'black' : 'brand'
    }, _int)));
  })), /*#__PURE__*/React.createElement(Stack, {
    guidingChild: "first"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: thickness
    }
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "bar",
    overflow: true,
    bounds: bounds,
    values: values,
    thickness: thickness,
    size: {
      width: 'full',
      height: 'small'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    fill: true,
    justify: "between"
  }, /*#__PURE__*/React.createElement(Box, {
    border: "top",
    align: "start"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall",
    background: {
      color: 'white',
      opacity: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Text, null, axis[1][0]))), /*#__PURE__*/React.createElement(Box, {
    border: "bottom",
    align: "start"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall",
    background: {
      color: 'white',
      opacity: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Text, null, axis[1][1]))))), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between"
  }, axis[0].map(function (t) {
    return /*#__PURE__*/React.createElement(Text, {
      key: t,
      className: "chromatic-ignore"
    }, new Date(t).toLocaleDateString());
  }))), /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: true,
    icon: /*#__PURE__*/React.createElement(Next, null),
    onClick: function onClick() {
      return setReference(nextReference);
    }
  })));
};

storiesOf('Chart', module).add('Zoom', function () {
  return /*#__PURE__*/React.createElement(ZoomChart, {
    data: generateData(1000, 100),
    max: 100
  });
}, {
  chromatic: {
    disable: true
  }
});