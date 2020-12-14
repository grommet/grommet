import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { findAll } from 'styled-components/test-utils';

import { createPortal } from '../../../utils/portal';
import { MultiSelect } from '..';
import { OptionLabel } from '../StyledMultiSelect';

const options = [
  { id: 1, label: 'Test 1' },
  { id: 2, label: 'Test 2' },
  { id: 3, label: 'Test 3' },
  { id: 4, label: 'Test 4' },
  { id: 5, label: 'Test 5' },
  { id: 10, label: 'Test 10' },
  { id: 11, label: 'Test 11' },
  { id: 12, label: 'Test 12' },
];
const labelKey = 'label';
const valueKey = { key: 'id', reduce: true };

describe('MultiSelect', () => {
  const setValues = jest.fn();
  const setIncExc = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(value => [value, setValues]);
  useStateSpy.mockImplementation(incExc => [incExc, setIncExc]);

  beforeEach(createPortal);
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('basic', () => {
    const props = { value: [], options, labelKey, valueKey };

    const component = renderer.create(
      <MultiSelect
        id="test-multiselect"
        {...props}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('double-column', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const component = renderer.create(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        isExcluded={null}
        onValueChange={setValues}
        onIncExcChange={setIncExc}
        withOptionChips
        withUpdateCancelButtons
        withInclusionExclusion
        {...props}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();

  });

  it('Single Column - Passing value externally - Value Label', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 3]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    expect(getByLabelText('Selected Label Value'))
      .toHaveTextContent(/^Selected$/);
    expect(getByLabelText('Selected Label Count')).toHaveTextContent(/^2$/);

  });

  it('Single Coulmn - Passing value externally - Option Chips', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };
    const value = [1, 3];

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={value}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const chipsElements = findAll(document.body, OptionLabel);

    // Match no. of options which are selected
    expect(chipsElements.length).toBe(2);

    // Match the option labels which are selected
    chipsElements.forEach((el, index) => {
      expect(el).toHaveTextContent(new RegExp(`^Test ${value[index]}$`));
    });

  });

  it('Single Column - Passing value externally - Verify checkbox check', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };
    const value = [1, 3];

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={value}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    value.forEach(_ => {
      expect(getByLabelText(`select checkbox for Test ${_}`))
        .toHaveClass('option-checkbox-active');
    });

  });

  it('Single Column - No values selected - Value Label', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { queryAllByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    const [selectLabel] = queryAllByLabelText('Selected Label Value');
    const count = queryAllByLabelText('Selected Label Count');

    expect(selectLabel).toHaveTextContent(/^Select$/);
    expect(count.length).toBe(0);

  });

  it('Single Column - No values selected - Option Chips', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const chipsElements = findAll(document.body, OptionLabel);

    // Match no. of options which are selected
    expect(chipsElements.length).toBe(0);

  });

  it('Single Column - No values selected - Verify checkbox check', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    options.forEach(_ => {
      expect(getByLabelText(`select checkbox for Test ${_.id}`))
        .toHaveClass('option-checkbox-inactive');
    });

  });

  it('Single Column - Search - Value match', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByRole, getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        searchable
        searchPlaceholder="Search"
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const searchElement = getByRole(
      'search',
      { name: 'multiselect searchbox' },
    );

    fireEvent.change(searchElement, { target: { value: 'Test 1' } });
    expect(searchElement.value).toBe('Test 1');

  });

  it('Single Column - Search - Option match', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByRole, getByLabelText, queryAllByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        searchable
        searchPlaceholder="Search"
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const searchElement = getByRole(
      'search',
      { name: 'multiselect searchbox' },
    );

    // Initial Option count check
    expect(queryAllByRole(
      'option',
      { name: 'multiselect option value' },
    ).length).toBe(8);

    fireEvent.change(searchElement, { target: { value: 'Test 1' } });

    const filteredOptions = queryAllByRole(
      'option',
      { name: 'multiselect option value' },
    );

    expect(filteredOptions.length).toBe(4);

    filteredOptions.forEach((option, index) => {
      expect(option)
        .toHaveTextContent(
          new RegExp(
            `^${options.filter(_ => _.label.includes('Test 1'))[index].label}$`,
          ))
    });

  });

  it('Single Column - Select Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select Option with id 2
    fireEvent.click(getByRole('menuitem', { name: 'option id - 2' }));

    expect(setValues).toHaveBeenCalledWith([2]);

  });

  it('Single Column - Deselect Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select Option with id 2
    fireEvent.click(getByRole('menuitem', { name: 'option id - 2' }));

    expect(setValues).toHaveBeenCalledWith([1, 3]);

  });

  it('Single Column - Select All Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        withOptionChips
        withSelectAll
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select all option checkbox
    fireEvent.click(getByRole('menuitem', { name: 'select all options' }));

    expect(setValues).toHaveBeenCalledWith(options.map(_ => _.id));

  });

  it('Single Column - Deselect All Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={options.map(_ => _.id)}
        onValueChange={setValues}
        withOptionChips
        withSelectAll
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select all option checkbox
    fireEvent.click(getByRole('menuitem', { name: 'select all options' }));

    expect(setValues).toHaveBeenCalledWith([]);

  });

  it('Single Column - Clear All Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        withSelectAll
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select all option checkbox
    fireEvent.click(getByRole(
      'button',
      { name: 'Clear all selected options' }),
    );

    expect(setValues).toHaveBeenCalledWith([]);

  });

  it('Single Column - OK Button', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        withUpdateCancelButtons
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select Option with id 2
    fireEvent.click(getByRole('menuitem', { name: 'option id - 2' }));

    expect(setValues).toHaveBeenCalledTimes(0);

    fireEvent.click(getByRole(
      'button',
      { name: 'OK button (Update selected values)' },
    ));

    expect(setValues).toHaveBeenCalledWith([1, 3]);

  });

  it('Single Column - Cancel Button', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        withUpdateCancelButtons
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select Option with id 2
    fireEvent.click(getByRole('menuitem', { name: 'option id - 2' }));

    expect(setValues).toHaveBeenCalledTimes(0);

    fireEvent.click(getByRole('button', { name: 'Cancel button' }));

    expect(setValues).toHaveBeenCalledTimes(0);

  });

  it('Single Column - Remove Chip - Without update and cancel buttons', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Remove Option Test 2
    fireEvent.click(getByRole(
      'button',
      { name: 'Remove selected chip Test 2' },
    ));

    expect(setValues).toHaveBeenCalledWith([1, 3]);

  });

  it('Single Column - Remove Chip - With update button', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        withUpdateCancelButtons
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Remove Option Test 2
    fireEvent.click(getByRole(
      'button',
      { name: 'Remove selected chip Test 2' },
    ));

    expect(setValues).toHaveBeenCalledTimes(0);

    fireEvent.click(getByRole(
      'button',
      { name: 'OK button (Update selected values)' },
    ));

    expect(setValues).toHaveBeenCalledWith([1, 3]);

  });

  it('Single Column - Remove Chip - With cancel button', () => {
    const props = { options, labelKey, valueKey, layout: 'single-column' };

    const { getByLabelText, getByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        withOptionChips
        withUpdateCancelButtons
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Remove Option Test 2
    fireEvent.click(getByRole(
      'button',
      { name: 'Remove selected chip Test 2' },
    ));

    expect(setValues).toHaveBeenCalledTimes(0);

    fireEvent.click(getByRole('button', { name: 'Cancel button' }));

    expect(setValues).toHaveBeenCalledTimes(0);

  });

  it('Double Column - Passing value externally - Value Label - Included',
    () => {
      const props = { options, labelKey, valueKey, layout: 'double-column' };

      const { getByLabelText } = render(
        <MultiSelect
          id="test-multiselect"
          value={[1, 3]}
          isExcluded={false}
          onValueChange={setValues}
          onIncExcChange={setIncExc}
          withInclusionExclusion
          {...props}
        />,
      );

      expect(getByLabelText('Selected Label Value'))
        .toHaveTextContent(/^Included$/);
      expect(getByLabelText('Selected Label Count')).toHaveTextContent(/^2$/);

    });

  it('Double Column - Passing value externally - Value Label - Excluded',
    () => {
      const props = { options, labelKey, valueKey, layout: 'double-column' };

      const { getByLabelText } = render(
        <MultiSelect
          id="test-multiselect"
          value={[1, 3]}
          isExcluded
          onValueChange={setValues}
          onIncExcChange={setIncExc}
          withInclusionExclusion
          {...props}
        />,
      );

      expect(getByLabelText('Selected Label Value'))
        .toHaveTextContent(/^Excluded$/);
      expect(getByLabelText('Selected Label Count')).toHaveTextContent(/^2$/);

    });

  it('Double Coulmn - Passing inc value externally - Option Chips', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };
    const value = [1, 3];

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={value}
        onValueChange={setValues}
        isExcluded={false}
        onIncExcChange={setIncExc}
        withInclusionExclusion
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const chipsElements = findAll(document.body, OptionLabel);

    const chipListHeader = getByLabelText('Chip List header');

    // Match no. of options which are selected
    expect(chipsElements.length).toBe(2);

    // Match the option labels which are selected
    chipsElements.forEach((el, index) => {
      expect(el).toHaveTextContent(new RegExp(`^Test ${value[index]}$`));
    });

    expect(chipListHeader).toHaveTextContent(/^Included List$/);

  });

  it('Double Coulmn - Passing exc value externally - Option Chips', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };
    const value = [1, 3];

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={value}
        onValueChange={setValues}
        isExcluded
        onIncExcChange={setIncExc}
        withInclusionExclusion
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const chipsElements = findAll(document.body, OptionLabel);

    const chipListHeader = getByLabelText('Chip List header');

    // Match no. of options which are selected
    expect(chipsElements.length).toBe(2);

    // Match the option labels which are selected
    chipsElements.forEach((el, index) => {
      expect(el).toHaveTextContent(new RegExp(`^Test ${value[index]}$`));
    });

    expect(chipListHeader).toHaveTextContent(/^Excluded List$/);

  });

  it('Double Column - Passing inc value externally - Verify checkbox check',
    () => {
      const props = { options, labelKey, valueKey, layout: 'double-column' };
      const value = [1, 3];

      const { getByLabelText, queryByLabelText } = render(
        <MultiSelect
          id="test-multiselect"
          value={value}
          onValueChange={setValues}
          isExcluded={false}
          onIncExcChange={setIncExc}
          withInclusionExclusion
          withOptionChips
          {...props}
        />,
      );

      // Open the multiselect dropdown
      fireEvent.click(getByLabelText('Open Drop'));

      options.map(_ => _.id).forEach(_ => {
        expect(queryByLabelText(`cross checkbox for Test ${_}`)).toBe(null);
        const selectCheck = getByLabelText(`select checkbox for Test ${_}`);
        if (value.includes(_)) {
          expect(selectCheck).toHaveClass('option-checkbox-active');
        } else {
          expect(selectCheck).toHaveClass('option-checkbox-inactive');
        }
      });

    });

  it('Double Column - Passing exc value externally - Verify checkbox check',
    () => {
      const props = { options, labelKey, valueKey, layout: 'double-column' };
      const value = [1, 3];

      const { getByLabelText, queryByLabelText } = render(
        <MultiSelect
          id="test-multiselect"
          value={value}
          onValueChange={setValues}
          isExcluded
          onIncExcChange={setIncExc}
          withInclusionExclusion
          withOptionChips
          {...props}
        />,
      );

      // Open the multiselect dropdown
      fireEvent.click(getByLabelText('Open Drop'));

      options.map(_ => _.id).forEach(_ => {
        expect(queryByLabelText(`select checkbox for Test ${_}`)).toBe(null);
        const selectCheck = getByLabelText(`cross checkbox for Test ${_}`);
        if (value.includes(_)) {
          expect(selectCheck).toHaveClass('option-checkbox-active');
        } else {
          expect(selectCheck).toHaveClass('option-checkbox-inactive');
        }
      });

    });

  it('Double Column - Passing no value externally - Verify checkbox check',
    () => {
      const props = { options, labelKey, valueKey, layout: 'double-column' };
      const value = [];

      const { getByLabelText, getByRole, queryByLabelText } = render(
        <MultiSelect
          id="test-multiselect"
          value={value}
          onValueChange={setValues}
          isExcluded={null}
          onIncExcChange={setIncExc}
          withInclusionExclusion
          withOptionChips
          {...props}
        />,
      );

      // Open the multiselect dropdown
      fireEvent.click(getByLabelText('Open Drop'));

      options.map(_ => _.id).forEach(_ => {
        expect(queryByLabelText(`select checkbox for Test ${_}`)).toBe(null);
        expect(queryByLabelText(`cross checkbox for Test ${_}`)).toBe(null);
      });

      // Hover option with id 2
      fireEvent.mouseOver(getByRole('menuitem', { name: 'option id - 2' }));

      expect(getByLabelText(`select checkbox for Test 2`))
        .toHaveClass('option-checkbox-active');
      expect(getByLabelText(`cross checkbox for Test 2`))
        .toHaveClass('option-checkbox-active');

    });

  it('Double Column - No values selected - Value Label', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { queryAllByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        isExcluded={null}
        onIncExcChange={setIncExc}
        withInclusionExclusion
        withOptionChips
        {...props}
      />,
    );

    const [selectLabel] = queryAllByLabelText('Selected Label Value');
    const count = queryAllByLabelText('Selected Label Count');

    expect(selectLabel).toHaveTextContent(/^Select$/);
    expect(count.length).toBe(0);

  });

  it('Double Column - No values selected - Option Chips', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        isExcluded={null}
        onIncExcChange={setIncExc}
        withInclusionExclusion
        withOptionChips
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const chipsElements = findAll(document.body, OptionLabel);

    // Match no. of options which are selected
    expect(chipsElements.length).toBe(0);

  });

  it('Double Column - Search - Option match', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByRole, getByLabelText, queryAllByRole } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        isExcluded={null}
        onIncExcChange={setIncExc}
        withOptionChips
        searchable
        withInclusionExclusion
        searchPlaceholder="Search"
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    const searchElement = getByRole(
      'search',
      { name: 'multiselect searchbox' },
    );

    // Initial Option count check
    expect(queryAllByRole(
      'option',
      { name: 'multiselect option value' },
    ).length).toBe(8);

    fireEvent.change(searchElement, { target: { value: 'Test 1' } });

    const filteredOptions = queryAllByRole(
      'option',
      { name: 'multiselect option value' },
    );

    expect(filteredOptions.length).toBe(4);

    filteredOptions.forEach((option, index) => {
      expect(option)
        .toHaveTextContent(
          new RegExp(
            `^${options.filter(_ => _.label.includes('Test 1'))[index].label}$`,
          ))
    });

  });

  it('Double Column - Select Option (include) - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByRole, getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        isExcluded={null}
        onIncExcChange={setIncExc}
        withOptionChips
        withInclusionExclusion
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Hover option with id 2
    fireEvent.mouseOver(getByRole('menuitem', { name: 'option id - 2' }));

    // Select Option with id 2
    fireEvent.click(getByRole(
      'checkbox',
      { name: 'select checkbox for Test 2' },
    ));

    expect(setValues).toHaveBeenCalledWith([2]);
    expect(setIncExc).toHaveBeenCalledWith(false);

  });

  it('Double Column - Select Option (exclude) - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByRole, getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        isExcluded={null}
        onIncExcChange={setIncExc}
        withOptionChips
        withInclusionExclusion
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Hover option with id 2
    fireEvent.mouseOver(getByRole('menuitem', { name: 'option id - 2' }));

    // Select Option with id 2
    fireEvent.click(getByRole(
      'checkbox',
      { name: 'cross checkbox for Test 2' },
    ));

    expect(setValues).toHaveBeenCalledWith([2]);
    expect(setIncExc).toHaveBeenCalledWith(true);

  });

  it('Double Column - Clear All - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByRole, getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[1, 2, 3]}
        onValueChange={setValues}
        isExcluded={false}
        onIncExcChange={setIncExc}
        withOptionChips
        withInclusionExclusion
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    fireEvent.click(getByRole(
      'button',
      { name: 'Clear all selected options' }),
    );

    expect(setValues).toHaveBeenCalledWith([]);

  });

  it('Double Column - Select All Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByRole, getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={[]}
        onValueChange={setValues}
        isExcluded={null}
        onIncExcChange={setIncExc}
        withOptionChips
        withInclusionExclusion
        withSelectAll
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Hover option Select All
    fireEvent.mouseOver(getByRole('menuitem', { name: 'select all options' }));

    // Select Option Select All
    fireEvent.click(getByRole(
      'checkbox',
      { name: 'cross checkbox for Select All' },
    ));

    expect(setValues).toHaveBeenCalledWith(options.map(_ => _.id));
    expect(setIncExc).toHaveBeenCalledWith(true);

  });

  it('Double Column - Deselect All Option - Verify', () => {
    const props = { options, labelKey, valueKey, layout: 'double-column' };

    const { getByRole, getByLabelText } = render(
      <MultiSelect
        id="test-multiselect"
        value={options.map(_ => _.id)}
        onValueChange={setValues}
        isExcluded={false}
        onIncExcChange={setIncExc}
        withOptionChips
        withInclusionExclusion
        withSelectAll
        {...props}
      />,
    );

    // Open the multiselect dropdown
    fireEvent.click(getByLabelText('Open Drop'));

    // Select all option checkbox
    fireEvent.click(getByRole('menuitem', { name: 'select all options' }));

    expect(setValues).toHaveBeenCalledWith([]);
    expect(setIncExc).toHaveBeenCalledWith(null);

  });

});
