// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { graphValue, trackSize } from './utils';
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
    const { count, values, min, max } = props;
    let items = [];
    if (count) {
      const delta = (max - min) / (count - 1 || 1);
      for (let index=0; index<=count; index+=1) {
        const value = delta * index;
        let item;
        if (values) {
          item = values.filter(item => item.value === value)[0];
        }
        if (! item) {
          item = { value: value };
        }
        if (0 === index) {
          item.value = delta / 2;
          item.flip = true;
        }
        items.push(item);
      }
    } else if (values && values.length > 0) {
      if (values[0].value < (min + ((max - min) / 2))) {
        if (values[0].value > min) {
          items.push({ value: values[0].value, placeholder: true });
        }
        if (values.length > 1) {
          // take up half of the next item
          items.push({ ...values[0],
            value: values[0].value + ((values[1].value - values[0].value) / 2),
            flip: true
          });
          items = items.concat(values.slice(1));
        } else {
          items.push({ ...values[0], value: max, flip: true });
        }
      } else {
        items = values.slice(0);
      }
      if (items[items.length - 1].value < max) {
        items.push({ value:max, placeholder: true });
      }
    }
    return items;
  }

  render () {
    const { vertical, reverse, align, min, max, highlight,
      ticks } = this.props;
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

    const graphItems = items.map(item => ({ ...item,
      graphValue: graphValue(item.value, min, max, (vertical ? height : width))
    }));

    let priorItem;
    let basisItems = graphItems.map((item, index) => {

      let classes = [`${CLASS_ROOT}__slot`];
      if (index === highlight) {
        classes.push(`${CLASS_ROOT}__slot--highlight`);
      }
      if (item.flip) {
        classes.push(`${CLASS_ROOT}__slot--flip`);
      }
      if (item.placeholder) {
        classes.push(`${CLASS_ROOT}__slot--placeholder`);
      }
      if (item.colorIndex) {
        classes.push(`${COLOR_INDEX}-${item.colorIndex}`);
      }
      let label = item.label;
      if (typeof contents === 'string' || typeof contents === 'number') {
        label = <span>{label}</span>;
      }

      const delta = item.graphValue - (priorItem ? priorItem.graphValue : 0);
      const basis = (delta / ((vertical ? height : width) || 1)) * 100;
      const style = { flexBasis: `${basis}%`};
      priorItem = item;

      return (
        <div key={item.value} className={classes.join(' ')} style={style}>
          {label}
        </div>
      );
    });

    return (
      <div ref="axis" className={classes.join(' ')} style={style}>
        {basisItems}
      </div>
    );
  }

};

Axis.propTypes = {
  align: PropTypes.oneOf(['start', 'end']),
  count: PropTypes.number,
  height: PropTypes.number,
  highlight: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  reverse: PropTypes.bool,
  ticks: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.shape({
    colorIndex: PropTypes.string,
    label: PropTypes.node,
    value: PropTypes.number.isRequired
  })),
  vertical: PropTypes.bool,
  width: PropTypes.number
};

Axis.defaultProps = {
  align: 'start',
  max: 100,
  min: 0
};
