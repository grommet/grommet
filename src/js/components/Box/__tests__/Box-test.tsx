import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box } from '..';

describe('Box', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <Box />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as string', () => {
    const { container } = render(
      <Grommet>
        <Box as="header" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as function', () => {
    const { container } = render(
      <Grommet>
        <Box as={(props) => <header className={props.className} />} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as component', () => {
    class Header extends React.Component<any> {
      render() {
        return <header className={this.props.className} />;
      }
    }
    const { container } = render(
      <Grommet>
        <Box as={Header} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('tag proxied', () => {
    const { container: tagComponent } = render(
      <Grommet>
        <Box tag="header" />
      </Grommet>,
    );
    const { container: asComponent } = render(
      <Grommet>
        <Box as="header" />
      </Grommet>,
    );

    expect(tagComponent).toEqual(asComponent);
  });

  test('onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Box onClick={onClick}>test box</Box>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('test box'));

    expect(onClick).toBeCalled();
  });

  test('renders a11yTitle and aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <Box a11yTitle="test" />
        <Box aria-label="test-2" />
      </Grommet>,
    );
    expect(getByLabelText('test')).toBeTruthy();
    expect(getByLabelText('test-2')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
