// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { baseUnit, translateEndAngle, arcCommands } from '../utils/Graphics';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SUN_BURST;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;
const UNIT_FACTOR = baseUnit * 0.75;
const PAD_FACTOR = baseUnit * 8;

export default class SunBurst extends Component {

  constructor (props) {
    super();

    this._layout = this._layout.bind(this);
    this._onResize = this._onResize.bind(this);

    this.state = { height: 100, width: 100 };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillReceiveProps (nextProps) {
    this._onResize();
  }

  componentWillUnmount () {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    const rect = this.refs.svg.getBoundingClientRect();
    if (rect.width !== this.state.width || rect.height !== this.state.height) {
      this.setState({ height: rect.height, width: rect.width });
    }
  }

  _renderData (path, data, total, centerX, centerY, radius, startAngle,
    endAngle) {

    const { active, onActive, onClick } = this.props;
    const { width } = this.state;
    const unit = width / UNIT_FACTOR;
    const ringPad = width / PAD_FACTOR;
    if (! total) {
      total = 0;
      data.forEach(datum => total += datum.value);
    }
    // reserve 1 degree per data item for margin between slices
    const padCount = (endAngle - startAngle === 360) ?
      data.length : data.length - 1;
    const anglePer = (endAngle - startAngle - padCount) / total;

    let result = [];
    data.forEach((datum, index) => {
      const datumPath = path.concat([index]);
      const colorIndex = datum.colorIndex || `graph-${(index % 4) + 1}`;
      let className = [`${CLASS_ROOT}__slice`, `${COLOR_INDEX}-${colorIndex}`];
      if (onActive || onClick) {
        className.push(`${CLASS_ROOT}__slice--hot`);
      }
      if (active && active.length === datumPath.length &&
        active.every((v,i) => v === datumPath[i])) {
        className.push(`${CLASS_ROOT}__slice--active`);
      }
      const endAngle = translateEndAngle(startAngle, anglePer, datum.value);
      const commands = arcCommands(centerX, centerY, radius,
        startAngle, endAngle);

      result.push(
        <path key={datumPath.join(',')} className={className.join(' ')}
          fill="none" strokeWidth={unit * 2} d={commands}
          onMouseOver={onActive ? () => onActive(datumPath) : undefined}
          onMouseOut={onActive ? () => onActive(undefined) : undefined}
          onClick={onClick ? () => onClick(datumPath) : undefined} />
      );

      if (datum.children) {
        result = result.concat(this._renderData(datumPath,
          datum.children, datum.total,
          centerX, centerY, radius + (unit * 2) + ringPad,
          startAngle, endAngle));
      }

      // + 1 is for margin between slices
      startAngle = endAngle + 1;
    });

    return result;
  }

  render () {
    const { active, data, label, size } = this.props;
    const { width, height } = this.state;
    const unit = width / UNIT_FACTOR;
    let classes = [CLASS_ROOT];
    if (size) {
      classes.push(`${CLASS_ROOT}--${size}`);
    }
    if (active) {
      classes.push(`${CLASS_ROOT}--active`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    const centerX = width / 2;
    const centerY = height / 2;
    let paths = this._renderData([], data, undefined, centerX, centerY,
      unit * 2, 0, 360);

    let labelElement;
    if (label) {
      labelElement = (
        <div className={`${CLASS_ROOT}__label`}>
          {label}
        </div>
      );
    }

    return (
      <div className={`${CLASS_ROOT}__container`}>
        <svg ref="svg" className={classes.join(' ')}
          viewBox={`0 0 ${width} ${height}`}>
          <g>
            {paths}
          </g>
        </svg>
        {labelElement}
      </div>
    );
  }

}

SunBurst.propTypes = {
  active: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.arrayOf(PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.object),
    colorIndex: PropTypes.string,
    total: PropTypes.number, // sum of all values otherwise
    value: PropTypes.number.isRequired
  })),
  label: PropTypes.node,
  onActive: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'full'])
};

SunBurst.defaultProps = {
  size: 'medium'
};
