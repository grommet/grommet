// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SpinningIcon = require('./icons/Spinning');
var DOM = require('../utils/DOM');

var CLASS_ROOT = "table";
var SCROLL_MORE_DELAY = 2000;

var Table = React.createClass({

  propTypes: {
    defaultSelection: React.PropTypes.number,
    onMore: React.PropTypes.func,
    scrollable: React.PropTypes.bool,
    selectable: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      defaultSelection: null,
      scrollable: false,
      selectable: false
    };
  },

  _markSelection: function () {
    if (null !== this.state.selection) {
      var tbody = this.refs.table.getDOMNode().querySelectorAll('tbody')[0];
      tbody.childNodes[this.state.selection].classList.add(CLASS_ROOT + "__row--selected");
    }
  },

  _onClick: function (event) {
    var element = event.target;
    while (element.nodeName !== 'TR') {
      element = element.parentNode;
    }
    if (element && element.parentNode.nodeName === 'TBODY') {
      var rows = this.refs.table.getDOMNode()
        .querySelectorAll("." + CLASS_ROOT + "__row--selected");
      for (var i=0; i<rows.length; i++) {
        rows[i].classList.remove(CLASS_ROOT + "__row--selected");
      }
      element.classList.add(CLASS_ROOT + "__row--selected");
    }
  },

  _onScroll: function () {
    // delay a bit to ride out quick users
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(function () {
      // are we at the bottom?
      var containerElement = this.refs.container.getDOMNode();
      var moreElement = this.refs.more.getDOMNode();
      var containerRect = containerElement.getBoundingClientRect();
      var moreRect = moreElement.getBoundingClientRect();
      if (moreRect.bottom <= containerRect.bottom) {
        this.props.onMore();
      }
    }.bind(this), SCROLL_MORE_DELAY);
  },

  _startListeningForScroll: function () {
    var table = this.refs.table.getDOMNode();
    var scrollParent = DOM.findScrollParents(table)[0];
    scrollParent.addEventListener("scroll", this._onScroll);
  },

  _stopListeningForScroll: function () {
    var table = this.refs.table.getDOMNode();
    var scrollParent = DOM.findScrollParents(table)[0];
    clearTimeout(this._scrollTimer);
    scrollParent.removeEventListener("scroll", this._onScroll);
  },

  _onResize: function () {
    this._alignMirror();
  },

  _buildMirror: function () {
    var tableElement = this.refs.table.getDOMNode();
    var cells = tableElement.querySelectorAll('thead tr th');
    var mirrorElement = this.refs.mirror.getDOMNode();
    var mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
    for (var i=0; i<cells.length; i++) {
      mirrorRow.appendChild(cells[i].cloneNode(true));
    }
  },

  _alignMirror: function () {
    var tableElement = this.refs.table.getDOMNode();
    var cells = tableElement.querySelectorAll('thead tr th');
    var mirrorElement = this.refs.mirror.getDOMNode();
    var mirrorCells = mirrorElement.querySelectorAll('thead tr th');

    var rect = tableElement.getBoundingClientRect();
    mirrorElement.style.width = '' + Math.floor(rect.right - rect.left) + 'px';

    var height = 0;
    for (var i=0; i<cells.length; i++) {
      rect = cells[i].getBoundingClientRect();
      mirrorCells[i].style.width = '' + Math.floor(rect.right - rect.left) + 'px';
      mirrorCells[i].style.height = '' + Math.floor(rect.bottom - rect.top) + 'px';
      height = Math.max(height, Math.floor(rect.bottom - rect.top));
    }
    mirrorElement.style.height = '' + height + 'px';
  },

  getInitialState: function () {
    return {selection: this.props.defaultSelection};
  },

  componentDidMount: function () {
    this._markSelection();
    if (this.props.scrollable) {
      this._buildMirror();
      this._alignMirror();
    }
    if (this.props.onMore) {
      this._startListeningForScroll();
    }
    window.addEventListener('resize', this._onResize);
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.selection !== prevState.selection) {
      this._markSelection();
    }
    if (this.props.scrollable) {
      this._alignMirror();
    }
    if (prevProps.onMore && ! this.props.onMore) {
      this._stopListeningForScroll();
    } else if (this.props.onMore && ! prevProps.onMore) {
      this._startListeningForScroll();
    }
  },

  componentWillUnmount: function () {
    if (this.props.onMore) {
      this._stopListeningForScroll();
    }
    window.removeEventListener('resize', this._onResize);
  },

  render: function () {
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

});

module.exports = Table;
