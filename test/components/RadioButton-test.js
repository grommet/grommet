// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/RadioButton';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');

describe('Grommet RadioButton', function() {
  it('loads a basic RadioButton', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      id: 'radio-id',
      label: 'Test Label'
    });

    GrommetTestUtils.componentShouldExist(Component, 'radio-button');
    GrommetTestUtils.componentShouldExist(Component,
      'radio-button__label', 'Test Label');
  });

});
