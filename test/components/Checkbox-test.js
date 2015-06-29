// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/CheckBox');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet CheckBox', function() {
  it('loads a basic CheckBox', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { id: 'sample-check', label: 'Test Me'});

    GrommetTestUtils.componentShouldExist(Component, 'check-box');
    GrommetTestUtils.componentShouldExist(Component, 'check-box__label', 'Test Me');
  });

  it('loads a custom className CheckBox', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { id: 'sample-check', className: 'testing', label: 'Custom class'});

    GrommetTestUtils.componentShouldExist(Component, 'check-box');
    GrommetTestUtils.componentShouldExist(Component, 'check-box__label', 'Custom class');
  });
});
