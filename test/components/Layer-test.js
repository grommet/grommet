// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Layer';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet Layer', function() {
  it('loads a basic Layer component', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Layer = require(__path__);

    var LayerDialog = React.createClass({
      childContextTypes: {
        router: React.PropTypes.func,
      },
      getChildContext: function () {
        return {
          router: function() {}
        };
      },
      render: function() {
        return (
          <Layer>{this.props.children}</Layer>
        );
      }
    });

    var TestParent = React.createFactory(React.createClass({
      render: function() {
        return (
          <LayerDialog>Testing Layer</LayerDialog>
        );
      }
    }));

    TestUtils.renderIntoDocument(new TestParent());

    ReactTestUtils.layerShouldExist('Testing Layer');
  });
});
