// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Label';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet Label', function() {
  it('loads an empty Label component', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'label', '');
  });

  it('loads a Label component with icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      icon: <div>Icon</div>
    });

    ReactTestUtils.componentShouldExist(Component, 'label__icon', 'Icon');
  });

  it('loads a Label component with text', function() {
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      text: 'Text'
    });

    ReactTestUtils.componentShouldExist(Component, 'label__text', 'Text');
  });
});
