// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import DOMUtils from '../utils/DOM';
import Drop from '../utils/Drop';
import Intl from '../utils/Intl';
import Props from '../utils/Props';
import Responsive from '../utils/Responsive';
import Box from './Box';
import Button from './Button';
import DropCaretIcon from './icons/base/Down';
import MoreIcon from './icons/base/More';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.MENU;

function isFunction (obj) {
  return obj && obj.constructor && obj.call && obj.apply;
}

// We have a separate module for the drop component
// so we can transfer the router context.
class MenuDrop extends Component {

  constructor(props, context) {
    super(props, context);

    this._onUpKeyPress = this._onUpKeyPress.bind(this);
    this._onDownKeyPress = this._onDownKeyPress.bind(this);
    this._processTab = this._processTab.bind(this);
  }

  getChildContext () {
    return {
      intl: this.props.intl,
      history: this.props.history,
      router: this.props.router,
      store: this.props.store
    };
  }

  componentDidMount () {
    this._originalFocusedElement = document.activeElement;
    this._keyboardHandlers = {
      tab: this._processTab,
      up: this._onUpKeyPress,
      left: this._onUpKeyPress,
      down: this._onDownKeyPress,
      right: this._onDownKeyPress
    };
    KeyboardAccelerators.startListeningToKeyboard(this, this._keyboardHandlers);

    let container = ReactDOM.findDOMNode(this.refs.navContainer);
    let menuItems = container.childNodes;
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
        menuItems[i].setAttribute('id', `menu_item_${i}`);
      }
    }

    container.setAttribute('aria-activedescendant',
      menuItems[0].getAttribute('id'));

    const menuDrop = ReactDOM.findDOMNode(this.refs.menuDrop);
    var items = menuDrop.getElementsByTagName('*');
    var firstFocusable = DOMUtils.getBestFirstFocusable(items);
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  componentWillUnmount () {
    if (this._originalFocusedElement.focus) {
      this._originalFocusedElement.focus();
    } else if (this._originalFocusedElement.parentNode &&
      this._originalFocusedElement.parentNode.focus) {
      // required for IE11 and Edge
      this._originalFocusedElement.parentNode.focus();
    }
    KeyboardAccelerators.stopListeningToKeyboard(this, this._keyboardHandlers);
  }

  _processTab (event) {
    let container = ReactDOM.findDOMNode(this.refs.menuDrop);
    var items = container.getElementsByTagName('*');
    items = DOMUtils.filterByFocusable(items);

    if (!items || items.length === 0) {
      event.preventDefault();
    } else {
      if (event.shiftKey) {
        if (event.target === items[0]) {
          items[items.length - 1].focus();
          event.preventDefault();
        }
      } else if (event.target === items[items.length - 1]) {
        items[0].focus();
        event.preventDefault();
      }
    }
  }

  _onUpKeyPress (event) {
    event.preventDefault();
    var container = ReactDOM.findDOMNode(this.refs.navContainer);
    let menuItems = container.childNodes;
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
    container.setAttribute('aria-activedescendant',
      this.activeMenuItem.getAttribute('id'));
    // Stops KeyboardAccelerators from calling the other listeners.
    // Works limilar to event.stopPropagation().
    return true;
  }

  _onDownKeyPress (event) {
    event.preventDefault();
    var container = ReactDOM.findDOMNode(this.refs.navContainer);
    let menuItems = container.childNodes;
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
    container.setAttribute('aria-activedescendant',
      this.activeMenuItem.getAttribute('id'));
    // Stops KeyboardAccelerators from calling the other listeners.
    // Works limilar to event.stopPropagation().
    return true;
  }

  render () {
    let { dropAlign, size, control, id, colorIndex, onClick } = this.props;
    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    // manage colorIndex at the outer menuDrop element
    delete boxProps.colorIndex;

    delete boxProps.onClick;

    delete boxProps.size;

    // Put nested Menus inline
    const children = React.Children.map(this.props.children, child => {
      let result = child;
      if (child && isFunction(child.type) &&
        child.type.prototype._renderMenuDrop) {
        result = React.cloneElement(child,
          {inline: 'explode', direction: 'column'});
      }
      return result;
    });

    let contents = [
      React.cloneElement(control, {key: 'control', fill: true}),
      <Box {...boxProps} key="nav" ref="navContainer"
        role="menu" tag="nav" className={`${CLASS_ROOT}__contents`}
        primary={false}>
        {children}
      </Box>
    ];

    if (dropAlign.bottom) {
      contents.reverse();
    }

    let classes = classnames(
      `${CLASS_ROOT}__drop`,
      {
        [`${CLASS_ROOT}__drop--align-right`]: dropAlign.right,
        [`${CLASS_ROOT}__drop--${size}`]: size
      }
    );

    return (
      <Box ref="menuDrop" id={id} className={classes} colorIndex={colorIndex}
        onClick={onClick}>
        {contents}
      </Box>
    );
  }
}

MenuDrop.propTypes = {
  ...Box.propTypes,
  control: PropTypes.node,
  dropAlign: Drop.alignPropType,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  router: PropTypes.any,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  store: PropTypes.any
};

MenuDrop.childContextTypes = {
  intl: PropTypes.any,
  history: PropTypes.any,
  router: PropTypes.any,
  store: PropTypes.any
};

export default class Menu extends Component {

  constructor(props, context) {
    super(props, context);

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
      let controlElement = this.refs.control.firstChild;
      this.setState({
        dropId: 'menu-drop-' + DOMUtils.generateId(controlElement),
        controlHeight: controlElement.clientHeight
      });
    }

    if (this.state.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.inline !== nextProps.inline) {
      this.setState({ inline: nextProps.inline });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.state !== prevState.state) {
      let activeKeyboardHandlers = {
        esc: this._onClose
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
          this._drop = Drop.add(this.refs.control,
            this._renderMenuDrop(),
            {
              align: this.props.dropAlign,
              colorIndex: this.props.dropColorIndex
            });
          this._drop.render(this._renderMenuDrop());
          break;
      }
    } else if (this.state.state === 'expanded') {
      this._drop.render(this._renderMenuDrop());
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

  _renderControlContents () {
    let icon, label;

    // If this is a collapsed inline Menu, use any icon and/or label provided,
    // revert to default icon if neither.
    if (this.props.icon) {
      icon = React.cloneElement(this.props.icon, {key: 'icon'});
    }
    if (this.props.label) {
      label = [
        <span key="label" className={`${CLASS_ROOT}__control-label`}>
          {this.props.label}
        </span>,
        <DropCaretIcon key="caret" a11yTitle='menu-down'
          a11yTitleId='menu-down-id' />
      ];
    }
    if (! icon && ! label) {
      icon = <MoreIcon key="icon" />;
    }
    return [icon, label];
  }

  _renderMenuDrop () {
    let closeLabel = Intl.getMessage(this.context.intl, 'Close');
    let menuLabel = Intl.getMessage(this.context.intl, 'Menu');
    let menuTitle = (
      `${closeLabel} ${this.props.a11yTitle || this.props.label || ''} ` +
      `${menuLabel}`
    );

    let control = (
      <Button plain={true} className={`${CLASS_ROOT}__control`}
        a11yTitle={menuTitle}
        style={{lineHeight: this.state.controlHeight + 'px'}}
        onClick={this._onClose}>
        {this._renderControlContents()}
      </Button>
    );

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    let onClick = this.props.closeOnClick ? this._onClose : this._onSink;

    return (
      <MenuDrop {...boxProps} {...this.context}
        dropAlign={this.props.dropAlign}
        size={this.props.size}
        onClick={onClick}
        id={this.state.dropId}
        control={control}>
        {this.props.children}
      </MenuDrop>
    );
  }

  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.direction}`]: this.props.direction,
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--primary`]: this.props.primary,
        [`${CLASS_ROOT}--inline`]: this.state.inline,
        [`${CLASS_ROOT}--explode`]: 'explode' === this.state.inline,
        [`${CLASS_ROOT}--controlled`]: !this.state.inline,
        [`${CLASS_ROOT}__control`]: !this.state.inline,
        [`${CLASS_ROOT}--labelled`]: !this.state.inline && this.props.label
      }
    );

    if (this.state.inline) {
      let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
      let label;
      if ('explode' === this.state.inline) {
        label = (
          <div className={`${CLASS_ROOT}__label`}>
            {this.props.label}
          </div>
        );
      }

      return (
        <Box {...boxProps} tag="nav" id={this.props.id}
          className={classes} primary={false}>
          {label}
          {this.props.children}
        </Box>
      );

    } else {
      let controlContents = this._renderControlContents();
      let openLabel = Intl.getMessage(this.context.intl, 'Open');
      let menuLabel = Intl.getMessage(this.context.intl, 'Menu');
      let menuTitle = (
        `${openLabel} ${this.props.a11yTitle || this.props.label || ''} ` +
        `${menuLabel}`
      );

      return (
        <div ref="control">
          <Button plain={true} id={this.props.id}
            className={classes}
            tabIndex="0"
            style={{lineHeight: this.state.controlHeight + 'px'}}
            onClick={this._onOpen}
            a11yTitle={menuTitle}
            onFocus={this._onFocusControl}
            onBlur={this._onBlurControl}>
            {controlContents}
          </Button>
        </div>
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
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['expand'])]),
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Menu.contextTypes = {
  intl: PropTypes.any,
  history: PropTypes.any,
  router: PropTypes.any,
  store: PropTypes.any
};

Menu.defaultProps = {
  closeOnClick: true,
  direction: 'column',
  dropAlign: {top: 'top', left: 'left'},
  pad: 'none'
};
