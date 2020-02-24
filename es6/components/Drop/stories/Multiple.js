import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Drop, DropButton, Grommet, Layer, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var MultipleDrop = function MultipleDrop() {
  var _useState = useState(false),
      showDrop = _useState[0],
      setShowDrop = _useState[1];

  var _useState2 = useState(false),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var targetRef = useRef();
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(DropButton, {
    label: "drop button",
    dropAlign: {
      right: 'left'
    },
    dropContent: React.createElement(Box, {
      pad: "large"
    }, React.createElement(TextInput, {
      value: "",
      onChange: function onChange() {},
      suggestions: ['one', 'two']
    }))
  }), React.createElement(Button, {
    ref: targetRef,
    label: "button",
    onClick: function onClick() {
      return setShowDrop(true);
    }
  }), showDrop && React.createElement(Drop, {
    align: {
      left: 'right'
    },
    target: targetRef.current,
    onClickOutside: function onClickOutside() {
      return setShowDrop(false);
    }
  }, React.createElement(Box, {
    pad: "large"
  }, React.createElement(TextInput, {
    value: "",
    onChange: function onChange() {},
    suggestions: ['one', 'two']
  }))), React.createElement(Button, {
    label: "layer",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }), showLayer && React.createElement(Layer, {
    position: "left",
    modal: false
  }, React.createElement(Box, {
    pad: "large",
    border: true
  }, React.createElement(TextInput, {
    value: "",
    onChange: function onChange() {},
    suggestions: ['one', 'two']
  })))));
};

storiesOf('Drop', module).add('Multiple', function () {
  return React.createElement(MultipleDrop, null);
});