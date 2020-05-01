import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Grid } from '..';
describe('Grid', function () {
  test('renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('a11yTitle renders', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      a11yTitle: "My Grid"
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

    var gridWithLabel = getByLabelText('My Grid');
    expect(gridWithLabel).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test('rows renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      rows: ['small', 'large', 'medium']
    }), /*#__PURE__*/React.createElement(Grid, {
      rows: "small"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('columns renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      columns: ['1/2', '2/4']
    }), /*#__PURE__*/React.createElement(Grid, {
      columns: ['1/3', '2/3']
    }), /*#__PURE__*/React.createElement(Grid, {
      columns: ['1/4', '3/4']
    }), /*#__PURE__*/React.createElement(Grid, {
      columns: "small"
    }), /*#__PURE__*/React.createElement(Grid, {
      columns: {
        count: 'fit',
        size: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      columns: {
        count: 'fill',
        size: ['small', 'medium']
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('areas renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['3/4', '1/4'],
      areas: [{
        name: 'header',
        start: [0, 0],
        end: [0, 1]
      }, {
        name: 'main',
        start: [1, 0],
        end: [1, 0]
      }, {
        name: 'sidebar',
        start: [1, 1],
        end: [1, 1]
      }, {
        name: 'footer',
        start: [2, 0],
        end: [2, 1]
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('areas renders when given an array of string arrays', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['3/4', '1/4'],
      areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      justify: "start"
    }), /*#__PURE__*/React.createElement(Grid, {
      justify: "center"
    }), /*#__PURE__*/React.createElement(Grid, {
      justify: "end"
    }), /*#__PURE__*/React.createElement(Grid, {
      justify: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      align: "start"
    }), /*#__PURE__*/React.createElement(Grid, {
      align: "center"
    }), /*#__PURE__*/React.createElement(Grid, {
      align: "end"
    }), /*#__PURE__*/React.createElement(Grid, {
      align: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justifyContent renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      justifyContent: "start"
    }), /*#__PURE__*/React.createElement(Grid, {
      justifyContent: "center"
    }), /*#__PURE__*/React.createElement(Grid, {
      justifyContent: "between"
    }), /*#__PURE__*/React.createElement(Grid, {
      justifyContent: "around"
    }), /*#__PURE__*/React.createElement(Grid, {
      justifyContent: "end"
    }), /*#__PURE__*/React.createElement(Grid, {
      justifyContent: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      alignContent: "start"
    }), /*#__PURE__*/React.createElement(Grid, {
      alignContent: "center"
    }), /*#__PURE__*/React.createElement(Grid, {
      alignContent: "between"
    }), /*#__PURE__*/React.createElement(Grid, {
      alignContent: "around"
    }), /*#__PURE__*/React.createElement(Grid, {
      alignContent: "end"
    }), /*#__PURE__*/React.createElement(Grid, {
      alignContent: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      gap: "small"
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: "medium"
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: "large"
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        row: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        row: 'medium'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        row: 'large'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        column: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        column: 'medium'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        column: 'large'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      gap: {
        row: 'small',
        column: 'medium'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      fill: true
    }), /*#__PURE__*/React.createElement(Grid, {
      fill: false
    }), /*#__PURE__*/React.createElement(Grid, {
      fill: "horizontal"
    }), /*#__PURE__*/React.createElement(Grid, {
      fill: "vertical"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('responsive', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      responsive: true
    }), /*#__PURE__*/React.createElement(Grid, {
      responsive: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      as: "article"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('proxies tag', function () {
    var tagComponent = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      tag: "article"
    })));
    var asComponent = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      as: "article"
    })));
    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });
  test('pad', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Grid, {
      pad: "small"
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: "medium"
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: "large"
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        horizontal: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        vertical: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        bottom: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        left: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        right: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        start: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        end: 'small'
      }
    }), /*#__PURE__*/React.createElement(Grid, {
      pad: {
        top: 'small'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});