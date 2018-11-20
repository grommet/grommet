import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet, Table, TableHeader, TableFooter, TableBody, TableRow, TableCell } from '../..';
test('Table renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Table caption renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, {
    caption: "Caption"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableHeader renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableHeader, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableFooter renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableFooter, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableBody renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableBody, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableRow renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableBody, null, React.createElement(TableRow, null)))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableHeader, null, React.createElement(TableRow, null, React.createElement(TableCell, null))), React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, null))), React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TableCell, null))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell scope renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableHeader, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    scope: "col"
  }))), React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    scope: "row"
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell size renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    size: "xsmall"
  }), React.createElement(TableCell, {
    size: "small"
  }), React.createElement(TableCell, {
    size: "medium"
  }), React.createElement(TableCell, {
    size: "large"
  })))), React.createElement(Table, null, React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    size: "1/2"
  }), React.createElement(TableCell, {
    size: "2/4"
  })))), React.createElement(Table, null, React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    size: "1/3"
  }), React.createElement(TableCell, {
    size: "2/3"
  })))), React.createElement(Table, null, React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    size: "1/4"
  }), React.createElement(TableCell, {
    size: "3/4"
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell verticalAlign renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableHeader, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    verticalAlign: "top"
  }), React.createElement(TableCell, {
    verticalAlign: "middle"
  }), React.createElement(TableCell, {
    verticalAlign: "bottom"
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell plain renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Table, null, React.createElement(TableHeader, null, React.createElement(TableRow, null, React.createElement(TableCell, {
    plain: true
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});