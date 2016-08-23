// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Headline from '../../src/js/components/Headline';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.HEADLINE;

test('loads a Headline', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleHeadline = (
    <Headline>Sample Headline</Headline>
  );
  shallowRenderer.render(sampleHeadline);
  const headlineElement = shallowRenderer.getRenderOutput();
  const headline = headlineElement.props.children;

  if (headlineElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Headline has headline class');
  } else {
    t.fail('Headline does not have headline class');
  }  

  t.equal(
    headline, 'Sample Headline', 'Headline is Sample Headline'
  );
});
