// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Footer';

var domEvents = require('../mocks/DOMEvents');
var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet Footer', function() {

  it('loads a basic Footer', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer</h2>);

    ReactTestUtils.componentShouldExist(Component, 'footer', 'Footer');
  });

  it('loads a primary Footer', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer Primary</h2>, { primary: true });

    ReactTestUtils.componentShouldExist(Component, 'footer--primary', 'Footer Primary');
  });

  it('loads a centered Footer', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer Centered</h2>, { centered: true });

    ReactTestUtils.componentShouldExist(Component, 'footer--centered', 'Footer Centered');
  });

  it('loads a colored Footer', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer Colored 1</h2>, { colorIndex: '1' });

    ReactTestUtils.componentShouldExist(Component, 'background-color-index-1', 'Footer Colored 1');
  });

  it('loads a custom class Footer', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer Custom Class</h2>, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing', 'Footer Custom Class');
  });

  it('scrolls Footer', function(done) {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer Scroll Top</h2>, { scrollTop: true });
    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    var contentDiv = footerInstance.getDOMNode().parentNode.parentNode;

    contentDiv.scrollTop = 500;
    domEvents.scroll(contentDiv);

    setTimeout(function() {
      ReactTestUtils.componentShouldExist(Component, 'footer__top');

      React.unmountComponentAtNode(contentDiv);
      done();
    }, 10);
  });

  it('scrolls back to top if clicking on top icon', function(done) {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = ReactTestUtils.getComponent(__path__, <h2>Footer Scroll Top</h2>, { scrollTop: true });
    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    var contentDiv = footerInstance.getDOMNode().parentNode.parentNode;

    contentDiv.scrollTop = 500;
    domEvents.scroll(contentDiv);

    setTimeout(function() {
      var footerTop = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer__top');

      TestUtils.Simulate.click(footerTop.getDOMNode());
      domEvents.scroll(contentDiv);

      setTimeout(function() {
        ReactTestUtils.componentShouldNotExist(Component, 'footer__top');

        done();
      }, 10);
    }, 10);
  });

  it("displays a modified state upon changing props", function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { centered: false };
      },
      render() {
        return <div><Footer centered={this.state.centered} /></div>;
      }
    }));

    var Component = TestUtils.renderIntoDocument(new TestParent());

    ReactTestUtils.componentShouldNotExist(Component, 'footer--centered');

    Component.setState({
      centered: true
    });

    ReactTestUtils.componentShouldExist(Component, 'footer--centered');
  });

});
