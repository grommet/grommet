// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var FixedHeader = require('../FixedHeader');
var Search = require('../Search');

var CLASS_ROOT = 'index-header';

var IndexHeader = React.createClass({

  propTypes: {
    searchText: React.PropTypes.string,
    total: React.PropTypes.number,
    unfilteredTotal: React.PropTypes.number,
    onSearch: React.PropTypes.func.isRequired
  },

  _onSearchChange: function (text) {
    this.props.onSearch(text);
  },

  render: function () {
    var searchText = this.props.searchText || '';

    var outOfClasses = [CLASS_ROOT + "__out-of"];
    if (this.props.unfilteredTotal > this.props.total) {
      outOfClasses.push(CLASS_ROOT + "__out-of--active");
    }

    return (
      <FixedHeader className={this.props.className}>
        <div className={CLASS_ROOT}>
          <Search className={CLASS_ROOT + "__search"}
            inline={true}
            defaultValue={searchText}
            onChange={this._onSearchChange} />
          <div className={CLASS_ROOT + "__count"}>
            {this.props.total}
            <span className={outOfClasses.join(' ')}>
              out of {this.props.unfilteredTotal}
            </span>
          </div>
        </div>
      </FixedHeader>
    );
  }

});

module.exports = IndexHeader;
