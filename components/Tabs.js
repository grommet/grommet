'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TABS;

var Tabs = function (_Component) {
  (0, _inherits3.default)(Tabs, _Component);

  function Tabs(props) {
    (0, _classCallCheck3.default)(this, Tabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, props));

    _this._activateTab = _this._activateTab.bind(_this);

    _this.state = {
      activeIndex: props.initialIndex,
      justify: props.justify
    };
    return _this;
  }

  (0, _createClass3.default)(Tabs, [{
    key: '_activateTab',
    value: function _activateTab(index) {
      this.setState({ activeIndex: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--justify-' + this.props.justify);
      if (this.props.responsive) {
        classes.push(CLASS_ROOT + '--responsive');
      }

      var activeContainer;
      var activeTitle;

      var tabs = _react2.default.Children.map(this.props.children, function (tab, index) {

        var tabProps = tab.props || tab._store.props || {};

        var isTabActive = index === this.state.activeIndex;

        if (isTabActive) {
          activeContainer = tabProps.children;
          activeTitle = tabProps.title;
        }

        return _react2.default.cloneElement(tab, {
          active: isTabActive,
          id: 'tab-' + index,
          onRequestForActive: function () {
            this._activateTab(index);
          }.bind(this)
        });
      }.bind(this));

      var tabContentTitle = _Intl2.default.getMessage(this.context.intl, 'Tab Contents', {
        activeTitle: activeTitle
      });

      // TODO: Since there could be multiple Tabs on the page, we need a more
      // robust means of identifying the association between title and aria label.
      return _react2.default.createElement(
        'div',
        { role: 'tablist' },
        _react2.default.createElement(
          'ul',
          { className: classes.join(' ') },
          tabs
        ),
        _react2.default.createElement(
          'div',
          { ref: 'tabContent', tabIndex: '0', 'aria-label': tabContentTitle,
            role: 'tabpanel' },
          _react2.default.createElement(
            _Box2.default,
            { className: CLASS_ROOT + '__content',
              'aria-label': tabContentTitle },
            activeContainer
          )
        )
      );
    }
  }]);
  return Tabs;
}(_react.Component);

Tabs.displayName = 'Tabs';
exports.default = Tabs;


Tabs.propTypes = {
  activeIndex: _react.PropTypes.number,
  justify: _react.PropTypes.oneOf(['start', 'center', 'end']),
  responsive: _react.PropTypes.bool
};

Tabs.contextTypes = {
  intl: _react.PropTypes.object
};

Tabs.defaultProps = {
  initialIndex: 0,
  justify: 'center',
  responsive: true
};
module.exports = exports['default'];