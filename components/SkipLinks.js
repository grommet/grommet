'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _DOM = require('../utils/DOM');

var _DOM2 = _interopRequireDefault(_DOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var SkipLinks = (function (_Component) {
  _inherits(SkipLinks, _Component);

  function SkipLinks(props, context) {
    _classCallCheck(this, SkipLinks);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SkipLinks).call(this, props, context));

    _this._onBlur = _this._onBlur.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._updateAnchors = _this._updateAnchors.bind(_this);
    _this.state = { anchors: [], showLayer: false };
    return _this;
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
      if (!_DOM2.default.isDescendant(skipLinksLayer, activeElement)) {
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
        return _react2.default.createElement(
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
        menuComponent = _react2.default.createElement(
          _Menu2.default,
          { direction: 'row' },
          anchorElements
        );
      }

      return _react2.default.createElement(
        _Layer2.default,
        { id: 'skip-link-layer', hidden: !this.state.showLayer },
        _react2.default.createElement(
          'div',
          { ref: 'skipLinksLayer' },
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