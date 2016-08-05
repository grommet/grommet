// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { padding, debounceDelay } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_GRID;

// Underlying grid lines for rows and/or columns.

export default class Grid extends Component {

  constructor () {
    super();
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
    const grid = this.refs.grid;
    const rect = grid.getBoundingClientRect();
    this.setState({ height: height || rect.height });
    this.setState({ width: width || rect.width });
  }

  render () {
    const { columns, rows } = this.props;
    const { height, width } = this.state;
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
      <svg ref="grid" className={CLASS_ROOT}
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
