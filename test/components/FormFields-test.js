// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/FormFields';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet FormFields', function() {
  it('loads a basic FormFields', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>FormFields</h2>);

    ReactTestUtils.componentShouldExist(Component, 'form-fields', 'FormFields');
  });

  it('loads a custom class FormFields', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>FormFields Custom</h2>, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing', 'FormFields Custom');
  });
});