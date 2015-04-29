// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var FixedHeader = require('../FixedHeader');
var Search = require('../Search');
var IndexQuery = require('../../utils/IndexQuery');

var CLASS_ROOT = 'index-header';

var IndexHeader = React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      total: React.PropTypes.number,
      unFilteredTotal: React.PropTypes.number
    }).isRequired,
    query: React.PropTypes.object.isRequired,
    onQuery: React.PropTypes.func.isRequired
  },

  _onSearchChange: function (text) {
    var query = IndexQuery.create(text);
    this.props.onQuery(query);
  },

  render: function () {
    var outOfClasses = [CLASS_ROOT + "__out-of"];
    if (this.props.data.unFilteredTotal > this.props.data.total) {
      outOfClasses.push(CLASS_ROOT + "__out-of--active");
    }

    return (
      <FixedHeader className={this.props.className}>
        <div className={CLASS_ROOT}>
          <Search className={CLASS_ROOT + "__search"}
            inline={true}
            defaultValue={this.props.query.fullText}
            onChange={this._onSearchChange} />
          <div className={CLASS_ROOT + "__count"}>
            {this.props.data.total}
            <span className={outOfClasses.join(' ')}>
              out of {this.props.data.unFilteredTotal}
            </span>
          </div>
        </div>
      </FixedHeader>
    );
  }

});

module.exports = IndexHeader;
