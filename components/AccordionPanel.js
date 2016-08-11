'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _TabNext = require('./icons/base/TabNext');

var _TabNext2 = _interopRequireDefault(_TabNext);

var _Collapsible = require('./Collapsible');

var _Collapsible2 = _interopRequireDefault(_Collapsible);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.ACCORDION_PANEL; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var AccordionPanel = function (_Component) {
  (0, _inherits3.default)(AccordionPanel, _Component);

  function AccordionPanel(props, context) {
    (0, _classCallCheck3.default)(this, AccordionPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AccordionPanel).call(this, props, context));

    _this._onClickPanel = _this._onClickPanel.bind(_this);
    _this.state = {
      active: props.active || false
    };
    return _this;
  }

  (0, _createClass3.default)(AccordionPanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.active !== nextProps.active) {
        this.setState({ active: nextProps.active });
      }
    }
  }, {
    key: '_onClickPanel',
    value: function _onClickPanel() {
      this.setState({ active: !this.state.active });
      this.props.onActive();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var animate = _props.animate;
      var className = _props.className;
      var children = _props.children;
      var heading = _props.heading;


      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', this.state.active));

      return _react2.default.createElement(
        _ListItem2.default,
        { className: classes, direction: 'column', pad: 'none' },
        _react2.default.createElement(
          _Header2.default,
          {
            role: 'tab',
            className: CLASS_ROOT + '__header',
            pad: { horizontal: 'medium', vertical: 'small' },
            full: 'horizontal',
            direction: 'row',
            justify: 'between',
            align: 'center',
            onClick: this._onClickPanel,
            responsive: false
          },
          heading,
          _react2.default.createElement(_TabNext2.default, { className: CLASS_ROOT + '__control' })
        ),
        _react2.default.createElement(
          _Collapsible2.default,
          {
            role: 'tabpanel',
            active: this.state.active,
            animate: animate
          },
          children
        )
      );
    }
  }]);
  return AccordionPanel;
}(_react.Component);

AccordionPanel.displayName = 'AccordionPanel';
exports.default = AccordionPanel;
;

AccordionPanel.propTypes = {
  active: _react.PropTypes.bool,
  animate: _react.PropTypes.bool,
  heading: _react.PropTypes.node.isRequired,
  onActive: _react.PropTypes.func
};
module.exports = exports['default'];