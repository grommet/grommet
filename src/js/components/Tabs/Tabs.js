import React, { cloneElement, Children, Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { withTheme } from '../hocs';

import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';

class Tabs extends Component {
  static defaultProps = {
    justify: 'center',
    messages: {
      tabContents: 'Tab Contents',
    },
    responsive: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeIndex } = nextProps;
    const { activeIndex: stateActiveIndex } = prevState;
    if (stateActiveIndex !== activeIndex && activeIndex !== undefined) {
      return { activeIndex };
    }
    return { activeIndex: stateActiveIndex || 0 };
  }

  state = {};

  activateTab = index => {
    const { activeIndex, onActive } = this.props;
    if (activeIndex === undefined) {
      this.setState({ activeIndex: index });
    }
    if (onActive) {
      onActive(index);
    }
  };

  render() {
    const {
      children,
      justify,
      messages: { tabContents },
      scrollable,
      theme,
      ...rest
    } = this.props;
    delete rest.activeIndex;
    delete rest.onActive;
    const { activeIndex } = this.state;

    let activeContent;
    let activeTitle;
    const tabs = Children.map(
      children,
      (tab, index) => {
        if (!tab) return undefined;

        const tabProps = tab.props || {};

        const isTabActive = index === activeIndex;

        if (isTabActive) {
          activeContent = tabProps.children;
          if (typeof tabProps.title === 'string') {
            activeTitle = tabProps.title;
          } else {
            activeTitle = index + 1;
          }
        }

        return cloneElement(tab, {
          active: isTabActive,
          onActivate: () => this.activateTab(index),
        });
      },
      this,
    );

    const tabContentTitle = `${activeTitle || ''} ${tabContents}`;

    return (
      <StyledTabs
        as={Box}
        role="tablist"
        {...rest}
        background={theme.tabs.background}
        theme={theme}
      >
        <StyledTabsHeader
          theme={theme}
          as={Box}
          direction="row"
          justify={justify}
          flex={false}
          wrap
          background={theme.tabs.header.background}
          gap={theme.tabs.gap}
        >
          {tabs}
        </StyledTabsHeader>
        <StyledTabPanel
          scrollable={scrollable}
          theme={theme}
          aria-label={tabContentTitle}
          role="tabpanel"
        >
          {activeContent}
        </StyledTabPanel>
      </StyledTabs>
    );
  }
}

let TabsDoc;
if (process.env.NODE_ENV !== 'production') {
  TabsDoc = require('./doc').doc(Tabs); // eslint-disable-line global-require
}
const TabsWrapper = compose(withTheme)(TabsDoc || Tabs);

export { TabsWrapper as Tabs };
