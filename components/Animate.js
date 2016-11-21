'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'animate';

var AnimateChild = function (_Component) {
  (0, _inherits3.default)(AnimateChild, _Component);

  function AnimateChild(props, context) {
    (0, _classCallCheck3.default)(this, AnimateChild);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AnimateChild.__proto__ || (0, _getPrototypeOf2.default)(AnimateChild)).call(this, props, context));

    _this.state = {
      enterClass: '',
      leaveClass: ''
    };
    return _this;
  }

  (0, _createClass3.default)(AnimateChild, [{
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      this.enter(callback);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.enter(callback);
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      this.entered();
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      this.entered();
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      this.leave(callback);
    }
  }, {
    key: 'enter',
    value: function enter(callback) {
      var _props = this.props,
          _props$enter = _props.enter,
          enterAnimation = _props$enter.animation,
          delay = _props$enter.delay,
          leaveAnimation = _props.leave.animation;

      var node = _reactDom2.default.findDOMNode(this);

      var enterClass = enterAnimation;
      var leaveClass = leaveAnimation || enterAnimation;
      this.setState({ enterClass: enterClass });
      this.setState({ leaveClass: leaveClass });

      if (node) {
        node.style.transitionDuration = '';
        node.classList.remove('animate', leaveClass + '--leave');
        node.classList.add(enterClass + '--enter');
        setTimeout(callback, delay || 50);
      }
    }
  }, {
    key: 'entered',
    value: function entered() {
      var duration = this.props.enter.duration;

      var node = _reactDom2.default.findDOMNode(this);
      var enterClass = this.state.enterClass;
      node.classList.remove(enterClass + '--enter');
      if (duration) {
        node.style.transitionDuration = duration + 'ms';
      }
      node.classList.add('animate', enterClass + '--enter-active');
      setTimeout(function () {
        node.style.transitionDuration = '';
        node.classList.remove('animate');
      }, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
    }
  }, {
    key: 'leave',
    value: function leave(callback) {
      var _this2 = this;

      var _props$leave = this.props.leave,
          duration = _props$leave.duration,
          delay = _props$leave.delay;

      var node = _reactDom2.default.findDOMNode(this);

      if (duration) {
        node.style.transitionDuration = duration + 'ms';
      }

      return setTimeout(function () {
        node.classList.remove(_this2.state.enterClass + '--enter-active');
        node.classList.add('animate', _this2.state.leaveClass + '--leave');
        setTimeout(callback, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
      }, delay);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return AnimateChild;
}(_react.Component);

AnimateChild.displayName = 'AnimateChild';
;

AnimateChild.propTypes = {
  enter: _react.PropTypes.shape({
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }),
  leave: _react.PropTypes.shape({
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  })
};

AnimateChild.defaultProps = {
  enter: {},
  leave: {}
};

var Animate = function (_Component2) {
  (0, _inherits3.default)(Animate, _Component2);

  function Animate(props, context) {
    (0, _classCallCheck3.default)(this, Animate);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Animate.__proto__ || (0, _getPrototypeOf2.default)(Animate)).call(this, props, context));

    _this3.state = {
      animationState: 'enter',
      animation: props.enter.animation
    };
    return _this3;
  }

  (0, _createClass3.default)(Animate, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this4 = this;

      var _props2 = this.props,
          visible = _props2.visible,
          keep = _props2.keep;
      var animationState = this.state.animationState;


      if (keep && visible !== nextProps.visible) {
        var state = '';
        if (!nextProps.visible) {
          state = animationState === 'leave' ? 'enter' : 'leave';
        }

        var animateState = nextProps[state] || nextProps.enter;
        this.setState({
          animationState: state,
          animation: state ? animateState.animation : ''
        });

        // Reset animation state back to enter after leave animation is finished
        if (state === 'leave') {
          var node = _reactDom2.default.findDOMNode(this);
          clearTimeout(this.animationTimer);
          this.animationTimer = setTimeout(function () {
            _this4.setState({
              animationState: 'enter',
              animation: nextProps.enter.animation
            });
          }, (parseFloat(getComputedStyle(node).transitionDuration) + parseFloat(getComputedStyle(node).transitionDelay)) * 1000);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          enter = _props3.enter,
          leave = _props3.leave,
          className = _props3.className,
          children = _props3.children,
          component = _props3.component,
          visible = _props3.visible,
          keep = _props3.keep,
          style = _props3.style,
          props = (0, _objectWithoutProperties3.default)(_props3, ['enter', 'leave', 'className', 'children', 'component', 'visible', 'keep', 'style']);


      var animateChildren = _react2.default.Children.map(children, function (child, index) {
        var key = child && child.key ? child.key : 'animate-' + index;
        return _react2.default.createElement(
          AnimateChild,
          {
            key: key,
            enter: enter,
            leave: leave
          },
          child
        );
      });

      var classes = className;
      var styles = (0, _extends3.default)({}, style);
      if (keep) {
        classes = (0, _classnames3.default)(CLASS_ROOT, className, (0, _defineProperty3.default)({}, this.state.animation + '--' + this.state.animationState, !visible));
        styles = (0, _extends3.default)({}, style, {
          transitionDuration: enter.duration + 'ms',
          transitionDelay: enter.delay + 'ms'
        });
      }

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        (0, _extends3.default)({}, props, {
          className: classes,
          component: component || 'div',
          style: styles
        }),
        (visible || visible === undefined || keep) && animateChildren
      );
    }
  }]);
  return Animate;
}(_react.Component);

Animate.displayName = 'Animate';
;

Animate.propTypes = {
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  enter: _react.PropTypes.shape({
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }),
  keep: _react.PropTypes.bool,
  leave: _react.PropTypes.shape({
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }),
  visible: _react.PropTypes.bool
};

exports.default = Animate;
module.exports = exports['default'];