// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Section from '../../src/js/components/Section';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SECTION;

test('loads a Section', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSection = (
    <Section>Sample Section</Section>
  );
  shallowRenderer.render(sampleSection);
  const sectionElement = shallowRenderer.getRenderOutput();
  const sectionValue = sectionElement.props.children;
  
  if (sectionElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Section has section class');
  } else {
    t.fail('Section does not have section class');
  }

  t.equal(
    sectionValue, 'Sample Section', 'Section is Sample Section'
  );
});
