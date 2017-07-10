// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import SocialShare from '../../src/js/components/SocialShare';

describe('SocialShare', () => {
  it('has correct email rendering', () => {
    const component = renderer.create(
      <SocialShare type="email" link="http://grommet.io" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct facebook rendering', () => {
    const component = renderer.create(
      <SocialShare type="facebook" link="http://grommet.io" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct twitter rendering', () => {
    const component = renderer.create(
      <SocialShare type="twitter" link="http://grommet.io" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct linkedin rendering', () => {
    const component = renderer.create(
      <SocialShare type="linkedin" link="http://grommet.io" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct google rendering', () => {
    const component = renderer.create(
      <SocialShare type="linkedin" link="http://grommet.io" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct title rendering', () => {
    const component = renderer.create(
      <SocialShare type="linkedin" link="http://grommet.io"
        title="testing" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct text rendering', () => {
    const component = renderer.create(
      <SocialShare type="linkedin" link="http://grommet.io"
        text="testing" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <SocialShare type="linkedin" link="http://grommet.io"
         className="testing" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
