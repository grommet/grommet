// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Title from '../../src/js/components/Title';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TITLE;

test('loads a Title', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleTitle = (
    <Title>Sample Title</Title>
  );
  shallowRenderer.render(sampleTitle);
  const titleElement = shallowRenderer.getRenderOutput();
  const titleValue = titleElement.props.children.props.children;
  
  if (titleElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Title has title class');
  } else {
    t.fail('Title does not have title class');
  }
  
  if (titleElement.props.className.indexOf(`${CLASS_ROOT}--responsive`) > -1) {
    t.pass('Title has responsive class');
  } else {
    t.fail('Title does not have responsive class');
  }  
  
  t.equal(
    titleValue, 'Sample Title', 'Title is Sample Title'
  );
});

test('loads a Title with custom and interactive class', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Title, {
    className: 'custom-classname',
    onClick: function() {
      return true;
    }	
  }));
  const titleElement = shallowRenderer.getRenderOutput();

  if (titleElement.props.className.indexOf('custom-classname') > -1) {
    t.pass('Title has custom class');
  } else {
    t.fail('Title does not have custom class');
  }
  
  if (titleElement.props.className.indexOf(`${CLASS_ROOT}--interactive`) > -1) {
    t.pass('Title has interactive class');
  } else {
    t.fail('Title does not have interactive class');
  }  
});

test('loads a Title with multiple words', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var title = (
    <Title><h1>Main title</h1>Sub title</Title>
  );
  shallowRenderer.render(title);
  const titleElement = shallowRenderer.getRenderOutput();
  const mainTitle = titleElement.props.children[0].props.children;
  const subTitle = titleElement.props.children[1].props.children;
  
  t.equal(
    mainTitle, 'Main title', 'Title has Main title'
  );
  
  t.equal(
    subTitle, 'Sub title', 'Title has Sub title'
  );
});
