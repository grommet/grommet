// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/index/Alert');

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');

describe('Grommet Alert', function() {
  it('loads a basic Alert component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      resource: {
        name: 'network',
        status: 'error'
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'alert');
  });

  it('loads a Alert component with created date', function() {

    var Alert = require('../../../src/js/components/index/Alert');
    var resource = {
      name: 'network',
      status: 'error',
      created: '11/10/2015 03:10:09'
    };
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = TestUtils.renderIntoDocument(
      <Alert locales="en-US" resource={resource} />
    );

    GrommetTestUtils.componentShouldExist(Component, 'alert');
    GrommetTestUtils.componentShouldExist(Component, 'alert__timestamp', 'Tue, Nov 10, 2015, 3:10:09 AM');
  });

  it('loads a Alert component with created date in pt-BR locale', function() {

    var Alert = require('../../../src/js/components/index/Alert');
    var resource = {
      name: 'network',
      status: 'error',
      created: '11/10/2015 03:10:09'
    };
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = TestUtils.renderIntoDocument(
      <Alert locales="pt-BR" resource={resource} />
    );

    GrommetTestUtils.componentShouldExist(Component, 'alert');
    GrommetTestUtils.componentShouldExist(Component, 'alert__timestamp', 'ter, 10 de nov de 2015 3:10:09');
  });

});
