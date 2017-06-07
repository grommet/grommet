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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TABS;

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props, context) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props, context));

    _this._activateTab = _this._activateTab.bind(_this);

    _this.state = {
      activeIndex: props.activeIndex || 0,
      justify: props.justify
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((nextProps.activeIndex || 0 === nextProps.activeIndex) && this.state.activeIndex !== nextProps.activeIndex) {
        this.setState({ activeIndex: nextProps.activeIndex });
      }
    }
  }, {
    key: '_activateTab',
    value: function _activateTab(index) {
      if (!this.props.hasOwnProperty('activeIndex')) {
        this.setState({ activeIndex: index });
      }
      if (this.props.onActive) {
        this.props.onActive(index);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          justify = _props.justify,
          responsive = _props.responsive,
          props = _objectWithoutProperties(_props, ['children', 'className', 'justify', 'responsive']);

      delete props.activeIndex;
      delete props.onActive;
      var activeIndex = this.state.activeIndex;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--justify-' + justify, justify), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _classnames), className);

      var activeContainer = void 0;
      var activeTitle = void 0;
      var tabs = _react2.default.Children.map(children, function (tab, index) {
        if (!tab) return null;

        var tabProps = tab.props || tab._store.props || {};

        var isTabActive = index === activeIndex;

        if (isTabActive) {
          activeContainer = tabProps.children;
          activeTitle = tabProps.title;
        }

        return _react2.default.cloneElement(tab, {
          active: isTabActive,
          id: 'tab-' + index,
          onRequestForActive: function onRequestForActive() {
            _this2._activateTab(index);
          }
        });
      }, this);

      var tabContentTitle = _Intl2.default.getMessage(intl, 'Tab Contents', {
        activeTitle: activeTitle
      });

      return _react2.default.createElement(
        'div',
        { role: 'tablist' },
        _react2.default.createElement(
          'ul',
          _extends({}, props, { className: classes }),
          tabs
        ),
        _react2.default.createElement(
          'div',
          { 'aria-label': tabContentTitle, role: 'tabpanel' },
          activeContainer
        )
      );
    }
  }]);

  return Tabs;
}(_react.Component);

Tabs.displayName = 'Tabs';
exports.default = Tabs;


Tabs.propTypes = {
  activeIndex: _propTypes2.default.number,
  justify: _propTypes2.default.oneOf(['start', 'center', 'end']),
  responsive: _propTypes2.default.bool,
  onActive: _propTypes2.default.func
};

Tabs.contextTypes = {
  intl: _propTypes2.default.object
};

Tabs.defaultProps = {
  justify: 'center',
  responsive: true
};
module.exports = exports['default'];