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
    this.state = {
      active: active
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.active !== this.props.active) {
      this.setState({ active: newProps.active || [] });
    }
  }

  _onPanelChange (index) {
    let active = [...this.state.active];
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
      <List role='tablist' className={classes} {...restProps}>
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
  openMulti: PropTypes.bool
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
