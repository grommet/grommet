import React, { Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { withForwardRef } from '../hocs';
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
    dropProps: {},
    items: [],
    messages: { openMenu: 'Open Menu', closeMenu: 'Close Menu' },
    justifyContent: 'start',
  };

  buttonRefs = {};

  constructor(props) {
    super(props);

    this.state = { activeItemIndex: -1, open: props.open || false };
  }

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
      this.buttonRefs[activeItemIndex].click();
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
      dropProps,
      dropTarget,
      forwardRef,
      justifyContent,
      icon,
      items,
      label,
      messages,
      onKeyDown,
      plain,
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
        justify={justifyContent}
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
          plain={plain}
          onClick={this.onDropClose}
        >
          {typeof content === 'function'
            ? props => content({ ...props, drop: true })
            : content}
        </Button>
      </Box>
    );

    const align = dropProps.align || dropAlign;

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
          dropAlign={align}
          dropTarget={dropTarget}
          plain={plain}
          open={open}
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          dropContent={
            <ContainerBox background={dropBackground || theme.menu.background}>
              {align.top === 'top' ? controlMirror : undefined}
              <Box overflow="auto">
                {items.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box key={index} flex={false}>
                    <Button
                      ref={ref => {
                        this.buttonRefs[index] = ref;
                      }}
                      active={activeItemIndex === index}
                      hoverIndicator="background"
                      disabled={item.disabled}
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
              {align.bottom === 'bottom' ? controlMirror : undefined}
            </ContainerBox>
          }
        >
          {content}
        </DropButton>
      </Keyboard>
    );
  }
}

Object.setPrototypeOf(Menu.defaultProps, defaultProps);

let MenuDoc;
if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}
const MenuWrapper = compose(
  withTheme,
  withForwardRef,
)(MenuDoc || Menu);

export { MenuWrapper as Menu };
