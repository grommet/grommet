// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Intl from '../utils/Intl';
import Box from './Box';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABS;

export default class Tabs extends Component {

  constructor(props, context) {
    super(props, context);

    this._activateTab = this._activateTab.bind(this);

    if (props.initialIndex) {
      console.warn(
        'Tabs: initialIndex prop has been deprecated. ' +
        'Use activeIndex instead.'
      );
    }

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
    this.setState({activeIndex: index});
  }

  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--justify-${this.props.justify}`]: this.props.justify,
        [`${CLASS_ROOT}--responsive`]: this.props.responsive
      }
    );

    var activeContainer;
    var activeTitle;

    var tabs = React.Children.map(this.props.children, function(tab, index) {

      var tabProps = tab.props || tab._store.props || {};

      var isTabActive = index === this.state.activeIndex;

      if (isTabActive) {
        activeContainer = tabProps.children;
        activeTitle = tabProps.title;
      }

      return React.cloneElement(tab, {
        active: isTabActive,
        id: 'tab-' + index,
        onRequestForActive: function () {
          this._activateTab(index);
        }.bind(this)
      });
    }.bind(this));

    var tabContentTitle = Intl.getMessage(this.context.intl, 'Tab Contents', {
      activeTitle: activeTitle
    });

    //TODO: Since there could be multiple Tabs on the page, we need a more
    //robust means of identifying the association between title and aria label.
    return (
      <div role="tablist">
        <ul className={classes}>
          {tabs}
        </ul>
        <div tabIndex="0"
          aria-label={tabContentTitle} role="tabpanel">
          <Box className={CLASS_ROOT + '__content'}
            aria-label={tabContentTitle}>
            {activeContainer}
          </Box>
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
