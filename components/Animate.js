'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactTransitionGroup = require('react-transition-group');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _DOM = require('../utils/DOM');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ANIMATE;

var AnimateChild = function (_Component) {
  _inherits(AnimateChild, _Component);

  function AnimateChild(props, context) {
    _classCallCheck(this, AnimateChild);

    var _this = _possibleConstructorReturn(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).call(this, props, context));

    var enter = props.enter,
        leave = props.leave;
    // leave will reuse enter if leave is not defined

    _this.state = {
      enter: enter,
      leave: leave || enter,
      state: 'inactive'
    };
    return _this;
  }

  _createClass(AnimateChild, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var enter = nextProps.enter,
          leave = nextProps.leave;

      this.setState({ enter: enter, leave: leave || enter });
      if (nextProps.visible !== this.props.visible) {
        var _ref = nextProps.visible ? ['enter', 'active'] : ['leave', 'inactive'],
            _ref2 = _slicedToArray(_ref, 2),
            nextState = _ref2[0],
            lastState = _ref2[1];

        this._delay(nextState, this._done.bind(this, lastState));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = undefined;
      }
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      if (true === this.props.visible) {
        this._delay('enter', callback);
      }
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      if (true === this.props.visible) {
        this._delay('enter', callback);
      }
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      this._done('active');
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      this._done('active');
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      this._delay('leave', callback);
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave(callback) {
      this._done('inactive');
    }
  }, {
    key: '_delay',
    value: function _delay(state, callback) {
      var delay = this.state[state].delay;
      // ensure we start out inactive in case we aren't being kept in the DOM

      if ('enter' === state) {
        this.setState({ state: 'inactive ' });
      }
      clearTimeout(this._timer);
      this._timer = setTimeout(this._start.bind(this, state, callback), delay || 1);
    }
  }, {
    key: '_start',
    value: function _start(state, callback) {
      var duration = this.state[state].duration;

      this.setState({ state: state });
      this._timer = setTimeout(callback, duration);
    }
  }, {
    key: '_done',
    value: function _done(state) {
      this.setState({ state: state });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state,
          enter = _state.enter,
          leave = _state.leave,
          state = _state.state;

      var animation = (this.state[state] || this.state.enter).animation;
      var className = (0, _classnames2.default)(CLASS_ROOT + '__child', CLASS_ROOT + '__child--' + animation, CLASS_ROOT + '__child--' + state);
      var duration = 'enter' === state || 'inactive' === state ? enter.duration : leave.duration;
      var style = { transitionDuration: (duration || 0) + 'ms' };
      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        children
      );
    }
  }]);

  return AnimateChild;
}(_react.Component);

AnimateChild.displayName = 'AnimateChild';


AnimateChild.propTypes = {
  enter: _propTypes2.default.shape({
    animation: _propTypes2.default.string,
    duration: _propTypes2.default.number,
    delay: _propTypes2.default.number
  }).isRequired,
  leave: _propTypes2.default.shape({
    animation: _propTypes2.default.string,
    duration: _propTypes2.default.number,
    delay: _propTypes2.default.number
  }),
  visible: _propTypes2.default.bool
};

AnimateChild.defaultProps = {
  visible: false
};

var Animate = function (_Component2) {
  _inherits(Animate, _Component2);

  function Animate(props, context) {
    _classCallCheck(this, Animate);

    var _this2 = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props, context));

    _this2._checkScroll = _this2._checkScroll.bind(_this2);
    _this2.state = { visible: true === props.visible };
    return _this2;
  }

  _createClass(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if ('scroll' === this.props.visible) {
        this._listenForScroll();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visible = this.props.visible;

      if (visible !== nextProps.visible) {
        if ('scroll' === visible) {
          this._unlistenForScroll();
        } else if ('scroll' === nextProps.visible) {
          this._listenForScroll();
        }
        this.setState({ visible: true === nextProps.visible });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if ('scroll' === this.props.visible) {
        this._unlistenForScroll();
      }
    }
  }, {
    key: '_listenForScroll',
    value: function _listenForScroll() {
      var _this3 = this;

      // add a timeout so that the findScrollParents function
      // get the right container sizes
      setTimeout(function () {
        var scrollParents = (0, _DOM.findScrollParents)((0, _reactDom.findDOMNode)(_this3.animateRef));
        if (scrollParents.indexOf(document) === -1) {
          document.addEventListener('scroll', _this3._checkScroll);
        }
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', _this3._checkScroll);
        }, _this3);
      }, 0);
    }
  }, {
    key: '_unlistenForScroll',
    value: function _unlistenForScroll() {
      var _this4 = this;

      var scrollParents = (0, _DOM.findScrollParents)((0, _reactDom.findDOMNode)(this.animateRef));
      if (scrollParents.indexOf(document) === -1) {
        document.removeEventListener('scroll', this._checkScroll);
      }
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', _this4._checkScroll);
      }, this);
    }
  }, {
    key: '_checkScroll',
    value: function _checkScroll() {
      var _props = this.props,
          onAppear = _props.onAppear,
          onLeave = _props.onLeave;

      var group = (0, _reactDom.findDOMNode)(this.animateRef);
      var rect = group.getBoundingClientRect();

      if (rect.top < window.innerHeight) {
        this.setState({ visible: true }, function () {
          if (onAppear) {
            onAppear();
          }
        });
      } else {
        this.setState({ visible: false }, function () {
          if (onLeave) {
            onLeave();
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          enter = _props2.enter,
          leave = _props2.leave,
          className = _props2.className,
          children = _props2.children,
          component = _props2.component,
          keep = _props2.keep,
          props = _objectWithoutProperties(_props2, ['enter', 'leave', 'className', 'children', 'component', 'keep']);

      delete props.onAppear;
      delete props.onLeave;
      delete props.visible;
      var visible = this.state.visible;


      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      var animateChildren = void 0;
      if (keep || visible) {
        animateChildren = _react2.default.Children.map(children, function (child, index) {
          return _react2.default.createElement(
            AnimateChild,
            { key: index, enter: enter, leave: leave,
              visible: visible },
            child
          );
        });
      }

      return _react2.default.createElement(
        _reactTransitionGroup.TransitionGroup,
        _extends({}, props, {
          className: classes,
          component: component,
          ref: function ref(_ref3) {
            return _this5.animateRef = _ref3;
          }
        }),
        animateChildren
      );
    }
  }]);

  return Animate;
}(_react.Component);

Animate.displayName = 'Animate';
exports.default = Animate;


var ANIMATIONS = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'jiggle'];

Animate.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  enter: _propTypes2.default.shape({
    animation: _propTypes2.default.oneOf(ANIMATIONS).isRequired,
    duration: _propTypes2.default.number,
    delay: _propTypes2.default.number
  }).isRequired,
  keep: _propTypes2.default.bool,
  leave: _propTypes2.default.shape({
    animation: _propTypes2.default.oneOf(ANIMATIONS).isRequired,
    duration: _propTypes2.default.number,
    delay: _propTypes2.default.number
  }),
  onAppear: _propTypes2.default.func,
  onLeave: _propTypes2.default.func,
  visible: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['scroll']), _propTypes2.default.bool])
};

Animate.defaultProps = {
  component: 'div',
  enter: { animation: 'fade', duration: 300 },
  visible: true
};
module.exports = exports['default'];