// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('../Header');
var Menu = require('../Menu');
var Search = require('../Search');
var IndexFilters = require('./IndexFilters');
var IndexQuery = require('../../utils/IndexQuery');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var CLASS_ROOT = 'index-header';

var IndexHeader = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    options: React.PropTypes.shape({
      label: React.PropTypes.string,
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        label: React.PropTypes.string,
        index: React.PropTypes.number,
        timestamp: React.PropTypes.bool
      })),
      params: React.PropTypes.shape({
        query: React.PropTypes.object
      })
    }),
    fixed: React.PropTypes.bool,
    total: React.PropTypes.number,
    unfilteredTotal: React.PropTypes.number,
    onQuery: React.PropTypes.func.isRequired,
    addControl: React.PropTypes.node,
    navControl: React.PropTypes.node
  },

  _onSearchChange: function (text) {
    var query = this.props.options.params.query;
    if (query) {
      query.replaceTextTokens(text);
    } else {
      query = IndexQuery.create(text);
    }
    this.props.onQuery(query);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var searchText = '';
    var query = this.props.options.params.query;
    if (query) {
      if (typeof query === 'string') {
        searchText = query;
      } else {
        searchText = query.text;
      }
    }

    var outOfClasses = [CLASS_ROOT + "__out-of"];
    if (this.props.unfilteredTotal > this.props.total) {
      outOfClasses.push(CLASS_ROOT + "__out-of--active");
    }

    var filters = null;
    var numFilters = this.props.options.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .length;
    if (numFilters > 0) {
      filters = (
        <IndexFilters options={this.props.options}
          onQuery={this.props.onQuery} />
      );
    }

    var addControl = null;
    if (this.props.addControl) {
      addControl = (
        <Menu className={CLASS_ROOT + "__add-control"}>
          {this.props.addControl}
        </Menu>
      );
    }

    var navControl = null;
    if (this.props.navControl) {
      navControl = (
        <Menu className={CLASS_ROOT + "__nav-control"}>
          {this.props.navControl}
        </Menu>
      );
    }

    var label = this.getGrommetIntlMessage(this.props.options.label);

    return (
      <Header className={classes.join(' ')}
        fixed={this.props.fixed} flush={false} large={true}>
        {navControl}
        <Search className={CLASS_ROOT + "__search"}
          inline={true}
          placeHolder={this.getIntlMessage('IndexHeader.search') + ' ' + label}
          defaultValue={searchText}
          onChange={this._onSearchChange} />
        {filters}
        {addControl}
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
