// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Tags from '../../src/js/components/Tags';
import Tag from '../../src/js/components/Tag';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT_TAGS = CSSClassnames.TAGS;
const CLASS_ROOT_TAG = CSSClassnames.TAG;

test('load Tags', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleTags = (
    <Tags className="custom-class">
      <Tag label="First" />
      <Tag label="Second" />
      <Tag label="Third" />
    </Tags>
  );
  shallowRenderer.render(sampleTags);
  const tagsElement = shallowRenderer.getRenderOutput();
  const tags = tagsElement.props.children;

  if (tagsElement.props.className.indexOf(CLASS_ROOT_TAGS) > -1) {
    t.pass('Tags has tags class');
  } else {
    t.fail('Tags does not have tags class');
  }  
  
  if (tagsElement.props.className.indexOf('custom-class') > -1) {
    t.pass('Tags has custom class');
  } else {
    t.fail('Tags does not have custom class');
  }   

  t.equal(
    tags.length, 3, '3 Tags are present'
  );
});

test('load a Tag', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleTag = (
    <Tag label="First" className="custom-class" />
  );
  shallowRenderer.render(sampleTag);
  const tagElement = shallowRenderer.getRenderOutput();
  const tag = tagElement.props.children[1];

  if (tagElement.props.className.indexOf(CLASS_ROOT_TAG) > -1) {
    t.pass('Tag has tag class');
  } else {
    t.fail('Tag does not have tag class');
  }  
  
  if (tagElement.props.className.indexOf('custom-class') > -1) {
    t.pass('Tag has custom class');
  } else {
    t.fail('Tag does not have custom class');
  } 

  t.equal(
    tag.props.label, 'First', 'Tag label is First'
  ); 
});

