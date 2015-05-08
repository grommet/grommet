var __path__ = '../../src/js/components/Footer';

var expect = require('expect');
var assert = require('assert');
var domEvents = require('../mocks/DOMEvents');

describe('Grommet Footer', function() {

  it('loads a basic Footer', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div><Footer><h2>Footer</h2></Footer></div>);

    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    expect(footerInstance).toExist();
    assert.equal(footerInstance.getDOMNode().textContent, 'Footer');
  });

  it('loads a primary Footer', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div><Footer primary={true}><h2>Footer Primary</h2></Footer></div>);

    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    expect(footerInstance).toExist();
    assert.equal(footerInstance.getDOMNode().textContent, 'Footer Primary');
  });

  it('loads a centered Footer', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div><Footer centered={true}><h2>Footer Centered</h2></Footer></div>);

    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    expect(footerInstance).toExist();
    assert.equal(footerInstance.getDOMNode().textContent, 'Footer Centered');
  });

  it('loads a colored Footer', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div><Footer colorIndex="1"><h2>Footer Colored 1</h2></Footer></div>);

    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'background-color-index-1');

    expect(footerInstance).toExist();
    assert.equal(footerInstance.getDOMNode().textContent, 'Footer Colored 1');
  });

  it('loads a custom class Footer', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div><Footer className="testing"><h2>Footer Custom Class</h2></Footer></div>);

    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'testing');

    expect(footerInstance).toExist();
    assert.equal(footerInstance.getDOMNode().textContent, 'Footer Custom Class');
  });

  it('scrolls Footer', function(done) {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div id="content"><Footer className="testing" scrollTop={true}><h2>Footer Custom Class</h2></Footer></div>);
    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    var contentDiv = footerInstance.getDOMNode().parentNode.parentNode;

    contentDiv.scrollTop = 500;
    domEvents.scroll(contentDiv);

    setTimeout(function() {
      var footerTop = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer__top');
      expect(footerTop).toExist();

      React.unmountComponentAtNode(contentDiv);
      done();
    }, 10);
  });

  it('scrolls back to normal inside Footer', function(done) {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Footer = require(__path__);

    var Component = TestUtils.renderIntoDocument(<div id="content"><Footer className="testing" scrollTop={true}><h2>Footer Custom Class</h2></Footer></div>);
    var footerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer');

    var contentDiv = footerInstance.getDOMNode().parentNode.parentNode;

    contentDiv.scrollTop = 500;

    domEvents.scroll(contentDiv);

    setTimeout(function() {
      var footerTop = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer__top');

      TestUtils.Simulate.click(footerTop.getDOMNode());

      domEvents.scroll(contentDiv);

      setTimeout(function() {
        var footerTop = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'footer__top');
        expect(footerTop.length).toBe(0);
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
        return <div><Footer centered={this.state.centered} /></div>
      }
    }));

    var Component = TestUtils.renderIntoDocument(TestParent());

    //should not be centered initially
    var footerCentered = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'footer--centered');
    expect(footerCentered.length).toBe(0);

    Component.setState({
      centered: true
    });

    footerCentered = TestUtils.findRenderedDOMComponentWithClass(Component, 'footer--centered');
    expect(footerCentered).toExist();
  });

});