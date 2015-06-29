// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Form');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');
var expect = require('expect');

describe('Grommet Form', function() {
  it('loads a basic Form', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Form</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'form', 'Form');
  });

  it('loads a compact Form', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Form Compact</h2>, { compact: true });

    GrommetTestUtils.componentShouldExist(Component, 'form--compact', 'Form Compact');
  });

  it('loads a custom Form', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Form Custom</h2>, { className: 'testing'});

    GrommetTestUtils.componentShouldExist(Component, 'testing', 'Form Custom');
  });

  it('submits a Form', function(done) {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var formSubmited = false;
    var childrenElement = <div><h2>Form Compact</h2></div>;
    var Component = GrommetTestUtils.getComponent(__path__, childrenElement, {
      onSubmit: function() {
        formSubmited = true;
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'form');
    expect(formSubmited).toBe(false);

    var form = TestUtils.findRenderedDOMComponentWithTag(Component, 'form');
    TestUtils.Simulate.submit(form);

    setTimeout(function() {
      expect(formSubmited).toBe(true);
      done();
    }, 10);
  });
});
