// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var data = require('./data');

var REDUCE_LIMIT = 20;

function addResource(uri, result, associationContext) {
  var resource = data.getResource(uri);
  if (! result.categories.hasOwnProperty(resource.category)) {
    result.categories[resource.category] = [];
  }
  if (result.categories[resource.category] > 10) {
  } else {
    result.categories[resource.category].push({
      uri: uri,
      status: resource.status,
      name: resource.name
    });
  }
}

function addChildren(uri, result) {
  var associations = data.getAssociations(uri);
  for (var name in associations) {
    if (associations.hasOwnProperty(name)) {
      associations[name].children.forEach(function (childUri) {
        result.links.push({parentUri: uri, childUri: childUri});
        addResource(childUri, result, {name: name, parentUri: uri})
        addChildren(childUri, result);
      });
    }
  }
}

function addParents(uri, result) {
  var associations = data.getAssociations(uri);
  for (var name in associations) {
    if (associations.hasOwnProperty(name)) {
      associations[name].parents.forEach(function (parentUri) {
        result.links.push({parentUri: parentUri, childUri: uri});
        addResource(parentUri, result, {name: name, childUri: uri});
        addParents(parentUri, result);
      });
    }
  }
}

function reduce(result) {
  for (var name in result.categories) {
    if (result.categories.hasOwnProperty(name)) {
      var items = result.categories[name];
      if (items.length > REDUCE_LIMIT) {

        var reduced = {
          association: {
            parentUri: '',
            name: ''
          },
          total: 0,
          uri: '/summary/' + name,
          status: {}
        }

        for (var i=0; i<items.length; i++) {
          var item = items[i];
          // adjust counters
          reduced.total += 1;
          if (! reduced.status[item.status]) {
            reduced.status[item.status] = 0;
          }
          reduced.status[item.status] += 1;

          // adjust links
          for (var j=0; j<result.links.length; j++) {
            var link = result.links[j];
            if (link.parentUri === item.uri) {
              link.parentUri = reduced.uri;
            }
            if (link.childUri === item.uri) {
              link.childUri = reduced.uri;
            }
          }
        }

        result.categories[name] = [reduced];
      }
    }
  }
}

var Map = {
  build: function (uri) {
    var result = { links: [], categories: {}, rootUri: uri };
    addResource(uri, result);
    addParents(uri, result);
    addChildren(uri, result);
    reduce(result);
    return result;
  }
};

module.exports = Map;
