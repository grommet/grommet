import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart, Keyboard, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { calcs } from '../calcs';
import { generateData } from './data';

var ScanChart = function ScanChart(props) {
  var _useState = useState(undefined),
      active = _useState[0],
      setActive = _useState[1];

  var data = props.data,
      max = props.max;
  var values = data.map(function (d) {
    return [d.time, d.value];
  });

  var _useMemo = useMemo(function () {
    return calcs(values, {
      min: 0,
      max: max
    });
  }, [values, max]),
      axis = _useMemo.axis,
      bounds = _useMemo.bounds,
      pad = _useMemo.pad,
      thickness = _useMemo.thickness;

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Keyboard, {
    onLeft: function onLeft() {
      return setActive(Math.max(0, active - 1));
    },
    onRight: function onRight() {
      return setActive(Math.min(data.length - 1, active + 1));
    },
    onEsc: function onEsc() {
      return setActive(undefined);
    }
  }, React.createElement(Box, {
    tabIndex: "0",
    direction: "row",
    margin: "large"
  }, React.createElement(Box, {
    width: "xxsmall"
  }, React.createElement(Box, {
    flex: true,
    justify: "between"
  }, React.createElement(Box, {
    border: "top",
    align: "end"
  }, React.createElement(Box, {
    pad: "xsmall",
    background: {
      color: 'white',
      opacity: 'medium'
    }
  }, React.createElement(Text, null, axis[1][0]))), React.createElement(Box, {
    border: "bottom",
    align: "end"
  }, React.createElement(Box, {
    pad: "xsmall",
    background: {
      color: 'white',
      opacity: 'medium'
    }
  }, React.createElement(Text, null, axis[1][1])))), React.createElement(Box, {
    height: "xxsmall",
    flex: false
  })), React.createElement(Box, {
    width: "large"
  }, React.createElement(Stack, {
    guidingChild: "first"
  }, React.createElement(Box, {
    pad: {
      horizontal: pad
    }
  }, React.createElement(Chart, {
    type: "bar",
    overflow: true,
    bounds: bounds,
    values: values,
    thickness: thickness,
    size: {
      width: 'full',
      height: 'small'
    }
  })), React.createElement(Box, {
    fill: true,
    direction: "row",
    justify: "between"
  }, values.map(function (v, i) {
    return React.createElement(Box, {
      flex: false,
      key: v[0]
    }, React.createElement(Stack, {
      fill: true,
      anchor: "center",
      interactiveChild: "first"
    }, React.createElement(Box, {
      fill: true,
      pad: pad,
      background: active === i ? {
        color: 'dark-5',
        opacity: 'medium'
      } : undefined,
      onMouseOver: function onMouseOver() {
        return setActive(i);
      },
      onMouseOut: function onMouseOut() {
        return setActive(undefined);
      },
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }), active === i && React.createElement(Box, {
      animation: {
        type: 'fadeIn',
        duration: 100
      },
      width: "xsmall",
      pad: "small",
      round: "small",
      background: "dark-3"
    }, React.createElement(Text, {
      size: "large"
    }, data[active].value), React.createElement(Text, {
      className: "chromatic-ignore",
      size: "small"
    }, new Date(data[active].time).toLocaleDateString()))));
  }))), React.createElement(Box, {
    height: "xxsmall",
    direction: "row",
    justify: "between",
    align: "center"
  }, axis[0].map(function (t) {
    return React.createElement(Text, {
      className: "chromatic-ignore",
      key: t
    }, new Date(t).toLocaleDateString());
  }))))));
};

storiesOf('Chart', module).add('Scan', function () {
  return React.createElement(ScanChart, {
    data: generateData(30, 100),
    max: 100
  });
});