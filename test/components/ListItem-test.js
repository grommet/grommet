// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/ListItem');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet ListItem', function() {
  it('loads a basic ListItem', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      {label: 'primary',
        annotation: 'secondary'});

    GrommetTestUtils.componentShouldExist(Component, 'list-item');
    GrommetTestUtils.componentShouldNotExist(Component, 'list-item--selected');
    GrommetTestUtils.componentShouldNotExist(Component, 'list-item--selectable');
  });

  it('loads a selectable ListItem', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      {label: 'primary',
        annotation: 'secondary',
        onClick: function () {
          console.log('clicked');
        }});

    GrommetTestUtils.componentShouldExist(Component, 'list-item');
    GrommetTestUtils.componentShouldNotExist(Component, 'list-item--selected');
    GrommetTestUtils.componentShouldExist(Component, 'list-item--selectable');
  });

  it('loads a selected ListItem', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      {label: 'primary',
        annotation: 'secondary',
        selected: true});

    GrommetTestUtils.componentShouldExist(Component, 'list-item');
    GrommetTestUtils.componentShouldExist(Component, 'list-item--selected');
    GrommetTestUtils.componentShouldNotExist(Component, 'list-item--selectable');
  });

  it('loads a customized ListItem', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      {label: 'primary',
        annotation: 'secondary',
        className: 'test'});

    GrommetTestUtils.componentShouldExist(Component, 'list-item');
    GrommetTestUtils.componentShouldExist(Component, 'test');
    GrommetTestUtils.componentShouldNotExist(Component, 'list-item--selected');
    GrommetTestUtils.componentShouldNotExist(Component, 'list-item--selectable');
  });
});
