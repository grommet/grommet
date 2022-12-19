import React, { useContext, useEffect, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Form } from '../Form';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';

// We convert the view structure to something more flat to work better
// with the Form inputs. These keys are how we flatten the Form value object
// from the view object.
const formSearchKey = '_search';
const formSortPropertyKey = '_sort.property';
const formSortDirectionKey = '_sort.direction';
const formRangeKey = '_range';

// converts from the external view format to the internal Form value format
const viewToFormValue = (view) => {
  const result = { ...(view?.properties || {}) };
  // convert { min: , max: } range to [min, max] for RangeSelector
  Object.keys(result).forEach((key) => {
    if (
      typeof result[key]?.min === 'number' ||
      typeof result[key]?.max === 'number'
    ) {
      result[key] = { [formRangeKey]: [result[key].min, result[key].max] };
    }
  });

  result[formSearchKey] = view?.search || '';

  if (view?.sort) {
    result[formSortPropertyKey] = view?.sort?.property;
    result[formSortDirectionKey] = view?.sort?.direction;
  }

  return result;
};

// converts from the internal Form value format to the external view format
const formValueToView = (value) => {
  const properties = { ...value };

  const searchText = value[formSearchKey];
  delete properties[formSearchKey];

  const sortProperty = value[formSortPropertyKey];
  const sortDirection = value[formSortDirectionKey];
  delete properties[formSortPropertyKey];
  delete properties[formSortDirectionKey];

  const result = {
    properties,
    search: searchText,
    ...(sortProperty || sortDirection
      ? { sort: { property: sortProperty, direction: sortDirection } }
      : {}),
  };

  // convert any ranges
  Object.keys(result.properties).forEach((key) => {
    if (result.properties[key][formRangeKey]) {
      result.properties[key] = {
        min: result.properties[key][formRangeKey][0],
        max: result.properties[key][formRangeKey][1],
      };
    }
  });

  return result;
};

// remove any empty arrays of property values by deleting the key for
// that property in the view properties
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
  const { messages, onView, updateOn, view } = useContext(DataContext);
  const { format } = useContext(MessageContext);
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
            <Button
              label={format({
                id: 'dataForm.submit',
                messages: messages?.dataForm,
              })}
              type="submit"
              primary
            />
            <Button
              label={format({
                id: 'dataForm.reset',
                messages: messages?.dataForm,
              })}
              type="reset"
              onClick={() => setFormValue(viewToFormValue(view))}
            />
          </Footer>
        )}
      </Box>
    </Form>
  );
};