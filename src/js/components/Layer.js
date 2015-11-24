// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var CloseIcon = require('./icons/base/Close');
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var DOMUtils = require('../utils/DOM');
var Button = require('./Button');

var CLASS_ROOT = "layer";

var LayerContents = React.createClass({

  propTypes: {
    closer: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.bool
    ]),
    onClose: React.PropTypes.func,
    history: React.PropTypes.object,
    router: React.PropTypes.func,
    intl: React.PropTypes.object,
    a11yCloserTitle: React.PropTypes.string
  },

  // Because Layer creates a new DOM render context, the context
  // is not transfered. For now, we hard code these specific ones.
  // TODO: Either figure out how to introspect the context and transfer
  // whatever we find or have callers explicitly indicate which parts
  // of the context to transfer somehow.
  childContextTypes: {
    router: React.PropTypes.func,
    history: React.PropTypes.object,
    intl: React.PropTypes.object,
    store: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      router: this.props.router,
      history: this.props.history,
      intl: this.props.intl,
      store: this.props.store
    };
  },

  componentDidMount: function () {

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

  componentWillUnmount: function() {
    if (this.props.onClose) {
      KeyboardAccelerators.stopListeningToKeyboard(this, {
        tab: this._processTab,
        esc: this.props.onClose
      });
    }
  },

  _processTab: function (event) {
    var items = this.refs.container.getElementsByTagName('*');

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

  render: function () {
    var closer = null;
    if (this.props.closer) {
      closer = (
        <div className={CLASS_ROOT + "__closer"}>
          <Button type='icon' onClick={this.props.onClose}>
            <CloseIcon a11yTitle={this.props.a11yCloserTitle} />
          </Button>
        </div>
      );
    }

    return (
      <div ref="container" className={CLASS_ROOT + "__container"}>
        {closer}
        {this.props.children}
      </div>
    );
  }
});

var Layer = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    closer: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.bool
    ]),
    flush: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    peek: React.PropTypes.bool,
    onClose: React.PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.func,
    history: React.PropTypes.object,
    intl: React.PropTypes.object,
    store: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      align: 'center'
    };
  },

  componentDidMount: function () {
    this._originalFocusedElement = document.activeElement;
    this._addLayer();
    this._renderLayer();
  },

  componentDidUpdate: function () {
    this._renderLayer();
  },

  componentWillUnmount: function () {

    if (this._originalFocusedElement) {
      this._originalFocusedElement.focus();
    }

    this._removeLayer();
  },

  _classesFromProps: function () {
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

  _addLayer: function () {
    var element = document.createElement('div');
    if (this.props.id) {
      element.id = this.props.id;
    }
    element.className = this._classesFromProps().join(' ');
    this._element = document.body.insertBefore(element, document.body.firstChild);
  },

  _handleAriaHidden: function (hideOverlay) {
    this._element.setAttribute('aria-hidden', hideOverlay);

    // refactor
    Array.prototype.forEach.call(document.body.childNodes, function (currentChild) {
      if (currentChild !== this._element &&
        currentChild.nodeType === 1 &&
        currentChild.id !== 'skip-link-layer' &&
        currentChild.tagName.toLowerCase() !== 'script') {
        currentChild.setAttribute('aria-hidden', !hideOverlay);
      }
    }.bind(this));
  },

  _renderLayer: function () {
    this._element.className = this._classesFromProps().join(' ');
    var contents = (
      <LayerContents {...this.props}
        router={this.context.router}
        history={this.context.history}
        intl={this.context.intl}
        store={this.context.store} />
    );
    ReactDOM.render(contents, this._element);
    this._handleAriaHidden(this.props.hidden);
  },

  _removeLayer: function () {
    this._element.removeEventListener('animationend', this._onAnimationEnd);
    this._handleAriaHidden(true);

    ReactDOM.unmountComponentAtNode(this._element);
    document.body.removeChild(this._element);
    this._element = null;
  },

  render: function () {
    return (<span></span>);
  }

});

module.exports = Layer;
