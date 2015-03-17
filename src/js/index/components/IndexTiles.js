// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var IndexRouter = require('../utils/IndexRouter');
var Tiles = require('../../components/Tiles');
var Tile = require('../../components/Tile');
var IndexAttribute = require('../components/IndexAttribute');

var CLASS_ROOT = "index-tiles";

var IndexTiles = React.createClass({

  render: function() {

    var index = this.props.index;
    var includeName = false;
    var includeStatus = false;
    var visibleAttributes = index.attributes.filter(function (attribute) {
      var result = attribute.visible;
      if ('name' === attribute.name) {
        includeName = true;
        result = false;
      } else if ('status' === attribute.name) {
        includeStatus = true;
        result = false;
      }
      return result;
    });
    var query = {};
    if (index.params.search.fullText) {
      query.search = index.params.search.fullText;
    }
    var tiles = index.result.members.map(function (member) {
      var href = IndexRouter.resourceHref(member.category, member.uri, query);
      var values = visibleAttributes.map(function (attribute) {
        return (
          <IndexAttribute key={attribute.name}
            member={member} attribute={attribute} />
        );
      });
      var actions = [(<a>Edit</a>), (<a>Restart</a>)];
      return (
        <Tile key={member.uri} href={href}
          name={includeName ? member.name : null}
          status={includeStatus ? member.status : null}
          actions={actions} >
          {values}
        </Tile>
      );
    }, this);

    return (
      <Tiles>
        {tiles}
      </Tiles>
    );
  }

});

module.exports = IndexTiles;
