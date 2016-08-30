// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import SocialShare from '../../src/js/components/SocialShare';

test('loads an email social share icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSocialShare = (
    <SocialShare type="email" link="http://grommet.io" 
	title="Found this from the Grommet.io website" 
	text="User Experience for the Enterprise" />
  );
  shallowRenderer.render(sampleSocialShare);
  const socialShareElement = shallowRenderer.getRenderOutput();
  const socialShare = socialShareElement.props.icon.type.displayName;

  t.equal(
    socialShare, 'SocialEmail', 'SocialShare is email'
  );
});

test('loads a facebook social share icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSocialShare = (
    <SocialShare type="facebook" link="http://grommet.io" />
  );
  shallowRenderer.render(sampleSocialShare);
  const socialShareElement = shallowRenderer.getRenderOutput();
  const socialShare = socialShareElement.props.icon.type.displayName;
  
  t.equal(
    socialShare, 'SocialFacebook', 'SocialShare is facebook'
  );
});

test('loads a twitter social share icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSocialShare = (
    <SocialShare type="twitter" link="http://grommet.io" 
	text="User Experience for the Enterprise" />
  );
  shallowRenderer.render(sampleSocialShare);
  const socialShareElement = shallowRenderer.getRenderOutput();
  const socialShare = socialShareElement.props.icon.type.displayName;
  
  t.equal(
    socialShare, 'SocialTwitter', 'SocialShare is twitter'
  );
});

test('loads a linkedin social share icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSocialShare = (
    <SocialShare type="linkedin" link="http://grommet.io" 
	title="Grommet" text="User Experience for the Enterprise" />
  );
  shallowRenderer.render(sampleSocialShare);
  const socialShareElement = shallowRenderer.getRenderOutput();
  const socialShare = socialShareElement.props.icon.type.displayName;
  
  t.equal(
    socialShare, 'SocialLinkedin', 'SocialShare is linkedin'
  );
});

test('loads a google social share icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSocialShare = (
    <SocialShare type="google" link="http://grommet.io" />
  );
  shallowRenderer.render(sampleSocialShare);
  const socialShareElement = shallowRenderer.getRenderOutput();
  const socialShare = socialShareElement.props.icon.type.displayName;
  
  t.equal(
    socialShare, 'SocialGoogle', 'SocialShare is google'
  );
});
