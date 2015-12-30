// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/lang/isEqual';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';

const CLASS_ROOT = "table";
const SELECTED_CLASS = CLASS_ROOT + "-row--selected";

export default class Table extends Component {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onResize = this._onResize.bind(this);

    if (props.selection) {
      console.warn('The "selection" property of Table has been deprecated.' +
      ' Instead, use the "selected" property. The behavior is the same.' +
      ' The property name was changed to align with List and Tiles.');
    }
    this.state = {
      selected: Selection.normalize(props.selected || props.selection),
      rebuildMirror: props.scrollable
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.scrollable) {
      this._buildMirror();
      this._alignMirror();
    }
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
    window.addEventListener('resize', this._onResize);
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
    if (nextProps.hasOwnProperty('selected') || nextProps.hasOwnProperty('selection')) {
      this.setState({
        selected: Selection.normalize(nextProps.selected || nextProps.selection)
      });
    }
    this.setState({rebuildMirror: nextProps.scrollable});
  }

  componentDidUpdate (prevProps, prevState) {
    if (! isEqual(this.state.selected, prevState.selected)) {
      this._setSelection();
    }
    if (this.state.rebuildMirror) {
      this._buildMirror();
      this.setState({rebuildMirror: false});
    }
    if (this.props.scrollable) {
      this._alignMirror();
    }
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
    window.removeEventListener('resize', this._onResize);
  }

  _container () {
    let containerElement = this.refs.table;
    let tableBodies = containerElement.getElementsByTagName("TBODY");
    if (tableBodies.length > 0) {
      containerElement = tableBodies[0];
    }
    return containerElement;
  }

  _setSelection () {
    Selection.set({
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

    let selected = Selection.click(event, {
      containerElement: this._container(),
      childSelector: 'tr',
      selectedClass: SELECTED_CLASS,
      multiSelect: ('multiple' === this.props.selectable),
      priorSelectedIndexes: this.state.selected
    });
    this.setState({ selected: selected });

    if (this.props.onSelect) {
      // notify caller that the selection has changed
      if (selected.length === 1) {
        selected = selected[0];
      }
      this.props.onSelect(selected);
    }
  }

  _onResize () {
    this._alignMirror();
  }

  _buildMirror () {
    var tableElement = this.refs.table;
    var cells = tableElement.querySelectorAll('thead tr th');
    var mirrorElement = this.refs.mirror;
    var mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
    while (mirrorRow.hasChildNodes()) {
      mirrorRow.removeChild(mirrorRow.lastChild);
    }
    for (var i = 0; i < cells.length; i++) {
      mirrorRow.appendChild(cells[i].cloneNode(true));
    }
  }

  _alignMirror () {
    if (this.refs.mirror) {
      var tableElement = this.refs.table;
      var cells = tableElement.querySelectorAll('thead tr th');
      var mirrorElement = this.refs.mirror;
      var mirrorCells = mirrorElement.querySelectorAll('thead tr th');

      var rect = tableElement.getBoundingClientRect();
      mirrorElement.style.width = '' + Math.floor(rect.right - rect.left) + 'px';

      var height = 0;
      for (var i = 0; i < cells.length; i++) {
        rect = cells[i].getBoundingClientRect();
        mirrorCells[i].style.width = '' + Math.floor(rect.right - rect.left) + 'px';
        mirrorCells[i].style.height = '' + Math.floor(rect.bottom - rect.top) + 'px';
        height = Math.max(height, Math.floor(rect.bottom - rect.top));
      }
      mirrorElement.style.height = '' + height + 'px';
    }
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.selectable) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.scrollable) {
      classes.push(CLASS_ROOT + "--scrollable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var mirror = null;
    if (this.props.scrollable) {
      mirror = (
        <table ref="mirror" className={CLASS_ROOT + "__mirror"}>
          <thead>
            <tr></tr>
          </thead>
        </table>
      );
    }

    var more = null;
    if (this.props.onMore) {
      more = (
        <div ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </div>
      );
    }

    return (
      <div ref="container" className={classes.join(' ')}>
        {mirror}
        <table ref="table" className={CLASS_ROOT + "__table"} onClick={this._onClick}>
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
