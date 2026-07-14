# Grommet Component Testing Reference

## Test File Structure

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';

import { Grommet } from '../../Grommet';
import { MyComponent } from '..';

describe('MyComponent', () => {
  // ALWAYS FIRST: axe accessibility check
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <MyComponent aria-label="my component" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <MyComponent />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });
});
```

## userEvent Pattern (preferred for interactions)

```tsx
test('calls onChange when value changes', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <Grommet>
      <MyComponent onChange={onChange} />
    </Grommet>,
  );

  const input = screen.getByRole('textbox');
  await user.type(input, 'hello');

  expect(onChange).toHaveBeenCalledWith({ value: 'hello' });
});
```

Use `fireEvent` only for synthetic or low-level events that `userEvent` cannot produce (e.g., custom DOM events, `dragover`).

## Keyboard Navigation Test

```tsx
test('closes on Escape', async () => {
  const user = userEvent.setup();

  render(
    <Grommet>
      <MyComponent />
    </Grommet>,
  );

  const trigger = screen.getByRole('button', { name: /open/i });
  await user.click(trigger);

  // Confirm open state
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  await user.keyboard('{Escape}');

  // Confirm closed
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});
```

## DOM Query Priority

1. `screen.getByRole('button', { name: /label/i })` — reflects accessibility semantics
2. `screen.getByLabelText('Email')` — for form inputs with associated labels
3. `screen.getByText('Submit')` — last resort for text content

Avoid `getByTestId` and `querySelector` in favour of queries that reflect what the user and assistive technology see.

## Snapshot Usage

Use `asFragment()` for snapshot assertions:

```tsx
test('renders with custom theme', () => {
  const { asFragment } = render(
    <Grommet theme={{ myComponent: { color: 'brand' } }}>
      <MyComponent />
    </Grommet>,
  );
  expect(asFragment()).toMatchSnapshot();
});
```

## Storybook — CSF-3 Format

```tsx
// stories/Default.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grommet } from 'grommet';
import { MyComponent } from 'grommet';

const meta: Meta<typeof MyComponent> = {
  title: 'Input/MyComponent/Default',
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Simple: Story = {
  render: () => (
    <Grommet>
      <MyComponent />
    </Grommet>
  ),
};
```

One story per file. Title format: `'ComponentCategory/ComponentName/StoryName'`.

## FormField Integration Story

Include whenever the component participates in forms:

```tsx
// stories/FormField.stories.tsx
export const WithFormField: Story = {
  render: () => (
    <Grommet>
      <Form>
        <FormField name="myField" label="My Field" required>
          <MyComponent name="myField" />
        </FormField>
        <Button type="submit" label="Submit" />
      </Form>
    </Grommet>
  ),
};
```

## CustomThemed Story

Add **only** when the component introduces new theme tokens:

```tsx
// stories/CustomThemed.stories.tsx
const customTheme = {
  myComponent: {
    color: 'brand',
    pad: 'medium',
  },
};

export const CustomThemed: Story = {
  render: () => (
    <Grommet theme={customTheme}>
      <MyComponent />
    </Grommet>
  ),
};
```
