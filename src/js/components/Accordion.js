// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import List from './List';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ACCORDION;

export default class Accordion extends Component {
  constructor(props, context) {
    super(props, context);
    this._activatePanel = this._activatePanel.bind(this);

    this.state = {
      activeIndex: props.initialIndex
    };
  }

  _activatePanel (index) {
    this.setState({activeIndex: index});
  }

  render () {
    const {
      animate,
      className,
      children,
      openMulti,
      ...props
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className
    );

    const accordionChildren = React.Children
      .map(children, (child, index) => {
        return React.cloneElement(child, {
          id: 'accordion-panel-' + index,
          active: !openMulti ? (this.state.activeIndex === index)
            : child.props.active,
          onActive: () => {
            this._activatePanel(index);
          },
          animate
        });
      });

    return (
      <List role="tablist" className={classes} {...props}>
        {accordionChildren}
      </List>
    );
  }
};

Accordion.propTypes = {
  animate: PropTypes.bool,
  openMulti: PropTypes.bool,
  initialIndex: PropTypes.number
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
