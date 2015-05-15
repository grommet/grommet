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
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.align) {
      classes.push(CLASS_ROOT + "--align-" + this.props.align);
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
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
      <LayerContainer
        align={this.props.align}
        children={this.props.children}
        className={this.props.className}
        closer={this.props.closer}
        flush={this.props.flush}
        onClose={this.props.onClose}
        router={this.context.router} />
    );
  }

});

module.exports = Layer;
