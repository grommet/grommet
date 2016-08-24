// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Markdown from '../../src/js/components/Markdown';
import Paragraph from '../../src/js/components/Paragraph';

test('loads a paragraph Markdown', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Markdown, {
    content: 'test',
    components: {
      p: {
        props: {
          className: 'testing',
          size: 'large'
        }
      }
    }
  }));
  const markdownElement = shallowRenderer.getRenderOutput();

  t.equal(markdownElement.type, Paragraph, 'Markdown uses Paragraph');
  if (markdownElement.props.className.indexOf('testing') > -1) {
    t.pass('Markdown paragraph has custom class');
  } else {
    t.fail('Markdown paragraph does not have custom class');
  }
  t.equal(markdownElement.props.size, 'large', 'Markdown paragraph is large');
});
