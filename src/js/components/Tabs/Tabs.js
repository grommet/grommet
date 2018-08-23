import React, { cloneElement, Children, Component } from 'react';

import { Box } from '../';
import { doc } from './doc';

export class Tabs extends Component {
  static defaultProps = {
    justify: 'center',
    messages: {
      tabContents: 'Tab Contents',
    },
    responsive: true,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeIndex } = nextProps;
    const { activeIndex: stateActiveIndex } = prevState;
    if (stateActiveIndex !== activeIndex && activeIndex !== undefined) {
      return { activeIndex };
    }
    return { activeIndex: stateActiveIndex || 0 };
  }

  state = {}

  activateTab = (index) => {
    const { activeIndex, onActive } = this.props;
    if (activeIndex === undefined) {
      this.setState({ activeIndex: index });
    }
    if (onActive) {
      onActive(index);
    }
  }

  render() {
    const {
      children,
      justify,
      messages: { tabContents },
      ...rest
    } = this.props;
    delete rest.activeIndex;
    delete rest.onActive;
    const { activeIndex } = this.state;

    let activeContent;
    let activeTitle;
    const tabs = Children.map(children, (tab, index) => {
      if (!tab) return undefined;

      const tabProps = tab.props || {};

      const isTabActive = index === activeIndex;

      if (isTabActive) {
        activeContent = tabProps.children;
        activeTitle = tabProps.title;
      }

      return cloneElement(tab, {
        active: isTabActive,
        onActivate: () => this.activateTab(index),
      });
    }, this);

    const tabContentTitle = `${activeTitle || ''} ${tabContents}`;

    return (
      <div role='tablist'>
        <Box
          direction='row'
          justify={justify}
          {...rest}
        >
          {tabs}
        </Box>
        <div aria-label={tabContentTitle} role='tabpanel'>
          {activeContent}
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Tabs);
}
