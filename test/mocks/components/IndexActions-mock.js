// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var __path__ = '../../../src/js/actions/IndexActions';

var rewire = require('rewire');

module.exports = {

  successIndexAction: function() {
    var IndexActionsMock = rewire(__path__);
    var result = {
      total: 10,
      unfilteredTotal: 100,
      start: 0,
      count: 10,
      items: [{ id: '1', value: 'Fake 1'}, { id: '2', value: 'Fake 2'}]
    };
    IndexActionsMock.__set__('Rest', {
      get: function () {
        return {
          end: function (callback) {
            callback(undefined, { ok: true, body: result});
          }
        };
      }
    });
    IndexActionsMock.__set__('RestWatch', {
      start: function (url, params, callback) {
        callback(result);
      }
    });
    return IndexActionsMock;
  },

  successGetAggregateAction: function() {
    var IndexActionsMock = rewire(__path__);
    var result = [{ counts: [
      {count: 10, value: 'Test1'},
      {count: 20, value: 'Test2'}
    ]}]
    IndexActionsMock.__set__('Rest', {
      get: function () {
        return {
          end: function (callback) {
            callback(undefined, { ok: true, body: result});
          }
        };
      }
    });
    IndexActionsMock.__set__('RestWatch', {
      start: function (url, params, callback) {
        callback(result);
      }
    });
    return IndexActionsMock;
  },

  badRequestIndexAction: function() {
    var IndexActionsMock = rewire(__path__);
    IndexActionsMock.__set__('Rest', {
      get: function () {
        return {
          end: function (callback) {
            callback(undefined, { status: 400 });
          }
        };
      }
    });
    return IndexActionsMock;
  },

  unexpectedErrorIndexAction: function() {
    var IndexActionsMock = rewire(__path__);
    IndexActionsMock.__set__('Rest', {
      get: function () {
        return {
          end: function (callback) {
            callback(410, { ok: false, body: { message: 'An expected error occured.' }});
          }
        };
      }
    });
    return IndexActionsMock;
  }
};
