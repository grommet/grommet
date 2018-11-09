import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Grid } from '..';
test('Grid renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Grid rows renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
    rows: ['small', 'large', 'medium']
  }), React.createElement(Grid, {
    rows: "small"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Grid columns renders', function () {
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
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Grid areas renders', function () {
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
test('Grid justify renders', function () {
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
test('Grid align renders', function () {
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
test('Grid justifyContent renders', function () {
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
test('Grid alignContent renders', function () {
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
test('Grid gap renders', function () {
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
test('Grid fill renders', function () {
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
test('Grid tag renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Grid, {
    tag: "article"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});