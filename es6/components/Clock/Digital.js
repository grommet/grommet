function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { Box } from '../Box';
import { StyledDigitalDigit, StyledDigitalNext, StyledDigitalPrevious } from './StyledClock';

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
      return React.createElement(StyledDigitalDigit, {
        size: size
      }, React.createElement(StyledDigitalPrevious, {
        direction: direction
      }, Math.floor(previous)), React.createElement(StyledDigitalNext, {
        direction: direction
      }, Math.floor(number)));
    }

    return React.createElement(StyledDigitalDigit, {
      size: size
    }, Math.floor(number));
  };

  return Digit;
}(Component);

var Element = function Element(_ref) {
  var number = _ref.number,
      run = _ref.run,
      sep = _ref.sep,
      size = _ref.size;
  var tens = Math.floor(number / 10);
  var ones = number % 10;
  var result = [React.createElement(Digit, {
    key: "tens",
    run: run,
    size: size,
    number: tens
  }), React.createElement(Digit, {
    key: "ones",
    run: run,
    size: size,
    number: ones
  })];

  if (sep) {
    result.unshift(React.createElement(StyledDigitalDigit, {
      key: "sep",
      size: size
    }, ":"));
  }

  return result;
};

export var Digital = function Digital(props) {
  var elements = props.elements,
      precision = props.precision,
      run = props.run,
      size = props.size,
      rest = _objectWithoutPropertiesLoose(props, ["elements", "precision", "run", "size"]);

  var seconds;

  if (precision === 'seconds') {
    seconds = React.createElement(Element, {
      number: elements.seconds,
      run: run,
      size: size,
      sep: true
    });
  }

  var minutes;

  if (precision === 'minutes' || precision === 'seconds') {
    minutes = React.createElement(Element, {
      number: elements.minutes,
      run: run,
      size: size,
      sep: true
    });
  }

  return React.createElement(Box, _extends({
    direction: "row"
  }, rest), React.createElement(Element, {
    number: elements.hours12 || elements.hours,
    run: run,
    size: size
  }), minutes, seconds);
};