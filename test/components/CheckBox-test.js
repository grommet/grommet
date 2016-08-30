// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import CheckBox from '../../src/js/components/CheckBox';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHECK_BOX;

test('loads a CheckBox', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleCheckBox = (
    <CheckBox id="item" name="item" label="Item" checked={false} />
  );
  shallowRenderer.render(sampleCheckBox);
  const checkBoxElement = shallowRenderer.getRenderOutput();
  const checkBoxLabel = checkBoxElement.props.children[0][1];

  if (checkBoxElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('CheckBox has checkBox class');
  } else {
    t.fail('CheckBox does not have checkBox class');
  }  
  
  t.equal(
    checkBoxLabel.props.children, 'Item', 'CheckBox label is Item'
  );  
});

test('loads a toggle custom CheckBox', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleCheckBox = (
    <CheckBox label="Item" toggle={true} className="custom-class"/>
  );
  shallowRenderer.render(sampleCheckBox);
  const checkBoxElement = shallowRenderer.getRenderOutput();

  if (checkBoxElement.props.className.indexOf(`${CLASS_ROOT}--toggle`) > -1) {
    t.pass('CheckBox has toggle class');
  } else {
    t.fail('CheckBox does not have toggle class');
  } 
  
  if (checkBoxElement.props.className.indexOf('custom-class') > -1) {
    t.pass('CheckBox has custom class');
  } else {
    t.fail('CheckBox does not have custom class');
  }   
});

test('loads a disabled CheckBox', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleCheckBox = (
    <CheckBox disabled={true} checked={true}/>
  );
  shallowRenderer.render(sampleCheckBox);
  const checkBoxElement = shallowRenderer.getRenderOutput();

  if (checkBoxElement.props.className.indexOf(`${CLASS_ROOT}--disabled`) > -1) {
    t.pass('CheckBox has disabled class');
  } else {
    t.fail('CheckBox does not have disabled class');
  }   
});
