// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var CloseIcon = require('./icons/Clear');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');

var CLASS_ROOT = "layer";

var LayerContainer = React.createClass({

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

  _onClick: function (event) {
    if (this.props.onClose &&
      event.target === this.refs.background.getDOMNode()) {
      this.props.onClose();
    }
  },

  getChildContext: function () {
    return {router: this.props.router};
  },

  componentDidMount: function () {
    if (this.props.onClose) {
      this.startListeningToKeyboard({esc: this.props.onClose});
    }
    var appElement = document.querySelectorAll('div.app')[0];
    if (appElement) { // unit tests don't have an app
      this._appScrollY = window.scrollY;
      appElement.classList.add('app--layered');
      window.scroll(0, 0);
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
      <div ref="background" className={classes.join(' ')} onClick={this._onClick}>
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

  mixins: [ReactLayeredComponent],

  getDefaultProps: function () {
    return {
      align: 'center'
    };
  },

  render: function () {
    return (<span></span>);
  },

  renderLayer: function () {
    return (
      <LayerContainer {...this.props}
        router={this.context.router} />
    );
  }

});

module.exports = Layer;
