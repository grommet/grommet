// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Topology');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Topology', function() {
  it('loads an empty Topology', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'topology');
  });

  it('loads a Topology with Parts', function() {
    var React = require('react/addons');
    var Topology = require(__path__);
    var Component = GrommetTestUtils.getComponent(__path__, (
      <Topology.Parts><Topology.Part status="ok" label="test part" /></Topology.Parts>
    ));

    GrommetTestUtils.componentShouldExist(Component, 'topology', 'OKtest part');
  });

});
