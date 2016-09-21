// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import List from './List';

import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';

const CLASS_ROOT = CSSClassnames.ACCORDION;

export default class Accordion extends Component {

  constructor(props, context) {
    super(props, context);
    this._onPanelChange = this._onPanelChange.bind(this);

    let active;
    if (Number.isInteger(this.props.active)) {
      active = [this.props.active];
    } else {
      active = this.props.active || [];
    }
    if (props.initialIndex) {
      console.warn(
        'Accordion: initialIndex prop has been deprecated. Use active instead.'
      );
      active.push(props.initialIndex);
    }
    React.Children.forEach(props.children, (child, index) => {
      if (child.props.active) {
        console.warn(
          'AccordionPanel: active prop has been deprecated.' +
          'Use active prop at the Accordion component level.'
        );
        active.push(index);
      }
    });
    this.state = {
      active: active
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.active !== this.state.active) {
      this.setState({active: newProps.active || []});
    }
  }

  _onPanelChange (index) {
    let { active } = this.state;
    const { onActive, openMulti } = this.props;

    const activeIndex = active.indexOf(index);
    if (activeIndex > -1) {
      active.splice(activeIndex, 1);
    } else {
      if (openMulti) {
        active.push(index);
      } else {
        active = [index];
      }
    }
    this.setState({active: active}, () => {
      if (onActive) {
        if (!openMulti) {
          onActive(active[0]);
        } else {
          onActive(active);
        }
      }
    });
  }

  render () {
    const { animate, className, children } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className
    );

    const accordionChildren = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        active: this.state.active.indexOf(index) > -1,
        onChange: () => {
          this._onPanelChange(index);
        },
        animate
      });
    });

    const restProps = Props.omit(this.props, Object.keys(Accordion.propTypes));
    return (
      <List role="tablist" className={classes} {...restProps}>
        {accordionChildren}
      </List>
    );
  }
};

Accordion.propTypes = {
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  animate: PropTypes.bool,
  onActive: PropTypes.func,
  openMulti: PropTypes.bool,
  initialIndex: PropTypes.number // remove in 1.0, use {active: }
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
