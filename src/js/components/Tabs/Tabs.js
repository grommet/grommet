import React, { forwardRef, useCallback, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { TabsContext } from './TabsContext';
import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';
import { normalizeColor } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { TabsPropTypes } from './propTypes';

const Tabs = forwardRef(
  (
    {
      alignControls,
      children,
      flex,
      justify = 'center',
      messages,
      responsive = true,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { format } = useContext(MessageContext);
    const { activeIndex: propsActiveIndex, onActive } = rest;
    const [activeIndex, setActiveIndex] = useState(rest.activeIndex || 0);
    const [focusIndex, setFocusIndex] = useState(activeIndex);
    const [activeContent, setActiveContent] = useState();
    const [activeTitle, setActiveTitle] = useState();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabRefs = React.Children.map(children, () => React.createRef());

    const getTabsContext = useCallback(
      (index) => {
        const activateTab = (nextIndex) => {
          if (propsActiveIndex === undefined) {
            setActiveIndex(nextIndex);
          }
          if (onActive) {
            onActive(nextIndex);
          }
        };

        return {
          activeIndex,
          active: activeIndex === index,
          ref: tabRefs[index],
          onActivate: () => activateTab(index),
          setActiveContent,
          setActiveTitle,
        };
      },
      [activeIndex, onActive, propsActiveIndex, tabRefs],
    );

    const tabs = React.Children.map(children, (child, index) => (
      <TabsContext.Provider value={getTabsContext(index)}>
        {/* possible to have undefined child. in that case, you can't
        do cloneElement */}
        {child
          ? // cloneElement is needed for backward compatibility with custom
            // styled components that rely on props.active. We should reassess
            // if it is still necessary in our next major release.
            React.cloneElement(child, { active: activeIndex === index })
          : child}
      </TabsContext.Provider>
    ));

    const tabsHeaderStyles = {};
    if (theme.tabs.header && theme.tabs.header.border) {
      let borderColor =
        theme.tabs.header.border.color || theme.global.control.border.color;
      borderColor = normalizeColor(borderColor, theme);

      tabsHeaderStyles.border = {
        side: theme.tabs.header.border.side,
        size: theme.tabs.header.border.size,
        style: theme.tabs.header.border.style,
        color: borderColor,
      };
    }

    const tabContentTitle = `${activeTitle || ''} ${format({
      id: 'tabs.tabContents',
      messages,
    })}`;

    const onLeft = () => {
      if (focusIndex !== 0) {
        tabRefs[focusIndex - 1].current.focus();
        setFocusIndex(focusIndex - 1);
      }
    };

    const onRight = () => {
      if (focusIndex < tabRefs.length - 1) {
        tabRefs[focusIndex + 1].current.focus();
        setFocusIndex(focusIndex + 1);
      }
    };

    const onHome = () => {
      if (focusIndex !== 0 && tabRefs.length > 0) tabRefs[0].current.focus();
    };

    const onEnd = () => {
      if (focusIndex !== 0 && tabRefs.length > 0)
        tabRefs[tabRefs.length - 1].current.focus();
    };

    return (
      <Keyboard onLeft={onLeft} onRight={onRight} onHome={onHome} onEnd={onEnd}>
        <StyledTabs
          ref={ref}
          as={Box}
          role="tablist"
          flex={flex}
          responsive={responsive}
          {...rest}
          background={theme.tabs.background}
        >
          <StyledTabsHeader
            as={Box}
            direction="row"
            justify={justify}
            alignSelf={alignControls}
            flex={false}
            wrap
            background={theme.tabs.header.background}
            gap={theme.tabs.gap}
            onBlur={() => setFocusIndex(activeIndex)}
            {...tabsHeaderStyles}
          >
            {tabs}
          </StyledTabsHeader>
          <StyledTabPanel
            flex={flex}
            aria-label={tabContentTitle}
            role="tabpanel"
          >
            {activeContent}
          </StyledTabPanel>
        </StyledTabs>
      </Keyboard>
    );
  },
);

Tabs.displayName = 'Tabs';
Tabs.propTypes = TabsPropTypes;

export { Tabs };
