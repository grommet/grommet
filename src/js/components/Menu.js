// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import Responsive from '../utils/Responsive';
import Box from './Box';
import Button from './Button';
import MoreIcon from './icons/base/More';
import DropCaretIcon from './icons/base/Down';

const CLASS_ROOT = 'menu';

// We have a separate module for the drop component
// so we can transfer the router context.
class MenuDrop extends Component {

  constructor() {
    super();

    this._onUpKeyPress = this._onUpKeyPress.bind(this);
    this._onDownKeyPress = this._onDownKeyPress.bind(this);
  }

  getChildContext () {
    return {
      intl: this.props.intl,
      history: this.props.history,
      router: this.props.router
    };
  }

  componentDidMount () {
    this._originalFocusedElement = document.activeElement;
    this._keyboardHandlers = {
      up: this._onUpKeyPress,
      down: this._onDownKeyPress
    };
    KeyboardAccelerators.startListeningToKeyboard(this, this._keyboardHandlers);
    let menuItems = ReactDOM.findDOMNode(this.refs.navContainer).childNodes;
    for (let i = 0; i < menuItems.length; i++) {
      let classes = menuItems[i].className.toString();
      let tagName = menuItems[i].tagName.toLowerCase();
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
  }

  componentWillUnmount () {
    this._originalFocusedElement.focus();
    KeyboardAccelerators.stopListeningToKeyboard(this, this._keyboardHandlers);
  }

  _onUpKeyPress (event) {
    let menuItems = ReactDOM.findDOMNode(this.refs.navContainer).childNodes;
    if (!this.activeMenuItem) {
      let lastMenuItem = menuItems[menuItems.length - 1];
      this.activeMenuItem = lastMenuItem;
    } else if (this.activeMenuItem.previousSibling) {
      this.activeMenuItem = this.activeMenuItem.previousSibling;
    }

    let classes = this.activeMenuItem.className.split(/\s+/);
    let tagName = this.activeMenuItem.tagName.toLowerCase();
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
  }

  _onDownKeyPress (event) {
    let menuItems = ReactDOM.findDOMNode(this.refs.navContainer).childNodes;
    if (!this.activeMenuItem) {
      this.activeMenuItem = menuItems[0];
    } else if (this.activeMenuItem.nextSibling) {
      this.activeMenuItem = this.activeMenuItem.nextSibling;
    }

    let classes = this.activeMenuItem.className.split(/\s+/);
    let tagName = this.activeMenuItem.tagName.toLowerCase();
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
  }

  render () {
    let classes = [`${CLASS_ROOT}__drop`];
    let other = pick(this.props, keys(Box.propTypes));

    let contents = [
      React.cloneElement(this.props.control, {key: 'control'}),
      <Box key="nav" ref="navContainer" tag="nav" {...other}
        className={`${CLASS_ROOT}__contents`}>
        {this.props.children}
      </Box>
    ];
    if (this.props.dropAlign.bottom) {
      contents.reverse();
    }
    if (this.props.dropAlign.right) {
      classes.push(`${CLASS_ROOT}__drop--align-right`);
    }
    if (this.props.dropColorIndex) {
      classes.push(`background-color-index-${this.props.dropColorIndex}`);
    }
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}__drop--${this.props.size}`);
    }

    return (
      <div ref="menuDrop" id={this.props.id} className={classes.join(' ')}
        onClick={this.props.onClick}>
        {contents}
      </div>
    );
  }
}

MenuDrop.propTypes = {
  control: PropTypes.node,
  dropAlign: Drop.alignPropType,
  dropColorIndex: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  router: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

MenuDrop.childContextTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  router: PropTypes.func
};

export default class Menu extends Component {

  constructor(props) {
    super(props);

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onSink = this._onSink.bind(this);
    this._onResponsive = this._onResponsive.bind(this);
    this._onFocusControl = this._onFocusControl.bind(this);
    this._onBlurControl = this._onBlurControl.bind(this);

    let inline;
    if (props.hasOwnProperty('inline')) {
      inline = props.inline;
    } else {
      inline = (! props.label && ! props.icon);
    }
    let responsive;
    if (props.hasOwnProperty('responsive')) {
      responsive = props.responsive;
    } else {
      responsive = (inline && 'row' === props.direction);
    }
    this.state = {
      // state may be 'collapsed', 'focused' or 'expanded' (active).
      state: 'collapsed',
      initialInline: inline,
      inline: inline,
      responsive: responsive,
      dropId: 'menuDrop'
    };
  }

  componentDidMount () {
    if (this.refs.control) {
      let controlElement = ReactDOM.findDOMNode(this.refs.control);
      this.setState({
        dropId: 'menu-drop-' + controlElement.getAttribute('data-reactid'),
        controlHeight: controlElement.clientHeight
      });
    }

    if (this.state.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.state !== prevState.state) {
      let activeKeyboardHandlers = {
        esc: this._onClose,
        tab: this._onClose
      };
      let focusedKeyboardHandlers = {
        space: this._onOpen,
        down: this._onOpen,
        enter: this._onOpen
      };

      switch (this.state.state) {
        case 'collapsed':
          KeyboardAccelerators.stopListeningToKeyboard(
            this, focusedKeyboardHandlers
          );
          KeyboardAccelerators.stopListeningToKeyboard(
            this, activeKeyboardHandlers
          );
          document.removeEventListener('click', this._onClose);
          if (this._drop) {
            this._drop.remove();
            this._drop = null;
          }
          break;
        case 'focused':
          KeyboardAccelerators.stopListeningToKeyboard(
            this, activeKeyboardHandlers
          );
          KeyboardAccelerators.startListeningToKeyboard(
            this, focusedKeyboardHandlers
          );
          break;
        case 'expanded':
          KeyboardAccelerators.stopListeningToKeyboard(
            this, focusedKeyboardHandlers
          );
          KeyboardAccelerators.startListeningToKeyboard(
            this, activeKeyboardHandlers
          );
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
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onClose);
    KeyboardAccelerators.stopListeningToKeyboard(this);
    if (this._drop) {
      this._drop.remove();
    }
    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _onOpen () {
    this.setState({state: 'expanded'});
  }

  _onClose () {
    this.setState({state: 'collapsed'});
  }

  _onSink (event) {
    event.stopPropagation();
    // need to go native to prevent closing via document
    event.nativeEvent.stopImmediatePropagation();
  }

  _onResponsive (small) {
    // deactivate if we change resolutions
    let newState = this.state.state;
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
  }

  _onFocusControl () {
    this.setState({state: 'focused'});
  }

  _onBlurControl () {
    if (this.state.state === 'focused') {
      this.setState({state: 'collapsed'});
    }
  }

  _renderControlContents (clickable) {
    let icon;
    let label;

    let controlClassName = `${CLASS_ROOT}__control`;

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
  }

  _renderDrop () {
    let other = pick(this.props, keys(Box.propTypes));

    let control = (
      <Button type="icon" className={`${CLASS_ROOT}__control`}
        style={{lineHeight: this.state.controlHeight + 'px'}}
        onClick={this._onClose}>
        {this._renderControlContents()}
      </Button>
    );

    let onClick;
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
  }

  _classes (prefix) {
    let classes = [prefix];

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
  }

  render () {
    let classes = this._classes(CLASS_ROOT);
    if (this.state.inline) {
      classes.push(`${CLASS_ROOT}--inline`);
    } else {
      classes.push(`${CLASS_ROOT}--controlled`);
      if (this.props.label) {
        classes.push(`${CLASS_ROOT}--labelled`);
      }
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.inline) {
      let other = pick(this.props, keys(Box.propTypes));

      return (
        <Box tag="nav" id={this.props.id} {...other}
          className={classes.join(' ')}>
          {this.props.children}
        </Box>
      );

    } else {
      classes.push(`${CLASS_ROOT}__control`);

      let controlContents = this._renderControlContents();
      let menuTitle = this.props.a11yTitle || this.props.label;

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
}

Menu.propTypes = {
  closeOnClick: PropTypes.bool,
  dropAlign: Drop.alignPropType,
  dropColorIndex: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string,
  primary: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Menu.contextTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  router: PropTypes.func
};

Menu.defaultProps = {
  a11yTitle: 'Menu',
  closeOnClick: true,
  direction: 'column',
  dropAlign: {top: 'top', left: 'left'},
  pad: 'none'
};
