// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Markdown from '../../src/js/components/Markdown';

describe('Grommet Markdown', function() {
  it('loads a paragraph Markdown', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Markdown, { content: 'test' }));
    const markdownElement = shallowRenderer.getRenderOutput();

    expect(markdownElement.props.className).to.contain('markdown');
    expect(markdownElement.props.dangerouslySetInnerHTML.__html)
      .to.contain('<p class="paragraph">test</p>');
  });

});
