// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { padding } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';
import KeyboardAccelerators from '../../utils/KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.CHART_HOT_SPOTS;

// Interactive regions.

export default class HotSpots extends Component {

  constructor () {
    super();
    this._onPreviousHotSpot = this._onPreviousHotSpot.bind(this);
    this._onNextHotSpot = this._onNextHotSpot.bind(this);
    this._onHotSpotFocus = this._onHotSpotFocus.bind(this);
    this._onHotSpotBlur = this._onHotSpotBlur.bind(this);
    this._onHotSpotClick = this._onHotSpotClick.bind(this);
  }

  _onHotSpotFocus () {
    this._keyboardHandlers = {
      left: this._onPreviousHotSpot,
      up: this._onPreviousHotSpot,
      right: this._onNextHotSpot,
      down: this._onNextHotSpot,
      enter: this._onHotSpotClick
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _onHotSpotBlur () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _onPreviousHotSpot (event) {
    event.preventDefault();
    const { activeIndex, onActive } = this.props;
    const previousIndex = activeIndex - 1;
    if (previousIndex >= 0) {
      onActive(previousIndex);
    }
    //stop event propagation
    return true;
  }

  _onNextHotSpot (event) {
    event.preventDefault();
    const { activeIndex, count, onActive } = this.props;
    const nextIndex = activeIndex + 1;
    if (nextIndex < count) {
      onActive(nextIndex);
    }
    //stop event propagation
    return true;
  }

  _onHotSpotClick () {
    const { activeIndex, onClick } = this.props;

    if (activeIndex !== undefined && onClick) {
      onClick(activeIndex);
    }
  }

  render () {
    const {
      a11yTitle, activeIndex, className, count, onActive, onClick, vertical,
      ...props
    } = this.props;
    delete props.height;
    delete props.width;

    const { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--clickable`]: onClick
      },
      className
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
      const style = { flexBasis: `${basis}%` };
      items.push(
        <div key={index} className={bandClasses} style={style}
          role={onClick ? 'button' : 'row'}
          aria-label={a11yTitle}
          onMouseOver={onActive ? () => onActive(index) : undefined}
          onMouseOut={onActive ? () => onActive(undefined) : undefined}
          onClick={onClick ? () => onClick(index) : undefined} />
      );
    }

    const hotSpotsLabel = Intl.getMessage(intl, 'HotSpotsLabel');

    return (
      <div {...props} className={classes} style={{ padding: padding }}
        tabIndex='0' onFocus={this._onHotSpotFocus}
        onBlur={this._onHotSpotBlur} role='group'
        aria-label={hotSpotsLabel}>
        {items}
      </div>
    );
  }

}

HotSpots.contextTypes = {
  intl: PropTypes.object
};

HotSpots.propTypes = {
  a11yTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeIndex: PropTypes.number,
  count: PropTypes.number.isRequired,
  onActive: PropTypes.func,
  onClick: PropTypes.func,
  vertical: PropTypes.bool
};
