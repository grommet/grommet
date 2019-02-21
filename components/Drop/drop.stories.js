"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _contexts = require("grommet/contexts");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "targetRef", (0, _react.createRef)());

    return _this;
  }

  var _proto = SimpleDrop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Target"), this.targetRef.current && _react.default.createElement(_grommet.Drop, {
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.targetRef.current
    }, _react.default.createElement(_grommet.Box, {
      pad: "large"
    }, "Drop Contents"))));
  };

  return SimpleDrop;
}(_react.Component);

var OneDrop = function OneDrop(_ref) {
  var align = _ref.align,
      target = _ref.target;
  return _react.default.createElement(_grommet.Drop, {
    align: align,
    target: target,
    stretch: false
  }, _react.default.createElement(_grommet.Box, {
    pad: "small"
  }));
};

OneDrop.propTypes = {
  align: _propTypes.default.shape({}).isRequired,
  target: _propTypes.default.shape({}).isRequired
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "targetRef", (0, _react.createRef)());

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
    return _react.default.createElement(_grommet.Box, {
      border: true,
      pad: "small"
    }, _react.default.createElement(_grommet.Text, null, label), _react.default.createElement(_grommet.Box, {
      margin: "xlarge",
      background: "dark-3",
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      },
      align: "center",
      justify: "center",
      ref: this.targetRef
    }, "\xA0"), this.targetRef.current && _react.default.createElement(_react.Fragment, null, aligns.map(function (align, index) {
      return _react.default.createElement(OneDrop // eslint-disable-next-line react/no-array-index-key
      , {
        key: index,
        align: align,
        target: _this3.targetRef.current
      });
    })));
  };

  return Set;
}(_react.Component);

Set.propTypes = {
  aligns: _propTypes.default.arrayOf(_propTypes.default.shape({})).isRequired,
  label: _propTypes.default.string.isRequired
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "targetRef", (0, _react.createRef)());

    return _this4;
  }

  var _proto3 = AllDrops.prototype;

  _proto3.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto3.render = function render() {
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_contexts.ThemeContext.Extend, {
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
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      wrap: true,
      pad: "large",
      align: "center",
      justify: "center"
    }, _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
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
    }), _react.default.createElement(Set, {
      label: "(center vertical and horizontal)",
      aligns: [{}]
    }))));
  };

  return AllDrops;
}(_react.Component);

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "boxRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "innerBoxRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "state", {
      openDrop: false,
      openInnerDrop: false,
      interactedWithInnerButton: false
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
        openInnerDrop = _this$state.openInnerDrop,
        interactedWithInnerButton = _this$state.interactedWithInnerButton;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      ref: this.boxRef,
      primary: true,
      label: "Click me",
      onClick: this.onOpenDrop
    }), openDrop && _react.default.createElement(_grommet.Drop, {
      target: this.boxRef.current,
      onClickOutside: this.onCloseDrop,
      onEsc: this.onCloseDrop
    }, _react.default.createElement(_grommet.Box, {
      pad: "large",
      ref: this.innerBoxRef
    }, _react.default.createElement(_grommet.Button, {
      primary: true,
      label: "Click me again",
      onClick: function onClick() {
        return _this6.setState({
          openInnerDrop: true
        });
      }
    })), openInnerDrop && _react.default.createElement(_grommet.Drop, {
      target: this.innerBoxRef.current,
      onClickOutside: function onClickOutside() {
        return _this6.setState({
          openInnerDrop: false
        });
      },
      onEsc: function onEsc() {
        return _this6.setState({
          openInnerDrop: false
        });
      },
      align: {
        top: 'bottom',
        right: 'right'
      }
    }, _react.default.createElement(_grommet.Box, {
      pad: "large"
    }, _react.default.createElement(_grommet.Button, {
      primary: true,
      label: interactedWithInnerButton ? 'Good job!' : 'You can interact with me',
      onClick: function onClick() {
        return _this6.setState({
          interactedWithInnerButton: true
        });
      }
    }))))));
  };

  return ProgressiveDrop;
}(_react.Component);

var lazyTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
var finalLazyPad = 'xlarge';

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "topLeftTargetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "topRightTargetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "bottomLeftTargetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "bottomRightTargetRef", (0, _react.createRef)());

    return _this7;
  }

  var _proto5 = LazyDrop.prototype;

  _proto5.componentDidMount = function componentDidMount() {
    var _this8 = this;

    this.forceUpdate();
    setTimeout(function () {
      return _this8.setState({
        pad: finalLazyPad
      });
    }, 2000);
  };

  _proto5.render = function render() {
    var pad = this.state.pad;
    return _react.default.createElement(_grommet.Grommet, {
      theme: lazyTheme,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      justify: "between",
      pad: "large",
      gap: "small"
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      pad: {
        horizontal: 'small'
      }
    }, _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      ref: this.topLeftTargetRef
    }, "Target"), this.topLeftTargetRef.current && _react.default.createElement(_grommet.Drop, {
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.topLeftTargetRef.current,
      responsive: true
    }, _react.default.createElement(_grommet.Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align top to bottom")), _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      ref: this.topRightTargetRef
    }, "Target"), this.topRightTargetRef.current && _react.default.createElement(_grommet.Drop, {
      align: {
        bottom: 'top',
        right: 'right'
      },
      target: this.topRightTargetRef.current,
      responsive: true
    }, _react.default.createElement(_grommet.Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align bottom to top"))), _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "between"
    }, _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      ref: this.bottomLeftTargetRef
    }, "Target"), this.bottomLeftTargetRef.current && _react.default.createElement(_grommet.Drop, {
      align: {
        bottom: 'top',
        left: 'left'
      },
      target: this.bottomLeftTargetRef.current,
      responsive: true
    }, _react.default.createElement(_grommet.Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align bottom to top")), _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      ref: this.bottomRightTargetRef
    }, "Target"), this.bottomRightTargetRef.current && _react.default.createElement(_grommet.Drop, {
      align: {
        top: 'bottom',
        right: 'right'
      },
      target: this.bottomRightTargetRef.current,
      responsive: true
    }, _react.default.createElement(_grommet.Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align top to bottom")))));
  };

  return LazyDrop;
}(_react.Component);

var PlainDrop =
/*#__PURE__*/
function (_Component6) {
  _inheritsLoose(PlainDrop, _Component6);

  function PlainDrop() {
    var _this9;

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    _this9 = _Component6.call.apply(_Component6, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this9)), "targetRef", (0, _react.createRef)());

    return _this9;
  }

  var _proto6 = PlainDrop.prototype;

  _proto6.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto6.render = function render() {
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      background: "brand",
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Target"), this.targetRef.current && _react.default.createElement(_grommet.Drop, {
      plain: true,
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.targetRef.current
    }, _react.default.createElement(_grommet.Box, {
      pad: "large"
    }, "No background no shadow"))));
  };

  return PlainDrop;
}(_react.Component);

(0, _react2.storiesOf)('Drop', module).add('Simple', function () {
  return _react.default.createElement(SimpleDrop, null);
}).add('All not stretch', function () {
  return _react.default.createElement(AllDrops, null);
}).add('Progressive', function () {
  return _react.default.createElement(ProgressiveDrop, null);
}).add('Lazy', function () {
  return _react.default.createElement(LazyDrop, null);
}).add('Plain', function () {
  return _react.default.createElement(PlainDrop, null);
});