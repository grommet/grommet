// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Markdown from '../../src/js/components/Markdown';

describe('Grommet Markdown', function() {
  it('loads a paragraph Markdown', () => {
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

    expect(markdownElement.props.children.length).to.equal(1);
    const paragraph = markdownElement.props.children[0];
    expect(paragraph.props.className).to.contain('testing');
    expect(paragraph.props.size).to.equal('large');
  });

});
