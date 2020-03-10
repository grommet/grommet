import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Grid } from '..';
describe('Grid', function () {
  test('renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('a11yTitle renders', function () {
    var _render = render(React.createElement(Grommet, null, React.createElement(Grid, {
      a11yTitle: "My Grid"
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

    var gridWithLabel = getByLabelText('My Grid');
    expect(gridWithLabel).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test('rows renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      rows: ['small', 'large', 'medium']
    }), React.createElement(Grid, {
      rows: "small"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('columns renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      columns: ['1/2', '2/4']
    }), React.createElement(Grid, {
      columns: ['1/3', '2/3']
    }), React.createElement(Grid, {
      columns: ['1/4', '3/4']
    }), React.createElement(Grid, {
      columns: "small"
    }), React.createElement(Grid, {
      columns: {
        count: 'fit',
        size: 'small'
      }
    }), React.createElement(Grid, {
      columns: {
        count: 'fill',
        size: ['small', 'medium']
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('areas renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
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
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['3/4', '1/4'],
      areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      justify: "start"
    }), React.createElement(Grid, {
      justify: "center"
    }), React.createElement(Grid, {
      justify: "end"
    }), React.createElement(Grid, {
      justify: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      align: "start"
    }), React.createElement(Grid, {
      align: "center"
    }), React.createElement(Grid, {
      align: "end"
    }), React.createElement(Grid, {
      align: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justifyContent renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      justifyContent: "start"
    }), React.createElement(Grid, {
      justifyContent: "center"
    }), React.createElement(Grid, {
      justifyContent: "between"
    }), React.createElement(Grid, {
      justifyContent: "around"
    }), React.createElement(Grid, {
      justifyContent: "end"
    }), React.createElement(Grid, {
      justifyContent: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      alignContent: "start"
    }), React.createElement(Grid, {
      alignContent: "center"
    }), React.createElement(Grid, {
      alignContent: "between"
    }), React.createElement(Grid, {
      alignContent: "around"
    }), React.createElement(Grid, {
      alignContent: "end"
    }), React.createElement(Grid, {
      alignContent: "stretch"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      gap: "small"
    }), React.createElement(Grid, {
      gap: "medium"
    }), React.createElement(Grid, {
      gap: "large"
    }), React.createElement(Grid, {
      gap: {
        row: 'small'
      }
    }), React.createElement(Grid, {
      gap: {
        row: 'medium'
      }
    }), React.createElement(Grid, {
      gap: {
        row: 'large'
      }
    }), React.createElement(Grid, {
      gap: {
        column: 'small'
      }
    }), React.createElement(Grid, {
      gap: {
        column: 'medium'
      }
    }), React.createElement(Grid, {
      gap: {
        column: 'large'
      }
    }), React.createElement(Grid, {
      gap: {
        row: 'small',
        column: 'medium'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      fill: true
    }), React.createElement(Grid, {
      fill: false
    }), React.createElement(Grid, {
      fill: "horizontal"
    }), React.createElement(Grid, {
      fill: "vertical"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('responsive', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      responsive: true
    }), React.createElement(Grid, {
      responsive: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      as: "article"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('proxies tag', function () {
    var tagComponent = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      tag: "article"
    })));
    var asComponent = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      as: "article"
    })));
    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });
  test('pad', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
      pad: "small"
    }), React.createElement(Grid, {
      pad: "medium"
    }), React.createElement(Grid, {
      pad: "large"
    }), React.createElement(Grid, {
      pad: {
        horizontal: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        vertical: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        bottom: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        left: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        right: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        start: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        end: 'small'
      }
    }), React.createElement(Grid, {
      pad: {
        top: 'small'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});