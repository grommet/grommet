// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var Responsive = require('../utils/Responsive');
var Box = require('./Box');
var MoreIcon = require('./icons/More');
var DropCaretIcon = require('./icons/DropCaret');

var CLASS_ROOT = "menu";

// We have a separate module for the drop component so we can transfer the router context.
var MenuDrop = React.createClass({

  propTypes: merge({
    control: React.PropTypes.node,
    dropAlign: Drop.alignPropType,
    dropColorIndex: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    large: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    router: React.PropTypes.func,
    small: React.PropTypes.bool
  }, Box.propTypes),

  childContextTypes: {
    router: React.PropTypes.func
  },

  mixins: [KeyboardAccelerators],

  componentDidMount: function () {
    this._keyboardHandlers = {
      up: this._onUpKeyPress,
      down: this._onDownKeyPress
    };
    this.startListeningToKeyboard(this._keyboardHandlers);
  },

  componentWillUnmount: function () {
    this.stopListeningToKeyboard(this._keyboardHandlers);
  },

  _onUpKeyPress: function (event) {
    if (!this.activeMenuItem) {
      var menuItems = this.refs.navContainer.getDOMNode().childNodes;
      var lastMenuItem = menuItems[menuItems.length - 1];
      this.activeMenuItem = lastMenuItem;
    } else if (this.activeMenuItem.previousSibling) {
      this.activeMenuItem = this.activeMenuItem.previousSibling;
    }

    this.activeMenuItem.focus();
    // Stops KeyboardAccelerators from calling the other listeners. Works limilar to event.stopPropagation().
    return true;
  },

  _onDownKeyPress: function (event) {
    if (!this.activeMenuItem) {
      this.activeMenuItem = this.refs.navContainer.getDOMNode().childNodes[0];
    } else if (this.activeMenuItem.nextSibling) {
      this.activeMenuItem = this.activeMenuItem.nextSibling;
    }

    this.activeMenuItem.focus();
    // Stops KeyboardAccelerators from calling the other listeners. Works limilar to event.stopPropagation().
    return true;
  },

  getChildContext: function () {
    return { router: this.props.router };
  },

  render: function () {
    var classes = [CLASS_ROOT + "__drop"];
    var other = pick(this.props, keys(Box.propTypes));

    var first = this.props.control;
    var second = (
      <Box ref="navContainer" tag="nav" {...other} >
        {this.props.children}
      </Box>
    );
    if (this.props.dropAlign.bottom) {
      first = second;
      second = this.props.control;
    }
    if (this.props.dropAlign.right) {
      classes.push(CLASS_ROOT + "__drop--align-right");
    }
    if (this.props.dropColorIndex) {
      classes.push("background-color-index-" + this.props.dropColorIndex);
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "__drop--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "__drop--small");
    }

    return (
      <div id={this.props.id} className={classes.join(' ')}
        onClick={this.props.onClick}>
        {first}
        {second}
      </div>
    );
  }
});

var Menu = React.createClass({

  propTypes: merge({
    closeOnClick: React.PropTypes.bool,
    collapse: React.PropTypes.bool, // deprecated, remove in 0.5
    dropAlign: Drop.alignPropType,
    dropColorIndex: React.PropTypes.string,
    icon: React.PropTypes.node,
    inline: React.PropTypes.bool,
    label: React.PropTypes.string,
    large: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    small: React.PropTypes.bool
  }, Box.propTypes),

  contextTypes: {
    router: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      align: 'stretch',
      closeOnClick: true,
      direction: 'column',
      dropAlign: {top: 'top', left: 'left'},
      pad: 'none',
      small: false,
      responsive: true
    };
  },

  mixins: [KeyboardAccelerators],

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({state: 'expanded'});
  },

  _onClose: function () {
    this.setState({state: 'collapsed'});
    if (document.activeElement === this.getDOMNode()) {
      this.setState({state: 'focused'});
    } else {
      this.getDOMNode().focus();
    }
  },

  _onFocusControl: function () {
    this.setState({state: 'focused'});
  },

  _onBlurControl: function () {
    if (this.state.state === 'focused') {
      this.setState({state: 'collapsed'});
    }
  },

  _onSink: function (event) {
    event.stopPropagation();
    // need to go native to prevent closing via document
    event.nativeEvent.stopImmediatePropagation();
  },

  _onResponsive: function (small) {
    // deactivate if we change resolutions
    var newState = this.state.state;
    if (this.state.state === 'expanded') {
      newState = 'focused';
    }
    if (small) {
      this.setState({inline: false, active: newState});
    } else {
      this.setState({inline: this.props.inline, active: newState});
    }
  },

  getInitialState: function () {
    if (this.props.hasOwnProperty('collapse')) {
      console.log('The Grommet Menu "collapse" property is deprecated. Please use "inline" instead.'); // TODO: remove this message in version 0.4.0
    }
    var inline;
    if (this.props.hasOwnProperty('inline')) {
      inline = this.props.inline;
    } else {
      inline = (! this.props.label && ! this.props.icon);
    }
    return {
      // state may be 'collapsed', 'focused' or 'expanded' (active).
      state: 'collapsed',
      inline: inline
    };
  },

  componentDidMount: function () {
    if (this.refs.control) {
      var controlElement = this.refs.control.getDOMNode();
      this.setState({
        dropId: 'menu-drop-' + controlElement.getAttribute('data-reactid')
      });
    }

    if (this.props.inline && this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
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

    switch (this.state.state) {
      case 'collapsed':
        this.stopListeningToKeyboard(focusedKeyboardHandlers);
        this.stopListeningToKeyboard(activeKeyboardHandlers);
        document.removeEventListener('click', this._onClose);
        if (this._drop) {
          this._drop.remove();
          this._drop = null;
        }
        break;
      case 'focused':
        this.stopListeningToKeyboard(activeKeyboardHandlers);
        this.startListeningToKeyboard(focusedKeyboardHandlers);
        break;
      case 'expanded':
        this.stopListeningToKeyboard(focusedKeyboardHandlers);
        this.startListeningToKeyboard(activeKeyboardHandlers);
        if (prevState.state !== 'expanded') {
          document.addEventListener('click', this._onClose);
          this._drop = Drop.add(this.refs.control.getDOMNode(),
            this._renderDrop(), this.props.dropAlign);
          this._drop.container.focus();
        }
        this._drop.render(this._renderDrop());
        break;
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onClose);
    if (this._drop) {
      this._drop.remove();
    }
    if (this._responsive) {
      this._responsive.stop();
    }
  },

  _renderControl: function () {
    var result = null;
    var icon = null;
    var controlClassName = CLASS_ROOT + "__control";

    var classes = [controlClassName];

    if (this.props.icon) {
      classes.push(controlClassName + "--labelled");
      icon = this.props.icon;
    } else {
      classes.push(controlClassName + "--fixed-label");
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

  _renderDrop: function() {
    var other = pick(this.props, keys(Box.propTypes));

    var controlContents = (
      <div onClick={this._onClose}>
        {this._renderControl()}
      </div>
    );

    var onClick;
    if (this.props.closeOnClick) {
      onClick = this._onClose;
    } else {
      onClick = this._onSink;
    }
    return (
      <MenuDrop router={this.context.router}
        dropAlign={this.props.dropAlign}
        dropColorIndex={this.props.dropColorIndex}
        small={this.props.small}
        large={this.props.large}
        {...other}
        onClick={onClick}
        id={this.state.dropId}
        control={controlContents}>
        {this.props.children}
      </MenuDrop>
    );
  },

  _classes: function (prefix) {
    var classes = [prefix];

    if (this.props.direction) {
      classes.push(prefix + "--" + this.props.direction);
    }
    if (this.props.align) {
      classes.push(prefix + "--align-" + this.props.align);
    }
    if (this.props.large) {
      classes.push(prefix + "--large");
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
    var classes = this._classes(CLASS_ROOT);
    if (this.state.inline) {
      classes.push(CLASS_ROOT + "--inline");
    } else {
      classes.push(CLASS_ROOT + "--controlled");
      if (this.props.label) {
        classes.push(CLASS_ROOT + "--labelled");
      }
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.inline) {
      var other = pick(this.props, keys(Box.propTypes));

      return (
        <Box tag="nav" {...other} className={classes.join(' ')} onClick={this._onClose}>
          {this.props.children}
        </Box>
      );

    } else {

      var controlContents = this._renderControl();

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
  }
});

module.exports = Menu;
