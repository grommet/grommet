// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Attribute from '../../src/js/components/Attribute';

test('loads a basic Attribute', (t) => {
  t.plan(6);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Attribute, {
    label: 'testLabel',
    children: 'testContent'
  }));
  const attributeElement = shallowRenderer.getRenderOutput();

  if (attributeElement.props.className.indexOf('attribute') > -1) {
    t.pass('Attribute has class');
  } else {
    t.fail('Atribute does not have class');
  }

  t.equal(
    attributeElement.props.children.length, 2, 'Attribute has two children'
  );

  const labelElement = attributeElement.props.children[0];
  if (labelElement.props.className.indexOf('attribute__label') > -1) {
    t.pass('Attribute has label class');
  } else {
    t.fail('Atribute does not have label class');
  }

  t.equal(
    labelElement.props.children, 'testLabel', 'Attribute has label'
  );

  const contentsElement = attributeElement.props.children[1];
  if (contentsElement.props.className.indexOf('attribute__contents') > -1) {
    t.pass('Attribute has contents class');
  } else {
    t.fail('Atribute does not have contents class');
  }

  t.equal(
    contentsElement.props.children, 'testContent', 'Attribute has content'
  );
});
