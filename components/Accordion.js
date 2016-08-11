'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ACCORDION;

var Accordion = function (_Component) {
  (0, _inherits3.default)(Accordion, _Component);

  function Accordion(props, context) {
    (0, _classCallCheck3.default)(this, Accordion);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Accordion).call(this, props, context));

    _this._activatePanel = _this._activatePanel.bind(_this);

    _this.state = {
      activeIndex: props.initialIndex
    };
    return _this;
  }

  (0, _createClass3.default)(Accordion, [{
    key: '_activatePanel',
    value: function _activatePanel(index) {
      this.setState({ activeIndex: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var animate = _props.animate;
      var className = _props.className;
      var children = _props.children;
      var openMulti = _props.openMulti;
      var props = (0, _objectWithoutProperties3.default)(_props, ['animate', 'className', 'children', 'openMulti']);


      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      var accordionChildren = _react2.default.Children.map(children, function (child, index) {
        return _react2.default.cloneElement(child, {
          id: 'accordion-panel-' + index,
          active: !openMulti ? _this2.state.activeIndex === index : child.props.active,
          onActive: function onActive() {
            _this2._activatePanel(index);
          },
          animate: animate
        });
      });

      return _react2.default.createElement(
        _List2.default,
        (0, _extends3.default)({
          role: 'tablist',
          className: classes
        }, props),
        accordionChildren
      );
    }
  }]);
  return Accordion;
}(_react.Component);

Accordion.displayName = 'Accordion';
exports.default = Accordion;
;

Accordion.propTypes = {
  animate: _react.PropTypes.bool,
  openMulti: _react.PropTypes.bool,
  initialIndex: _react.PropTypes.number
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
module.exports = exports['default'];