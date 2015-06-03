// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Layer';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');

describe('Grommet Layer', function() {
  beforeEach(function() {
    var elements = document.body.getElementsByClassName('layer');

    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  });
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

    GrommetTestUtils.layerShouldExist('Testing Layer');
  });
});
