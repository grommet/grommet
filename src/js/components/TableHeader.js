// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Box from './Box';
import AscIcon from './icons/base/LinkDown';
import DescIcon from './icons/base/LinkUp';

export default class TableHeader extends Component {
  _onSort (index) {
    const { onSort, sortAscending, sortIndex } = this.props;
    let nextAscending;
    if (index !== sortIndex) {
      nextAscending = false;
    } else {
      nextAscending = ! sortAscending;
    }
    onSort(index, nextAscending);
  }

  render () {
    const { labels, onSort, sortAscending, sortIndex, ...props } = this.props;

    const cells = labels.map((label, index) => {
      let content;
      let options = {};

      if (Array.isArray(label)) {
        [content, options = {}] = label;
      } else {
        content = label;
        options.sortable = !!onSort;
      }

      if (sortIndex >= 0) {
        let sortIndicator;
        if (index === sortIndex) {
          sortIndicator = (
            sortAscending ?
              <AscIcon /> : <DescIcon />
          );
        }
        content = (
          <Box direction='row' justify='start' align='center'
            pad={{ between: 'small' }}>
            <span>{content}</span>
            {sortIndicator}
          </Box>
        );

        if (options.sortable) {
          content = (
            <Button plain={true} fill={true}
              onClick={this._onSort.bind(this, index)}>
              {content}
            </Button>
          );
        }
      }

      return <th key={index}>{content}</th>;
    });

    return (
      <thead {...props}>
        <tr>
          {cells}
        </tr>
      </thead>
    );
  }
}

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array
  ])).isRequired,
  onSort: PropTypes.func, // (index, ascending?)
  sortAscending: PropTypes.bool,
  sortIndex: PropTypes.number
};
