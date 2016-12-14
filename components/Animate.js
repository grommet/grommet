'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _DOM = require('../utils/DOM');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ANIMATE;

var AnimateChild = function (_Component) {
  (0, _inherits3.default)(AnimateChild, _Component);

  function AnimateChild(props, context) {
    (0, _classCallCheck3.default)(this, AnimateChild);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AnimateChild.__proto__ || (0, _getPrototypeOf2.default)(AnimateChild)).call(this, props, context));

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

  (0, _createClass3.default)(AnimateChild, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var enter = nextProps.enter,
          leave = nextProps.leave;

      this.setState({ enter: enter, leave: leave || enter });
      if (nextProps.visible !== this.props.visible) {
        var _ref = nextProps.visible ? ['enter', 'active'] : ['leave', 'inactive'],
            _ref2 = (0, _slicedToArray3.default)(_ref, 2),
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
;

AnimateChild.propTypes = {
  enter: _react.PropTypes.shape({
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }).isRequired,
  leave: _react.PropTypes.shape({
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }),
  visible: _react.PropTypes.bool
};

AnimateChild.defaultProps = {
  visible: false
};

var Animate = function (_Component2) {
  (0, _inherits3.default)(Animate, _Component2);

  function Animate(props, context) {
    (0, _classCallCheck3.default)(this, Animate);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Animate.__proto__ || (0, _getPrototypeOf2.default)(Animate)).call(this, props, context));

    _this2._checkScroll = _this2._checkScroll.bind(_this2);
    _this2.state = { visible: true === props.visible };
    return _this2;
  }

  (0, _createClass3.default)(Animate, [{
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

      this._scrollParents = (0, _DOM.findScrollParents)(this);
      this._scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', _this3._checkScroll);
      });
    }
  }, {
    key: '_unlistenForScroll',
    value: function _unlistenForScroll() {
      var _this4 = this;

      this._scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', _this4._checkScroll);
      });
      this._scrollParents = undefined;
    }
  }, {
    key: '_checkScroll',
    value: function _checkScroll() {
      var group = (0, _reactDom.findDOMNode)(this);
      var rect = group.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        if (!this.state.visible) {
          this.setState({ visible: true });
        }
      } else {
        if (this.state.visible) {
          this.setState({ visible: false });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          enter = _props.enter,
          leave = _props.leave,
          className = _props.className,
          children = _props.children,
          component = _props.component,
          keep = _props.keep,
          props = (0, _objectWithoutProperties3.default)(_props, ['enter', 'leave', 'className', 'children', 'component', 'keep']);

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
        _reactAddonsTransitionGroup2.default,
        (0, _extends3.default)({}, props, { className: classes, component: component }),
        animateChildren
      );
    }
  }]);
  return Animate;
}(_react.Component);

Animate.displayName = 'Animate';
exports.default = Animate;
;

var ANIMATIONS = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'jiggle'];

Animate.propTypes = {
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  enter: _react.PropTypes.shape({
    animation: _react.PropTypes.oneOf(ANIMATIONS).isRequired,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }).isRequired,
  keep: _react.PropTypes.bool,
  leave: _react.PropTypes.shape({
    animation: _react.PropTypes.oneOf(ANIMATIONS).isRequired,
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number
  }),
  visible: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['scroll']), _react.PropTypes.bool])
};

Animate.defaultProps = {
  component: 'div',
  enter: { animation: 'fade', duration: 300 },
  visible: true
};
module.exports = exports['default'];