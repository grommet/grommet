"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
function (_Component) {
  _inheritsLoose(Set, _Component);

  function Set() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "targetRef", (0, _react.createRef)());

    return _this;
  }

  var _proto = Set.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    var _this2 = this;

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
        target: _this2.targetRef.current
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
function (_Component2) {
  _inheritsLoose(AllDrops, _Component2);

  function AllDrops() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "targetRef", (0, _react.createRef)());

    return _this3;
  }

  var _proto2 = AllDrops.prototype;

  _proto2.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto2.render = function render() {
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.ThemeContext.Extend, {
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

(0, _react2.storiesOf)('Drop', module).add('All not stretch', function () {
  return _react.default.createElement(AllDrops, null);
});