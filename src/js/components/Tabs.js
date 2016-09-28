// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABS;

export default class Tabs extends Component {

  constructor(props, context) {
    super(props, context);

    this._activateTab = this._activateTab.bind(this);

    this.state = {
      activeIndex: props.activeIndex,
      justify: props.justify
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.activeIndex || 0 === nextProps.activeIndex) &&
      this.state.activeIndex !== nextProps.activeIndex) {
      this.setState({activeIndex: nextProps.activeIndex});
    }
  }

  _activateTab (index) {
    this.setState({ activeIndex: index });
  }

  render () {
    const { children, className, justify, responsive } = this.props;
    const { activeIndex } = this.state;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--justify-${justify}`]: justify,
        [`${CLASS_ROOT}--responsive`]: responsive
      }
    );

    let activeContainer;
    let activeTitle;
    const tabs = React.Children.map(children, (tab, index) => {

      const tabProps = tab.props || tab._store.props || {};

      const isTabActive = index === activeIndex;

      if (isTabActive) {
        activeContainer = tabProps.children;
        activeTitle = tabProps.title;
      }

      return React.cloneElement(tab, {
        active: isTabActive,
        id: `tab-${index}`,
        onRequestForActive: () => {
          this._activateTab(index);
        }
      });
    }, this);

    const tabContentTitle = Intl.getMessage(intl, 'Tab Contents', {
      activeTitle: activeTitle
    });

    return (
      <div role='tablist'>
        <ul className={classes}>
          {tabs}
        </ul>
        <div aria-label={tabContentTitle} role='tabpanel'>
          {activeContainer}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  responsive: PropTypes.bool
};

Tabs.contextTypes = {
  intl: PropTypes.object
};

Tabs.defaultProps = {
  activeIndex: 0,
  justify: 'center',
  responsive: true
};
