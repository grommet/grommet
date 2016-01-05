'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Close = require('./icons/base/Close');

var _Close2 = _interopRequireDefault(_Close);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _DOM = require('../utils/DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "layer";

var LayerContents = (function (_Component) {
  _inherits(LayerContents, _Component);

  function LayerContents() {
    _classCallCheck(this, LayerContents);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerContents).call(this));

    _this._processTab = _this._processTab.bind(_this);
    return _this;
  }

  _createClass(LayerContents, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        router: this.props.router,
        history: this.props.history,
        intl: this.props.intl,
        store: this.props.store
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      var items = this.refs.container.getElementsByTagName('*');
      var firstFocusable = _DOM2.default.getBestFirstFocusable(items);
      if (firstFocusable) {
        firstFocusable.focus();
      }

      if (this.props.onClose) {
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
          tab: this._processTab,
          esc: this.props.onClose
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onClose) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, {
          tab: this._processTab,
          esc: this.props.onClose
        });
      }
    }
  }, {
    key: '_processTab',
    value: function _processTab(event) {
      var items = this.refs.container.getElementsByTagName('*');
      items = _DOM2.default.filterByFocusable(items);

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
    key: 'render',
    value: function render() {
      var closer = null;
      if (this.props.closer) {
        closer = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__closer" },
          _react2.default.createElement(
            _Button2.default,
            { type: 'icon', onClick: this.props.onClose },
            _react2.default.createElement(_Close2.default, { a11yTitle: this.props.a11yCloserTitle })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: 'container', className: CLASS_ROOT + "__container" },
        closer,
        this.props.children
      );
    }
  }]);

  return LayerContents;
})(_react.Component);

LayerContents.propTypes = {
  closer: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.bool]),
  onClose: _react.PropTypes.func,
  history: _react.PropTypes.object,
  router: _react.PropTypes.func,
  intl: _react.PropTypes.object,
  a11yCloserTitle: _react.PropTypes.string
};

// Because Layer creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
LayerContents.childContextTypes = {
  router: _react.PropTypes.func,
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  store: _react.PropTypes.object
};

var Layer = (function (_Component2) {
  _inherits(Layer, _Component2);

  function Layer() {
    _classCallCheck(this, Layer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Layer).apply(this, arguments));
  }

  _createClass(Layer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._originalFocusedElement = document.activeElement;
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

      if (this._originalFocusedElement) {
        this._originalFocusedElement.focus();
      }

      this._removeLayer();
    }
  }, {
    key: '_classesFromProps',
    value: function _classesFromProps() {
      var classes = [CLASS_ROOT];
      if (this.props.align) {
        classes.push(CLASS_ROOT + "--align-" + this.props.align);
      }
      if (this.props.flush) {
        classes.push(CLASS_ROOT + "--flush");
      }
      if (this.props.hidden) {
        classes.push(CLASS_ROOT + "--hidden");
      }
      if (this.props.peek) {
        classes.push(CLASS_ROOT + "--peek");
      }
      if (this.props.closer) {
        classes.push(CLASS_ROOT + "--closeable");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return classes;
    }
  }, {
    key: '_addLayer',
    value: function _addLayer() {
      var element = document.createElement('div');
      if (this.props.id) {
        element.id = this.props.id;
      }
      element.className = this._classesFromProps().join(' ');
      // insert before .app, if possible.
      var appElements = document.querySelectorAll('.app');
      var beforeElement;
      if (appElements.length > 0) {
        beforeElement = appElements[0];
      } else {
        beforeElement = document.body.firstChild;
      }
      this._element = beforeElement.parentNode.insertBefore(element, beforeElement);
    }
  }, {
    key: '_handleAriaHidden',
    value: function _handleAriaHidden(hideOverlay) {
      this._element.setAttribute('aria-hidden', hideOverlay);

      // refactor
      Array.prototype.forEach.call(document.body.childNodes, (function (currentChild) {
        if (currentChild !== this._element && currentChild.nodeType === 1 && currentChild.id !== 'skip-link-layer' && currentChild.tagName.toLowerCase() !== 'script') {
          currentChild.setAttribute('aria-hidden', !hideOverlay);
        }
      }).bind(this));
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer() {
      this._element.className = this._classesFromProps().join(' ');
      var contents = _react2.default.createElement(LayerContents, _extends({}, this.props, {
        router: this.context.router,
        history: this.context.history,
        intl: this.context.intl,
        store: this.context.store }));
      _reactDom2.default.render(contents, this._element);
      this._handleAriaHidden(this.props.hidden);
    }
  }, {
    key: '_removeLayer',
    value: function _removeLayer() {
      this._element.removeEventListener('animationend', this._onAnimationEnd);
      this._handleAriaHidden(true);

      _reactDom2.default.unmountComponentAtNode(this._element);
      this._element.parentNode.removeChild(this._element);
      this._element = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', null);
    }
  }]);

  return Layer;
})(_react.Component);

exports.default = Layer;

Layer.propTypes = {
  align: _react.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  closer: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.bool]),
  flush: _react.PropTypes.bool,
  hidden: _react.PropTypes.bool,
  peek: _react.PropTypes.bool,
  onClose: _react.PropTypes.func
};

Layer.contextTypes = {
  router: _react.PropTypes.func,
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  store: _react.PropTypes.object
};

Layer.defaultProps = {
  align: 'center'
};