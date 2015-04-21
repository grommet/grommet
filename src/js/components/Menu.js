// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Overlay = require('../mixins/Overlay');
var MoreIcon = require('./icons/More');
var DropCaretIcon = require('./icons/DropCaret');

var Menu = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    collapse: React.PropTypes.bool,
    direction: React.PropTypes.oneOf(['up', 'down', 'left', 'right']),
    icon: React.PropTypes.node,
    label: React.PropTypes.string,
    small: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      align: 'left',
      direction: 'down',
      small: false
    };
  },

  mixins: [ReactLayeredComponent, KeyboardAccelerators, Overlay],

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({active: true});
  },

  _onClose: function () {
    this.setState({active: false});
  },

  _onFocusControl: function () {
    this.setState({controlFocused: true});
  },

  _onBlurControl: function () {
    this.setState({controlFocused: false});
  },

  getInitialState: function () {
    return {
      controlFocused: false,
      active: false,
      inline: (! this.props.label && ! this.props.icon && ! this.props.collapse)
    };
  },

  componentDidUpdate: function (prevProps, prevState) {

    // Set up keyboard listeners appropriate to the current state.

    var activeKeyboardHandlers = {
      esc: this._onClose,
      space: this._onClose,
      tab: this._onClose
    };
    var focusedKeyboardHandlers = {
      space: this._onOpen,
      down: this._onOpen
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.controlFocused && prevState.controlFocused) {
      this.stopListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (! this.state.active && prevState.active) {
      document.body.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(activeKeyboardHandlers);
      this.stopOverlay();
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.active && ! prevState.active) {
      document.body.addEventListener('click', this._onClose);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      var controlElement = this.refs.control.getDOMNode();
      var layerElement = document.getElementById('menu-layer');

      // give layer control element the same line height and font size as the control
      var layerControlElement = layerElement.querySelectorAll('.menu__control')[0];
      var fontSize = window.getComputedStyle(controlElement).fontSize;
      layerControlElement.style.fontSize = fontSize;
      layerControlElement.style.lineHeight = (controlElement.clientHeight) + 'px';

      this.startOverlay(controlElement, layerElement, this.props.align);
    }
  },

  componentWillUnmount: function () {
    document.body.removeEventListener('click', this._onClose);
  },

  _createControl: function () {
    var result = null;
    var icon = null;
    var controlClassName = "menu__control";

    var classes = [controlClassName];

    if (this.props.icon) {
      classes.push(controlClassName + "--labelled");
      icon = (
        <div className={controlClassName + "-icon control-icon"}>
          {this.props.icon}
        </div>
      );
    } else {
      classes.push(controlClassName +"--fixed-label");
      icon = (
        <div className={controlClassName + "-icon control-icon"}>
          <MoreIcon />
        </div>
      );
    }

    if (this.props.label) {
      result = (
        <div className={classes.join(' ')}>
          {icon}
          <span className={controlClassName + "-label"}>{this.props.label}</span>
          <DropCaretIcon className={controlClassName + "-drop-icon"} />
        </div>
      );
    } else {
      result = (
        <div className={controlClassName}>
          {icon}
        </div>
      );
    }
    return result;
  },

  render: function () {
    var classes = ["menu"];

    if (this.state.inline) {
      classes.push("menu--inline");
    } else {
      classes.push("menu--controlled");
    }
    if (this.props.direction) {
      classes.push("menu--" + this.props.direction);
    }
    if (this.props.align) {
      classes.push("menu--align-" + this.props.align);
    }
    if (this.props.small) {
      classes.push("menu--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.inline) {

      return (
        <div className={classes.join(' ')} onClick={this._onClose}>
          {this.props.children}
        </div>
      );

    } else {

      var controlContents = this._createControl();

      return (
        <div ref="control" className={classes.join(' ')}
          tabIndex="0"
          onClick={this._onOpen}
          onFocus={this._onFocusControl}
          onBlur={this._onBlurControl}>
          {controlContents}
        </div>
      );

    }
  },

  renderLayer: function() {
    if (this.state.active) {

      var controlContents = this._createControl();

      var first = null;
      var second = null;
      if ('up' === this.props.direction) {
        first = this.props.children;
        second = controlContents;
      } else {
        first = controlContents;
        second = this.props.children;
      }

      var classes = ["menu__layer"];

      if (this.props.direction) {
        classes.push("menu__layer--" + this.props.direction);
      }
      if (this.props.align) {
        classes.push("menu__layer--align-" + this.props.align);
      }
      if (this.props.small) {
        classes.push("menu__layer--small");
      }

      return (
        <div id="menu-layer" className={classes.join(' ')}
          onClick={this._onClose}>
          {first}
          {second}
        </div>
      );

    } else {
      return (<span />);
    }
  }

});

module.exports = Menu;
