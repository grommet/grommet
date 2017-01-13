// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import { filterByFocusable } from '../utils/DOM';
import Drop, { dropAlignPropType } from '../utils/Drop';
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
    let container = findDOMNode(this.menuDropRef);
    let items = container.getElementsByTagName('*');
    items = filterByFocusable(items);

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
    const container = findDOMNode(this.navContainerRef);
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
    // Stops KeyboardAccelerators from calling the other listeners.
    // Works limilar to event.stopPropagation().
    return true;
  }

  _onDownKeyPress (event) {
    event.preventDefault();
    const container = findDOMNode(this.navContainerRef);
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
    // Stops KeyboardAccelerators from calling the other listeners.
    // Works limilar to event.stopPropagation().
    return true;
  }

  render () {
    const {
      dropAlign, size, children, control, colorIndex, onClick, ...props
    } = this.props;
    const restProps = Props.omit(props, [
      ...Object.keys(MenuDrop.childContextTypes),
      ...Object.keys(MenuDrop.propTypes)
    ]);

    // Put nested Menus inline
    const menuDropChildren = React.Children.map(children, child => {
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
      <Box {...restProps} key="nav" ref={ref => this.navContainerRef = ref}
        tag="nav" className={`${CLASS_ROOT}__contents`}
        primary={false}>
        {menuDropChildren}
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
      <Box ref={ref => this.menuDropRef = ref} className={classes}
        colorIndex={colorIndex} onClick={onClick} focusable={false}>
        {contents}
      </Box>
    );
  }
}

MenuDrop.propTypes = {
  control: PropTypes.node,
  dropAlign: dropAlignPropType,
  dropColorIndex: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  router: PropTypes.any,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  store: PropTypes.any,
  ...Box.propTypes
};

MenuDrop.childContextTypes = {
  history: PropTypes.any,
  intl: PropTypes.any,
  router: PropTypes.any,
  store: PropTypes.any
};

export default class Menu extends Component {

  constructor(props, context) {
    super(props, context);

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._checkOnClose = this._checkOnClose.bind(this);
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
      responsive: responsive
    };
  }

  componentDidMount () {
    if (this.state.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.inline !== nextProps.inline ||
      this.props.icon !== nextProps.icon) {
      this.setState({
        inline: nextProps.hasOwnProperty('inline') ? nextProps.inline
          : (!nextProps.label && !nextProps.icon)
      });
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
          document.removeEventListener('click', this._checkOnClose);
          document.removeEventListener('touchstart', this._checkOnClose);
          if (this._drop) {
            this._drop.remove();
            this._drop = undefined;
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
          document.addEventListener('click', this._checkOnClose);
          document.addEventListener('touchstart', this._checkOnClose);
          this._drop = new Drop(findDOMNode(this._controlRef),
            this._renderMenuDrop(),
            {
              align: this.props.dropAlign,
              colorIndex: this.props.dropColorIndex,
              focusControl: true
            });
          break;
      }
    } else if (this.state.state === 'expanded') {
      this._drop.render(this._renderMenuDrop());
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._checkOnClose);
    document.removeEventListener('touchstart', this._checkOnClose);
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

  _checkOnClose (event) {
    const drop = findDOMNode(this._menuDrop);
    if (drop && !drop.contains(event.target)) {
      this._onClose();
    }
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

  _renderButtonProps () {
    const { icon, label } = this.props;
    let buttonIcon, buttonLabel;

    // If this is a collapsed inline Menu, use any icon and/or label provided,
    // revert to default icon if neither.
    if (icon) {
      buttonIcon = icon;
    }
    if (label) {
      buttonLabel = label;
      buttonIcon = <DropCaretIcon a11yTitle='menu-down' />;
    }
    if (! buttonIcon && ! buttonLabel) {
      buttonIcon = <MoreIcon />;
    }
    return { icon: buttonIcon, label: buttonLabel };
  }

  _renderMenuDrop () {
    let closeLabel = Intl.getMessage(this.context.intl, 'Close');
    let menuLabel = Intl.getMessage(this.context.intl, 'Menu');
    let menuTitle = (
      `${closeLabel} ${this.props.a11yTitle || this.props.label || ''} ` +
      `${menuLabel}`
    );

    let control = (
      <Button className={`${CLASS_ROOT}__control`} plain={true}
        a11yTitle={menuTitle} reverse={true}
        {...this._renderButtonProps()} onClick={this._onClose} />
    );

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    let onClick = this.props.closeOnClick ? this._onClose : this._onSink;

    return (
      <MenuDrop {...boxProps} {...this.context}
        dropAlign={this.props.dropAlign}
        size={this.props.size}
        onClick={onClick}
        control={control} ref={(ref) => this._menuDrop = ref}>
        {this.props.children}
      </MenuDrop>
    );
  }

  render () {
    const {
      a11yTitle, children, className, direction, fill, label, primary, size,
      pad, ...props
    } = this.props;
    delete props.closeOnClick;
    delete props.dropColorIndex;
    delete props.dropAlign;
    delete props.icon;
    delete props.inline;
    const { inline } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${direction}`]: direction,
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--primary`]: primary,
        [`${CLASS_ROOT}--inline`]: inline,
        [`${CLASS_ROOT}--controlled`]: !inline,
        [`${CLASS_ROOT}__control`]: !inline,
        [`${CLASS_ROOT}--labelled`]: !inline && label,
        [`${CLASS_ROOT}--fill`]: fill
      },
      className
    );

    if (inline) {
      let menuLabel;
      if ('explode' === inline) {
        menuLabel = (
          <div className={`${CLASS_ROOT}__label`}>
            {label}
          </div>
        );
      }

      return (
        <Box {...props} pad={pad} direction={direction} tag="nav"
          className={classes} primary={false}>
          {menuLabel}
          {children}
        </Box>
      );

    } else {
      const openLabel = Intl.getMessage(this.context.intl, 'Open');
      const menuLabel = Intl.getMessage(this.context.intl, 'Menu');
      const menuTitle = (
        `${openLabel} ${a11yTitle || label || ''} ` +
        `${menuLabel}`
      );

      return (
        <Box ref={ref => this._controlRef = ref} {...props} className={classes}>
          <Button plain={true} reverse={true}
            a11yTitle={menuTitle} {...this._renderButtonProps()}
            onClick={this._onOpen}
            onFocus={this._onFocusControl} onBlur={this._onBlurControl} />
        </Box>
      );

    }
  }
}

Menu.propTypes = {
  closeOnClick: PropTypes.bool,
  dropAlign: dropAlignPropType,
  dropColorIndex: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string,
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['expand'])]),
  fill: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Menu.contextTypes = {
  history: PropTypes.any,
  intl: PropTypes.any,
  router: PropTypes.any,
  store: PropTypes.any
};

Menu.defaultProps = {
  closeOnClick: true,
  direction: 'column',
  dropAlign: {top: 'top', left: 'left'},
  pad: 'none'
};
