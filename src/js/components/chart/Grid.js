// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import { padding, debounceDelay } from './utils';

const CLASS_ROOT = CSSClassnames.CHART_GRID;

// Underlying grid lines for rows and/or columns.

export default class Grid extends Component {

  constructor(props, context) {
    super(props, context);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this.state = { height: 1, width: 1 };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillUnmount () {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    // delay should be greater than Chart's delay
    this._resizeTimer = setTimeout(this._layout, debounceDelay + 10);
  }

  _layout () {
    const { height, width } = this.props;
    const grid = this.gridRef;
    const rect = grid.getBoundingClientRect();
    this.setState({ height: height || rect.height });
    this.setState({ width: width || rect.width });
  }

  render () {
    const { className, columns, rows, ...props } = this.props;
    delete props.height;
    delete props.width;
    const { height, width } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      className
    );

    let commands = '';

    if (columns) {
      const basis = ((width - (2 * padding)) / (columns - 1));
      for (let i=0; i<columns; i+=1) {
        let x = i * basis;
        commands +=
          `M${x + padding},${padding} L${x + padding},${height - padding} `;
      }
    }

    if (rows) {
      const basis = ((height - (2 * padding)) / (rows - 1));
      for (let i=0; i<rows; i+=1) {
        let y = i * basis;
        commands +=
          `M${padding},${y + padding} L${width - padding},${y + padding} `;
      }
    }

    return (
      <svg ref={ref => this.gridRef = ref} {...props} className={classes}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none">
        <path fill="none" d={commands} />
      </svg>
    );
  }

};

Grid.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number
};
