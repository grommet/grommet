// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';

const CLASS_ROOT = CSSClassnames.CHART_AXIS;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Axis extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: this._buildItems(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ items: this._buildItems(nextProps) });
  }

  _buildItems (props) {
    const { count, labels } = props;
    let items = [];
    const basis = 100.0 / (count - 1);
    for (let index=0; index<count; index+=1) {
      let item;
      if (labels) {
        const labelItem = labels.filter(item => item.index === index)[0];
        if (labelItem) {
          // clone since we're decorating something the user provided
          item = { ...labelItem };
        }
      }
      if (! item) {
        item = { index: index };
      }
      if (0 === index) {
        item.basis = basis / 2;
      } else if (1 === index) {
        item.basis = basis / 2;
      } else {
        item.basis = basis;
      }
      items.push(item);
    }
    return items;
  }

  render () {
    const {
      a11yTitle, align, className, reverse, ticks, vertical, tickAlign, ...props
    } = this.props;
    delete props.count;
    delete props.labels;
    const { items } = this.state;
    const { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--reverse`]: reverse,
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--align-${align}`]: align,
        [`${CLASS_ROOT}--ticks`]: ticks,
        [`${CLASS_ROOT}--ticks--${tickAlign}`]: tickAlign
      },
      className
    );

    let elements = items.map(item => {

      const classes = classnames(
        `${CLASS_ROOT}__slot`, {
          [`${CLASS_ROOT}__slot--placeholder`]: item.placeholder,
          [`${COLOR_INDEX}-${item.colorIndex}`]: item.colorIndex
        }
      );
      const role = item.label && item.label !== '' ? 'row' : undefined;
      const label = item.label ? <span>{item.label}</span> : undefined;

      return (
        <div key={item.value || item.index} className={classes} role={role}
          style={{ flexBasis: `${item.basis}%` }}>
          {label}
        </div>
      );
    });

    const axisLabel = a11yTitle || Intl.getMessage(intl, 'AxisLabel', {
      orientation: vertical ? 'y' : 'x'
    });

    return (
      <div {...props} role='rowgroup' aria-label={axisLabel}
        className={classes}>
        {elements}
      </div>
    );
  }

}

Axis.contextTypes = {
  intl: PropTypes.object
};

Axis.propTypes = {
  a11yTitle: PropTypes.string,
  align: PropTypes.oneOf(['start', 'end']), // only from Chart
  count: PropTypes.number.isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
    colorIndex: PropTypes.string,
    index: PropTypes.number.isRequired,
    label: PropTypes.node.isRequired
  })),
  reverse: PropTypes.bool,
  ticks: PropTypes.bool,
  tickAlign: PropTypes.oneOf(['start', 'end']),
  vertical: PropTypes.bool
};
