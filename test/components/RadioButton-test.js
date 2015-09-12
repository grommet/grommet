// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/RadioButton');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet RadioButton', function() {
  it('loads a basic RadioButton', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      id: 'radio-id',
      label: 'Test Label'
    });

    GrommetTestUtils.componentShouldExist(Component, 'radio-button');
    GrommetTestUtils.componentShouldExist(Component,
      'radio-button__label', 'Test Label');
  });

  it('loads a disabled RadioButton', function () {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      id: 'radio-id',
      label: 'Test Label',
      disabled: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'radio-button');
    GrommetTestUtils.componentShouldExist(Component,
      'radio-button__label', 'Test Label');
    GrommetTestUtils.componentShouldExist(Component, 'radio-button--disabled');
  });

  it('loads a basic RadioButton with an additional class', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      id: 'radio-id',
      label: 'Test Label',
      className: 'test'
    });

    GrommetTestUtils.componentShouldExist(Component, 'radio-button');
    GrommetTestUtils.componentShouldExist(Component, 'test');
    GrommetTestUtils.componentShouldExist(Component,
      'radio-button__label', 'Test Label');
  });

});
