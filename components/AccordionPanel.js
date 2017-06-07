'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ACCORDION_PANEL;

var AccordionPanel = function (_Component) {
  _inherits(AccordionPanel, _Component);

  function AccordionPanel() {
    _classCallCheck(this, AccordionPanel);

    var _this = _possibleConstructorReturn(this, (AccordionPanel.__proto__ || Object.getPrototypeOf(AccordionPanel)).call(this));

    _this._onClickTab = _this._onClickTab.bind(_this);
    return _this;
  }

  _createClass(AccordionPanel, [{
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


      var classes = (0, _classnames3.default)(CLASS_ROOT, className, _defineProperty({}, CLASS_ROOT + '--active', active));

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
              { pad: pad, direction: 'row',
                justify: 'between', align: 'center', responsive: false,
                className: CLASS_ROOT + '__header' },
              heading,
              _react2.default.createElement(_CaretNext2.default, {
                className: CLASS_ROOT + '__control' })
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


AccordionPanel.propTypes = {
  a11yTitle: _propTypes2.default.string,
  active: _propTypes2.default.bool, // set by Accordion
  animate: _propTypes2.default.bool,
  heading: _propTypes2.default.node.isRequired,
  onChange: _propTypes2.default.func,
  pad: _Header2.default.propTypes.pad
};

AccordionPanel.contextTypes = {
  intl: _propTypes2.default.object
};
module.exports = exports['default'];