// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var Router = require('../../utils/Router');
var IndexRouter = require('../utils/IndexRouter');
var IndexStore = require('../stores/IndexStore');
var IndexActions = require('../actions/IndexActions');
var IndexAggregates = require('../components/IndexAggregates');
var IndexTable = require('../components/IndexTable');
var IndexTiles = require('../components/IndexTiles');
var EditIcon = require('../../components/icons/Edit');
var Link = require('../../components/Link');

var CLASS_ROOT = 'index-results';

var IndexResults = React.createClass({

  _onScroll: function () {
    // delay a bit to ride out quick users
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(function () {
      // are we at the bottom?
      var resourcesElement = this.refs.resources.getDOMNode();
      var moreElement = this.refs.more.getDOMNode();
      var resourcesRect = resourcesElement.getBoundingClientRect();
      var moreRect = moreElement.getBoundingClientRect();
      if (moreRect.bottom <= resourcesRect.bottom) {
        // do we have more we could show?
        var index = this.props.index;
        if (index.result.count < index.result.total) {
          // get one more page's worth of data
          var params = _.extend({}, index.params);
          params.count += index.pageSize;
          IndexActions.getResult(params);
        }
      }
    }.bind(this), 2000);
  },

  componentDidMount: function () {
    this.refs.resources.getDOMNode().addEventListener("scroll", this._onScroll);
  },

  componentWillReceiveProps: function (nextProps) {
    /*if (nextProps.index.result.members.length > 0 &&
      ! nextProps.index.result.members[0]._activity &&
      nextProps.index.includeActivity) {
      // check for activity
      var state = this.state;
      clearTimeout(this._activityTimer);
      this._activityTimer = setTimeout(function () {
        IndexActions.getIndexActivity(state.result.members);
      }, 1000); // delay a bit in case the user is searching
    }*/
  },

  componentWillUnmount: function () {
    clearTimeout(this._activityTimer);
    clearTimeout(this._scrollTimer);
    this.refs.resources.getDOMNode().removeEventListener("scroll", this._onScroll);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var index = this.props.index;
    var result = index.result;

    var more = '';
    if ((result.start + result.count) < result.total) {
      more = 'more ...';
    }

    var view;
    if ('table' === index.view) {
      view = (<IndexTable index={this.props.index} />);
    } else if ('tiles' === index.view) {
      view = (<IndexTiles index={this.props.index} />);
    }

    var aggregates = [];
    if (! this.props.resourceActive) {
      aggregates = index.attributes.filter(function (attribute) {
        return attribute.aggregate;
      });
    }

    var editHref = Router.makeHref('index-edit', {category: this.props.category});

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <div ref="resources" className={CLASS_ROOT + "__resources"}>
            {view}
            <div ref="more" className={CLASS_ROOT + "__more"}>
              {more}
            </div>
          </div>
          <div className={CLASS_ROOT + "__aggregates"}>
            <IndexAggregates category={this.props.category}
              aggregates={aggregates} search={index.params.search}
              onSearch={this.props.onSearch} />
          </div>
        </div>
        <Link href={editHref}
          className={CLASS_ROOT + "__edit control-icon"}>
          <EditIcon className={CLASS_ROOT + "__edit-icon"} />
        </Link>
      </div>
    );
  }

});

module.exports = IndexResults;
