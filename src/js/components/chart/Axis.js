// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { trackSize } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_AXIS;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Axis extends Component {

  constructor (props) {
    super(props);
    this.state = {
      size: { width: 0, height: 0 },
      items: this._buildItems(props)
    };
    this._size = new trackSize(this.props, this._onSize.bind(this));
  }

  componentDidMount () {
    this._size.start(this.refs.axis);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ items: this._buildItems(nextProps) });
    this._size.reset(nextProps);
  }

  componentWillUnmount () {
    this._size.stop();
  }

  _onSize (size) {
    this.setState({ size: size });
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
    const { vertical, reverse, align, ticks } = this.props;
    const { size: { height, width }, items } = this.state;

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

    let style = {...this.props.style};
    if (vertical && height) {
      style.height = `${height}px`;
    }
    if (! vertical && width) {
      style.width = `${width}px`;
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

      return (
        <div key={item.value || item.index} className={classes.join(' ')}
          style={{ flexBasis: `${item.basis}%` }}>
          {item.label}
        </div>
      );
    });

    return (
      <div ref="axis" className={classes.join(' ')} style={style}>
        {elements}
      </div>
    );
  }

};

Axis.propTypes = {
  align: PropTypes.oneOf(['start', 'end']), // only from Chart
  count: PropTypes.number.isRequired,
  height: PropTypes.number, // only from Chart
  labels: PropTypes.arrayOf(PropTypes.shape({
    colorIndex: PropTypes.string,
    index: PropTypes.number.isRequired,
    label: PropTypes.node.isRequired
  })),
  reverse: PropTypes.bool,
  ticks: PropTypes.bool,
  vertical: PropTypes.bool,
  width: PropTypes.number // only from Chart
};
