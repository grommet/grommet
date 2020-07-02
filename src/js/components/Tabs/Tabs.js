import React, { forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { TabsContext } from './TabsContext';
import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';
import { normalizeColor } from '../../utils';

const Tabs = forwardRef(
  (
    {
      alignControls,
      children,
      flex,
      justify = 'center',
      messages = { tabContents: 'Tab Contents' },
      responsive = true,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { activeIndex: propsActiveIndex, onActive } = rest;
    const [activeIndex, setActiveIndex] = useState(rest.activeIndex || 0);
    const [activeContent, setActiveContent] = useState();
    const [activeTitle, setActiveTitle] = useState();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    const activateTab = index => {
      if (propsActiveIndex === undefined) {
        setActiveIndex(index);
      }
      if (onActive) {
        onActive(index);
      }
    };

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabs = React.Children.map(children, (child, index) => (
      <TabsContext.Provider
        value={{
          activeIndex,
          active: activeIndex === index,
          onActivate: () => activateTab(index),
          setActiveContent,
          setActiveTitle,
        }}
      >
        {child}
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

    const tabContentTitle = `${activeTitle || ''} ${messages.tabContents}`;

    return (
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
    );
  },
);

Tabs.displayName = 'Tabs';

let TabsDoc;
if (process.env.NODE_ENV !== 'production') {
  TabsDoc = require('./doc').doc(Tabs); // eslint-disable-line global-require
}
const TabsWrapper = TabsDoc || Tabs;

export { TabsWrapper as Tabs };
