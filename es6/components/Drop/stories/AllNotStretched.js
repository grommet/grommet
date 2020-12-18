import React from 'react';
import PropTypes from 'prop-types';
import { Box, Drop, Grommet, Text, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';

var OneDrop = function OneDrop(_ref) {
  var align = _ref.align,
      target = _ref.target;
  return /*#__PURE__*/React.createElement(Drop, {
    align: align,
    target: target,
    stretch: false
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }));
};

OneDrop.propTypes = {
  align: PropTypes.shape({}).isRequired,
  target: PropTypes.shape({}).isRequired
};

var Set = function Set(_ref2) {
  var aligns = _ref2.aligns,
      label = _ref2.label;

  var _React$useState = React.useState(),
      target = _React$useState[0],
      setTarget = _React$useState[1];

  var targetRef = React.useCallback(setTarget, []);
  return /*#__PURE__*/React.createElement(Box, {
    border: true,
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, null, label), /*#__PURE__*/React.createElement(Box, {
    margin: "xlarge",
    background: "dark-3",
    pad: {
      horizontal: 'large',
      vertical: 'medium'
    },
    align: "center",
    justify: "center",
    ref: targetRef
  }, "\xA0"), target && /*#__PURE__*/React.createElement(React.Fragment, null, aligns.map(function (align, index) {
    return /*#__PURE__*/React.createElement(OneDrop // eslint-disable-next-line react/no-array-index-key
    , {
      key: index,
      align: align,
      target: target
    });
  })));
};

Set.propTypes = {
  aligns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string.isRequired
};

var AllDrops = function AllDrops() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: {
      global: {
        drop: {
          background: {
            color: 'white',
            opacity: 'medium'
          }
        }
      }
    }
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    wrap: true,
    pad: "large",
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Set, {
    label: "left: left",
    aligns: [{
      top: 'top',
      left: 'left'
    }, {
      top: 'bottom',
      left: 'left'
    }, {
      bottom: 'top',
      left: 'left'
    }, {
      bottom: 'bottom',
      left: 'left'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "left: right",
    aligns: [{
      top: 'top',
      left: 'right'
    }, {
      top: 'bottom',
      left: 'right'
    }, {
      bottom: 'top',
      left: 'right'
    }, {
      bottom: 'bottom',
      left: 'right'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "(center horizontal)",
    aligns: [{
      top: 'top'
    }, {
      top: 'bottom'
    }, {
      bottom: 'top'
    }, {
      bottom: 'bottom'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "right: left",
    aligns: [{
      top: 'top',
      right: 'left'
    }, {
      top: 'bottom',
      right: 'left'
    }, {
      bottom: 'top',
      right: 'left'
    }, {
      bottom: 'bottom',
      right: 'left'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "right: right",
    aligns: [{
      top: 'top',
      right: 'right'
    }, {
      top: 'bottom',
      right: 'right'
    }, {
      bottom: 'top',
      right: 'right'
    }, {
      bottom: 'bottom',
      right: 'right'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "top: top",
    aligns: [{
      left: 'left',
      top: 'top'
    }, {
      left: 'right',
      top: 'top'
    }, {
      right: 'left',
      top: 'top'
    }, {
      right: 'right',
      top: 'top'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "top: bottom",
    aligns: [{
      left: 'left',
      top: 'bottom'
    }, {
      left: 'right',
      top: 'bottom'
    }, {
      right: 'left',
      top: 'bottom'
    }, {
      right: 'right',
      top: 'bottom'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "(center vertical)",
    aligns: [{
      left: 'left'
    }, {
      left: 'right'
    }, {
      right: 'left'
    }, {
      right: 'right'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "bottom: top",
    aligns: [{
      left: 'left',
      bottom: 'top'
    }, {
      left: 'right',
      bottom: 'top'
    }, {
      right: 'left',
      bottom: 'top'
    }, {
      right: 'right',
      bottom: 'top'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "bottom: bottom",
    aligns: [{
      left: 'left',
      bottom: 'bottom'
    }, {
      left: 'right',
      bottom: 'bottom'
    }, {
      right: 'left',
      bottom: 'bottom'
    }, {
      right: 'right',
      bottom: 'bottom'
    }]
  }), /*#__PURE__*/React.createElement(Set, {
    label: "(center vertical and horizontal)",
    aligns: [{}]
  }))));
};

export var AllNotStretched = function AllNotStretched() {
  return /*#__PURE__*/React.createElement(AllDrops, null);
};
AllNotStretched.story = {
  name: 'All not stretched'
};