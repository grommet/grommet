/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { keyframes } from 'styled-components';
import { Box, DataChart, Grommet, Stack } from 'grommet';
import { grommet } from 'grommet/themes';
export var keyFrameExampleOne = keyframes(["0%{width:200px;background-color:#FFFFFF;}100%{width:0px;background-color:#FFFFFF;}"]);
var AnimatedBox = styled(Box).withConfig({
  displayName: "Prediction__AnimatedBox",
  componentId: "sc-2m8o8b-0"
})(["animation:", " 3s linear;"], keyFrameExampleOne);
var data = [];

for (var i = 0; i < 13; i += 1) {
  var v = -Math.sin(i / 2.0);
  var v2 = Math.cos(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    amount: Math.floor(v * 100),
    need: Math.floor(v2 * 10)
  });
}

for (var _i = 0; _i < 13; _i += 1) {
  var _v = -Math.sin(_i / 2.0);

  var _v2 = Math.cos(_i / 2.0);

  data.push({
    date: "2020-08-" + (_i % 30 + 1).toString().padStart(2, 0),
    amountPredicted: Math.floor(_v * 100),
    needPredicted: Math.floor(_v2 * 10)
  });
}

var Example = function Example() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Stack, {
    anchor: "top-right",
    interactiveChild: "first"
  }, /*#__PURE__*/React.createElement(DataChart, {
    data: data,
    series: ['date', {
      property: 'amount',
      label: 'Amount'
    }, {
      property: 'need',
      label: 'Demand'
    }, {
      property: 'amountPredicted',
      label: 'Predicted Amount'
    }, {
      property: 'needPredicted'
    }],
    chart: [{
      property: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-3',
      opacity: 'medium'
    }, {
      property: 'amount',
      type: 'line',
      thickness: 'xsmall',
      round: true
    }, {
      property: 'amountPredicted',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-3',
      opacity: 'medium'
    }, {
      property: 'amountPredicted',
      type: 'line',
      thickness: 'xsmall',
      round: true,
      dash: true
    }, {
      property: 'amountPredicted',
      type: 'point',
      thickness: 'small',
      point: 'circle'
    }, {
      property: 'amount',
      type: 'point',
      thickness: 'small'
    }, // {
    //   property: 'needPredicted',
    //   type: 'line',
    //   thickness: 'xxsmall',
    //   round: true,
    //   dash: true,
    // },
    {
      property: 'need',
      type: 'line',
      thickness: 'xxsmall',
      dash: true,
      round: true
    }, {
      property: 'need',
      type: 'point',
      thickness: 'small'
    }],
    axis: {
      x: 'date',
      y: {
        property: 'amount',
        granularity: 'medium'
      }
    },
    guide: {
      y: {
        granularity: 'fine'
      },
      x: {
        granularity: 'fine'
      }
    },
    gap: "medium",
    pad: "small",
    legend: true,
    detail: true
  }), /*#__PURE__*/React.createElement(Box, {
    width: "small",
    height: "small",
    border: [{
      side: 'left',
      size: 'medium'
    }],
    background: {
      color: '#FFFFFF',
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement(AnimatedBox, {
    width: "small",
    height: "small"
  }))));
};

storiesOf('DataChart', module).add('Prediction', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});