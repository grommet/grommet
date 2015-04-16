// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var MoreIcon = require('./icons/More');
var DropCaretIcon = require('./icons/DropCaret');

var Menu = React.createClass({

  propTypes: {
    colored: React.PropTypes.bool,
    colorIndex: React.PropTypes.number,
    direction: React.PropTypes.oneOf(['up', 'down', 'left', 'right']),
    icon: React.PropTypes.node,
    label: React.PropTypes.string,
    small: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      colored: false,
      direction: 'down',
      small: false
    };
  },

  mixins: [ReactLayeredComponent, KeyboardAccelerators],

  _layout: function () {
    // place container over control
    var controlElement = this.refs.control.getDOMNode();
    var layerElement = document.getElementById('menu-layer');
    var controlRect = controlElement.getBoundingClientRect();
    var windowWidth = window.innerWidth;

    // clear prior styling
    layerElement.style.left = '';
    layerElement.style.width = '';
    layerElement.style.top = '';

    var width = Math.min(
      Math.max(controlElement.offsetWidth, layerElement.offsetWidth),
      windowWidth);
    // align right edge and make at least as wide as the control
    // TODO: handle being on the right edge of the window with an icon control, go left
    // TODO: calculate border width instead of hard coding it here.
    var left = (controlRect.left + layerElement.offsetWidth) - width - 1;
    if ((left + width) > windowWidth) {
      left -= ((left + width) - windowWidth);
    }
    var top = controlRect.top - 1;
    if ('up' === this.props.direction) {
      // align bottom edge
      top = (controlRect.top + controlElement.offsetHeight) - layerElement.offsetHeight + 1;
    }

    layerElement.style.left = '' + left + 'px';
    layerElement.style.width = '' + width + 'px';
    layerElement.style.top = '' + top + 'px';
  },

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

  _onSink: function (event) {
    event.stopPropagation();
  },

  _onResize: function () {
    this._layout();
  },

  getInitialState: function () {
    return {
      controlFocused: false,
      active: false,
      inline: (! this.props.label && ! this.props.icon && ! this.props.collapse)
    };
  },

  _findScrollParent: function (element) {
    var parent = element.parentNode;
    while (parent) {
      // account for border the lazy way for now
      if (parent.scrollHeight > (parent.offsetHeight + 10)) {
        break;
      }
      parent = parent.parentNode;
    }
    return parent;
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

    var scrollParent;

    if (! this.state.active && prevState.active) {
      window.removeEventListener('resize', this._layout);
      document.body.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(activeKeyboardHandlers);
      
      scrollParent = this._findScrollParent(this.refs.control.getDOMNode());

      if (scrollParent) {
        scrollParent.removeEventListener('scroll', this._layout);
      }
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.active && ! prevState.active) {
      this._layout();
      window.addEventListener('resize', this._layout);
      document.body.addEventListener('click', this._onClose);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      scrollParent = this._findScrollParent(this.refs.control.getDOMNode());
      
      if (scrollParent) {
        scrollParent.addEventListener('scroll', this._layout);
      }
    }
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._layout);
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
    if (this.props.colored) {
      classes.push("menu--colored");
    }
    if (this.props.small) {
      classes.push("menu--small");
    }
    if (this.props.colorIndex) {
      classes.push("header-color-index-" + this.props.colorIndex);
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
