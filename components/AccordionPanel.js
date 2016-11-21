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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _CaretNext = require('./icons/base/CaretNext');

var _CaretNext2 = _interopRequireDefault(_CaretNext);

var _Collapsible = require('./Collapsible');

var _Collapsible2 = _interopRequireDefault(_Collapsible);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.ACCORDION_PANEL; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var AccordionPanel = function (_Component) {
  (0, _inherits3.default)(AccordionPanel, _Component);

  function AccordionPanel() {
    (0, _classCallCheck3.default)(this, AccordionPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccordionPanel.__proto__ || (0, _getPrototypeOf2.default)(AccordionPanel)).call(this));

    _this._onClickTab = _this._onClickTab.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(AccordionPanel, [{
    key: '_onClickTab',
    value: function _onClickTab(event) {
      var onChange = this.props.onChange;

      if (event) {
        event.preventDefault();
      }
      onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          active = _props.active,
          animate = _props.animate,
          className = _props.className,
          children = _props.children,
          heading = _props.heading,
          pad = _props.pad;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', active));

      var tabContentTitle = _Intl2.default.getMessage(intl, 'Tab Contents', {
        activeTitle: a11yTitle || heading
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _ListItem2.default,
          { className: classes, direction: 'column', pad: 'none',
            'aria-expanded': active, 'aria-selected': active, role: 'tab',
            'aria-label': a11yTitle || heading },
          _react2.default.createElement(
            _Button2.default,
            { fill: true, plain: true, onClick: this._onClickTab },
            _react2.default.createElement(
              _Header2.default,
              { pad: pad, full: 'horizontal', direction: 'row',
                justify: 'between', align: 'center', responsive: false,
                className: CLASS_ROOT + '__header' },
              heading,
              _react2.default.createElement(_CaretNext2.default, { className: CLASS_ROOT + '__control' })
            )
          )
        ),
        _react2.default.createElement(
          _Collapsible2.default,
          { 'aria-label': tabContentTitle, role: 'tabpanel',
            active: active, animate: animate, pad: pad },
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
  a11yTitle: _react.PropTypes.string,
  active: _react.PropTypes.bool, // set by Accordion
  animate: _react.PropTypes.bool,
  heading: _react.PropTypes.node.isRequired,
  onChange: _react.PropTypes.func,
  pad: _Header2.default.propTypes.pad
};

AccordionPanel.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];