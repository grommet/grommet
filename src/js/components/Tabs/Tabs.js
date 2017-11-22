import React, { cloneElement, Children, Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';

import { withTheme } from '../hocs';

import doc from './doc';

class Tabs extends Component {
  static defaultProps = {
    children: [],
    activeIndex: 0,
    justify: 'center',
    messages: {
      tabContents: 'Tab Contents',
    },
    responsive: true,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex === (nextProps.activeIndex || 0) &&
      this.state.activeIndex !== nextProps.activeIndex) {
      this.setState({ activeIndex: nextProps.activeIndex });
    }
  }

  activateTab = (index) => {
    if (!this.props.activeIndex) {
      this.setState({ activeIndex: index });
    }
    if (this.props.onActive) {
      this.props.onActive(index);
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

    let activeContainer;
    let activeTitle;
    const tabs = Children.map(children, (tab, index) => {
      if (!tab) return undefined;

      const tabProps = tab.props || {};

      const isTabActive = index === activeIndex;

      if (isTabActive) {
        activeContainer = tabProps.children;
        activeTitle = tabProps.title;
      }

      return cloneElement(tab, {
        active: isTabActive,
        onActivate: () => {
          this.activateTab(index);
        },
      });
    }, this);

    const tabContentTitle = `${activeTitle || ''} ${tabContents}`;

    return (
      <div role='tablist'>
        <Box
          border='bottom'
          direction='row'
          justify={justify}
          margin={{ vertical: 'small' }}
          {...rest}
        >
          {tabs}
        </Box>
        <div aria-label={tabContentTitle} role='tabpanel'>
          {activeContainer}
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Tabs);
}

export default compose(
  withTheme,
)(Tabs);
