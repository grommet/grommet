import React, { useContext, useEffect, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Form } from '../Form';
import { DataContext } from '../../contexts/DataContext';

const formSearchKey = '_search';
const formSortPropertyKey = '_sort.property';
const formSortDirectionKey = '_sort.direction';

const viewToFormValue = (view) => {
  const result = { ...(view?.properties || {}) };
  if (typeof view?.search?.text === 'string')
    result[formSearchKey] = view.search.text;
  else result[formSearchKey] = '';
  if (view?.sort) {
    result[formSortPropertyKey] = view?.sort?.property;
    result[formSortDirectionKey] = view?.sort?.direction;
  }
  return result;
};

const formValueToView = (value) => {
  const properties = { ...value };
  const searchText = value[formSearchKey];
  delete properties[formSearchKey];
  const sortProperty = value[formSortPropertyKey];
  const sortDirection = value[formSortDirectionKey];
  delete properties[formSortPropertyKey];
  delete properties[formSortDirectionKey];
  return {
    properties,
    search: { text: searchText },
    ...(sortProperty || sortDirection
      ? { sort: { property: sortProperty, direction: sortDirection } }
      : {}),
  };
};

const clearEmpty = (properties) => {
  const result = properties;
  Object.keys(result)
    .filter((k) => k !== formSearchKey)
    .forEach((k) => {
      if (Array.isArray(result[k]) && result[k].length === 0) delete result[k];
    });
  return result;
};

export const DataForm = ({ children, footer, gap, onDone, pad, ...rest }) => {
  const { onView, updateOn, view } = useContext(DataContext);
  const [formValue, setFormValue] = useState(viewToFormValue(view));

  useEffect(() => setFormValue(viewToFormValue(view)), [view]);

  return (
    <Form
      {...rest}
      value={formValue}
      onSubmit={
        updateOn === 'submit'
          ? ({ value: nextValue }) => {
              clearEmpty(nextValue);
              setFormValue(nextValue);
              onView(formValueToView(nextValue));
              if (onDone) onDone();
            }
          : undefined
      }
      onChange={(nextValue) => {
        clearEmpty(nextValue);
        setFormValue(nextValue);
        if (updateOn === 'change') onView(formValueToView(nextValue));
      }}
    >
      <Box flex={false} pad={pad} gap={gap}>
        {children}
        {footer !== false && updateOn === 'submit' && (
          <Footer>
            <Button label="Apply Filters" type="submit" primary />
            <Button
              label="Reset Filters"
              type="reset"
              onClick={() => setFormValue(viewToFormValue(view))}
            />
          </Footer>
        )}
      </Box>
    </Form>
  );
};

// DataForm.propTypes = DataFormPropTypes;
