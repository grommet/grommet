// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');

var _categories = {}; // name: [resource, ...]

var _resources = {}; // uri: resource

var _associations = {}; // uri: {name: {parents: [parent_item, ...],
                       //              children: [child_item, ...]}}

var Data = {

  getMembers: function (categoryName, raw) {
    var result = [];
    if (categoryName) {
      if (Array.isArray(categoryName)) {
        for (var i=0; i<categoryName.length; i++) {
          result = result.concat(_categories[categoryName[i]]);
        }
      } else {
        result = _categories[categoryName];
      }
    } else {
      // global
      for (var name in _categories) {
        if (_categories.hasOwnProperty(name)) {
          result = result.concat(_categories[name]);
        }
      }
    }
    if (! raw) {
      // add _indexAttributes
      result = result.map(function (member) {
        member = _.extend({attributes: member._indexAttributes || {}}, member);
        delete member._indexAttributes;
        delete member._resourceAttributes;
        return member;
      });
    }
    return result;
  },

  getResource: function (uri) {
    // move _resourceAttributes to top
    var resource = _resources[uri];
    if (resource) {
      resource = _.extend(resource._resourceAttributes || {}, resource);
      delete resource._resourceAttributes;
      delete resource._indexAttributes;
    }
    return resource;
  },

  getAssociations: function (uri) {
    return _associations[uri];
  },

  addCategory: function (name) {
    _categories[name] = [];
  },

  addResource: function (categoryName, resource) {
    _resources[resource.uri] = resource;
    _categories[categoryName].push(resource);
  },

  addAssociation: function (name, parentUri, childUri) {
    if (! _associations.hasOwnProperty(parentUri)) {
        _associations[parentUri] = {};
    }
    var assoc = _associations[parentUri];
    if (! assoc.hasOwnProperty(name)) {
        assoc[name] = {parents: [], children: []};
    }
    assoc[name].children.push(childUri);

    if (! _associations.hasOwnProperty(childUri)) {
        _associations[childUri] = {};
    }
    assoc = _associations[childUri];
    if (! assoc.hasOwnProperty(name)) {
        assoc[name] = {parents: [], children: []};
    }
    assoc[name].parents.push(parentUri);
  }

}

module.exports = Data;
