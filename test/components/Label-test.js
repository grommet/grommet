// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Label');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Label', function() {
  it('loads an empty Label component', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'label', '');
  });

  it('loads a Label component with icon', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      icon: <div>Icon</div>
    });

    GrommetTestUtils.componentShouldExist(Component, 'label__icon', 'Icon');
  });

  it('loads a Label component with text', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      text: 'Text'
    });

    GrommetTestUtils.componentShouldExist(Component, 'label__text', 'Text');
  });
});
