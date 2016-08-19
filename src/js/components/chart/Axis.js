// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
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
        item = labels.filter(item => item.index === index)[0];
      }
      if (! item) {
        item = { index: index };
      }
      if (0 === index) {
        item.basis = basis / 2;
        item.flip = true;
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
    const { a11yTitle, align, reverse, ticks, vertical } = this.props;
    const { items } = this.state;
    const { intl } = this.context;

    let classes = [CLASS_ROOT];
    if (reverse) {
      classes.push(`${CLASS_ROOT}--reverse`);
    }
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (align) {
      classes.push(`${CLASS_ROOT}--align-${align}`);
    }
    if (ticks) {
      classes.push(`${CLASS_ROOT}--ticks`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let elements = items.map(item => {

      let classes = [`${CLASS_ROOT}__slot`];
      if (item.flip) {
        classes.push(`${CLASS_ROOT}__slot--flip`);
      }
      if (item.placeholder) {
        classes.push(`${CLASS_ROOT}__slot--placeholder`);
      }
      if (item.colorIndex) {
        classes.push(`${COLOR_INDEX}-${item.colorIndex}`);
      }
      const role = item.label && item.label !== '' ? 'row' : undefined;
      return (
        <div key={item.value || item.index}
          className={classes.join(' ')} role={role}
          style={{ flexBasis: `${item.basis}%` }}>
          {item.label}
        </div>
      );
    });

    const axisLabel = a11yTitle || Intl.getMessage(intl, 'AxisLabel', {
      orientation: vertical ? 'y' : 'x'
    });

    return (
      <div ref="axis" id={this.props.id} role='rowgroup' aria-label={axisLabel}
        className={classes.join(' ')} style={this.props.style}>
        {elements}
      </div>
    );
  }

};

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
  vertical: PropTypes.bool
};
