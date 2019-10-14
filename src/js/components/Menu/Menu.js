import React, { useState } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import PropTypes from 'react-desc/lib/PropTypes';
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

/* Notes on keyboard interactivity (based on W3) // For details reference: https://www.w3.org/TR/wai-aria-practices/#menu

To open menu when menu button is focused:
- Space/Enter/Up arrow/Down arrow will open menu

To navigate within menu:
- Up/down arrow keys can be used and will loop through options
(keeping focus within the Menu)
- Tab can be used, but once the last menu item is reached, Tab will close the 
Menu and continue through page content.

To close the menu:
- Tabbing beyond the first or last menu item.
- Esc will close the menu
- Select a menu item

To make a selection:
- Enter key is pressed.
- Space is pressed.
*/

const Menu = props => {
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
    open,
    plain,
    size,
    theme,
    ...rest
  } = props;
  const MenuIcon = theme.menu.icons.down;
  const iconColor = normalizeColor('control', theme);
  const align = dropProps.align || dropAlign;
  const buttonRefs = {};
  const constants = { none: 'none' };
  const tab = 9;

  const [activeItemIndex, setActiveItemIndex] = useState(constants.none);
  const [isOpen, setOpen] = useState(open || false);

  const onDropClose = () => {
    setActiveItemIndex(constants.none);
    setOpen(false);
  };

  const onDropOpen = () => {
    setOpen(true);
  };

  const onSelectMenuItem = event => {
    if (isOpen) {
      if (activeItemIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();
        buttonRefs[activeItemIndex].click();
      }
    } else {
      onDropOpen();
    }
  };

  const onNextMenuItem = event => {
    event.preventDefault();
    if (!isOpen) {
      onDropOpen();
    } else if (
      (event.keyCode === tab || event.which === tab) &&
      activeItemIndex === items.length - 1
    ) {
      onDropClose(); // tab out of menu
    } else {
      let index;
      if (
        activeItemIndex + 1 === items.length ||
        activeItemIndex === constants.none
      ) {
        index = align.top === 'bottom' ? 0 : items.length;
      } else {
        index = activeItemIndex + 1;
      }
      setActiveItemIndex(index);
      buttonRefs[index].focus();
    }
  };

  const onPreviousMenuItem = event => {
    event.preventDefault();
    if (!isOpen) {
      onDropOpen();
    } else if (
      (event.keyCode === tab || event.which === tab) &&
      ((align.top === 'bottom' && activeItemIndex - 1 < 0) ||
        (align.top === 'top' && activeItemIndex - 1 < -1))
    ) {
      onDropClose(); // tab out of menu
    } else {
      let index;
      if (activeItemIndex - 1 < 0) {
        if (align.top === 'top' && activeItemIndex - 1 === -1) {
          index = items.length; // header menu button always end of buttonRefs
        } else {
          index = items.length - 1;
        }
      } else {
        index = activeItemIndex - 1;
      }
      setActiveItemIndex(index);
      buttonRefs[index].focus();
    }
  };

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
        ? (icon !== true && icon) || <MenuIcon color={iconColor} size={size} />
        : null}
    </Box>
  );

  const controlMirror = (
    <Box flex={false}>
      <Button
        ref={r => {
          // make it accessible at the end of all menu items
          buttonRefs[items.length] = r;
        }}
        a11yTitle={messages.closeMenu || 'Close Menu'}
        active={activeItemIndex === -1}
        focusIndicator={false}
        plain={plain}
        onClick={onDropClose}
        onFocus={() => setActiveItemIndex(-1)}
      >
        {typeof content === 'function'
          ? () => content({ ...props, drop: true })
          : content}
      </Button>
    </Box>
  );

  return (
    <Keyboard
      onDown={onNextMenuItem}
      onUp={onPreviousMenuItem}
      onEnter={onSelectMenuItem}
      onSpace={onSelectMenuItem}
      onEsc={onDropClose}
      onTab={onDropClose}
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
        open={isOpen}
        onOpen={onDropOpen}
        onClose={onDropClose}
        dropContent={
          <Keyboard
            onTab={event =>
              event.shiftKey ? onPreviousMenuItem(event) : onNextMenuItem(event)
            }
          >
            <ContainerBox background={dropBackground || theme.menu.background}>
              {align.top === 'top' ? controlMirror : undefined}
              <Box overflow="auto">
                {items.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box key={index} flex={false}>
                    <Button
                      ref={r => {
                        buttonRefs[index] = r;
                      }}
                      onFocus={() => setActiveItemIndex(index)}
                      active={activeItemIndex === index}
                      hoverIndicator="background"
                      focusIndicator={false}
                      {...{ ...item, icon: undefined, label: undefined }}
                      onClick={(...args) => {
                        if (item.onClick) {
                          item.onClick(...args);
                        }
                        if (item.close !== false) {
                          onDropClose();
                        }
                      }}
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
          </Keyboard>
        }
      >
        {content}
      </DropButton>
    </Keyboard>
  );
};

Menu.propTypes = {
  dropAlign: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
  dropProps: PropTypes.shape({}),
  items: PropTypes.arrayOf({}),
  messages: PropTypes.shape({
    openMenu: PropTypes.string,
    closeMenu: PropTypes.string,
  }),
  justifyContent: PropTypes.string,
};

Menu.defaultProps = {
  dropAlign: {
    top: 'top',
    left: 'left',
  },
  dropProps: {},
  items: [],
  messages: {
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu',
  },
  justifyContent: 'start',
};

Menu.displayName = 'Menu';

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
