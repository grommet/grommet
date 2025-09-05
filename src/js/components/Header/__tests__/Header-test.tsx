import React from 'react';
import { render } from '@testing-library/react';

import { Grommet, Header } from '../..';

describe('Header', () => {
  it('should forward a ref to the underlying header', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Grommet>
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
  test('theme gap', () => {
    const customTheme = {
      header: {
        gap: 'large',
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <Header>
          <div>Header Item 1</div>
          <div>Header Item 2</div>
          <div>Header Item 3</div>
        </Header>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
