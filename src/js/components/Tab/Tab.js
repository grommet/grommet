import React, { forwardRef, useContext, useState } from 'react';

import { Button } from '../Button';
import { Text } from '../Text';
import { TabsContext } from '../Tabs/TabsContext';
import { normalizeColor, useForwardedRef } from '../../utils';

import { StyledTab } from './StyledTab';
import { TabPropTypes } from './propTypes';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { useThemeValue } from '../../utils/useThemeValue';

const Tab = forwardRef(
  (
    {
      active: activeProp, // don't pass with rest
      disabled,
      children,
      icon,
      plain,
      title,
      onBlur,
      onFocus,
      onMouseOver,
      onMouseOut,
      reverse,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const {
      active,
      activeIndex,
      focusable,
      index,
      panelId,
      ref: tabsContextRef,
      tabId,
      onActivate,
      onNext,
      onPrevious,
      onFirst,
      onLast,
      setActiveContent,
      setActiveTitle,
      setFocusIndex,
    } = useContext(TabsContext);
    const { theme, passThemeFlag } = useThemeValue();
    const [over, setOver] = useState(undefined);
    let normalizedTitle = title;
    const tabStyles = {};
    const tabRef = useForwardedRef(ref);

    useLayoutEffect(() => {
      if (tabRef.current && tabsContextRef) {
        tabsContextRef.current = tabRef.current;
      }
    });

    useLayoutEffect(() => {
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

    const onMouseOverTab = (event) => {
      setOver(true);
      if (onMouseOver) {
        onMouseOver(event);
      }
    };

    const onMouseOutTab = (event) => {
      setOver(undefined);
      if (onMouseOut) {
        onMouseOut(event);
      }
    };

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
    }

    const onClickTab = (event) => {
      if (event) {
        event.preventDefault();
      }
      onActivate();
      if (onClick) {
        onClick(event);
      }
    };

    const onKeyDownTab = (event) => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onPrevious();
          break;
        case 'Home':
          event.preventDefault();
          onFirst();
          break;
        case 'End':
          event.preventDefault();
          onLast();
          break;
        case 'Enter':
        case ' ':
        case 'Spacebar':
          event.preventDefault();
          onActivate();
          break;
        default:
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
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
    const renderIcon = (iconProp) => {
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
        gap: theme.tab?.gap,
      };
    }

    return (
      <Button
        ref={tabRef}
        plain
        id={tabId}
        role="tab"
        tabIndex={focusable ? 0 : -1}
        aria-controls={panelId}
        aria-selected={active}
        disabled={disabled}
        {...rest}
        onClick={onClickTab}
        onKeyDown={onKeyDownTab}
        onMouseOver={onMouseOverTab}
        onMouseOut={onMouseOutTab}
        onFocus={(event) => {
          if (onFocus) onFocus(event);
          setFocusIndex(index);
        }}
        onBlur={(event) => {
          if (onBlur) onBlur(event);
          setFocusIndex(-1);
        }}
      >
        <StyledTab
          disabled={disabled}
          plain={plain}
          {...withIconStyles}
          {...tabStyles}
          {...passThemeFlag}
        >
          {first}
          {second}
        </StyledTab>
      </Button>
    );
  },
);

Tab.displayName = 'Tab';
Tab.propTypes = TabPropTypes;

export { Tab };
