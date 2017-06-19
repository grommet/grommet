// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from '../../src/js/components/LoginForm';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('LoginForm', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <LoginForm onSubmit={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders login button as disabled when onSubmit is undefined', () => {
    const component = renderer.create(
      <LoginForm />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onChange behaves properly', () => {
    const onChangeFn = jest.fn();
    const component = renderer.create(
      <LoginForm onSubmit={() => {}} onChange={onChangeFn} />
    );

    component.getInstance()._onUsernameChange(
      { target: { value: 'will@isthecoolest.com' }});
    component.getInstance()._onPasswordChange(
      { target: { value: 'm0desty' }});
    component.getInstance()._onRememberMeChange(
      { target: { value: true }});

    expect(onChangeFn.mock.calls.length).toBe(3);
    expect(onChangeFn.mock.calls[0][0].username).toBe('will@isthecoolest.com');
  });

  it('renders errors properly with both string and JSX errors', () => {
    const errors = [
      'Some detailed error.',
      (<span>
        You need to use
        <a href="#">some external resource</a>
        to resolve this.
      </span>)
    ];
    const component = renderer.create(
      <LoginForm
        onSubmit={() => {}}
        errors={errors}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
