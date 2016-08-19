// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { padding } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';
import KeyboardAccelerators from '../../utils/KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.CHART_HOT_SPOTS;
const CHART = CSSClassnames.CHART;

// Interactive regions.

export default class HotSpots extends Component {

  constructor () {
    super();
    this._onPreviousHotSpot = this._onPreviousHotSpot.bind(this);
    this._onNextHotSpot = this._onNextHotSpot.bind(this);
  }
  componentDidMount () {
    this._keyboardHandlers = {
      left: this._onPreviousHotSpot,
      up: this._onPreviousHotSpot,
      right: this._onNextHotSpot,
      down: this._onNextHotSpot
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _onPreviousHotSpot () {
    if (document.activeElement.className.indexOf(CHART) !== -1) {
      const { activeIndex, onActive } = this.props;
      const previousIndex = activeIndex - 1;
      if (previousIndex >= 0) {
        onActive(previousIndex);
        //stop event propagation
        return true;
      }
    }
  }

  _onNextHotSpot () {
    if (document.activeElement.className.indexOf(CHART) !== -1) {
      const { activeIndex, count, onActive } = this.props;
      const nextIndex = activeIndex + 1;
      if (nextIndex < count) {
        onActive(nextIndex);
        //stop event propagation
        return true;
      }
    }
  }

  render () {
    const {
      activeIndex, className, count, onActive, onClick, vertical
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--clickable`]: onClick
      }
    );

    const defaultBasis = 100 / (count - 1);
    let items = [];
    for (let index = 0; index < count; index += 1) {
      const bandClasses = classnames(
        `${CLASS_ROOT}__band`,
        {
          [`${CLASS_ROOT}__band--active`]: index === activeIndex
        }
      );
      let basis;
      if (0 === index || index === (count - 1)) {
        basis = defaultBasis / 2;
      } else {
        basis = defaultBasis;
      }
      const style = { flexBasis: `${basis}%`};
      items.push(
        <div key={index} className={bandClasses} style={style}
          onMouseOver={onActive ? () => onActive(index) : undefined}
          onMouseOut={onActive ? () => onActive(undefined) : undefined}
          onClick={onClick ? () => onClick(index) : undefined} />
      );
    }

    return (
      <div ref='hotSpots' className={classes} style={{ padding: padding }}
        aria-hidden='true'>
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
