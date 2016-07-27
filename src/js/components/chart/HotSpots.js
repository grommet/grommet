// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { padding } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_HOT_SPOTS;

// Interactive regions.

export default class HotSpots extends Component {

  render () {
    const { count, vertical, activeIndex, onActive, onClick } = this.props;

    let classes = [CLASS_ROOT];
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (onClick) {
      classes.push(`${CLASS_ROOT}--clickable`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    const defaultBasis = 100 / (count - 1);
    let items = [];
    for (let index=0; index<count; index+=1) {
      let classes = [`${CLASS_ROOT}__band`];
      if (index === activeIndex) {
        classes.push(`${CLASS_ROOT}__band--active`);
      }
      let basis;
      if (0 === index || index === (count - 1)) {
        basis = defaultBasis / 2;
      } else {
        basis = defaultBasis;
      }
      const style = { flexBasis: `${basis}%`};
      items.push(
        <div key={index} className={classes.join(' ')} style={style}
          onMouseOver={onActive ? () => onActive(index) : undefined}
          onMouseOut={onActive ? () => onActive(undefined) : undefined}
          onClick={onClick ? () => onClick(index) : undefined} />
      );
    }

    return (
      <div ref="hotSpots" className={classes.join(' ')}
        style={{ padding: padding }}>
        {items}
      </div>
    );
  }

};

HotSpots.propTypes = {
  activeIndex: PropTypes.number,
  count: PropTypes.number.isRequired,
  onActive: PropTypes.func,
  onClick: PropTypes.func,
  vertical: PropTypes.bool
};
