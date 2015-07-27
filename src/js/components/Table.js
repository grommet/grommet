// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SpinningIcon = require('./icons/Spinning');
var InfiniteScroll = require('../mixins/InfiniteScroll');

var CLASS_ROOT = "table";

var Table = React.createClass({

  propTypes: {
    selection: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.arrayOf(React.PropTypes.number)
    ]),
    onMore: React.PropTypes.func,
    scrollable: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  mixins: [InfiniteScroll],

  getDefaultProps: function () {
    return {
      selection: null,
      scrollable: false,
      selectable: false,
      onSelect: null
    };
  },

  _clearSelection: function () {
    var rows = this.refs.table.getDOMNode()
      .querySelectorAll("." + CLASS_ROOT + "__row--selected");
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.remove(CLASS_ROOT + "__row--selected");
    }
  },

  _markSelection: function () {
    this._clearSelection();
    if (null !== this.state.selection) {
      var tbody = this.refs.table.getDOMNode().querySelectorAll('tbody')[0];
      let selection = this.state.selection;
      if (typeof selection === 'number') {
        selection = [selection];
      }
      selection.forEach(function (rowIndex) {
        tbody.childNodes[rowIndex].classList.
          add(CLASS_ROOT + "__row--selected");
      });
    }
  },

  _onClick: function (event) {
    if (!this.props.selectable) {
      return;
    }

    var element = event.target;
    while (element.nodeName !== 'TR') {
      element = element.parentNode;
    }

    var parentElement = element.parentNode;
    if (element && parentElement.nodeName === 'TBODY') {
      this._clearSelection();
      element.classList.add(CLASS_ROOT + "__row--selected");
      if (this.props.onSelect) {
        var idx;
        for (idx = 0; idx < parentElement.childNodes.length; idx++) {
          if (parentElement.childNodes[idx] === element) {
            break;
          }
        }
        this.props.onSelect(idx);
      }
    }
  },

  _onResize: function () {
    this._alignMirror();
  },

  _buildMirror: function () {
    var tableElement = this.refs.table.getDOMNode();
    var cells = tableElement.querySelectorAll('thead tr th');
    var mirrorElement = this.refs.mirror.getDOMNode();
    var mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
    for (var i = 0; i < cells.length; i++) {
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
    for (var i = 0; i < cells.length; i++) {
      rect = cells[i].getBoundingClientRect();
      mirrorCells[i].style.width = '' + Math.floor(rect.right - rect.left) + 'px';
      mirrorCells[i].style.height = '' + Math.floor(rect.bottom - rect.top) + 'px';
      height = Math.max(height, Math.floor(rect.bottom - rect.top));
    }
    mirrorElement.style.height = '' + height + 'px';
  },

  getInitialState: function () {
    return {selection: this.props.selection};
  },

  componentDidMount: function () {
    this._markSelection();
    if (this.props.scrollable) {
      this._buildMirror();
      this._alignMirror();
    }
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
    window.addEventListener('resize', this._onResize);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.hasOwnProperty('selection')) {
      this.setState({selection: newProps.selection});
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.selection !== prevState.selection) {
      this._markSelection();
    }
    if (this.props.scrollable) {
      this._alignMirror();
    }
    this.stopListeningForScroll();
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
  },

  componentWillUnmount: function () {
    if (this.props.onMore) {
      this.stopListeningForScroll();
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
