// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import { padding } from './utils';

const CLASS_ROOT = CSSClassnames.CHART_GRID;

// Underlying grid lines for rows and/or columns.

export default class Grid extends Component {

  render () {
    const { className, columns, rows, width, height, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      className
    );

    let commands = '';

    if (columns > 1) {
      const basis = ((width - (2 * padding)) / (columns - 1));
      for (let i=0; i<columns; i+=1) {
        const x = i * basis;
        commands +=
          `M${x + padding},${padding} L${x + padding},${height - padding} `;
      }
    }

    if (rows === 1) {
      const y = (height - (2 * padding));
      commands +=
        `M${padding},${y + padding} L${width - padding},${y + padding} `;
    } else if (rows > 1) {
      const basis = ((height - (2 * padding)) / (rows - 1));
      for (let i=0; i<rows; i+=1) {
        const y = i * basis;
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

}

Grid.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number
};
