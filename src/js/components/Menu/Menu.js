import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { DropButton } from '../DropButton';
import { Text } from '../Text';

import { withForwardRef, withTheme } from '../hocs';

import doc from './doc';

class Menu extends Component {
  static defaultProps = {
    dropAlign: { top: 'top', left: 'left' },
    items: [],
    messages: { openMenu: 'Open Menu', closeMenu: 'Close Menu' },
  };

  state = { activeItemIndex: -1, open: false }

  buttonRefs = {}

  onDropClose = () => {
    this.setState({
      activeItemIndex: -1,
      open: false,
    });
  }

  onSelectMenuItem = (event) => {
    const { activeItemIndex } = this.state;
    if (activeItemIndex >= 0) {
      event.preventDefault();
      event.stopPropagation();
      findDOMNode(this.buttonRefs[activeItemIndex]).click();
    }
  }

  onNextMenuItem = (event) => {
    event.preventDefault();
    const { activeItemIndex, open } = this.state;
    if (!open) {
      this.setState({
        open: true,
        activeItemIndex: -1,
      });
    } else {
      const { items } = this.props;
      const index = Math.min(activeItemIndex + 1, items.length - 1);
      this.setState({ activeItemIndex: index });
      // this.setState({ activeSuggestionIndex: index },
      //   this._announceSuggestion.bind(this, index));
    }
  }

  onPreviousMenuItem = (event) => {
    event.preventDefault();
    const { activeItemIndex, open } = this.state;
    if (!open) {
      this.setState({
        open: true,
        activeItemIndex: -1,
      });
    } else {
      const { items } = this.props;
      const index = (activeItemIndex === -1 ? (items.length - 1) :
        Math.max(activeItemIndex - 1, 0));
      this.setState({ activeItemIndex: index });
      // this.setState({ activeSuggestionIndex: index },
      //   this._announceSuggestion.bind(this, index));
    }
  }

  render() {
    const {
      children,
      disabled,
      dropAlign,
      dropBackground,
      dropTarget,
      forwardRef,
      icon,
      items,
      label,
      messages,
      onKeyDown,
      size,
      theme,
      ...rest
    } = this.props;
    const { activeItemIndex, open } = this.state;

    const MenuIcon = theme.menu.icons.down;

    const content = children || (
      <Box
        direction='row'
        justify='start'
        align='center'
        pad='small'
        gap={(label && icon !== false) ? 'small' : undefined}
      >
        <Text size={size}>{label}</Text>
        {(icon !== false) ?
          ((icon !== true && icon) || <MenuIcon color='brand' size={size} />)
          : null}
      </Box>
    );

    const controlMirror = (
      <Button
        fill={true}
        a11yTitle={messages.closeMenu || 'Close Menu'}
        onClick={this.onDropClose}
      >
        {content}
      </Button>
    );

    return (
      <Keyboard
        onEnter={this.onSelectMenuItem}
        onSpace={this.onSelectMenuItem}
        onDown={this.onNextMenuItem}
        onUp={this.onPreviousMenuItem}
        onEsc={this.onDropClose}
        onTab={this.onDropClose}
        onKeyDown={onKeyDown}
      >
        <div>
          <DropButton
            ref={forwardRef}
            {...rest}
            theme={theme}
            a11yTitle={messages.openMenu || 'Open Menu'}
            disabled={disabled}
            dropAlign={dropAlign}
            dropTarget={dropTarget}
            open={open}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
            dropContent={
              <Box background={dropBackground}>
                {dropAlign.top === 'top' ? controlMirror : undefined}
                <Box>
                  {items.map(
                    (item, index) => (
                      <Button
                        ref={(ref) => {
                          this.buttonRefs[index] = ref;
                        }}
                        active={activeItemIndex === index}
                        key={`menuItem_${index}`}
                        hoverIndicator='background'
                        onClick={item.onClick ? (...args) => {
                          item.onClick(...args);
                          if (item.close !== false) {
                            this.onDropClose();
                          }
                        } : undefined}
                        href={item.href}
                      >
                        <Box align='start' pad='small' direction='row'>
                          {item.icon}{item.label}
                        </Box>
                      </Button>
                    )
                  )}
                </Box>
                {dropAlign.bottom === 'bottom' ? controlMirror : undefined }
              </Box>
            }
          >
            {content}
          </DropButton>
        </div>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Menu);
}

export default compose(
  withTheme,
  withForwardRef,
)(Menu);
