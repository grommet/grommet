'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTransitionGroup = require('react-transition-group');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.COLLAPSIBLE;

var Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse() {
    _classCallCheck(this, Collapse);

    return _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).apply(this, arguments));
  }

  _createClass(Collapse, [{
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      var node = _reactDom2.default.findDOMNode(this);
      if (node) {
        var contentHeight = node.clientHeight;
        node.classList.remove('animate');
        node.style.height = 0;
        setTimeout(function () {
          node.classList.add('animate');
          node.style.height = contentHeight + 'px';
          setTimeout(callback, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
        });
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      var node = _reactDom2.default.findDOMNode(this);
      node.classList.remove('animate');
      node.style.height = '';
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var node = _reactDom2.default.findDOMNode(this);
      if (node) {
        var contentHeight = node.clientHeight;
        node.style.height = contentHeight + 'px';
        setTimeout(function () {
          node.classList.add('animate');
          node.style.height = 0;
          setTimeout(callback, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)(CLASS_ROOT, this.props.className);
      return _react2.default.createElement(_Box2.default, _extends({}, this.props, { className: classes }));
    }
  }]);

  return Collapse;
}(_react.Component);

Collapse.displayName = 'Collapse';

var Collapsible = function (_Component2) {
  _inherits(Collapsible, _Component2);

  function Collapsible() {
    _classCallCheck(this, Collapsible);

    return _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).apply(this, arguments));
  }

  _createClass(Collapsible, [{
    key: 'render',
    value: function render() {
      var Component = this.props.animate ? _reactTransitionGroup.TransitionGroup : _Box2.default;
      var collapseProps = _Props2.default.omit(this.props, Object.keys(Collapsible.propTypes));

      return _react2.default.createElement(
        Component,
        { className: CLASS_ROOT + '__wrapper' },
        this.props.active && _react2.default.createElement(Collapse, collapseProps)
      );
    }
  }]);

  return Collapsible;
}(_react.Component);

Collapsible.displayName = 'Collapsible';


Collapsible.propTypes = {
  active: _propTypes2.default.bool,
  animate: _propTypes2.default.bool
};

Collapsible.defaultProps = {
  animate: true
};

exports.default = Collapsible;
module.exports = exports['default'];