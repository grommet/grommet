// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Table = React.createClass({

  propTypes: {
    defaultSelection: React.PropTypes.number,
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
      tbody.childNodes[this.state.selection].classList.add("table__row--selected");
    }
  },

  _onClick: function (event) {
    var element = event.target;
    while (element.nodeName !== 'TR') {
      element = element.parentNode;
    }
    if (element && element.parentNode.nodeName === 'TBODY') {
      var rows = this.refs.table.getDOMNode().querySelectorAll(".table__row--selected");
      for (var i=0; i<rows.length; i++) {
        rows[i].classList.remove("table__row--selected");
      }
      element.classList.add("table__row--selected");
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
    window.addEventListener('resize', this._onResize);
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.selection !== prevState.selection) {
      this._markSelection();
    }
    if (this.props.scrollable) {
      this._alignMirror();
    }
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },

  render: function () {
    var classes = ["table"];
    if (this.props.selectable) {
      classes.push("table--selectable");
    }
    if (this.props.scrollable) {
      classes.push("table--scrollable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var mirror = null;
    if (this.props.scrollable) {
      mirror = (
        <table ref="mirror" className="table__mirror">
          <thead>
            <tr></tr>
          </thead>
        </table>
      );
    }

    return (
      <div className={classes.join(' ')}>
        {mirror}
        <table ref="table" className="table__table" onClick={this._onClick}>
          {this.props.children}
        </table>
      </div>
    );
  }

});

module.exports = Table;
