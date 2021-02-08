import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var lazyTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
var finalLazyPad = 'xlarge';

var LazyDrop = function LazyDrop() {
  var _useState = useState(null),
      pad = _useState[0],
      setPad = _useState[1];

  var topLeftTargetRef = useRef();
  var topRightTargetRef = useRef();
  var bottomLeftTargetRef = useRef();
  var bottomRightTargetRef = useRef();
  useEffect(function () {
    setPad('small');
    setTimeout(function () {
      setPad(finalLazyPad);
    }, 2000);
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: lazyTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    justify: "between",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between",
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    ref: topLeftTargetRef
  }, "Target"), topLeftTargetRef.current && /*#__PURE__*/React.createElement(Drop, {
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: topLeftTargetRef.current,
    responsive: true
  }, /*#__PURE__*/React.createElement(Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align top to bottom")), /*#__PURE__*/React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    ref: topRightTargetRef
  }, "Target"), topRightTargetRef.current && /*#__PURE__*/React.createElement(Drop, {
    align: {
      bottom: 'top',
      right: 'right'
    },
    target: topRightTargetRef.current,
    responsive: true
  }, /*#__PURE__*/React.createElement(Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align bottom to top"))), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    ref: bottomLeftTargetRef
  }, "Target"), bottomLeftTargetRef.current && /*#__PURE__*/React.createElement(Drop, {
    align: {
      bottom: 'top',
      left: 'left'
    },
    target: bottomLeftTargetRef.current,
    responsive: true
  }, /*#__PURE__*/React.createElement(Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align bottom to top")), /*#__PURE__*/React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    ref: bottomRightTargetRef
  }, "Target"), bottomRightTargetRef.current && /*#__PURE__*/React.createElement(Drop, {
    align: {
      top: 'bottom',
      right: 'right'
    },
    target: bottomRightTargetRef.current,
    responsive: true
  }, /*#__PURE__*/React.createElement(Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align top to bottom")))));
};

export var Lazy = function Lazy() {
  return /*#__PURE__*/React.createElement(LazyDrop, null);
};
Lazy.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Drop/Lazy'
};