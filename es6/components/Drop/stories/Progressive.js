import React, { useRef, useState } from 'react';
import { Box, Button, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var ProgressiveDrop = function ProgressiveDrop() {
  var boxRef = useRef();
  var innerBoxRef = useRef();

  var _useState = useState(false),
      openDrop = _useState[0],
      setOpenDrop = _useState[1];

  var _useState2 = useState(false),
      openInnerDrop = _useState2[0],
      setOpenInnerDrop = _useState2[1];

  var _useState3 = useState(false),
      interactedWithInnerButton = _useState3[0],
      setInteractedWithInnerButton = _useState3[1];

  var onCloseDrop = function onCloseDrop() {
    setOpenDrop(false);
    setOpenInnerDrop(false);
  };

  var onOpenDrop = function onOpenDrop() {
    setOpenDrop(true);
    setOpenInnerDrop(false);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    ref: boxRef,
    primary: true,
    label: "Click me",
    onClick: onOpenDrop
  }), openDrop && /*#__PURE__*/React.createElement(Drop, {
    target: boxRef.current,
    onClickOutside: onCloseDrop,
    onEsc: onCloseDrop
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    ref: innerBoxRef
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    label: "Click me again",
    onClick: function onClick() {
      return setOpenInnerDrop(true);
    }
  })), openInnerDrop && /*#__PURE__*/React.createElement(Drop, {
    target: innerBoxRef.current,
    onClickOutside: function onClickOutside() {
      return setOpenInnerDrop(false);
    },
    onEsc: function onEsc() {
      return setOpenInnerDrop(false);
    },
    align: {
      top: 'bottom',
      right: 'right'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    label: interactedWithInnerButton ? 'Good job!' : 'You can interact with me',
    onClick: function onClick() {
      return setInteractedWithInnerButton(true);
    }
  }))))));
};

export var Progressive = function Progressive() {
  return /*#__PURE__*/React.createElement(ProgressiveDrop, null);
};
Progressive.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};