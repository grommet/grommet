// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Image from '../../src/js/components/Image';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.IMAGE;

test('loads an Image in thumb size', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleImage = (
    <Image src="sampleImage.png" size="thumb" />
  );
  shallowRenderer.render(sampleImage);
  const imageElement = shallowRenderer.getRenderOutput();
  const imageClasses = imageElement.props.className;
  const imageSrc = imageElement.props.src;

  if (imageClasses.indexOf(CLASS_ROOT) > -1) {
    t.pass('Image has image class');
  } else {
    t.fail('Image does not have image class');
  }  

  t.equal(
    imageSrc, 'sampleImage.png', 'Image src is sampleImage.png'
  );

  if (imageClasses.indexOf(`${CLASS_ROOT}--thumb`) > -1) {
    t.pass('Image has thumb class');
  } else {
    t.fail('Image does not have thumb class');
  }   
});

test('loads an Image in horizontal full along with caption', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleImage = (
    <Image src="sampleImage.png" full="horizontal" caption="Sample Image" />
  );
  shallowRenderer.render(sampleImage);
  const imageElement = shallowRenderer.getRenderOutput();
  const imageChild1 = imageElement.props.children[0].props;
  const imageChild2 = imageElement.props.children[1].props;
  
  if (imageChild1.className.indexOf(`${CLASS_ROOT}--full-horizontal`) > -1) {
    t.pass('Image has full horizontal class');
  } else {
    t.fail('Image does not have full horizontal class');
  }  

  if (imageChild2.className.indexOf(`${CLASS_ROOT}__caption`) > -1) {
    t.pass('Image has caption class');
  } else {
    t.fail('Image does not have caption class');
  }   
  
  t.equal(
    imageChild2.children, 'Sample Image', 'Image caption is Sample Image'
  );  
});


