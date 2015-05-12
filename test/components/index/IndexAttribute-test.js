// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/index/IndexAttribute';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet IndexAttribute', function() {
  it('loads a basic IndexAttribute component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
       data: 'testing'
      },
      attribute: {
        attribute: 'data'
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'index-attribute', 'testing');
  });

  it('loads an IndexAttribute component where item has multiple attributes', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
        attributes: {
          data: 'testing multiple'
        }
      },
      attribute: {
        attribute: 'data'
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'index-attribute', 'testing multiple');
  });

  it('loads a timestamp IndexAttribute component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
        data: '05/11/2015'
      },
      attribute: {
        attribute: 'data',
        timestamp: true
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'index-attribute', '05/11/15 12:00:00am');
  });

  it('loads a secondary IndexAttribute component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
       data: 'testing'
      },
      attribute: {
        attribute: 'data',
        secondary: true
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'index-attribute--secondary', 'testing');
  });

  it('loads a status IndexAttribute component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
       status: 'ok'
      },
      attribute: {
        attribute: 'status'
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'status-icon');
  });

  it('loads a small IndexAttribute component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
       data: 'testing'
      },
      attribute: {
        attribute: 'data',
        size: 'small'
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'index-attribute--small', 'testing');
  });

  it('loads a custom class IndexAttribute component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
       data: 'testing'
      },
      attribute: {
        attribute: 'data'
      },
      className: 'custom'
    });

    ReactTestUtils.componentShouldExist(Component, 'custom', 'testing');
  });

  it('loads an IndexAttribute component with custom render function', function() {

    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      item: {
       data: 'testing'
      },
      attribute: {
        attribute: 'data',
        render: function () {
          return <div className="testing-render">Testing Render</div>;
        }
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'testing-render', 'Testing Render');
  });
});
