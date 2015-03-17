// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var FixedHeader = require('../../components/FixedHeader');
var IndexSearchFaceted = require('../components/IndexSearchFaceted');
var IndexSearch = require('../components/IndexSearch');
var IndexFilterControl = require('../components/IndexFilterControl');
var Link = require('../../components/Link');
var Router = require('../../utils/Router');

var CLASS_ROOT = 'index-header';

var IndexHeader = React.createClass({

  render: function () {
    var index = this.props.index;

    var classes = [CLASS_ROOT];
    var searchClasses = [CLASS_ROOT + "__search"];
    var filterControlClasses = [CLASS_ROOT + "__filter-control"];
    var result = index.result;
    var search = '';
    var filterControl = '';

    if (index.searchMode === 'facets') {
      searchClasses.push(CLASS_ROOT + "__search--active");
      search = (<IndexSearchFaceted category={this.props.category}
        onSearch={this.props.onSearch} />);
    } else {
      if (! this.props.filterActive) {
        filterControlClasses.push(CLASS_ROOT + "__filter-control--active");
        filterControl = (<IndexFilterControl onOpen={this.props.onOpenFilter} />);
        searchClasses.push(CLASS_ROOT + "__search--active");
        search = (<IndexSearch
          search={this.props.index.params.search}
          onOpen={this.props.onOpenFilter}
          onSearch={this.props.onSearch} />);
      }
    }

    var outOfClasses = [CLASS_ROOT + "__count-out-of"];
    if (result.unFilteredTotal > result.total) {
      outOfClasses.push(CLASS_ROOT + "__count-out-of--active");
    }

    var add;
    if (this.props.addRoute) {
      var href = Router.makeHref(this.props.addRoute);
      add = (<Link href={href}
        className={CLASS_ROOT + "__add " + CLASS_ROOT + "__add--active"}>Add</Link>);
    } else if (index.attributes.filter(function (attribute) {
        return attribute.aggregate;
      }).length > 0) {
      add = (<span className={CLASS_ROOT + "__add"}></span>);
    }

    return (
      <FixedHeader className={this.props.className}>
        <div className={CLASS_ROOT}>
          <div className={CLASS_ROOT + "__title"}>
            {this.props.title}
          </div>
          <div className={searchClasses.join(' ')}>
            {search}
          </div>
          <div className={CLASS_ROOT + "__count"}>
            {result.total}
            <span className={outOfClasses.join(' ')}>
              out of {result.unFilteredTotal}
            </span>
          </div>
          <div className={filterControlClasses.join(' ')}>
            {filterControl}
          </div>
          {add}
        </div>
      </FixedHeader>
    );
  }

});

module.exports = IndexHeader;
