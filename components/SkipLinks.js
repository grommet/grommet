// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _utilsDOM = require('../utils/DOM');

var _utilsDOM2 = _interopRequireDefault(_utilsDOM);

var SkipLinks = (function (_Component) {
  _inherits(SkipLinks, _Component);

  function SkipLinks(props, context) {
    _classCallCheck(this, SkipLinks);

    _get(Object.getPrototypeOf(SkipLinks.prototype), 'constructor', this).call(this, props, context);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._updateAnchors = this._updateAnchors.bind(this);
    this.state = { anchors: [], showLayer: false };
  }

  _createClass(SkipLinks, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateAnchors();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({ routeChanged: true });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.routeChanged) {
        this.setState({ routeChanged: false }, this._updateAnchors);
      }
    }
  }, {
    key: '_updateAnchors',
    value: function _updateAnchors() {
      var anchorElements = document.querySelectorAll('.skip-link-anchor');

      var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
        return {
          id: anchorElement.getAttribute('id'),
          label: anchorElement.textContent
        };
      });

      this.setState({ anchors: anchors });
    }
  }, {
    key: '_onFocus',
    value: function _onFocus() {
      if (!this.state.showLayer) {
        this.setState({ showLayer: true });
      }
    }
  }, {
    key: '_onBlur',
    value: function _onBlur() {
      var skipLinksLayer = (0, _reactDom.findDOMNode)(this.refs.skipLinksLayer);
      var activeElement = document.activeElement;
      if (!_utilsDOM2['default'].isDescendant(skipLinksLayer, activeElement)) {
        this.setState({ showLayer: false });
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(destId) {
      return function (event) {
        var dest = document.getElementById(destId);
        dest.focus();
      };
    }
  }, {
    key: 'render',
    value: function render() {

      var anchorElements = this.state.anchors.map((function (anchor, index) {
        return _react2['default'].createElement(
          'a',
          { tabIndex: '0',
            href: '#' + anchor.id,
            onFocus: this._onFocus,
            onBlur: this._onBlur,
            onClick: this._onClick(anchor.id),
            key: anchor.id },
          anchor.label
        );
      }).bind(this));

      var menuComponent;
      if (anchorElements.length > 0) {
        menuComponent = _react2['default'].createElement(
          _Menu2['default'],
          { direction: 'row' },
          anchorElements
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'skip-links' },
        _react2['default'].createElement(
          _Layer2['default'],
          { id: 'skip-link-layer', hidden: !this.state.showLayer },
          _react2['default'].createElement(
            'div',
            { ref: 'skipLinksLayer' },
            _react2['default'].createElement(
              'h2',
              null,
              _react2['default'].createElement(_FormattedMessage2['default'], { id: 'Skip to', defaultMessage: 'Skip to' })
            ),
            menuComponent
          )
        )
      );
    }
  }]);

  return SkipLinks;
})(_react.Component);

exports['default'] = SkipLinks;
module.exports = exports['default'];