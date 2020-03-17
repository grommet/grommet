import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, Grid, Grommet, Layer, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var positions = ['left', 'right', 'top', 'bottom', 'center'];

var TargetLayer = function TargetLayer() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState('small'),
      gutter = _React$useState2[0],
      setGutter = _React$useState2[1];

  var _React$useState3 = React.useState(true),
      modal = _React$useState3[0],
      setModal = _React$useState3[1];

  var _React$useState4 = React.useState(positions[0]),
      position = _React$useState4[0],
      setPosition = _React$useState4[1];

  React.useEffect(function () {
    window.dispatchEvent(new Event('resize'));
    return undefined;
  }, [gutter]);
  var ref = React.useRef();

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Grid, {
    fill: true,
    columns: [gutter, 'flex', gutter],
    rows: [gutter, 'flex', gutter],
    areas: [{
      name: 'main',
      start: [1, 1],
      end: [1, 1]
    }]
  }, React.createElement(Box, {
    ref: ref,
    gridArea: "main",
    fill: true,
    align: "center",
    justify: "center",
    gap: "medium",
    background: "brand"
  }, React.createElement(Select, {
    options: positions,
    value: position,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setPosition(option);
    }
  }), React.createElement(CheckBox, {
    toggle: true,
    label: "modal",
    checked: modal,
    onChange: function onChange() {
      return setModal(!modal);
    }
  }), React.createElement(Button, {
    label: "Open",
    onClick: onOpen
  }))), open && React.createElement(Layer, {
    modal: modal,
    position: position,
    target: ref.current,
    onClickOutside: onClose,
    onEsc: onClose
  }, React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, React.createElement(Button, {
    label: "Toggle gutter size",
    onClick: function onClick() {
      return setGutter(gutter === 'small' ? 'xsmall' : 'small');
    }
  }), React.createElement(Button, {
    label: "Close",
    onClick: onClose
  }))));
};

storiesOf('Layer', module).add('Target', function () {
  return React.createElement(TargetLayer, null);
});