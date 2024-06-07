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
});
