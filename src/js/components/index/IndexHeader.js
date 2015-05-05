// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('../Header');
var Search = require('../Search');

var CLASS_ROOT = 'index-header';

var IndexHeader = React.createClass({

  propTypes: {
    fixed: React.PropTypes.bool,
    searchText: React.PropTypes.string,
    total: React.PropTypes.number,
    unfilteredTotal: React.PropTypes.number,
    onSearch: React.PropTypes.func.isRequired
  },

  _onSearchChange: function (text) {
    this.props.onSearch(text);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var searchText = this.props.searchText || '';

    var outOfClasses = [CLASS_ROOT + "__out-of"];
    if (this.props.unfilteredTotal > this.props.total) {
      outOfClasses.push(CLASS_ROOT + "__out-of--active");
    }

    return (
      <Header className={classes.join(' ')} fixed={this.props.fixed} flush={false}>
        <Search className={CLASS_ROOT + "__search"}
          inline={true}
          defaultValue={searchText}
          onChange={this._onSearchChange} />
        <span className={CLASS_ROOT + "__count"}>
          {this.props.total}
          <span className={outOfClasses.join(' ')}>
            out of {this.props.unfilteredTotal}
          </span>
        </span>
      </Header>
    );
  }

});

module.exports = IndexHeader;
