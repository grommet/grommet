// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Props from '../utils/Props';
import Box from './Box';
import Button from './Button';
import SpinningIcon from './icons/Spinning';
import Scroll from '../utils/Scroll';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';

import LinkPreviousIcon from './icons/base/LinkPrevious';
import LinkNextIcon from './icons/base/LinkNext';

const CLASS_ROOT = "tiles";
const SELECTED_CLASS = "tile--selected";

export default class Tiles extends Component {

  constructor (props) {
    super(props);
    this._onLeft = this._onLeft.bind(this);
    this._onRight = this._onRight.bind(this);
    this._onScrollHorizontal = this._onScrollHorizontal.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      overflow: false,
      selected: Selection.normalizeIndexes(props.selected)
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
    if ('row' === this.props.direction) {
      window.addEventListener('resize', this._onResize);
      document.addEventListener('wheel', this._onWheel);
      this._trackHorizontalScroll();
      // give browser a chance to stabilize
      setTimeout(this._layout, 10);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected) {
      this.setState({ selected: Selection.normalizeIndexes(nextProps.selected) });
    }
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(this.state.selected) !== JSON.stringify(prevState.selected)) {
      this._setSelection();
    }
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
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
        var tiles = findDOMNode(this.refs.tiles);
        tiles.removeEventListener('scroll', this._onScrollHorizontal);
      }
    }
  }

  _onLeft () {
    var tiles = findDOMNode(this.refs.tiles);
    Scroll.scrollBy(tiles, 'scrollLeft', - tiles.offsetWidth);
  }

  _onRight () {
    var tiles = findDOMNode(this.refs.tiles);
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

  _layout () {
    if ('row' === this.props.direction) {
      // determine if we have more tiles than room to fit
      var tiles = findDOMNode(this.refs.tiles);
      // 20 is to allow some fuzziness as scrollbars come and go
      this.setState({
        overflow: (tiles.scrollWidth > (tiles.offsetWidth + 20)),
        overflowStart: (tiles.scrollLeft <= 20),
        overflowEnd: (tiles.scrollLeft >= (tiles.scrollWidth - tiles.offsetWidth))
      });

      // mark any tiles that might be clipped
      var rect = tiles.getBoundingClientRect();
      var children = tiles.querySelectorAll('.tile');
      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        var childRect = child.getBoundingClientRect();
        // 12 accounts for padding
        if ((childRect.left + 12) < rect.left ||
          (childRect.right - 12) > rect.right) {
          child.classList.add('tile--eclipsed');
        } else {
          child.classList.remove('tile--eclipsed');
        }
      }
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _trackHorizontalScroll () {
    if (this.state.overflow && ! this._tracking) {
      var tiles = findDOMNode(this.refs.tiles);
      tiles.addEventListener('scroll', this._onScrollHorizontal);
      this._tracking = true;
    }
  }

  _setSelection () {
    Selection.setClassFromIndexes({
      containerElement: findDOMNode(this.refs.tiles),
      childSelector: '.tile',
      selectedClass: SELECTED_CLASS,
      selectedIndexes: this.state.selected
    });
  }

  _onClick (event) {
    let selected = Selection.onClick(event, {
      containerElement: findDOMNode(this.refs.tiles),
      childSelector: '.tile',
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
    var classes = [CLASS_ROOT];
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.selectable) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var other = Props.pick(this.props, Object.keys(Box.propTypes));

    var more = null;
    if (this.props.onMore) {
      classes.push(CLASS_ROOT + "--moreable");
      more = (
        <div ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </div>
      );
    }

    let onClickHandler;
    if (this.props.selectable) {
      onClickHandler = this._onClick;
    }

    var contents = (
      <Box ref="tiles" {...other}
        wrap={this.props.direction ? false : true}
        direction={this.props.direction ? this.props.direction : 'row'}
        className={classes.join(' ')}
        onClick={onClickHandler}
        focusable={false}>
        {this.props.children}
        {more}
      </Box>
    );

    if (this.state.overflow) {
      classes.push(CLASS_ROOT + "--overflowed");
      if (! this.state.overflowStart) {
        var left = (
          <Button className={CLASS_ROOT + "__left"} icon={<LinkPreviousIcon />}
            onClick={this._onLeft} />
        );
      }
      if (! this.state.overflowEnd) {
        var right = (
          <Button className={CLASS_ROOT + "__right"} icon={<LinkNextIcon />}
            onClick={this._onRight} />
        );
      }

      contents = (
        <div className={CLASS_ROOT + "__container"}>
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
  fill: PropTypes.bool,
  flush: PropTypes.bool,
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Tiles.defaultProps = {
  flush: true,
  justify: 'start',
  pad: 'small'
};
