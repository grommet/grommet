import React, { useRef, useState } from 'react';
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
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(DropButton, {
    label: "drop button",
    dropAlign: {
      right: 'left'
    },
    dropContent: /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: "",
      onChange: function onChange() {},
      suggestions: ['one', 'two']
    }))
  }), /*#__PURE__*/React.createElement(Button, {
    ref: targetRef,
    label: "button",
    onClick: function onClick() {
      return setShowDrop(true);
    }
  }), showDrop && /*#__PURE__*/React.createElement(Drop, {
    align: {
      left: 'right'
    },
    target: targetRef.current,
    onClickOutside: function onClickOutside() {
      return setShowDrop(false);
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: "",
    onChange: function onChange() {},
    suggestions: ['one', 'two']
  }))), /*#__PURE__*/React.createElement(Button, {
    label: "layer",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }), showLayer && /*#__PURE__*/React.createElement(Layer, {
    position: "left",
    modal: false
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    border: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: "",
    onChange: function onChange() {},
    suggestions: ['one', 'two']
  })))));
};

export var Multiple = function Multiple() {
  return /*#__PURE__*/React.createElement(MultipleDrop, null);
};
Multiple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Drop/Multiple'
};