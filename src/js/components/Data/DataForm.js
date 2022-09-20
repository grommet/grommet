import React, { useContext, useEffect, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Form } from '../Form';
import { DataContext } from '../../contexts/DataContext';

const formSearchKey = '_search';

const filtersToFormValue = (filters) => ({
  ...filters.properties,
  [formSearchKey]: filters.search.text,
});

const formValueToFilters = (value) => {
  const properties = value;
  const searchText = value[formSearchKey];
  delete properties[formSearchKey];
  return { properties, search: { text: searchText } };
};

const clearEmpty = (properties) => {
  const result = properties;
  Object.keys(result).forEach((k) => {
    if (Array.isArray(result[k]) && result[k].length === 0) delete result[k];
  });
  return result;
};

export const DataForm = ({ children, footer, gap, onDone, pad, ...rest }) => {
  const { filters, onChange, onSubmit } = useContext(DataContext);
  const [formValue, setFormValue] = useState(filtersToFormValue(filters));

  useEffect(() => setFormValue(filtersToFormValue(filters)), [filters]);

  return (
    <Form
      {...rest}
      value={formValue}
      onSubmit={
        onSubmit
          ? ({ value: nextValue }) => {
              clearEmpty(nextValue);
              setFormValue(nextValue);
              onSubmit(formValueToFilters(nextValue));
              if (onDone) onDone();
            }
          : undefined
      }
      onChange={(nextValue) => {
        clearEmpty(nextValue);
        setFormValue(nextValue);
        if (onChange) onChange(formValueToFilters(nextValue));
      }}
    >
      <Box flex={false} pad={pad} gap={gap}>
        {children}
        {footer !== false && onSubmit && (
          <Footer>
            <Button label="Apply Filters" type="submit" primary />
            <Button
              label="Reset Filters"
              type="reset"
              onClick={() => setFormValue(filtersToFormValue(filters))}
            />
          </Footer>
        )}
      </Box>
    </Form>
  );
};

// DataForm.propTypes = DataFormPropTypes;
