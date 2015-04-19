// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Table = React.createClass({

  propTypes: {
    selectable: React.PropTypes.bool,
    defaultSelection: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {defaultSelection: null};
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

  getInitialState: function () {
    return {selection: this.props.defaultSelection};
  },

  componentDidMount: function () {
    this._markSelection();
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.selection !== prevState.selection) {
      this._markSelection();
    }
  },

  render: function () {
    var classes = ["table"];
    if (this.props.selectable) {
      classes.push("table--selectable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <table ref="table" className={classes.join(' ')} onClick={this._onClick}>
        {this.props.children}
      </table>
    );
  }

});

module.exports = Table;
