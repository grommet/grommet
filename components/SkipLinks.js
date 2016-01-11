'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var SkipLinks = (function (_Component) {
  _inherits(SkipLinks, _Component);

  function SkipLinks(props, context) {
    _classCallCheck(this, SkipLinks);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SkipLinks).call(this, props, context));

    _this._processTab = _this._processTab.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._updateAnchors = _this._updateAnchors.bind(_this);
    _this.state = { anchors: [], showLayer: false };
    return _this;
  }

  _createClass(SkipLinks, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateAnchors();

      this._keyboardHandlers = {
        tab: this._processTab
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
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
    key: '_processTab',
    value: function _processTab(event) {
      var currentAnchor = document.activeElement;
      var last = this.state.anchors.length - 1;

      if (event.shiftKey && currentAnchor.id === this.state.anchors[0].id || !event.shiftKey && currentAnchor.id === this.state.anchors[last].id) {
        this.setState({ showLayer: false });
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(destId) {
      return (function (event) {
        var dest = document.getElementById(destId);
        dest.focus();
        this.setState({ showLayer: false });
      }).bind(this);
    }
  }, {
    key: 'render',
    value: function render() {

      var anchorElements = this.state.anchors.map((function (anchor, index) {
        var skipToLabel = _Intl2.default.getMessage(this.context.intl, 'Skip to');
        var a11yLabel = skipToLabel + ' ' + anchor.label;
        return _react2.default.createElement(
          'a',
          { href: '#' + anchor.id,
            onFocus: this._onFocus,
            onClick: this._onClick(anchor.id),
            id: 'skipLayer_' + anchor.id,
            key: anchor.id,
            'aria-label': a11yLabel },
          anchor.label
        );
      }).bind(this));

      var menuComponent = undefined;
      if (anchorElements.length > 0) {
        menuComponent = _react2.default.createElement(
          _Menu2.default,
          { direction: 'row' },
          anchorElements
        );
      }

      return _react2.default.createElement(
        _Layer2.default,
        { id: 'skip-link-layer', hidden: !this.state.showLayer, align: 'top' },
        _react2.default.createElement(
          _Box2.default,
          { ref: 'skipLinksLayer',
            pad: { horizontal: 'small', vertical: 'medium' } },
          _react2.default.createElement(
            'h2',
            null,
            _react2.default.createElement(_FormattedMessage2.default, { id: 'Skip to', defaultMessage: 'Skip to' })
          ),
          menuComponent
        )
      );
    }
  }]);

  return SkipLinks;
})(_react.Component);

exports.default = SkipLinks;

SkipLinks.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];