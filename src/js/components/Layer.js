// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var CloseIcon = require('./icons/base/Close');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var DOMUtils = require('../utils/DOM');
var Button = require('./Button');

var CLASS_ROOT = "layer";

var LayerOverlay = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    closer: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.bool
    ]),
    flush: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    peek: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    router: React.PropTypes.func,
    a11yCloserTitle: React.PropTypes.string
  },

  childContextTypes: {
    router: React.PropTypes.func
  },

  mixins: [KeyboardAccelerators],

  getChildContext: function () {
    return {router: this.props.router};
  },

  componentDidMount: function () {

    var items = this.refs.background.getDOMNode().getElementsByTagName('*');
    var firstFocusable = DOMUtils.getBestFirstFocusable(items);
    if (firstFocusable) {
      firstFocusable.focus();
    }

    if (this.props.onClose) {
      this.startListeningToKeyboard({
        tab: this._processTab,
        esc: this.props.onClose
      });
    }
  },

  componentWillUnmount: function() {
    var appElement = document.querySelectorAll('div.app')[0];
    if (appElement) { // unit tests don't have an app
      appElement.classList.remove('app--layered');
      window.scroll(0, this._appScrollY);
    }

    if (this.props.onClose) {
      this.stopListeningToKeyboard({
        tab: this._processTab,
        esc: this.props.onClose
      });
    }
  },

  _processTab: function (event) {
    var items = this.refs.background.getDOMNode().getElementsByTagName('*');

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
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var closer = null;
    if (this.props.closer) {
      classes.push(CLASS_ROOT + "--closeable");

      closer = (
        <div className={CLASS_ROOT + "__closer"}>
          <Button type='icon' onClick={this.props.onClose}>
            <CloseIcon a11yTitle={this.props.a11yCloserTitle} />
          </Button>
        </div>
      );
    }

    return (
      <div ref="background" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          {closer}
          {this.props.children}
        </div>
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
    router: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      align: 'center'
    };
  },

  componentDidMount: function () {
    this._originalFocusedElement = document.activeElement;
    this._addOverlay();
    this._renderOverlay();
  },

  componentDidUpdate: function () {
    this._renderOverlay();
  },

  componentWillUnmount: function () {

    if (this._originalFocusedElement) {
      this._originalFocusedElement.focus();
    }

    this._removeOverlay();
  },

  _addOverlay: function () {
    var overlay = document.createElement('div');
    if (this.props.id) {
      overlay.id = this.props.id;
    }
    if (overlay.classList) {
      overlay.classList.add('layer__overlay');
    } else {
      // unit test version
      overlay.className = 'layer__overlay';
    }
    this._overlay = document.body.insertBefore(overlay, document.body.firstChild);
    this._overlay = overlay;
  },

  _handleAriaHidden: function (hideOverlay) {
    this._overlay.setAttribute('aria-hidden', hideOverlay);

    Array.prototype.forEach.call(document.body.childNodes, function (currentChild) {
      if (currentChild !== this._overlay &&
        currentChild.nodeType === 1 &&
        currentChild.id !== 'skip-link-layer' &&
        currentChild.tagName.toLowerCase() !== 'script') {
        currentChild.setAttribute('aria-hidden', !hideOverlay);
      }
    }.bind(this));
  },

  _renderOverlay: function () {
    var content = (<LayerOverlay {...this.props} router={this.context.router} />);
    React.render(content, this._overlay);

    if (this.props.hidden) {
      if (this._overlay.classList) {
        this._overlay.classList.add('layer__overlay--hidden');
      } else {
        this._overlay.className = 'layer__overlay layer__overlay--hidden';
      }

      this._handleAriaHidden(true);
    } else {
      if (this._overlay.classList) {
        this._overlay.classList.remove('layer__overlay--hidden');
      } else {
        this._overlay.className = 'layer__overlay';
      }

      this._handleAriaHidden(false);
    }
  },

  _removeOverlay: function () {
    this._handleAriaHidden(true);

    React.unmountComponentAtNode(this._overlay);
    document.body.removeChild(this._overlay);
    this._overlay = null;
  },

  render: function () {
    return (<span></span>);
  }

});

module.exports = Layer;
