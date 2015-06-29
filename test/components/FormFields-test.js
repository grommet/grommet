// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/FormFields');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet FormFields', function() {
  it('loads a basic FormFields', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>FormFields</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'form-fields', 'FormFields');
  });

  it('loads a custom class FormFields', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>FormFields Custom</h2>, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing', 'FormFields Custom');
  });
});
