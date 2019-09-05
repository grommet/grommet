import React from 'react';
import { storiesOf } from '@storybook/react';
import { Trash } from "grommet-icons/es6/icons/Trash";
import { Box, Button, Grommet, Heading, Layer, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var CenterLayer = function CenterLayer() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(),
      open2 = _React$useState2[0],
      setOpen2 = _React$useState2[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  var onOpen2 = function onOpen2() {
    return setOpen2(true);
  };

  var onClose2 = function onClose2() {
    return setOpen2(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Trash, null),
    label: React.createElement(Text, null, React.createElement("strong", null, "Remove")),
    onClick: onOpen,
    plain: true
  })), open && React.createElement(Layer, {
    position: "center",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Confirm"), React.createElement(Text, null, "Are you sure you want to delete?"), React.createElement(Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, React.createElement(Button, {
    label: "Open 2",
    onClick: onOpen2,
    color: "dark-3"
  }), React.createElement(Button, {
    label: React.createElement(Text, {
      color: "white"
    }, React.createElement("strong", null, "Delete")),
    onClick: onClose,
    primary: true,
    color: "status-critical"
  })))), open2 && React.createElement(Layer, {
    position: "top",
    modal: true,
    onClickOutside: onClose2,
    onEsc: onClose2
  }, React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Confirm 2"), React.createElement(Select, {
    options: ['one', 'two', 'three']
  }), React.createElement(Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, React.createElement(Button, {
    label: "Close",
    onClick: onClose2,
    color: "dark-3"
  })))));
};

storiesOf('Layer', module).add('Center', function () {
  return React.createElement(CenterLayer, null);
});