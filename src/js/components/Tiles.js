// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Children } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Props from '../utils/Props';
import Box from './Box';
import Button from './Button';
import SpinningIcon from './icons/Spinning';
import Scroll from '../utils/Scroll';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';

import LinkPreviousIcon from './icons/base/LinkPrevious';
import LinkNextIcon from './icons/base/LinkNext';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TILES;
const TILE = CSSClassnames.TILE;
const SELECTED_CLASS = `${TILE}--selected`;

export default class Tiles extends Component {

  constructor(props, context) {
    super(props, context);
    this._onLeft = this._onLeft.bind(this);
    this._onRight = this._onRight.bind(this);
    this._onScrollHorizontal = this._onScrollHorizontal.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      overflow: false,
      selected: Selection.normalizeIndexes(props.selected),
      numColumns: this.props.numColumns,
      columnBreakpoints: null
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.moreRef,
        this.props.onMore);
    }
    if ('row' === this.props.direction) {
      window.addEventListener('resize', this._onResize);
      document.addEventListener('wheel', this._onWheel);
      this._trackHorizontalScroll();
      // give browser a chance to stabilize
      setTimeout(this._layout, 10);
    } else if (this.props.masonry) {
      const tiles = findDOMNode(this.tilesRef);
      const tile =
        tiles.querySelectorAll(`.${CLASS_ROOT}__masonry-column .${TILE}`);
      // default to medium tile size ($tile-size = 192px)
      let minColumnWidth = 192;

      if (!this.props.fill) {
        // grab CSS styles from DOM after component mounted
        minColumnWidth = this._getPropertyFromTile('width', tile);
      } else {
        const tileColumn =
          tiles.querySelectorAll(`.${CLASS_ROOT}__masonry-column`);
        const tileFlexBasis =
          this._getPropertyFromTile('minWidth', tileColumn);
        let tilePad = this._getPropertyFromTile('padding', tile) ||
          this._getPropertyFromTile('padding-right', tile);

        // take horizontal padding into account for column breakpoints
        minColumnWidth = (tilePad) ?
          tileFlexBasis + (tilePad * 2) : tileFlexBasis;
      }

      // create array of breakpoints for 1 through this.props.numColumns
      // number of columns of minColumnWidth width.
      const columnBreakpoints = Array.apply(null, Array(this.props.numColumns))
        .map((currentNumColumns, index) => (index + 1) * minColumnWidth);
      this.setState({columnBreakpoints: columnBreakpoints});
      window.addEventListener('resize', this._onResize);
      setTimeout(this._layout, 10);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected) {
      this.setState({
        selected: Selection.normalizeIndexes(nextProps.selected)
      });
    }
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(this.state.selected) !==
      JSON.stringify(prevState.selected)) {
      this._setSelection();
    }
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.moreRef,
        this.props.onMore);
    }
    if ('row' === this.props.direction) {
      this._trackHorizontalScroll();
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
    if ('row' === this.props.direction) {
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('wheel', this._onWheel);
      if (this._tracking) {
        const tiles = findDOMNode(this.tilesRef);
        tiles.removeEventListener('scroll', this._onScrollHorizontal);
      }
    } else if (this.props.masonry) {
      window.removeEventListener('resize', this._onResize);
    }
  }

  _onLeft () {
    const tiles = findDOMNode(this.tilesRef);
    Scroll.scrollBy(tiles, 'scrollLeft', - tiles.offsetWidth);
  }

  _onRight () {
    const tiles = findDOMNode(this.tilesRef);
    Scroll.scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
  }

  _onScrollHorizontal () {
    // debounce
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._layout, 50);
  }

  _onWheel (event) {
    if (Math.abs(event.deltaX) > 100) {
      clearInterval(this._scrollTimer);
    } else if (event.deltaX > 5) {
      this._onRight();
    } else if (event.deltaX < -5) {
      this._onLeft();
    }
  }

  _getPropertyFromTile (propertyName, tile) {
    if (tile && tile.length > 0) {
      const columnTile = window.getComputedStyle(tile[0]);
      if (columnTile && columnTile[propertyName]) {
        return parseFloat(columnTile[propertyName]);
      }
    }
  }

  _getNumberColumns () {
    const { columnBreakpoints } = this.state;
    const tiles = findDOMNode(this.tilesRef);
    let maxColumnWidthIndex;

    if (tiles) {
      maxColumnWidthIndex = columnBreakpoints
        .filter((currentMin) => {
          return currentMin <= tiles.offsetWidth;
        })
        .reduce((maxIndex, currentMin, index, columnWidths) => {
          return (currentMin > columnWidths[maxIndex]) ? index : maxIndex;
        }, 0);

      return maxColumnWidthIndex + 1; // return appropriate number of columns
    }

    return maxColumnWidthIndex;
  }

  _layout () {
    const { direction, masonry } = this.props;
    if ('row' === direction) {
      // determine if we have more tiles than room to fit
      const tiles = findDOMNode(this.tilesRef);
      // 20 is to allow some fuzziness as scrollbars come and go
      this.setState({
        overflow: (tiles.scrollWidth > (tiles.offsetWidth + 20)),
        overflowStart: (tiles.scrollLeft <= 20),
        overflowEnd:
          (tiles.scrollLeft >= (tiles.scrollWidth - tiles.offsetWidth))
      });

      // mark any tiles that might be clipped
      const rect = tiles.getBoundingClientRect();
      const children = tiles.querySelectorAll(`.${TILE}`);

      Array.from(children).map((child, index) => {
        const childRect = child.getBoundingClientRect();
        // 12 accounts for padding
        if ((childRect.left + 12) < rect.left ||
          (childRect.right - 12) > rect.right) {
          child.classList.add(`${TILE}--eclipsed`);
        } else {
          child.classList.remove(`${TILE}--eclipsed`);
        }
      });
    } else if (masonry) {
      // check for appropriate number of columns, if using masonry option
      const { numColumns } = this.state;
      const newNumColumns = this._getNumberColumns();
      if (newNumColumns && (numColumns !== newNumColumns)) {
        this.setState({ numColumns: newNumColumns });
      }
    }
  }

  _renderChild (element) {
    const { flush } = this.props;

    if (element) {
      const elementClone = React.cloneElement(element, {
        hoverBorder: !flush
      });

      return elementClone;
    }

    return undefined;
  }

  _renderMasonryColumns () {
    const { children } = this.props;
    const { numColumns } = this.state;
    let columnContents = {};

    Children.map(children, (element, index) => {
      let currentColumn = index % numColumns;

      if (!columnContents[`column-${currentColumn}`]) {
        columnContents[`column-${currentColumn}`] = [];
      }

      // place children into appropriate column
      let child = this._renderChild(element);
      if (child) {
        columnContents[`column-${currentColumn}`].push(child);
      }
    }, this);

    const columnsArray = Array.apply(null, Array(numColumns));
    let columns = columnsArray.map((current, i) => {
      return (
        <Box className={`${CLASS_ROOT}__masonry-column`}
          key={`column-${numColumns}-${i}`}>
          {columnContents[`column-${i}`]}
        </Box>
      );
    });

    return columns;
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _trackHorizontalScroll () {
    if (this.state.overflow && ! this._tracking) {
      const tiles = findDOMNode(this.tilesRef);
      tiles.addEventListener('scroll', this._onScrollHorizontal);
      this._tracking = true;
    }
  }

  _setSelection () {
    Selection.setClassFromIndexes({
      containerElement: findDOMNode(this.tilesRef),
      childSelector: `.${TILE}`,
      selectedClass: SELECTED_CLASS,
      selectedIndexes: this.state.selected
    });
  }

  _onClick (event) {
    let selected = Selection.onClick(event, {
      containerElement: findDOMNode(this.tilesRef),
      childSelector: `.${TILE}`,
      selectedClass: SELECTED_CLASS,
      multiSelect: ('multiple' === this.props.selectable),
      priorSelectedIndexes: this.state.selected
    });
    // only set the selected state and classes if the caller isn't managing it.
    if (! this.props.selected) {
      this.setState({ selected: selected }, this._setSelection);
    }

    if (this.props.onSelect) {
      // notify caller that the selection has changed
      if (selected.length === 1) {
        selected = selected[0];
      }
      this.props.onSelect(selected);
    }
  }

  // children should be an array of Tile
  render () {
    const { onMore, selectable, masonry, direction } = this.props;
    const { overflow } = this.state;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--fill`]: this.props.fill,
          // remove in 1.0
        [`${CLASS_ROOT}--flush`]: this.props.flush,
          // remove in 1.0
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
          // remove in 1.0
        [`${CLASS_ROOT}--selectable`]: this.props.selectable,
        [`${CLASS_ROOT}--moreable`]: this.props.onMore,
        [`${CLASS_ROOT}--overflowed`]: this.state.overflow,
        [`${CLASS_ROOT}--masonry`]: this.props.masonry
          // remove in 1.0
      },
      this.props.className
    );

    const other = Props.pick(this.props, Object.keys(Box.propTypes));

    let more = null;
    if (onMore) {
      more = (
        <div ref={ref => this.moreRef = ref} className={`${CLASS_ROOT}__more`}>
          <SpinningIcon />
        </div>
      );
    }

    let onClickHandler;
    if (selectable) {
      onClickHandler = this._onClick;
    }

    let children = this.props.children;
    if (masonry) {
      console.warn(
        'Tiles: masonry prop has been deprecated. ' +
        'Use a Columns instead.'
      );
      children = this._renderMasonryColumns();
    } else {
      children = Children.map(this.props.children, (element) => {
        return this._renderChild(element);
      }, this);
    }

    let contents = (
      <Box ref={ref => this.tilesRef = ref} {...other}
        wrap={direction ? false : true}
        direction={direction ? direction : 'row'}
        className={classes}
        onClick={onClickHandler}
        focusable={false}>
        {children}
        {more}
      </Box>
    );

    if (overflow) {
      let left;
      let right;

      if (! this.state.overflowStart) {
        left = (
          <Button className={`${CLASS_ROOT}__left`} icon={<LinkPreviousIcon />}
            onClick={this._onLeft} />
        );
      }
      if (! this.state.overflowEnd) {
        right = (
          <Button className={`${CLASS_ROOT}__right`} icon={<LinkNextIcon />}
            onClick={this._onRight} />
        );
      }

      contents = (
        <div className={`${CLASS_ROOT}__container`}>
          {left}
          {contents}
          {right}
        </div>
      );
    }

    return contents;
  }

}

Tiles.propTypes = {
  fill: PropTypes.bool, // remove in 1.0, rely on Box props
  flush: PropTypes.bool, // remove in 1.0, already in Box
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  selectable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['multiple'])
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']), // remove in 1.0
    // already in Box
  numColumns: PropTypes.number, // remove in 1.0
  masonry: PropTypes.bool, // remove in 1.0
  ...Box.propTypes
};

Tiles.defaultProps = {
  flush: true,
  justify: 'start',
  pad: 'small',
  numColumns: 1
};
