import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';
import styled from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { withForwardRef, withTheme } from '../hocs';
import { normalizeColor } from '../../utils';

const ContainerBox = styled(Box)`
  max-height: inherit;

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }

  ${props => props.theme.menu.extend};
`;

class Menu extends Component {
  static defaultProps = {
    dropAlign: { top: 'top', left: 'left' },
    items: [],
    messages: { openMenu: 'Open Menu', closeMenu: 'Close Menu' },
  };

  state = { activeItemIndex: -1, open: false };

  buttonRefs = {};

  onDropClose = () => {
    this.setState({
      activeItemIndex: -1,
      open: false,
    });
  };

  onSelectMenuItem = event => {
    const { activeItemIndex } = this.state;
    if (activeItemIndex >= 0) {
      event.preventDefault();
      event.stopPropagation();
      /* eslint-disable react/no-find-dom-node */
      findDOMNode(this.buttonRefs[activeItemIndex]).click();
    }
  };

  onNextMenuItem = event => {
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
  };

  onPreviousMenuItem = event => {
    event.preventDefault();
    const { activeItemIndex, open } = this.state;
    if (!open) {
      this.setState({
        open: true,
        activeItemIndex: -1,
      });
    } else {
      const { items } = this.props;
      const index =
        activeItemIndex === -1
          ? items.length - 1
          : Math.max(activeItemIndex - 1, 0);
      this.setState({ activeItemIndex: index });
      // this.setState({ activeSuggestionIndex: index },
      //   this._announceSuggestion.bind(this, index));
    }
  };

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
    const iconColor = normalizeColor('control', theme);

    const content = children || (
      <Box
        direction="row"
        justify="start"
        align="center"
        pad="small"
        gap={label && icon !== false ? 'small' : undefined}
      >
        <Text size={size}>{label}</Text>
        {icon !== false
          ? (icon !== true && icon) || (
              <MenuIcon color={iconColor} size={size} />
            )
          : null}
      </Box>
    );

    const controlMirror = (
      <Box flex={false}>
        <Button
          a11yTitle={messages.closeMenu || 'Close Menu'}
          onClick={this.onDropClose}
        >
          {content}
        </Button>
      </Box>
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
        <DropButton
          ref={forwardRef}
          {...rest}
          a11yTitle={messages.openMenu || 'Open Menu'}
          disabled={disabled}
          dropAlign={dropAlign}
          dropTarget={dropTarget}
          open={open}
          theme={theme}
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          dropContent={
            <ContainerBox
              theme={theme}
              background={dropBackground || theme.menu.background}
            >
              {dropAlign.top === 'top' ? controlMirror : undefined}
              <Box overflow="auto">
                {items.map((item, index) => (
                  <Box key={`menuItem_${index + 0}`} flex={false}>
                    <Button
                      ref={ref => {
                        this.buttonRefs[index] = ref;
                      }}
                      active={activeItemIndex === index}
                      hoverIndicator="background"
                      disabled={!item.onClick && !item.href}
                      onClick={(...args) => {
                        item.onClick(...args);
                        if (item.close !== false) {
                          this.onDropClose();
                        }
                      }}
                      href={item.href}
                    >
                      <Box align="start" pad="small" direction="row">
                        {item.icon}
                        {item.label}
                      </Box>
                    </Button>
                  </Box>
                ))}
              </Box>
              {dropAlign.bottom === 'bottom' ? controlMirror : undefined}
            </ContainerBox>
          }
        >
          {content}
        </DropButton>
      </Keyboard>
    );
  }
}

let MenuDoc;
if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}
const MenuWrapper = compose(
  withTheme,
  withForwardRef
)(MenuDoc || Menu);

export { MenuWrapper as Menu };
