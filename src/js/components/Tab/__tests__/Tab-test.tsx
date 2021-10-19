import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet, Tabs } from '../..';
import { Tab } from '..';
import { ThemeType } from '../../../themes';

describe('Tab', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab title="Title 1" />
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have no default styles with plain prop', () => {
    const { container, getByText } = render(
      <Grommet>
        <Tabs>
          <Tab title="Title 1" plain />
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    const plainTab = getByText('Title 1').parentElement!;
    const plainTabStyle = window.getComputedStyle(plainTab);
    expect(plainTabStyle.borderBottom).toBe('');
  });

  test('should allow to extend tab styles', () => {
    const customTheme: ThemeType = {
      tab: {
        extend: `color: red;
                padding: 20px;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
                margin: 30px;`,
      },
    };
    const { container, getByText } = render(
      <Grommet theme={customTheme}>
        <Tabs>
          <Tab title="Title 1" plain>
            Some content
          </Tab>
          <Tab title="Title 2">Some content 2</Tab>
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    const extendedPlainTab = getByText('Title 1')!;
    const extendedPlainTabStyle = window.getComputedStyle(extendedPlainTab);
    // color can be changed only when plain prop used
    expect(extendedPlainTabStyle.color).toBe('red');

    const extendedTab = getByText('Title 2')!;
    const extendedTabStyle = window.getComputedStyle(extendedTab);
    expect(extendedTabStyle.color).not.toBe('red');

    const extendedTabParent = extendedTab.parentElement!;
    const extendedTabParentStyle = window.getComputedStyle(extendedTabParent);
    expect(extendedTabParentStyle.padding).toBe('20px');
  });
});
