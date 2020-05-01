import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet, Table, TableHeader, TableFooter, TableBody, TableRow, TableCell } from '../..';
test('Table renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Table caption renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, {
    caption: "Caption"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableHeader renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableFooter renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableFooter, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableBody renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableBody, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableRow renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null)))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null))), /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null))), /*#__PURE__*/React.createElement(TableFooter, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell scope renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    scope: "col"
  }))), /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    scope: "row"
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell size renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    size: "xsmall"
  }), /*#__PURE__*/React.createElement(TableCell, {
    size: "small"
  }), /*#__PURE__*/React.createElement(TableCell, {
    size: "medium"
  }), /*#__PURE__*/React.createElement(TableCell, {
    size: "large"
  })))), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    size: "1/2"
  }), /*#__PURE__*/React.createElement(TableCell, {
    size: "2/4"
  })))), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    size: "1/3"
  }), /*#__PURE__*/React.createElement(TableCell, {
    size: "2/3"
  })))), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    size: "1/4"
  }), /*#__PURE__*/React.createElement(TableCell, {
    size: "3/4"
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell verticalAlign renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    verticalAlign: "top"
  }), /*#__PURE__*/React.createElement(TableCell, {
    verticalAlign: "middle"
  }), /*#__PURE__*/React.createElement(TableCell, {
    verticalAlign: "bottom"
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell plain renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, {
    plain: true
  }))))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});