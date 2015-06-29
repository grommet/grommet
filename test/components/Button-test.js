// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Button');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Button', function() {
  it('loads a basic Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { label: 'Test Me'});

    GrommetTestUtils.componentShouldExist(Component, 'button', 'Test Me');
    GrommetTestUtils.componentShouldExist(Component, 'button--disabled');
  });

  it('loads a primary Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { label: 'Test Me', primary: true});

    GrommetTestUtils.componentShouldExist(Component, 'button', 'Test Me');
    GrommetTestUtils.componentShouldExist(Component, 'button--primary');
  });

  it('loads an accent Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { label: 'Test Me', accent: true});

    GrommetTestUtils.componentShouldExist(Component, 'button', 'Test Me');
    GrommetTestUtils.componentShouldExist(Component, 'button--accent');
  });

  it('loads a custom className Button', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { className: 'testing', label: 'Custom class'});

    GrommetTestUtils.componentShouldExist(Component, 'testing');
    GrommetTestUtils.componentShouldExist(Component, 'button', 'Custom class');
  });
});
