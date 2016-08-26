// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Heading from '../../src/js/components/Heading';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.HEADING;

test('loads a Heading', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleHeading = (
    <Heading>Sample Heading</Heading>
  );
  shallowRenderer.render(sampleHeading);
  const headingElement = shallowRenderer.getRenderOutput();
  const heading = headingElement.props.children;

  if (headingElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Heading has heading class');
  } else {
    t.fail('Heading does not have heading class');
  }  

  t.equal(
    heading, 'Sample Heading', 'Heading is Sample Heading'
  );
});

test('loads a strong center aligned Heading', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleHeading = (
    <Heading strong={true} align="center">Strong Center Heading</Heading>
  );
  shallowRenderer.render(sampleHeading);
  const headingElement = shallowRenderer.getRenderOutput();
  const headingClasses = headingElement.props.className;

  if (headingClasses.indexOf(`${CLASS_ROOT}--strong`) > -1) {
    t.pass('Heading has strong class');
  } else {
    t.fail('Heading does not have strong class');
  }  

  if (headingClasses.indexOf(`${CLASS_ROOT}--align-center`) > -1) {
    t.pass('Heading has center align class');
  } else {
    t.fail('Heading does not have center align class');
  }
});

test('loads a large sized upper case heading', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleHeading = (
    <Heading size="large" uppercase={true}>Large Uppercase Heading</Heading>
  );
  shallowRenderer.render(sampleHeading);
  const headingElement = shallowRenderer.getRenderOutput();
  const headingClasses = headingElement.props.className;
  
  if (headingClasses.indexOf(`${CLASS_ROOT}--large`) > -1) {
    t.pass('Heading has large class');
  } else {
    t.fail('Heading does not have large class');
  }  
  
  if (headingClasses.indexOf(`${CLASS_ROOT}--uppercase`) > -1) {
    t.pass('Heading has uppercase class');
  } else {
    t.fail('Heading does not have uppercase class');
  } 
});

test('loads a heading with small margin and custom class', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleHeading = (
    <Heading margin="small" className="custom-class">Small Margin H3</Heading>
  );
  shallowRenderer.render(sampleHeading);
  const headingElement = shallowRenderer.getRenderOutput();
  const headingClasses = headingElement.props.className;
  
  if (headingClasses.indexOf(`${CLASS_ROOT}--margin-small`) > -1) {
    t.pass('Heading has strong class');
  } else {
    t.fail('Heading does not have strong class');
  }  
  
  if (headingClasses.indexOf('custom-class') > -1) {
    t.pass('Heading has custom class');
  } else {
    t.fail('Heading does not have custom class');
  } 
});
