// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Status';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet Status', function() {
  it('loads an status-icon icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'status-icon');
  });

  it('loads a custom status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });

  it('loads a small status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { small: true});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon--small');
  });

  it('loads a large status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { large: true});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon--large');
  });

  it('loads an ok or normal status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { value: 'ok'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-ok');

    Component = GrommetTestUtils.getComponent(__path__, null, { value: 'normal'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-ok');
  });

  it('loads an error or critical status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { value: 'error'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-error');

    Component = GrommetTestUtils.getComponent(__path__, null, { value: 'critical'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-error');
  });

  it('loads a warning status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { value: 'warning'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-warning');
  });

  it('loads a disabled status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { value: 'disabled'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-disabled');
  });

  it('loads a unknown status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { value: 'unknown'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-unknown');
  });

  it('loads a label status-icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { value: 'label'});

    GrommetTestUtils.componentShouldExist(Component, 'status-icon-label');
  });
});
