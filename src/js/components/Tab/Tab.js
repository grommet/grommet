import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { TabsContext } from '../Tabs/TabsContext';
import { normalizeColor } from '../../utils';

import { StyledTab } from './StyledTab';

const Tab = forwardRef(
  (
    {
      disabled,
      children,
      icon,
      plain,
      title,
      onMouseOver,
      onMouseOut,
      reverse,
      ...rest
    },
    ref,
  ) => {
    const {
      active,
      activeIndex,
      onActivate,
      setActiveContent,
      setActiveTitle,
    } = useContext(TabsContext);
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [over, setOver] = useState(undefined);
    const [focus, setFocus] = useState(undefined);
    let normalizedTitle = title;
    const tabStyles = {};

    useEffect(() => {
      if (active) {
        setActiveContent(children);
        const activeTitle = typeof title === 'string' ? title : activeIndex + 1;
        setActiveTitle(activeTitle);
      }
    }, [
      active,
      activeIndex,
      children,
      setActiveContent,
      setActiveTitle,
      title,
    ]);

    const onMouseOverTab = event => {
      setOver(true);
      if (onMouseOver) {
        onMouseOver(event);
      }
    };

    const onMouseOutTab = event => {
      setOver(undefined);
      if (onMouseOut) {
        onMouseOut(event);
      }
    };

    const onClickTab = event => {
      if (event) {
        event.preventDefault();
      }
      onActivate();
    };

    if (active && disabled) {
      console.warn(
        // eslint-disable-next-line max-len
        `Warning: Tab props 'active' and 'disabled' have both been set to TRUE on the same Tab resulting in an interesting Tab state. Is this your intent?`,
      );
    }

    if (!plain) {
      if (typeof title !== 'string') {
        normalizedTitle = title;
      } else if (active) {
        normalizedTitle = <Text {...theme.tab.active}>{title}</Text>;
      } else if (disabled && theme.tab.disabled) {
        normalizedTitle = <Text {...theme.tab.disabled}>{title}</Text>;
      } else {
        normalizedTitle = (
          <Text color={over ? theme.tab.hover.color : theme.tab.color}>
            {title}
          </Text>
        );
      }

      if (theme.tab.border) {
        let borderColor =
          theme.tab.border.color || theme.global.control.border.color;
        if (active) {
          borderColor = theme.tab.border.active.color || borderColor;
        } else if (disabled && theme.tab.border.disabled) {
          borderColor = theme.tab.border.disabled.color || borderColor;
        } else if (over) {
          borderColor = theme.tab.border.hover.color || borderColor;
        }
        borderColor = normalizeColor(borderColor, theme);

        tabStyles.border = {
          side: theme.tab.border.side,
          size: theme.tab.border.size,
          color: borderColor,
        };
      }

      tabStyles.background = active
        ? theme.tab.active.background || theme.tab.background
        : theme.tab.background;
      tabStyles.pad = theme.tab.pad;
      tabStyles.margin = theme.tab.margin;
    }

    // needed to apply hover/active styles to the icon
    const renderIcon = iconProp => {
      if (active) {
        return React.cloneElement(iconProp, {
          ...theme.tab.active,
        });
      }
      if (disabled) {
        return React.cloneElement(iconProp, { ...theme.tab.disabled });
      }
      return React.cloneElement(iconProp, {
        color: over ? theme.tab.hover.color : theme.tab.color,
      });
    };

    let normalizedIcon;
    if (icon) {
      normalizedIcon = renderIcon(icon);
    }

    const first = reverse ? normalizedTitle : normalizedIcon;
    const second = reverse ? normalizedIcon : normalizedTitle;

    let withIconStyles;
    if (first && second) {
      withIconStyles = {
        direction: 'row',
        align: 'center',
        justify: 'center',
        gap: 'small',
      };
    }

    return (
      <Button
        ref={ref}
        plain
        role="tab"
        aria-selected={active}
        aria-expanded={active}
        disabled={disabled}
        {...rest}
        onClick={onClickTab}
        onMouseOver={onMouseOverTab}
        onMouseOut={onMouseOutTab}
        onFocus={() => {
          setFocus(true);
          if (onMouseOver) onMouseOver();
        }}
        onBlur={() => {
          setFocus(undefined);
          if (onMouseOut) onMouseOut();
        }}
        // ensure focus outline is not covered by hover styling
        // of adjacent tabs
        style={focus && { zIndex: 1 }}
      >
        <StyledTab
          as={Box}
          disabled={disabled}
          plain={plain}
          {...withIconStyles}
          {...tabStyles}
        >
          {first}
          {second}
        </StyledTab>
      </Button>
    );
  },
);

Tab.displayName = 'Tab';
Tab.defaultProps = {};
Object.setPrototypeOf(Tab.defaultProps, defaultProps);

let TabDoc;
if (process.env.NODE_ENV !== 'production') {
  TabDoc = require('./doc').doc(Tab); // eslint-disable-line global-require
}
const TabWrapper = TabDoc || Tab;

export { TabWrapper as Tab };
