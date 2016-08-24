// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import Markdown from '../../src/js/components/Markdown';
import Paragraph from '../../src/js/components/Paragraph';

test('loads a paragraph Markdown', (t) => {
  t.plan(3);

  const markdownElement = shallow(
    <Markdown content='test'
      components={{ p: { props: { className: 'testing', size: 'large' } } }} />
  );

  t.equal(markdownElement.find(Paragraph).length, 1);
  const props = markdownElement.find(Paragraph).props();
  if (props.className.indexOf('testing') > -1) {
    t.pass('Markdown paragraph has custom class');
  } else {
    t.fail('Markdown paragraph does not have custom class');
  }
  t.equal(props.size, 'large', 'Markdown paragraph is large');
});
