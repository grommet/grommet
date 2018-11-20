function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Box, Button, Drop, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { ThemeContext } from 'grommet/contexts';

var SimpleDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleDrop, _Component);

  function SimpleDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "targetRef", createRef());

    return _this;
  }

  var _proto = SimpleDrop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Box, {
      background: "dark-4",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Target"), this.targetRef.current && React.createElement(Drop, {
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.targetRef.current
    }, React.createElement(Box, {
      pad: "large"
    }, "Drop Contents"))));
  };

  return SimpleDrop;
}(Component);

var OneDrop = function OneDrop(_ref) {
  var align = _ref.align,
      target = _ref.target;
  return React.createElement(Drop, {
    align: align,
    target: target,
    stretch: false
  }, React.createElement(Box, {
    pad: "small"
  }));
};

OneDrop.propTypes = {
  align: PropTypes.shape({}).isRequired,
  target: PropTypes.shape({}).isRequired
};

var Set =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(Set, _Component2);

  function Set() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "targetRef", createRef());

    return _this2;
  }

  var _proto2 = Set.prototype;

  _proto2.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto2.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        aligns = _this$props.aligns,
        label = _this$props.label;
    return React.createElement(Box, {
      border: true,
      pad: "small"
    }, React.createElement(Text, null, label), React.createElement(Box, {
      margin: "xlarge",
      background: "dark-4",
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      },
      align: "center",
      justify: "center",
      ref: this.targetRef
    }, "\xA0"), this.targetRef.current && React.createElement(Fragment, null, aligns.map(function (align, index) {
      return React.createElement(OneDrop, {
        key: "" + (index + 0),
        align: align,
        target: _this3.targetRef.current
      });
    })));
  };

  return Set;
}(Component);

Set.propTypes = {
  aligns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string.isRequired
};

var AllDrops =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(AllDrops, _Component3);

  function AllDrops() {
    var _this4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "targetRef", createRef());

    return _this4;
  }

  var _proto3 = AllDrops.prototype;

  _proto3.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto3.render = function render() {
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(ThemeContext.Extend, {
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
    }, React.createElement(Box, {
      direction: "row",
      wrap: true,
      pad: "large",
      align: "center",
      justify: "center"
    }, React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
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
    }), React.createElement(Set, {
      label: "(center vertical and horizontal)",
      aligns: [{}]
    }))));
  };

  return AllDrops;
}(Component);

var ProgressiveDrop =
/*#__PURE__*/
function (_Component4) {
  _inheritsLoose(ProgressiveDrop, _Component4);

  function ProgressiveDrop() {
    var _this5;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this5 = _Component4.call.apply(_Component4, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "boxRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "state", {
      openDrop: false,
      openInnerDrop: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "onCloseDrop", function () {
      return _this5.setState({
        openDrop: false,
        openInnerDrop: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "onOpenDrop", function () {
      return _this5.setState({
        openDrop: true,
        openInnerDrop: false
      });
    });

    return _this5;
  }

  var _proto4 = ProgressiveDrop.prototype;

  _proto4.render = function render() {
    var _this6 = this;

    var _this$state = this.state,
        openDrop = _this$state.openDrop,
        openInnerDrop = _this$state.openInnerDrop;
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Button, {
      ref: this.boxRef,
      primary: true,
      label: "Click me",
      onClick: this.onOpenDrop
    }), openDrop && React.createElement(Drop, {
      target: this.boxRef.current,
      onClickOutside: this.onCloseDrop,
      onEsc: this.onCloseDrop
    }, !openInnerDrop && React.createElement(Box, {
      pad: "large"
    }, React.createElement(Button, {
      primary: true,
      label: "Click me again",
      onClick: function onClick() {
        return _this6.setState({
          openInnerDrop: true
        });
      }
    })), openInnerDrop && React.createElement(Box, {
      pad: "large"
    }, "You can click outside now"))));
  };

  return ProgressiveDrop;
}(Component);

var LazyDrop =
/*#__PURE__*/
function (_Component5) {
  _inheritsLoose(LazyDrop, _Component5);

  function LazyDrop() {
    var _this7;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this7 = _Component5.call.apply(_Component5, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "state", {
      pad: 'small'
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "topTargetRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "bottomTargetRef", createRef());

    return _this7;
  }

  var _proto5 = LazyDrop.prototype;

  _proto5.componentDidMount = function componentDidMount() {
    var _this8 = this;

    this.forceUpdate();
    setTimeout(function () {
      return _this8.setState({
        pad: 'large'
      });
    }, 2000);
  };

  _proto5.render = function render() {
    var pad = this.state.pad;
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "start",
      justify: "between",
      pad: "large"
    }, React.createElement(Box, {
      background: "dark-4",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.topTargetRef
    }, "Target"), this.topTargetRef.current && React.createElement(Drop, {
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.topTargetRef.current,
      responsive: true
    }, React.createElement(Box, {
      pad: pad
    }, "Drop Contents")), React.createElement(Box, {
      alignSelf: "end",
      background: "dark-4",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.bottomTargetRef
    }, "Target"), this.bottomTargetRef.current && React.createElement(Drop, {
      align: {
        top: 'bottom',
        right: 'right'
      },
      target: this.bottomTargetRef.current,
      responsive: true
    }, React.createElement(Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'large',
        vertical: pad
      }
    }, "Drop Contents"))));
  };

  return LazyDrop;
}(Component);

storiesOf('Drop', module).add('Simple', function () {
  return React.createElement(SimpleDrop, null);
}).add('All not stretch', function () {
  return React.createElement(AllDrops, null);
}).add('Progressive', function () {
  return React.createElement(ProgressiveDrop, null);
}).add('Lazy', function () {
  return React.createElement(LazyDrop, null);
});