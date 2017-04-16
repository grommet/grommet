import PropTypes from 'prop-types';
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import Responsive from '../utils/Responsive';

const CLASS_ROOT = CSSClassnames.COLUMNS;

export default class Columns extends Component {

  constructor(props, context) {
    super(props, context);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this.state = {
      count: 1,
      maxCount: this.props.maxCount,
      columnBreakpoints: undefined,
      initMobile: false,
      margin: this.props.margin
    };
  }

  componentDidMount () {
    if (this.props.masonry) {
      this._getColumnBreakpoints();
    }

    window.addEventListener('resize', this._onResize);
    setTimeout(this._layout, 10);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ relayout: true });
  }

  componentDidUpdate () {
    if (this.state.relayout) {
      this.setState({ relayout: false });
      this._layout();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
    clearTimeout(this._layoutTimer);
    clearTimeout(this._childStylesTimer);
  }

  _onResize () {
    const { initMobile } = this.state;
    if (initMobile) {
      if (window.innerWidth > Responsive.smallSize()) {
        this._getColumnBreakpoints();
      }
    } else {
      clearTimeout(this._layoutTimer);
      this._layoutTimer = setTimeout(this._layout, 50);
    }
  }

  _getChildMarginSize (childStyles) {
    let childMargin;

    if (childStyles) {
      let childLeftMargin = childStyles.marginLeft ?
        parseFloat(childStyles.marginLeft) :  0;
      let childRightMargin = childStyles.marginRight ?
        parseFloat(childStyles.marginRight) :  0;
      childMargin = childLeftMargin + childRightMargin;

      if (childMargin === 48) {
        return 'large';
      } else if (childMargin === 24) {
        return 'medium';
      } else if (childMargin === 12) {
        return 'small';
      }
    }

    return undefined;
  }

  _getColumnBreakpoints () {
    const { initMobile, margin } = this.state;
    // grab CSS styles from DOM after component mounted
    // default to small size ($size-small = 192px)
    const container = findDOMNode(this.containerRef);
    if (container) {
      const column = container.childNodes[0];
      const child = column.childNodes[0];
      let minColumnWidth = 192;
      let currentMobile =
        (initMobile && window.innerWidth <= Responsive.smallSize());

      if (child) {
        clearTimeout(this._childStylesTimer);
        this._childStylesTimer = setTimeout(() => {
          let childStyles = window.getComputedStyle(child);

          if (childStyles && childStyles.width) {
            let childLeftMargin = childStyles.marginLeft ?
              parseFloat(childStyles.marginLeft) :  0;
            let childRightMargin = childStyles.marginRight ?
              parseFloat(childStyles.marginRight) :  0;
            minColumnWidth = (
              parseFloat(childStyles.width) + childLeftMargin + childRightMargin
            );
          }

          let childMarginSize = margin || this._getChildMarginSize(childStyles);

          // create array of breakpoints for 1 through this.props.maxCount
          // number of columns of minColumnWidth width.
          const columnBreakpoints = Array.apply(
              undefined, Array(this.props.maxCount)
            ).map((currentMaxCount, index) => (index + 1) * minColumnWidth);

          this.setState({
            columnBreakpoints: columnBreakpoints,
            margin: childMarginSize,
            initMobile: currentMobile
          }, () => {
            clearTimeout(this._layoutTimer);
            this._layoutTimer = setTimeout(this._layout, 50);
          });
        }, 200);
      }
    }
  }

  _calculateMaxCount () {
    const { columnBreakpoints } = this.state;
    const container = findDOMNode(this.containerRef);
    let maxColumnWidthIndex;

    if (container && columnBreakpoints) {
      maxColumnWidthIndex = columnBreakpoints
        .filter((currentMin) => {
          return currentMin <= container.offsetWidth;
        })
        .reduce((maxIndex, currentMin, index, columnWidths) => {
          return (currentMin > columnWidths[maxIndex]) ? index : maxIndex;
        }, 0);

      return maxColumnWidthIndex + 1; // return appropriate number of columns
    }

    return maxColumnWidthIndex;
  }


  _layout () {
    const { masonry } = this.props;
    const container = this.containerRef;

    if (container && !masonry) {
      // fills columns top to bottom, then left to right
      const children = React.Children.toArray(this.props.children);
      let count = 1;
      const child = container.childNodes[0];
      if (child) {
        const rect = container.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
        const widestCount = Math.floor(rect.width / childRect.width);
        const childrenPerColumn = Math.ceil(children.length / widestCount);
        count = Math.ceil(children.length / childrenPerColumn);
      }

      if (count === 0) {
        count = 1;
      }

      this.setState({ count: count });
    } else {
      // fills columns left to right, then top to bottom
      // by determining max number of columns (maxCount)
      const { maxCount } = this.state;
      const newMaxCount = this._calculateMaxCount();
      if (newMaxCount && (maxCount !== newMaxCount)) {
        this.setState({ maxCount: newMaxCount });
      }
    }
  }

  _renderColumns () {
    const { masonry } = this.props;
    const children = React.Children.toArray(this.props.children);
    let groups = [];

    if (masonry) {
      // fill columns horizontally for masonry option
      const { maxCount } = this.state;
      let columnGroups = {};

      React.Children.map(children, (child, index) => {
        let currentColumn = index % maxCount;

        if (!columnGroups[currentColumn]) {
          columnGroups[currentColumn] = [];
        }

        // place children into appropriate column
        if (child) {
          columnGroups[currentColumn].push(child);
        }
      }, this);

      Object.keys(columnGroups).map((key, index) => {
        if (columnGroups[index]) {
          groups.push(columnGroups[index]);
        }
      });
    } else {
      // fill columns vertically
      const { count } = this.state;
      const childrenPerColumn = Math.ceil(children.length / count);
      let offset = 0;
      while (groups.length < count) {
        groups.push(children.slice(offset, offset + childrenPerColumn));
        offset += childrenPerColumn;
      }
    }

    return groups;
  }

  render () {
    const { className, justify, responsive, size } = this.props;
    const { margin } = this.state;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--justify-${justify}`]: justify,
        [`${CLASS_ROOT}--margin-${margin}`]: margin,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );
    const restProps = Props.omit(this.props, Object.keys(Columns.propTypes));

    const groups = this._renderColumns();
    const columns = groups.map((group, index) => (
      <div key={index} className={`${CLASS_ROOT}__column`}>
        {group}
      </div>
    ));

    return (
      <div ref={ref => this.containerRef = ref} {...restProps}
        className={classes}>
        {columns}
      </div>
    );
  }
}

Columns.propTypes = {
  justify: PropTypes.oneOf(['start', 'center', 'between', 'end']),
  margin: PropTypes.oneOf(['small', 'medium', 'large']),
  masonry: PropTypes.bool,
  maxCount: PropTypes.number,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Columns.defaultProps = {
  maxCount: 1,
  justify: 'start',
  responsive: true
};
