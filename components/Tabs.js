// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsIntl = require('../utils/Intl');

var _utilsIntl2 = _interopRequireDefault(_utilsIntl);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var CLASS_ROOT = "tabs";

var Tabs = (function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    _get(Object.getPrototypeOf(Tabs.prototype), 'constructor', this).call(this, props);

    this._activateTab = this._activateTab.bind(this);

    this.state = {
      activeIndex: props.initialIndex
    };
  }

  _createClass(Tabs, [{
    key: '_activateTab',
    value: function _activateTab(index) {
      this.setState({ activeIndex: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];

      var activeContainer;
      var activeTitle;

      var tabs = _react2['default'].Children.map(this.props.children, (function (tab, index) {

        var tabProps = tab.props || tab._store.props || {};

        var isTabActive = index === this.state.activeIndex;

        if (isTabActive) {
          activeContainer = tabProps.children;
          activeTitle = tabProps.title;
        }

        return _react2['default'].cloneElement(tab, {
          active: isTabActive,
          id: 'tab-' + index,
          onRequestForActive: (function () {
            this._activateTab(index);
          }).bind(this)
        });
      }).bind(this));

      var tabContentTitle = _utilsIntl2['default'].getMessage(this.context.intl, 'Tab Contents', {
        activeTitle: activeTitle
      });

      // TODO: Since there could be multiple Tabs on the page, we need a more
      // robust means of identifying the association between title and aria label.
      return _react2['default'].createElement(
        'div',
        { role: 'tablist' },
        _react2['default'].createElement(
          'ul',
          { className: classes.join(' ') },
          tabs
        ),
        _react2['default'].createElement(
          'div',
          { ref: 'tabContent', tabIndex: '0', 'aria-label': tabContentTitle,
            role: 'tabpanel' },
          _react2['default'].createElement(
            _Box2['default'],
            { className: CLASS_ROOT + '__content',
              'aria-label': tabContentTitle },
            activeContainer
          )
        )
      );
    }
  }]);

  return Tabs;
})(_react.Component);

Tabs.propTypes = {
  activeIndex: _react.PropTypes.number
};

Tabs.contextTypes = {
  intl: _react.PropTypes.object
};

Tabs.defaultProps = {
  initialIndex: 0
};

module.exports = Tabs;