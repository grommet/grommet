import React from 'react';
import { render } from '@testing-library/react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, Header } from '../..';

describe('Header', () => {
  it('should forward a ref to the underlying header', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Grommet theme={hpe}>
        <Header ref={ref}>Hello, World!</Header>
      </Grommet>,
    );

    expect(ref.current).not.toBe(null);
    expect(ref.current?.nodeName).toBe('HEADER');
  });
  it('should render outside grommet wrapper', () => {
    const { container } = render(<Header>Hello, World!</Header>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
