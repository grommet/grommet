// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Paragraph from '../../src/js/components/Paragraph';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.PARAGRAPH;

test('loads a Paragraph in large size', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleParagraph = (
    <Paragraph size="large">Sample Paragraph</Paragraph>
  );
  shallowRenderer.render(sampleParagraph);
  const paragraphElement = shallowRenderer.getRenderOutput();
  const paragraph = paragraphElement.props.children;

  if (paragraphElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Paragraph has paragraph class');
  } else {
    t.fail('Paragraph does not have paragraph class');
  }  

  t.equal(
    paragraph, 'Sample Paragraph', 'Paragraph is Sample Paragraph'
  );
  
  if (paragraphElement.props.className.indexOf(`${CLASS_ROOT}--large`) > -1) {
    t.pass('Paragraph has large class');
  } else {
    t.fail('Paragraph does not have large class');
  }   
});
