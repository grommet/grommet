// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABLE;
const SELECTED_CLASS = `${CLASS_ROOT}-row--selected`;
// empirical number describing a minimum cell width for a
// table to be presented in column-mode.
const MIN_CELL_WIDTH = 96;

export default class Table extends Component {

  constructor(props, context) {
    super(props, context);

    this._onClick = this._onClick.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);

    this.state = {
      selected: Selection.normalizeIndexes(props.selected),
      rebuildMirror: props.scrollable,
      small: false
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.scrollable && ! this.state.small) {
      this._buildMirror();
      this._alignMirror();
    }
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, this.props.onMore
      );
    }
    this._adjustBodyCells();
    window.addEventListener('resize', this._onResize);
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = undefined;
    }
    if (nextProps.hasOwnProperty('selected')) {
      this.setState({
        selected: Selection.normalizeIndexes(nextProps.selected)
      });
    }
    this.setState({rebuildMirror: nextProps.scrollable});
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(this.state.selected) !==
      JSON.stringify(prevState.selected)) {
      this._setSelection();
    }
    if (this.state.rebuildMirror && ! this.state.small) {
      this._buildMirror();
      this.setState({rebuildMirror: false});
    }
    if (this.props.scrollable && ! this.state.small) {
      this._alignMirror();
    }
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, this.props.onMore
      );
    }
    this._adjustBodyCells();
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _container () {
    let containerElement = this.tableRef;
    if (containerElement) {
      let tableBodies = containerElement.getElementsByTagName("TBODY");
      if (tableBodies.length > 0) {
        containerElement = tableBodies[0];
      }
    }
    return containerElement;
  }

  _setSelection () {
    Selection.setClassFromIndexes({
      containerElement: this._container(),
      childSelector: 'tr',
      selectedClass: SELECTED_CLASS,
      selectedIndexes: this.state.selected
    });
  }

  _onClick (event) {
    if (!this.props.selectable) {
      return;
    }

    let selected = Selection.onClick(event, {
      containerElement: this._container(),
      childSelector: 'tr',
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

  _adjustBodyCells () {
    // adjust table body cells to have link to the header
    // so that in responsive mode it displays the text as content in css.
    // IMPORTANT: non-text header cells, such as icon, are rendered as empty
    // headers.
    if (this.tableRef) {
      let headerCells = this.tableRef.querySelectorAll('thead th');
      if (headerCells.length > 0) {
        let rows = this.tableRef.querySelectorAll('tbody tr');

        [].forEach.call(rows, (row) => {
          [].forEach.call(row.cells, (cell, index) => {
            cell.setAttribute('data-th',
              headerCells[index].innerText || headerCells[index].textContent);
          });
        });
      }
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    this._alignMirror();

    let availableSize = this.containerRef.offsetWidth;
    let numberOfCells = this.tableRef.querySelectorAll('thead th').lengthRef;

    if ((numberOfCells * MIN_CELL_WIDTH) > availableSize) {
      this.setState({small: true});
    } else {
      this.setState({small: false});
    }
  }

  _buildMirror () {
    let tableElement = this.tableRef;
    if (tableElement) {
      let cells = tableElement.querySelectorAll('thead tr th');
      let mirrorElement = this.mirrorRef;
      if (mirrorElement) {
        let mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
        while (mirrorRow.hasChildNodes()) {
          mirrorRow.removeChild(mirrorRow.lastChild);
        }
        for (let i = 0; i < cells.length; i++) {
          mirrorRow.appendChild(cells[i].cloneNode(true));
        }
      }
    }
  }

  _alignMirror () {
    if (this.mirrorRef) {
      let tableElement = this.tableRef;
      let cells = tableElement.querySelectorAll('thead tr th');
      let mirrorElement = this.mirrorRef;
      let mirrorCells = mirrorElement.querySelectorAll('thead tr th');

      let rect = tableElement.getBoundingClientRect();
      mirrorElement.style.width =
        '' + Math.floor(rect.right - rect.left) + 'px';

      let height = 0;
      for (let i = 0; i < cells.length; i++) {
        rect = cells[i].getBoundingClientRect();
        mirrorCells[i].style.width =
          '' + Math.floor(rect.right - rect.left) + 'px';
        mirrorCells[i].style.height =
          '' + Math.floor(rect.bottom - rect.top) + 'px';
        height = Math.max(height, Math.floor(rect.bottom - rect.top));
      }
      mirrorElement.style.height = '' + height + 'px';
    }
  }

  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--small`]: this.state.small,
        [`${CLASS_ROOT}--selectable`]: this.props.selectable,
        [`${CLASS_ROOT}--scrollable`]: this.props.scrollable
      }
    );

    let mirror;
    if (this.props.scrollable) {
      mirror = (
        <table ref={ref => this.mirrorRef = ref}
          className={`${CLASS_ROOT}__mirror`}>
          <thead>
            <tr />
          </thead>
        </table>
      );
    }

    let more;
    if (this.props.onMore) {
      more = (
        <div ref={ref => this.moreRef = ref} className={`${CLASS_ROOT}__more`}>
          <SpinningIcon />
        </div>
      );
    }

    return (
      <div ref={ref => this.containerRef = ref} className={classes}>
        {mirror}
        <table ref={ref => this.tableRef = ref}
          className={`${CLASS_ROOT}__table`} onClick={this._onClick}>
          {this.props.children}
        </table>
        {more}
      </div>
    );
  }
}

Table.propTypes = {
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  scrollable: PropTypes.bool,
  selectable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['multiple'])
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
};
