"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _object = require("../../../utils/object");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var lazyTheme = (0, _object.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
var finalLazyPad = 'xlarge';

var LazyDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LazyDrop, _Component);

  function LazyDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      pad: 'small'
    });

    _defineProperty(_assertThisInitialized(_this), "topLeftTargetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "topRightTargetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "bottomLeftTargetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "bottomRightTargetRef", (0, _react.createRef)());

    return _this;
  }

  var _proto = LazyDrop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.forceUpdate();
    setTimeout(function () {
      return _this2.setState({
        pad: finalLazyPad
      });
    }, 2000);
  };

  _proto.render = function render() {
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

(0, _react2.storiesOf)('Drop', module).add('Lazy', function () {
  return _react.default.createElement(LazyDrop, null);
});