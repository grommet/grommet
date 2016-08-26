// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Label from '../../src/js/components/Label';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LABEL;

test('loads a Label in upper case', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleLabel = (
    <Label uppercase={true}>Sample Label</Label>
  );
  shallowRenderer.render(sampleLabel);
  const labelElement = shallowRenderer.getRenderOutput();
  const labelClasses = labelElement.props.className;
  const label = labelElement.props.children;

  if (labelClasses.indexOf(CLASS_ROOT) > -1) {
    t.pass('Label has label class');
  } else {
    t.fail('Label does not have label class');
  }  

  t.equal(
    label, 'Sample Label', 'Label is Sample Label'
  );

  if (labelClasses.indexOf(`${CLASS_ROOT}--uppercase`) > -1) {
    t.pass('Label has uppercase class');
  } else {
    t.fail('Label does not have uppercase class');
  }  
});

test('loads a Label having small size & large margin', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleLabel = (
    <Label size="small" margin="large">Sample Label</Label>
  );
  shallowRenderer.render(sampleLabel);
  const labelElement = shallowRenderer.getRenderOutput();
  const labelClasses = labelElement.props.className;
  
  if (labelClasses.indexOf(`${CLASS_ROOT}--small`) > -1) {
    t.pass('Label has small size class');
  } else {
    t.fail('Label does not have small size class');
  }
  
  if (labelClasses.indexOf(`${CLASS_ROOT}--margin-large`) > -1) {
    t.pass('Label has large margin class');
  } else {
    t.fail('Label does not have large margin class');
  }  
});
