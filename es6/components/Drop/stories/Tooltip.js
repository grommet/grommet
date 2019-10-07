import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var TooltipDrop = function TooltipDrop() {
  var _useState = useState(),
      over = _useState[0],
      setOver = _useState[1];

  var ref = useRef();
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    label: "Button",
    ref: ref,
    onMouseOver: function onMouseOver() {
      return setOver(true);
    },
    onMouseOut: function onMouseOut() {
      return setOver(false);
    },
    onFocus: function onFocus() {},
    onBlur: function onBlur() {}
  }), ref.current && over && React.createElement(Drop, {
    align: {
      left: 'right'
    },
    target: ref.current,
    plain: true
  }, React.createElement(Box, {
    margin: "xsmall",
    pad: "small",
    background: "dark-3",
    round: {
      size: 'medium',
      corner: 'left'
    }
  }, "tooltip contents"))));
};

storiesOf('Drop', module).add('Tooltip', function () {
  return React.createElement(TooltipDrop, null);
});