// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/lang/isEqual';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';

const CLASS_ROOT = "table";
const SELECTED_CLASS = CLASS_ROOT + "__row--selected";

class Table extends Component {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onResize = this._onResize.bind(this);

    this.state = {
      selection: this._normalizeSelection(props.selection),
      rebuildMirror: props.scrollable
    };
  }

  componentDidMount () {
    this._alignSelection();
    if (this.props.scrollable) {
      this._buildMirror();
      this._alignMirror();
    }
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
    window.addEventListener('resize', this._onResize);
  }

  componentWillReceiveProps (newProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
    if (newProps.hasOwnProperty('selection')) {
      this.setState({selection: this._normalizeSelection(newProps.selection)});
    }
    this.setState({rebuildMirror: newProps.scrollable});
  }

  componentDidUpdate (prevProps, prevState) {
    if (! isEqual(this.state.selection, prevState.selection)) {
      this._alignSelection();
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

  _normalizeSelection (selection) {
    var result;
    if (undefined === selection || null === selection) {
      result = [];
    } else if (typeof selection === 'number') {
      result = [selection];
    } else {
      result = selection;
    }
    return result;
  }

  _clearSelected () {
    var rows = this.refs.table
      .querySelectorAll("." + SELECTED_CLASS);
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.remove(SELECTED_CLASS);
    }
  }

  _alignSelection () {
    this._clearSelected();
    if (null !== this.state.selection) {
      var tbody = this.refs.table.querySelectorAll('tbody')[0];
      this.state.selection.forEach(function (rowIndex) {
        tbody.childNodes[rowIndex].classList.add(SELECTED_CLASS);
      });
    }
  }

  _onClick (event) {
    if (!this.props.selectable) {
      return;
    }

    var element = event.target;
    while (element.nodeName !== 'TR') {
      element = element.parentNode;
    }

    var parentElement = element.parentNode;
    if (element && parentElement.nodeName === 'TBODY') {

      var index;
      for (index = 0; index < parentElement.childNodes.length; index++) {
        if (parentElement.childNodes[index] === element) {
          break;
        }
      }

      var selection = this.state.selection.slice(0);
      var selectionIndex = selection.indexOf(index);

      if ('multiple' === this.props.selectable && event.shiftKey) {

        // select from nearest selected item to the currently selected item
        var closestIndex = -1;
        selection.forEach(function (selectIndex, arrayIndex) {
          if (-1 === closestIndex) {
            closestIndex = selectIndex;
          } else if (Math.abs(index - selectIndex) < Math.abs(index - closestIndex)) {
            closestIndex = selectIndex;
          }
        });
        for (var i = index; i !== closestIndex; ) {
          selection.push(i);
          if (closestIndex < index) {
            i -= 1;
          } else {
            i += 1;
          }
        }
        // remove text selection
        window.getSelection().removeAllRanges();

      } else if (('multiple' === this.props.selectable || -1 !== selectionIndex) &&
        (event.ctrlKey || event.metaKey)) {

        // toggle
        if (-1 === selectionIndex) {
          element.classList.add(SELECTED_CLASS);
          selection.push(index);
        } else {
          element.classList.remove(SELECTED_CLASS);
          selection.splice(selectionIndex, 1);
        }

      } else {

        this._clearSelected();
        selection = [index];
        element.classList.add(SELECTED_CLASS);

      }

      this.setState({selection: selection});

      if (this.props.onSelect) {
        // notify caller that the selection has changed
        if (selection.length === 1) {
          selection = selection[0];
        }
        this.props.onSelect(selection);
      }
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
  selection: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  onMore: PropTypes.func,
  scrollable: PropTypes.bool,
  selectable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['multiple'])
  ]),
  onSelect: PropTypes.func
};

Table.defaultProps = {
  scrollable: false,
  selectable: false
};

module.exports = Table;
