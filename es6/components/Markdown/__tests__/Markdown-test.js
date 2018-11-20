import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Markdown } from '..';
var CONTENT = "\n# H1\n\nParagraph\n\n## H2\n\n### H3\n\n#### H4\n";
test('Markdown renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Markdown, null, CONTENT)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});