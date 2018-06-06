'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Close = require('./icons/base/Close');

var _Close2 = _interopRequireDefault(_Close);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _DOM = require('../utils/DOM');

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LAYER;
var APP = _CSSClassnames2.default.APP;

var LayerContents = function (_Component) {
  _inherits(LayerContents, _Component);

  function LayerContents(props, context) {
    _classCallCheck(this, LayerContents);

    var _this = _possibleConstructorReturn(this, (LayerContents.__proto__ || Object.getPrototypeOf(LayerContents)).call(this, props, context));

    _this._onClickOverlay = _this._onClickOverlay.bind(_this);
    _this._processTab = _this._processTab.bind(_this);

    _this.state = {
      dropActive: false
    };
    return _this;
  }

  _createClass(LayerContents, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        history: this.props.history,
        intl: this.props.intl,
        onDropChange: function onDropChange(active) {
          _this2.setState({ dropActive: active });
        },
        router: this.props.router,
        store: this.props.store
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          hidden = _props.hidden,
          onClose = _props.onClose,
          overlayClose = _props.overlayClose;


      if (!hidden) {
        this.anchorStepRef.focus();
        this.anchorStepRef.scrollIntoView();
      }

      this._keyboardHandlers = {
        tab: this._processTab
      };
      if (onClose) {
        this._keyboardHandlers.esc = onClose;
      }
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);

      if (onClose && overlayClose) {
        var layerParent = this.containerRef.parentNode;
        layerParent.addEventListener('click', this._onClickOverlay);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var hidden = this.props.hidden;


      if (nextProps.hidden !== hidden) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);

        if (!nextProps.hidden) {
          _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
        }
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props2 = this.props,
          onClose = _props2.onClose,
          overlayClose = _props2.overlayClose;

      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);

      if (onClose && overlayClose) {
        var layerParent = this.containerRef.parentNode;
        layerParent.removeEventListener('click', this._onClickOverlay);
      }
    }
  }, {
    key: '_processTab',
    value: function _processTab(event) {
      var hidden = this.props.hidden;

      if (hidden) {
        return;
      }
      var items = this.containerRef.getElementsByTagName('*');
      items = (0, _DOM.filterByFocusable)(items);

      if (!items || items.length === 0) {
        event.preventDefault();
      } else {
        if (event.shiftKey) {
          if (event.target === items[0]) {
            items[items.length - 1].focus();
            event.preventDefault();
          }
        } else if (event.target === items[items.length - 1]) {
          items[0].focus();
          event.preventDefault();
        }
      }
    }
  }, {
    key: '_onClickOverlay',
    value: function _onClickOverlay(event) {
      var dropActive = this.state.dropActive;

      if (!dropActive) {
        var onClose = this.props.onClose;

        var layerContents = this.containerRef;

        if (layerContents && !layerContents.contains(event.target)) {
          onClose();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          a11yTitle = _props3.a11yTitle,
          children = _props3.children,
          closer = _props3.closer,
          onClose = _props3.onClose;
      var intl = this.context.intl;


      var closerNode = void 0;
      if ((typeof closer === 'undefined' ? 'undefined' : _typeof(closer)) === 'object') {
        closerNode = closer;
      } else if (onClose && closer) {
        var closeLabel = _Intl2.default.getMessage(intl, 'Close');
        var layerLabel = _Intl2.default.getMessage(intl, 'Layer');
        var closeIconTitle = closeLabel + ' ' + (a11yTitle || '') + ' ' + layerLabel;

        closerNode = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__closer' },
          _react2.default.createElement(_Button2.default, { plain: true, icon: _react2.default.createElement(_Close2.default, {
              a11yTitle: closeIconTitle }),
            onClick: onClose })
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref2) {
            return _this3.containerRef = _ref2;
          },
          className: CLASS_ROOT + '__container' },
        _react2.default.createElement('a', { tabIndex: '-1', 'aria-hidden': 'true', style: { outline: 'none' },
          ref: function ref(_ref) {
            return _this3.anchorStepRef = _ref;
          } }),
        closerNode,
        children
      );
    }
  }]);

  return LayerContents;
}(_react.Component);

LayerContents.displayName = 'LayerContents';


LayerContents.propTypes = {
  a11yTitle: _propTypes2.default.string,
  closer: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.bool]),
  history: _propTypes2.default.object,
  intl: _propTypes2.default.object,
  onClose: _propTypes2.default.func,
  overlayClose: _propTypes2.default.bool,
  router: _propTypes2.default.any,
  store: _propTypes2.default.any
};

// Because Layer creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
LayerContents.childContextTypes = {
  history: _propTypes2.default.object,
  intl: _propTypes2.default.object,
  onDropChange: _propTypes2.default.func,
  router: _propTypes2.default.any,
  store: _propTypes2.default.object
};

var Layer = function (_Component2) {
  _inherits(Layer, _Component2);

  function Layer() {
    _classCallCheck(this, Layer);

    return _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).apply(this, arguments));
  }

  _createClass(Layer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._originalFocusedElement = document.activeElement;
      this._originalScrollPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset
      };
      this._addLayer();
      this._renderLayer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._renderLayer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this5 = this;

      var hidden = this.props.hidden;

      if (this._originalFocusedElement && !hidden) {
        if (this._originalFocusedElement.focus) {
          // wait for the fixed positioning to come back to normal
          // see layer styling for reference
          setTimeout(function () {
            _this5._originalFocusedElement.focus();
            window.scrollTo(_this5._originalScrollPosition.left, _this5._originalScrollPosition.top);
          }, 0);
        } else if (this._originalFocusedElement.parentNode && this._originalFocusedElement.parentNode.focus) {
          // required for IE11 and Edge
          this._originalFocusedElement.parentNode.focus();
          window.scrollTo(this._originalScrollPosition.left, this._originalScrollPosition.top);
        }
      }

      this._removeLayer();
    }
  }, {
    key: '_classesFromProps',
    value: function _classesFromProps() {
      var _classnames;

      var _props4 = this.props,
          align = _props4.align,
          className = _props4.className,
          closer = _props4.closer,
          flush = _props4.flush,
          hidden = _props4.hidden,
          peek = _props4.peek;


      return (0, _classnames3.default)('grommet', CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--align-' + this.props.align, align), _defineProperty(_classnames, CLASS_ROOT + '--closeable', closer), _defineProperty(_classnames, CLASS_ROOT + '--flush', flush), _defineProperty(_classnames, CLASS_ROOT + '--hidden', hidden), _defineProperty(_classnames, CLASS_ROOT + '--peek', peek), _classnames), className);
    }
  }, {
    key: '_addLayer',
    value: function _addLayer() {
      var id = this.props.id;


      var element = document.createElement('div');
      if (id) {
        element.id = id;
      }
      element.className = this._classesFromProps();
      // insert before .app, if possible.
      var appElements = document.querySelectorAll('.' + APP);
      var beforeElement;
      if (appElements.length > 0) {
        beforeElement = appElements[0];
      } else {
        beforeElement = document.body.firstChild;
      }
      if (beforeElement) {
        this._element = beforeElement.parentNode.insertBefore(element, beforeElement);
      }
    }
  }, {
    key: '_handleAriaHidden',
    value: function _handleAriaHidden(hideOverlay) {
      var _this6 = this;

      setTimeout(function () {
        var ariaHidden = hideOverlay || false;
        var grommetApps = document.querySelectorAll('.' + APP);
        var visibleLayers = document.querySelectorAll('.' + CLASS_ROOT + ':not(.' + CLASS_ROOT + '--hidden)');

        if (grommetApps) {
          Array.prototype.slice.call(grommetApps).forEach(function (grommetApp) {
            if (ariaHidden && visibleLayers.length === 0) {
              // make sure to only show grommet apps if there is no other layer
              grommetApp.setAttribute('aria-hidden', false);
              grommetApp.classList.remove(APP + '--hidden');
              // scroll body content to the original position
              grommetApp.style.top = '-' + _this6._originalScrollPosition.top + 'px';
              grommetApp.style.left = '-' + _this6._originalScrollPosition.left + 'px';
            } else {
              grommetApp.setAttribute('aria-hidden', true);
              grommetApp.classList.add(APP + '--hidden');
              // this must be null to work
              grommetApp.style.top = null;
              grommetApp.style.left = null;
            }
          }, _this6);
        }
      }, 0);
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer() {
      var _this7 = this;

      if (this._element) {
        this._element.className = this._classesFromProps();
        var contents = _react2.default.createElement(LayerContents, _extends({}, this.props, {
          history: this.context.history,
          intl: this.context.intl,
          router: this.context.router,
          store: this.context.store }));
        _reactDom2.default.render(contents, this._element, function () {
          var hidden = _this7.props.hidden;

          if (hidden) {
            _this7._handleAriaHidden(true);
          } else {
            _this7._handleAriaHidden(false);
          }
        });
      }
    }
  }, {
    key: '_removeLayer',
    value: function _removeLayer() {
      if (this._element) {
        this._element.removeEventListener('animationend', this._onAnimationEnd);

        _reactDom2.default.unmountComponentAtNode(this._element);
        this._element.parentNode.removeChild(this._element);
        this._element = undefined;

        // make sure to handle aria attributes after the layer is removed
        this._handleAriaHidden(true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', { style: { display: 'none' } });
    }
  }]);

  return Layer;
}(_react.Component);

Layer.displayName = 'Layer';
exports.default = Layer;


Layer.propTypes = {
  align: _propTypes2.default.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  closer: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.bool]),
  flush: _propTypes2.default.bool,
  hidden: _propTypes2.default.bool,
  overlayClose: _propTypes2.default.bool,
  peek: _propTypes2.default.bool,
  onClose: _propTypes2.default.func
};

Layer.contextTypes = {
  router: _propTypes2.default.any,
  history: _propTypes2.default.object,
  intl: _propTypes2.default.object,
  store: _propTypes2.default.object
};

Layer.defaultProps = {
  align: 'center'
};
module.exports = exports['default'];