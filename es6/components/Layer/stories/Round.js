import React from 'react';
import { Box, Button, Grommet, Layer, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
var customTheme = deepMerge(grommet, {
  layer: {
    border: {
      radius: 'large',
      intelligentRounding: true
    }
  }
});
export var RoundLayer = function RoundLayer() {
  var _React$useState = React.useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(),
      position = _React$useState2[0],
      setPosition = _React$useState2[1];

  var _React$useState3 = React.useState(),
      full = _React$useState3[0],
      setFull = _React$useState3[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Layer position",
    options: ['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'right', 'start', 'top', 'top-left', 'top-right'],
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setPosition(option);
    }
  }), /*#__PURE__*/React.createElement(Select, {
    placeholder: "Full",
    options: [{
      label: 'true',
      value: true
    }, {
      label: 'false',
      value: false
    }, {
      label: 'vertical',
      value: 'vertical'
    }, {
      label: 'horizontal',
      value: 'horizontal'
    }],
    labelKey: "label",
    valueKey: {
      key: 'value'
    },
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setFull(option.value);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Open layer",
    onClick: onOpen
  })), open && /*#__PURE__*/React.createElement(Layer, {
    full: full,
    position: position,
    onClickOutside: onClose,
    onEsc: onClose
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: {
      min: 'medium'
    },
    height: {
      min: 'small'
    },
    fill: true
  }, /*#__PURE__*/React.createElement(Button, {
    alignSelf: "end",
    icon: /*#__PURE__*/React.createElement(FormClose, null),
    onClick: onClose
  }), /*#__PURE__*/React.createElement(Text, null, "Hi, I am a Layer!"))));
};
RoundLayer.storyName = 'Border Radius';
RoundLayer.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Layout/Layer/Border Radius'
};