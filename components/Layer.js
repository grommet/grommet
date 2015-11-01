// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var CloseIcon = require('./icons/base/Close');
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var DOMUtils = require('../utils/DOM');
var Button = require('./Button');

var CLASS_ROOT = "layer";

var LayerContents = React.createClass({
  displayName: 'LayerContents',

  propTypes: {
    closer: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
    onClose: React.PropTypes.func,
    router: React.PropTypes.func,
    intl: React.PropTypes.object,
    a11yCloserTitle: React.PropTypes.string
  },

  childContextTypes: {
    router: React.PropTypes.func,
    intl: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return { router: this.props.router, intl: this.props.intl };
  },

  componentDidMount: function componentDidMount() {

    var items = this.refs.container.getElementsByTagName('*');
    var firstFocusable = DOMUtils.getBestFirstFocusable(items);
    if (firstFocusable) {
      firstFocusable.focus();
    }

    if (this.props.onClose) {
      KeyboardAccelerators.startListeningToKeyboard(this, {
        tab: this._processTab,
        esc: this.props.onClose
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.onClose) {
      KeyboardAccelerators.stopListeningToKeyboard(this, {
        tab: this._processTab,
        esc: this.props.onClose
      });
    }
  },

  _processTab: function _processTab(event) {
    var items = this.refs.background.getElementsByTagName('*');

    items = DOMUtils.filterByFocusable(items);

    if (event.shiftKey) {
      if (event.target === items[0]) {
        items[items.length - 1].focus();
        event.preventDefault();
      }
    } else {
      if (event.target === items[items.length - 1]) {
        items[0].focus();
        event.preventDefault();
      }
    }
  },

  render: function render() {
    var closer = null;
    if (this.props.closer) {
      closer = React.createElement(
        'div',
        { className: CLASS_ROOT + "__closer" },
        React.createElement(
          Button,
          { type: 'icon', onClick: this.props.onClose },
          React.createElement(CloseIcon, { a11yTitle: this.props.a11yCloserTitle })
        )
      );
    }

    return React.createElement(
      'div',
      { ref: 'container', className: CLASS_ROOT + "__container" },
      closer,
      this.props.children
    );
  }
});

var Layer = React.createClass({
  displayName: 'Layer',

  propTypes: {
    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    closer: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
    flush: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    peek: React.PropTypes.bool,
    onClose: React.PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.func,
    intl: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      align: 'center'
    };
  },

  componentDidMount: function componentDidMount() {
    this._originalFocusedElement = document.activeElement;
    this._addLayer();
    this._renderLayer();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount: function componentWillUnmount() {

    if (this._originalFocusedElement) {
      this._originalFocusedElement.focus();
    }

    this._removeLayer();
  },

  _classesFromProps: function _classesFromProps() {
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
  },

  _addLayer: function _addLayer() {
    var element = document.createElement('div');
    if (this.props.id) {
      element.id = this.props.id;
    }
    element.className = this._classesFromProps().join(' ');
    this._element = document.body.insertBefore(element, document.body.firstChild);
  },

  _handleAriaHidden: function _handleAriaHidden(hideOverlay) {
    this._element.setAttribute('aria-hidden', hideOverlay);

    // refactor
    Array.prototype.forEach.call(document.body.childNodes, (function (currentChild) {
      if (currentChild !== this._element && currentChild.nodeType === 1 && currentChild.id !== 'skip-link-layer' && currentChild.tagName.toLowerCase() !== 'script') {
        currentChild.setAttribute('aria-hidden', !hideOverlay);
      }
    }).bind(this));
  },

  _renderLayer: function _renderLayer() {
    this._element.className = this._classesFromProps().join(' ');
    var contents = React.createElement(LayerContents, _extends({}, this.props, { router: this.context.router, intl: this.context.intl }));
    ReactDOM.render(contents, this._element);
    this._handleAriaHidden(this.props.hidden);
  },

  _removeLayer: function _removeLayer() {
    this._element.removeEventListener('animationend', this._onAnimationEnd);
    this._handleAriaHidden(true);

    ReactDOM.unmountComponentAtNode(this._element);
    document.body.removeChild(this._element);
    this._element = null;
  },

  render: function render() {
    return React.createElement('span', null);
  }

});

module.exports = Layer;