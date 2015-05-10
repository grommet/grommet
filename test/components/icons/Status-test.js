// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Status';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Status', function() {
  it('loads an status-icon icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'status-icon');
  });

  it('loads a custom status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });

  it('loads a small status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { small: true});

    ReactTestUtils.componentShouldExist(Component, 'status-icon--small');
  });

  it('loads a large status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { large: true});

    ReactTestUtils.componentShouldExist(Component, 'status-icon--large');
  });

  it('loads an ok or normal status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { value: 'ok'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-ok');

    Component = ReactTestUtils.getComponent(__path__, null, { value: 'normal'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-ok');
  });

  it('loads an error or critical status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { value: 'error'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-error');

    Component = ReactTestUtils.getComponent(__path__, null, { value: 'critical'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-error');
  });

  it('loads a warning status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { value: 'warning'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-warning');
  });

  it('loads a disabled status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { value: 'disabled'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-disabled');
  });

  it('loads a unknown status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { value: 'unknown'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-unknown');
  });

  it('loads a label status-icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { value: 'label'});

    ReactTestUtils.componentShouldExist(Component, 'status-icon-label');
  });
});
