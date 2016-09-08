'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.COLLAPSIBLE; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Collapse = function (_Component) {
  (0, _inherits3.default)(Collapse, _Component);

  function Collapse() {
    (0, _classCallCheck3.default)(this, Collapse);
    return (0, _possibleConstructorReturn3.default)(this, (Collapse.__proto__ || (0, _getPrototypeOf2.default)(Collapse)).apply(this, arguments));
  }

  (0, _createClass3.default)(Collapse, [{
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      var node = _reactDom2.default.findDOMNode(this);
      if (node) {
        (function () {
          var contentHeight = node.clientHeight;
          node.classList.remove('animate');
          node.style.height = 0;
          setTimeout(function () {
            node.classList.add('animate');
            node.style.height = contentHeight + 'px';
            setTimeout(callback, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
          });
        })();
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
      return _react2.default.createElement(_Box2.default, (0, _extends3.default)({}, this.props, { className: classes }));
    }
  }]);
  return Collapse;
}(_react.Component);

Collapse.displayName = 'Collapse';
;

var Collapsible = function (_Component2) {
  (0, _inherits3.default)(Collapsible, _Component2);

  function Collapsible() {
    (0, _classCallCheck3.default)(this, Collapsible);
    return (0, _possibleConstructorReturn3.default)(this, (Collapsible.__proto__ || (0, _getPrototypeOf2.default)(Collapsible)).apply(this, arguments));
  }

  (0, _createClass3.default)(Collapsible, [{
    key: 'render',
    value: function render() {
      var Component = this.props.animate ? _reactAddonsTransitionGroup2.default : _Box2.default;
      var collapseProps = _Props2.default.omit(this.props, (0, _keys2.default)(Collapsible.propTypes));

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
;

Collapsible.propTypes = {
  active: _react.PropTypes.bool,
  animate: _react.PropTypes.bool
};

Collapsible.defaultProps = {
  animate: true
};

exports.default = Collapsible;
module.exports = exports['default'];