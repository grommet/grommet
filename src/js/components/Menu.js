// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Overlay = require('../mixins/Overlay');
var MoreIcon = require('./icons/More');
var DropCaretIcon = require('./icons/DropCaret');

var ROOT_CLASS = "menu";

var MenuLayer = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    router: React.PropTypes.func
  },

  childContextTypes: {
    router: React.PropTypes.func
  },

  getChildContext: function () {
    return { router: this.props.router };
  },

  render: function () {
    return (
      <div id="menu-layer" className={ROOT_CLASS + "__layer"}
        onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
});

var Menu = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    collapse: React.PropTypes.bool,
    direction: React.PropTypes.oneOf(['up', 'down', 'left', 'right']),
    icon: React.PropTypes.node,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    small: React.PropTypes.bool
  },

  contextTypes: {
    router: React.PropTypes.func
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
      document.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(activeKeyboardHandlers);
      this.stopOverlay();
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.active && ! prevState.active) {
      document.addEventListener('click', this._onClose);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      var controlElement = this.refs.control.getDOMNode();
      var layerElement = document.getElementById('menu-layer');
      var layerControlElement = layerElement.querySelectorAll("." + ROOT_CLASS + "__control")[0];
      var layerControlIconElement = layerElement.querySelectorAll('svg, img')[0];

      // give layer control element the same line height and font size as the control
      var fontSize = window.getComputedStyle(controlElement).fontSize;
      layerControlElement.style.fontSize = fontSize;
      var height = controlElement.clientHeight;
      if (layerControlIconElement && height <= layerControlIconElement.clientHeight) {
        // adjust to align with underlying control when control uses all height
        layerControlElement.style.marginTop = '-2px';
      }
      layerControlElement.style.height = height + 'px';
      layerControlElement.style.lineHeight = height + 'px';

      this.startOverlay(controlElement, layerElement, this.props.align);
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onClose);
  },

  _createControl: function () {
    var result = null;
    var icon = null;
    var controlClassName = ROOT_CLASS + "__control";

    var classes = [controlClassName];

    if (this.props.icon) {
      classes.push(controlClassName + "--labelled");
      icon = this.props.icon;
    } else {
      classes.push(controlClassName +"--fixed-label");
      icon = <MoreIcon />;
    }

    if (this.props.label) {
      result = (
        <div className={classes.join(' ')}>
          <div className={controlClassName + "-icon"}>
            {icon}
          </div>
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

  _classes: function (prefix) {
    var classes = [prefix];

    if (this.props.direction) {
      classes.push(prefix + "--" + this.props.direction);
    }
    if (this.props.align) {
      classes.push(prefix + "--align-" + this.props.align);
    }
    if (this.props.small) {
      classes.push(prefix + "--small");
    }
    if (this.props.primary) {
      classes.push(prefix + "--primary");
    }

    return classes;
  },

  render: function () {
    var classes = this._classes(ROOT_CLASS);
    if (this.state.inline) {
      classes.push(ROOT_CLASS + "--inline");
    } else {
      classes.push(ROOT_CLASS + "--controlled");
      if (this.props.label) {
        classes.push(ROOT_CLASS + "--labelled");
      }
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

      return (
        <MenuLayer router={this.context.router} onClick={this._onClose}>
          {first}
          {second}
        </MenuLayer>
      );

    } else {
      return (<span />);
    }
  }

});

module.exports = Menu;
