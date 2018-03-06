import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { FormDown } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { DropButton } from '../DropButton';

import doc from './doc';

class Menu extends Component {
  static defaultProps = {
    dropAlign: { top: 'top', left: 'left' },
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
      dropAlign,
      dropTarget,
      icon,
      items,
      label,
      messages,
      onKeyDown,
      ...rest
    } = this.props;
    const { activeItemIndex, open } = this.state;

    const menuIcon = icon || <FormDown />;

    const content = (
      <Box
        direction='row'
        justify='start'
        align='center'
        pad='small'
        gap='small'
      >
        {label}
        {menuIcon}
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
            {...rest}
            a11yTitle={messages.openMenu || 'Open Menu'}
            dropAlign={dropAlign}
            dropTarget={dropTarget}
            open={open}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
            dropContent={
              <Box>
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

export default Menu;
