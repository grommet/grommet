// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Intl = require('../utils/Intl');
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var Responsive = require('../utils/Responsive');
var Box = require('./Box');
var Button = require('./Button');
var MoreIcon = require('./icons/base/More');
var DropCaretIcon = require('./icons/base/Down');

var CLASS_ROOT = "menu";

// We have a separate module for the drop component
// so we can transfer the router context.
var MenuDrop = React.createClass({

  propTypes: merge({
    control: React.PropTypes.node,
    dropAlign: Drop.alignPropType,
    dropColorIndex: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    router: React.PropTypes.func,
    size: React.PropTypes.oneOf(['small', 'medium', 'large'])
  }, Box.propTypes),

  childContextTypes: {
    intl: React.PropTypes.object,
    history: React.PropTypes.object,
    router: React.PropTypes.func
  },

  getChildContext: function () {
    return {
      intl: this.props.intl,
      history: this.props.history,
      router: this.props.router
    };
  },

  componentDidMount: function () {
    this._keyboardHandlers = {
      up: this._onUpKeyPress,
      down: this._onDownKeyPress
    };
    KeyboardAccelerators.startListeningToKeyboard(this, this._keyboardHandlers);
    var menuItems = ReactDOM.findDOMNode(this.refs.navContainer).childNodes;
    for (var i = 0; i < menuItems.length; i++) {
      var classes = menuItems[i].className.toString();
      var tagName = menuItems[i].tagName.toLowerCase();
      // want to skip items of the menu that are not focusable.
      if (tagName !== 'button' && tagName !== 'a' &&
        classes.indexOf('check-box') === -1) {
        continue;
      }
      menuItems[i].setAttribute('role', 'menuitem');

      if (!menuItems[i].getAttribute('id')) {
        menuItems[i].setAttribute('id',
          menuItems[i].getAttribute('data-reactid'));
      }
    }
  },

  componentWillUnmount: function () {
    KeyboardAccelerators.stopListeningToKeyboard(this, this._keyboardHandlers);
  },

  _onUpKeyPress: function (event) {
    event.preventDefault();
    var menuItems = ReactDOM.findDOMNode(this.refs.navContainer).childNodes;
    if (!this.activeMenuItem) {
      var lastMenuItem = menuItems[menuItems.length - 1];
      this.activeMenuItem = lastMenuItem;
    } else if (this.activeMenuItem.previousSibling) {
      this.activeMenuItem = this.activeMenuItem.previousSibling;
    }

    var classes = this.activeMenuItem.className.split(/\s+/);
    var tagName = this.activeMenuItem.tagName.toLowerCase();
    // want to skip items of the menu that are not focusable.
    if (tagName !== 'button' && tagName !== 'a' &&
      classes.indexOf('check-box') === -1) {
      if (this.activeMenuItem === menuItems[0]) {
        return true;
      } else {
        // If this item is not focusable, check the next item.
        return this._onUpKeyPress(event);
      }
    }

    this.activeMenuItem.focus();
    this.refs.menuDrop.setAttribute('aria-activedescendant',
      this.activeMenuItem.getAttribute('id'));
    // Stops KeyboardAccelerators from calling the other listeners.
    // Works limilar to event.stopPropagation().
    return true;
  },

  _onDownKeyPress: function (event) {
    event.preventDefault();
    var menuItems = ReactDOM.findDOMNode(this.refs.navContainer).childNodes;
    if (!this.activeMenuItem) {
      this.activeMenuItem = menuItems[0];
    } else if (this.activeMenuItem.nextSibling) {
      this.activeMenuItem = this.activeMenuItem.nextSibling;
    }

    var classes = this.activeMenuItem.className.split(/\s+/);
    var tagName = this.activeMenuItem.tagName.toLowerCase();
    // want to skip items of the menu that are not focusable.
    if (tagName !== 'button' && tagName !== 'a' &&
      classes.indexOf('check-box') === -1) {
      if (this.activeMenuItem === menuItems[menuItems.length - 1]) {
        return true;
      } else {
        // If this item is not focusable, check the next item.
        return this._onDownKeyPress(event);
      }
    }

    this.activeMenuItem.focus();
    this.refs.menuDrop.setAttribute('aria-activedescendant',
      this.activeMenuItem.getAttribute('id'));
    // Stops KeyboardAccelerators from calling the other listeners.
    // Works limilar to event.stopPropagation().
    return true;
  },

  render: function () {
    var classes = [CLASS_ROOT + "__drop"];
    var other = pick(this.props, keys(Box.propTypes));

    var contents = [
      React.cloneElement(this.props.control, {key: 'control'}),
      <Box key="nav" ref="navContainer" tag="nav" {...other}
        className={CLASS_ROOT + '__contents'}>
        {this.props.children}
      </Box>
    ];
    if (this.props.dropAlign.bottom) {
      contents.reverse();
    }
    if (this.props.dropAlign.right) {
      classes.push(CLASS_ROOT + "__drop--align-right");
    }
    if (this.props.dropColorIndex) {
      classes.push("background-color-index-" + this.props.dropColorIndex);
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "__drop--" + this.props.size);
    }

    return (
      <div ref="menuDrop" id={this.props.id} className={classes.join(' ')}
        onClick={this.props.onClick}>
        {contents}
      </div>
    );
  }
});

var Menu = React.createClass({

  propTypes: merge({
    a11yTitle: React.PropTypes.string,
    closeOnClick: React.PropTypes.bool,
    collapse: React.PropTypes.bool, // deprecated, remove in 0.5
    dropAlign: Drop.alignPropType,
    dropColorIndex: React.PropTypes.string,
    icon: React.PropTypes.node,
    id: React.PropTypes.string,
    inline: React.PropTypes.bool,
    label: React.PropTypes.string,
    large: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool
  }, Box.propTypes),

  contextTypes: {
    intl: React.PropTypes.object,
    history: React.PropTypes.object,
    router: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      a11yTitle: 'Menu',
      closeOnClick: true,
      direction: 'column',
      dropAlign: {top: 'top', left: 'left'},
      pad: 'none',
      responsive: true
    };
  },

  getInitialState: function () {
    var inline;
    if (this.props.hasOwnProperty('inline')) {
      inline = this.props.inline;
    } else {
      inline = (! this.props.label && ! this.props.icon);
    }
    return {
      // state may be 'collapsed', 'focused' or 'expanded' (active).
      state: 'collapsed',
      initialInline: inline,
      inline: inline,
      dropId: 'menuDrop',
      size: this.props.size || (this.small ? 'small' :
        (this.props.large ? 'large' : null))
    };
  },

  componentDidMount: function () {
    if (this.refs.control) {
      var controlElement = ReactDOM.findDOMNode(this.refs.control);
      this.setState({
        dropId: 'menu-drop-' + controlElement.getAttribute('data-reactid'),
        controlHeight: controlElement.clientHeight
      });
    }

    if (this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.state !== prevState.state) {
      var activeKeyboardHandlers = {
        esc: this._onClose,
        tab: this._onClose
      };
      var focusedKeyboardHandlers = {
        space: this._onOpen,
        down: this._onOpen,
        enter: this._onOpen
      };

      switch (this.state.state) {
        case 'collapsed':
          KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
          KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
          document.removeEventListener('click', this._onClose);
          if (this._drop) {
            this._drop.remove();
            this._drop = null;
          }
          break;
        case 'focused':
          KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
          KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
          break;
        case 'expanded':
          KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
          KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);
          document.addEventListener('click', this._onClose);
          this._drop = Drop.add(ReactDOM.findDOMNode(this.refs.control),
            this._renderDrop(), this.props.dropAlign);
          this._drop.container.focus();
          this._drop.render(this._renderDrop());
          break;
      }
    } else if (this.state.state === 'expanded') {
      this._drop.render(this._renderDrop());
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onClose);
    KeyboardAccelerators.stopListeningToKeyboard(this);
    if (this._drop) {
      this._drop.remove();
    }
    if (this._responsive) {
      this._responsive.stop();
    }
  },

  _onOpen: function () {
    this.setState({state: 'expanded'});
  },

  _onClose: function () {
    this.setState({state: 'collapsed'});
    var element = ReactDOM.findDOMNode(this);
    if (document.activeElement === element) {
      this.setState({state: 'focused'});
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
      this.setState({inline: false, active: newState, controlCollapsed: true});
    } else {
      this.setState({
        inline: this.state.initialInline,
        active: newState,
        state: 'collapsed',
        controlCollapsed: false
      });
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

  _renderControlContents: function (clickable) {
    var icon;
    var label;

    var controlClassName = CLASS_ROOT + "__control";

    if (this.props.icon) {
      icon = React.cloneElement(this.props.icon, {key: 'icon'});
      // icon = this.props.icon;
    }
    if (this.state.controlCollapsed) {
      if (! icon) {
        icon = <MoreIcon key="icon" />;
      }
    } else if (this.props.label) {
      label = [
        <span key="label" className={controlClassName + "-label"}>
          {this.props.label}
        </span>,
        <DropCaretIcon key="caret" />
      ];
    } else if (! icon) {
      icon = <MoreIcon key="icon" />;
    }
    return [icon, label];
  },

  _renderDrop: function() {
    var other = pick(this.props, keys(Box.propTypes));

    var control = (
      <Button type="icon" className={CLASS_ROOT + "__control"}
        style={{lineHeight: this.state.controlHeight + 'px'}}
        onClick={this._onClose}>
        {this._renderControlContents()}
      </Button>
    );

    var onClick;
    if (this.props.closeOnClick) {
      onClick = this._onClose;
    } else {
      onClick = this._onSink;
    }
    return (
      <MenuDrop tabIndex="-1"
        intl={this.context.intl}
        history={this.context.history}
        router={this.context.router}
        dropAlign={this.props.dropAlign}
        dropColorIndex={this.props.dropColorIndex}
        size={this.state.size}
        {...other}
        onClick={onClick}
        id={this.state.dropId}
        control={control}>
        {this.props.children}
      </MenuDrop>
    );
  },

  _classes: function (prefix) {
    var classes = [prefix];

    if (this.props.direction) {
      classes.push(prefix + "--" + this.props.direction);
    }
    if (this.state.size) {
      classes.push(prefix + "--" + this.state.size);
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
        <Box tag="nav" id={this.props.id} {...other}
          className={classes.join(' ')}>
          {this.props.children}
        </Box>
      );

    } else {
      classes.push(CLASS_ROOT + "__control");

      var controlContents = this._renderControlContents();
      var menuTitle = Intl.getMessage(this.context.intl,
        this.props.label || this.props.a11yTitle);

      return (
        <Button ref="control" type="icon" id={this.props.id}
          className={classes.join(' ')}
          tabIndex="0"
          style={{lineHeight: this.state.controlHeight + 'px'}}
          onClick={this._onOpen}
          role="link" aria-label={menuTitle}
          onFocus={this._onFocusControl}
          onBlur={this._onBlurControl}>
          {controlContents}
        </Button>
      );

    }
  }
});

module.exports = Menu;
