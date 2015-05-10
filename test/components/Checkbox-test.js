// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/CheckBox';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet CheckBox', function() {
  it('loads a basic CheckBox', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { id: 'sample-check', label: 'Test Me'});

    ReactTestUtils.componentShouldExist(Component, 'check-box');
    ReactTestUtils.componentShouldExist(Component, 'check-box__label', 'Test Me');
  });

  it('loads a custom className CheckBox', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { id: 'sample-check', className: 'testing', label: 'Custom class'});

    ReactTestUtils.componentShouldExist(Component, 'check-box');
    ReactTestUtils.componentShouldExist(Component, 'check-box__label', 'Custom class');
  });
});
