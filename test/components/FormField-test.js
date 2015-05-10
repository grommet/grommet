// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/FormField';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet FormField', function() {
  it('loads a basic FormField component', function() {
    var React = require('react/addons');

    var Component = ReactTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      htmlFor: 'item1'
    });

    ReactTestUtils.componentShouldExist(Component, 'form-field');
    ReactTestUtils.componentShouldExist(Component, 'form-field--text');
    ReactTestUtils.componentShouldExist(Component, 'inputTest');
  });

  it('loads a required FormField component', function() {
    var React = require('react/addons');

    var Component = ReactTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      required: true
    });

    ReactTestUtils.componentShouldExist(Component, 'form-field');
    ReactTestUtils.componentShouldExist(Component, 'form-field--required');
    ReactTestUtils.componentShouldExist(Component, 'inputTest');
  });

  it('loads a FormField component with help message', function() {
    var React = require('react/addons');

    var Component = ReactTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      help: 'This field is very important'
    });

    ReactTestUtils.componentShouldExist(Component, 'form-field');
    ReactTestUtils.componentShouldExist(Component, 'form-field__help', 'This field is very important');
    ReactTestUtils.componentShouldExist(Component, 'inputTest');
  });

  it('loads a FormField component with error message', function() {
    var React = require('react/addons');

    var Component = ReactTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      error: 'Field Test is required.'
    });

    ReactTestUtils.componentShouldExist(Component, 'form-field');
    ReactTestUtils.componentShouldExist(Component,
      'form-field--error', 'Item 1Field Test is required.');
    ReactTestUtils.componentShouldExist(Component, 'inputTest');
  });
});
