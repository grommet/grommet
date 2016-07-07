'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LAYER;
var APP = _CSSClassnames2.default.APP;

var LayerContents = function (_Component) {
  (0, _inherits3.default)(LayerContents, _Component);

  function LayerContents() {
    (0, _classCallCheck3.default)(this, LayerContents);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LayerContents).call(this));

    _this._onClick = _this._onClick.bind(_this);
    _this._processTab = _this._processTab.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(LayerContents, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        history: this.props.history,
        intl: this.props.intl,
        router: this.props.router,
        store: this.props.store
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.anchorStep.focus();

      this._keyboardHandlers = {
        tab: this._processTab
      };

      if (this.props.onClose) {
        var layerParent = this.refs.container.parentNode;
        this._keyboardHandlers.esc = this.props.onClose;
        layerParent.addEventListener('click', this._onClick.bind(this));
      }

      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.hidden) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var layerParent = this.refs.container.parentNode;

      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);

      if (this.props.onClose) {
        layerParent.removeEventListener('click', this._onClick.bind(this));
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      var layerContents = this.refs.container;

      if (layerContents && !layerContents.contains(event.target)) {
        this.props.onClose();
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

      if ((0, _typeof3.default)(this.props.closer) === 'object') {
        closer = this.props.closer;
      } else if (this.props.onClose && this.props.closer) {
        var closeLabel = _Intl2.default.getMessage(this.context.intl, 'Close');
        var layerLabel = _Intl2.default.getMessage(this.context.intl, 'Layer');
        var a11yTitle = closeLabel + ' ' + (this.props.a11yTitle || '') + ' ' + layerLabel;

        closer = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__closer" },
          _react2.default.createElement(
            _Button2.default,
            { plain: true, onClick: this.props.onClose },
            _react2.default.createElement(_Close2.default, { a11yTitle: a11yTitle })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: 'container', className: CLASS_ROOT + "__container" },
        _react2.default.createElement('a', { tabIndex: '-1', 'aria-hidden': 'true',
          ref: 'anchorStep' }),
        closer,
        this.props.children
      );
    }
  }]);
  return LayerContents;
}(_react.Component);

LayerContents.displayName = 'LayerContents';


LayerContents.propTypes = {
  a11yTitle: _react.PropTypes.string,
  closer: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.bool]),
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  onClose: _react.PropTypes.func,
  router: _react.PropTypes.any,
  store: _react.PropTypes.any
};

// Because Layer creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
LayerContents.childContextTypes = {
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  router: _react.PropTypes.any,
  store: _react.PropTypes.object
};

var Layer = function (_Component2) {
  (0, _inherits3.default)(Layer, _Component2);

  function Layer() {
    (0, _classCallCheck3.default)(this, Layer);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Layer).apply(this, arguments));
  }

  (0, _createClass3.default)(Layer, [{
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
        if (this._originalFocusedElement.focus) {
          this._originalFocusedElement.focus();
        } else if (this._originalFocusedElement.parentNode && this._originalFocusedElement.parentNode.focus) {
          // required for IE11 and Edge
          this._originalFocusedElement.parentNode.focus();
        }
      }

      this._removeLayer();
    }
  }, {
    key: '_classesFromProps',
    value: function _classesFromProps() {
      var classes = ['grommet', CLASS_ROOT];
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
      var appElements = document.querySelectorAll('.' + APP);
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
      var ariaHidden = hideOverlay || false;
      this._element.setAttribute('aria-hidden', ariaHidden);
      var grommetApps = document.querySelectorAll('.' + APP);

      if (grommetApps) {
        Array.prototype.slice.call(grommetApps).forEach(function (grommetApp) {
          grommetApp.setAttribute('aria-hidden', !ariaHidden);
        });
      }
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer() {
      this._element.className = this._classesFromProps().join(' ');
      var contents = _react2.default.createElement(LayerContents, (0, _extends3.default)({}, this.props, {
        history: this.context.history,
        intl: this.context.intl,
        router: this.context.router,
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
      return _react2.default.createElement('span', { style: { display: 'none' } });
    }
  }]);
  return Layer;
}(_react.Component);

Layer.displayName = 'Layer';
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
  router: _react.PropTypes.any,
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  store: _react.PropTypes.object
};

Layer.defaultProps = {
  align: 'center'
};
module.exports = exports['default'];