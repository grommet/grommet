// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var CloseIcon = require('./icons/Clear');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');

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
    router: React.PropTypes.func
  },

  childContextTypes: {
    router: React.PropTypes.func
  },

  mixins: [KeyboardAccelerators],

  getChildContext: function () {
    return {router: this.props.router};
  },

  componentDidMount: function () {
    if (this.props.onClose) {
      this.startListeningToKeyboard({esc: this.props.onClose});
    }
  },

  componentWillUnmount: function() {
    var appElement = document.querySelectorAll('div.app')[0];
    if (appElement) { // unit tests don't have an app
      appElement.classList.remove('app--layered');
      window.scroll(0, this._appScrollY);
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

      if (true === this.props.closer) {
        closer = (
          <div className={CLASS_ROOT + "__closer"}
            onClick={this.props.onClose}>
            <CloseIcon />
          </div>
        );
      } else {
        closer = (
          <div className={CLASS_ROOT + "__closer"}>
            {this.props.closer}
          </div>
        );
      }
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
    this._addOverlay();
    this._renderOverlay();
  },

  componentDidUpdate: function () {
    this._renderOverlay();
  },

  componentWillUnmount: function () {
    this._removeOverlay();
  },

  _addOverlay: function () {
    var overlay = document.createElement('div');
    if (overlay.classList) {
      overlay.classList.add('layer__overlay');
    } else {
      // unit test version
      overlay.className = 'layer__overlay';
    }
    this._overlay = document.body.insertBefore(overlay, document.body.firstChild);
    this._overlay = overlay;
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
    } else {
      if (this._overlay.classList) {
        this._overlay.classList.remove('layer__overlay--hidden');
      } else {
        this._overlay.className = 'layer__overlay';
      }
    }
  },

  _removeOverlay: function () {
    React.unmountComponentAtNode(this._overlay);
    document.body.removeChild(this._overlay);
    this._overlay = null;
  },

  render: function () {
    return (<span></span>);
  }

});

module.exports = Layer;
