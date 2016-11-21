// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Timestamp from '../../src/js/components/Timestamp';

describe('Timestamp', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays time', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' fields={"time"} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays time with seconds', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' fields={["time", "seconds"]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays date', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' fields={"date"} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays date and time', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' fields={["date", "time"]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays date, time, seconds', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' fields={
        ["date", "time", "seconds"]
      } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a classname', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' className="test" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('aligns to end', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' align="end" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
