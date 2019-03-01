"use strict";

exports.__esModule = true;
exports.Digital = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _StyledClock = require("./StyledClock");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Digit =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Digit, _Component);

  function Digit() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  Digit.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var number = nextProps.number;

    if (number !== prevState.number) {
      return {
        previous: prevState.number,
        number: number
      };
    }

    return null;
  };

  var _proto = Digit.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    var previous = this.state.previous;

    if (prevState.previous === undefined && previous !== undefined) {
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this2.setState({
          previous: undefined
        });
      }, 900);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timer);
  };

  _proto.render = function render() {
    /* eslint-disable-next-line react/prop-types */
    var _this$props = this.props,
        run = _this$props.run,
        size = _this$props.size;
    var _this$state = this.state,
        number = _this$state.number,
        previous = _this$state.previous;

    if (previous !== undefined) {
      var direction = run === 'backward' ? 'down' : 'up';
      return _react.default.createElement(_StyledClock.StyledDigitalDigit, {
        size: size
      }, _react.default.createElement(_StyledClock.StyledDigitalPrevious, {
        direction: direction
      }, Math.floor(previous)), _react.default.createElement(_StyledClock.StyledDigitalNext, {
        direction: direction
      }, Math.floor(number)));
    }

    return _react.default.createElement(_StyledClock.StyledDigitalDigit, {
      size: size
    }, Math.floor(number));
  };

  return Digit;
}(_react.Component);

var Element = function Element(_ref) {
  var number = _ref.number,
      run = _ref.run,
      sep = _ref.sep,
      size = _ref.size;
  var tens = Math.floor(number / 10);
  var ones = number % 10;
  var result = [_react.default.createElement(Digit, {
    key: "tens",
    run: run,
    size: size,
    number: tens
  }), _react.default.createElement(Digit, {
    key: "ones",
    run: run,
    size: size,
    number: ones
  })];

  if (sep) {
    result.unshift(_react.default.createElement(_StyledClock.StyledDigitalDigit, {
      key: "sep",
      size: size
    }, ":"));
  }

  return result;
};

var Digital = function Digital(props) {
  var elements = props.elements,
      precision = props.precision,
      run = props.run,
      size = props.size,
      rest = _objectWithoutPropertiesLoose(props, ["elements", "precision", "run", "size"]);

  var seconds;

  if (precision === 'seconds') {
    seconds = _react.default.createElement(Element, {
      number: elements.seconds,
      run: run,
      size: size,
      sep: true
    });
  }

  var minutes;

  if (precision === 'minutes' || precision === 'seconds') {
    minutes = _react.default.createElement(Element, {
      number: elements.minutes,
      run: run,
      size: size,
      sep: true
    });
  }

  return _react.default.createElement(_Box.Box, _extends({
    direction: "row"
  }, rest), _react.default.createElement(Element, {
    number: elements.hours12 || elements.hours,
    run: run,
    size: size
  }), minutes, seconds);
};

exports.Digital = Digital;