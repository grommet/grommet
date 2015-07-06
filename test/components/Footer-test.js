// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Footer');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Footer', function() {

  it('loads a basic Footer', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Footer</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'footer', 'Footer');
  });

  it('loads a colored Footer', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Footer Colored 1</h2>, { colorIndex: '1' });

    GrommetTestUtils.componentShouldExist(Component, 'background-color-index-1', 'Footer Colored 1');
  });

  it('loads a custom class Footer', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Footer Custom Class</h2>, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing', 'Footer Custom Class');
  });

  it("displays a modified state upon changing props", function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { direction: 'row' };
      },
      render() {
        return <div><Footer direction={this.state.direction} /></div>;
      }
    }));

    var Component = TestUtils.renderIntoDocument(new TestParent());

    GrommetTestUtils.componentShouldExist(Component, 'box--direction-row');

    Component.setState({
      direction: 'column'
    });

    GrommetTestUtils.componentShouldExist(Component, 'box--direction-column');
  });

});
