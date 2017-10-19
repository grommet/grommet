import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { FormDown } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Drop } from '../Drop';

import doc from './doc';

class Menu extends Component {
  static defaultProps = {
    dropAlign: { top: 'top', left: 'left' },
  };

  state = {
    activeItemIndex: -1,
    showDrop: false,
  }

  buttonRefs = {}

  onDropClose = () => {
    this.setState({
      activeItemIndex: -1,
      showDrop: false,
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
    const { showDrop, activeItemIndex } = this.state;
    if (!showDrop) {
      this.setState({
        showDrop: true,
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
    const { showDrop, activeItemIndex } = this.state;
    if (!showDrop) {
      this.setState({
        showDrop: true,
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
      background,
      dropAlign,
      icon,
      id,
      items,
      label,
      messages = {},
      onKeyDown,
      ...rest
    } = this.props;
    const { activeItemIndex, showDrop } = this.state;

    const menuIcon = icon || <FormDown />;

    let labelNode;
    if (label) {
      labelNode = (
        <Box margin={{ right: 'small' }}>
          {label}
        </Box>
      );
    }
    const controlMirror = (
      <Button
        fill={true}
        a11yTitle={messages.closeMenu || 'Close Menu'}
        onClick={this.onDropClose}
      >
        <Box
          pad='small'
          direction='row'
          justify={dropAlign.right ? 'end' : 'start'}
        >
          {labelNode}{menuIcon}
        </Box>
      </Button>
    );

    let drop;
    if (showDrop) {
      drop = (
        <Drop
          id={id ? `menu-drop__${id}` : undefined}
          align={dropAlign}
          ref={(ref) => {
            this.dropRef = ref;
          }}
          control={this.componentRef}
          onClose={this.onDropClose}
        >
          <Box background={background}>
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
        </Drop>
      );
    }

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
          <Button
            id={id}
            ref={(ref) => {
              this.componentRef = ref;
            }}
            a11yTitle={messages.openMenu || 'Open Menu'}
            onClick={() => this.setState({ activeItemIndex: -1, showDrop: !this.state.showDrop })}
            {...rest}
          >
            <Box align='start' direction='row' pad='small'>
              {labelNode}
              {menuIcon}
            </Box>
          </Button>
          {drop}
        </div>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Menu);
}

export default Menu;
