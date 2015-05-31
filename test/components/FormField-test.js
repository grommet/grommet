// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/FormField';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');

describe('Grommet FormField', function() {
  it('loads a basic FormField component', function() {
    var React = require('react/addons');

    var Component = GrommetTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      htmlFor: 'item1'
    });

    GrommetTestUtils.componentShouldExist(Component, 'form-field');
    GrommetTestUtils.componentShouldExist(Component, 'form-field--text');
    GrommetTestUtils.componentShouldExist(Component, 'inputTest');
  });

  it('loads a required FormField component', function() {
    var React = require('react/addons');

    var Component = GrommetTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      required: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'form-field');
    GrommetTestUtils.componentShouldExist(Component, 'form-field--required');
    GrommetTestUtils.componentShouldExist(Component, 'inputTest');
  });

  it('loads a FormField component with help message', function() {
    var React = require('react/addons');

    var Component = GrommetTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      help: 'This field is very important'
    });

    GrommetTestUtils.componentShouldExist(Component, 'form-field');
    GrommetTestUtils.componentShouldExist(Component, 'form-field__help',
      'This field is very important');
    GrommetTestUtils.componentShouldExist(Component, 'inputTest');
  });

  it('loads a FormField component with error message', function() {
    var React = require('react/addons');

    var Component = GrommetTestUtils.getComponent(__path__,
      <input id="item1" type="text" className="inputTest" />, {
      label: 'Item 1',
      error: 'Field Test is required.'
    });

    GrommetTestUtils.componentShouldExist(Component, 'form-field');
    GrommetTestUtils.componentShouldExist(Component,
      'form-field__error', 'Field Test is required.');
    GrommetTestUtils.componentShouldExist(Component, 'inputTest');
  });
});
