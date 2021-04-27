import React from 'react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import { render } from '@testing-library/react';

import { CurrencyInput } from '..';

describe('CurrencyInput', () => {
  test('basic', () => {
    const { container } = render(<CurrencyInput value={40.55} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('brl in usa', () => {
    const { container } = render(
      <CurrencyInput locale="en-US" currency="BRL" value={40.55} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('brl in brazil', () => {
    const { container } = render(
      <CurrencyInput locale="pt-BR" currency="BRL" value={40.55} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('brl in brazil with custom currency display', () => {
    const { container } = render(
      <CurrencyInput
        locale="pt-BR"
        currency="BRL"
        value={40.55}
        numberFormatOptions={{ currencyDisplay: 'code' }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
