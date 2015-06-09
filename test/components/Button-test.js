// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Button';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');

describe('Grommet Button', function() {
  it('loads a basic Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { label: 'Test Me'});

    GrommetTestUtils.componentShouldExist(Component, 'button', 'Test Me');
    GrommetTestUtils.componentShouldExist(Component, 'button--disabled');
  });

  it('loads a large primary Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { label: 'Test Me', primary: true, large: true});

    GrommetTestUtils.componentShouldExist(Component, 'button', 'Test Me');
    GrommetTestUtils.componentShouldExist(Component, 'button--primary');
    GrommetTestUtils.componentShouldExist(Component, 'button--large');
  });

  it('loads a small alternate Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { label: 'Test Me', alternate: true, small: true});

    GrommetTestUtils.componentShouldExist(Component, 'button', 'Test Me');
    GrommetTestUtils.componentShouldExist(Component, 'button--alternate');
    GrommetTestUtils.componentShouldExist(Component, 'button--small');
  });

  it('loads a custom className Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { className: 'testing', label: 'Custom class'});

    GrommetTestUtils.componentShouldExist(Component, 'testing');
    GrommetTestUtils.componentShouldExist(Component, 'button', 'Custom class');
  });
});
